import os
import time
from web3 import Web3
from config.contract import w3, agrisure
from config.settings import ORACLE_PRIVATE_KEY
from db.client import supabase

# ── TriggerType enum — must match Solidity order exactly ─────────────────────
TRIGGER_TYPE = {
    "drought":    0,
    "flood":      1,
    "heatstress": 2,
    "custom":     3
}

# ── Step A: Read pending alerts from Supabase ─────────────────────────────────
def get_pending_alerts():
    result = supabase.table("disaster_alerts") \
        .select("*") \
        .eq("threshold_breached", True) \
        .eq("oracle_submitted", False) \
        .execute()
    return result.data

# ── Step B: Build unique requestId for replay protection ──────────────────────
def make_request_id(alert_id: str) -> bytes:
    """
    Creates a unique bytes32 requestId from alert UUID + timestamp.
    This prevents the same alert being submitted twice to the contract.
    """
    raw = f"agrisure-{alert_id}-{int(time.time())}"
    return w3.keccak(text=raw)

# ── Step C: Submit result to blockchain ───────────────────────────────────────
def submit_to_chain(alert: dict) -> str:
    """
    Reads ML result from Supabase alert row.
    Converts it to OracleResultParams struct format.
    Signs and sends transaction from oracle wallet.
    Returns tx_hash string.
    """

    account = w3.eth.account.from_key(ORACLE_PRIVATE_KEY)

    # Convert float scores (0.0-1.0) → basis points (0-10000)
    # Example: disaster_score=0.87 → severityBps=8700
    severity_bps   = int(float(alert.get("disaster_score", 0)) * 10000)
    confidence_bps = int(float(alert.get("confidence", 0.85))  * 10000)

    # Map disaster type string → Solidity enum integer
    disaster_type  = alert.get("disaster_type", "drought").lower().replace(" ", "")
    event_type_int = TRIGGER_TYPE.get(disaster_type, 0)

    # Build unique bytes32 requestId
    request_id     = make_request_id(str(alert["id"]))

    # Build bytes32 dataHash (proof of off-chain data)
    raw_hash       = alert.get("data_hash", "")
    if raw_hash and raw_hash.startswith("0x"):
        data_hash  = bytes.fromhex(raw_hash[2:].zfill(64))
    else:
        data_hash  = w3.keccak(text=f"proof-{alert['id']}")

    # observed_at must be unix timestamp within policy coverage window
    observed_at    = int(alert.get("observed_at", int(time.time())))

    # Policy ID from Supabase row
    policy_id      = int(alert["policy_id"])

    print(f"\n📡 Submitting Oracle Result")
    print(f"   Policy ID   : {policy_id}")
    print(f"   Event Type  : {disaster_type} (enum={event_type_int})")
    print(f"   Severity    : {severity_bps} bps ({severity_bps/100}%)")
    print(f"   Confidence  : {confidence_bps} bps ({confidence_bps/100}%)")
    print(f"   Observed At : {observed_at}")

    # OracleResultParams struct passed as TUPLE to web3.py
    # Order must match Solidity struct field order exactly:
    # (requestId, policyId, eventType, severityBps, confidenceBps, observedAt, dataHash)
    oracle_params = (
        request_id,       # bytes32
        policy_id,        # uint256
        event_type_int,   # uint8 (TriggerType enum)
        severity_bps,     # uint256
        confidence_bps,   # uint256
        observed_at,      # uint256
        data_hash         # bytes32
    )

    # Build the transaction
    tx = agrisure.functions.submitOracleResult(oracle_params).build_transaction({
        "from":      account.address,
        "nonce":     w3.eth.get_transaction_count(account.address),
        "gas":       300000,
        "gasPrice":  w3.eth.gas_price,
    })

    # Sign with oracle private key
    signed  = w3.eth.account.sign_transaction(tx, ORACLE_PRIVATE_KEY)

    # Send to Sepolia
    tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)
    tx_hex  = w3.to_hex(tx_hash)

    print(f"   ✅ TX Sent  : {tx_hex}")
    print(f"   🔍 Etherscan: https://sepolia.etherscan.io/tx/{tx_hex}")

    # Wait for confirmation (optional but useful for debugging)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash, timeout=120)
    print(f"   ⛽ Gas Used  : {receipt['gasUsed']}")
    print(f"   📦 Block     : {receipt['blockNumber']}")

    if receipt["status"] == 1:
        print(f"   ✅ Confirmed!")
    else:
        print(f"   ❌ Transaction REVERTED — check policy state and dates")

    return tx_hex

# ── Step D: Mark as submitted in Supabase ────────────────────────────────────
def mark_submitted(alert_id: str, tx_hash: str):
    supabase.table("disaster_alerts").update({
        "oracle_submitted": True,
        "tx_hash":          tx_hash
    }).eq("id", alert_id).execute()
    print(f"   ✅ Marked submitted in Supabase")

# ── Step E: Main runner ───────────────────────────────────────────────────────
def run_oracle():
    print("\n🌾 AgriSure Oracle Starting...")

    if not w3.is_connected():
        print("❌ Web3 not connected. Check SEPOLIA_RPC_URL in .env")
        return

    print(f"🔗 Connected to Sepolia | Block: {w3.eth.block_number}")
    print(f"👛 Oracle Wallet: {w3.eth.account.from_key(ORACLE_PRIVATE_KEY).address}")

    alerts = get_pending_alerts()

    if not alerts:
        print("📭 No pending alerts. Nothing to submit.")
        return

    print(f"📬 Found {len(alerts)} alert(s) to submit...")

    for alert in alerts:
        try:
            tx_hash = submit_to_chain(alert)
            mark_submitted(str(alert["id"]), tx_hash)
        except Exception as e:
            print(f"❌ Failed for alert {alert['id']}: {e}")

if __name__ == "__main__":
    run_oracle()