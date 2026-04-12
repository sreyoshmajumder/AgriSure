from web3 import Web3
from db.client import supabase
from config.settings import ORACLE_PRIVATE_KEY, SEPOLIA_RPC_URL

# Connect to Sepolia testnet
w3 = Web3(Web3.HTTPProvider(SEPOLIA_RPC_URL))

def get_pending_alerts():
    result = supabase.table("disaster_alerts")\
        .select("*")\
        .eq("threshold_breached", True)\
        .eq("oracle_submitted", False)\
        .execute()
    return result.data

def submit_to_chain(alert: dict, contract_address: str, abi: list):
    account = w3.eth.account.from_key(ORACLE_PRIVATE_KEY)
    contract = w3.eth.contract(address=contract_address, abi=abi)

    tx = contract.functions.reportDisaster(
        alert["farm_id"],
        int(alert["disaster_score"] * 100)  # convert 0.87 → 87
    ).build_transaction({
        "from": account.address,
        "nonce": w3.eth.get_transaction_count(account.address),
        "gas": 200000,
        "gasPrice": w3.eth.gas_price,
    })

    signed = w3.eth.account.sign_transaction(tx, ORACLE_PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)
    return w3.to_hex(tx_hash)

def mark_submitted(alert_id: str, tx_hash: str):
    supabase.table("disaster_alerts").update({
        "oracle_submitted": True,
        "tx_hash": tx_hash
    }).eq("id", alert_id).execute()
    print(f"✅ Submitted to chain: {tx_hash}")