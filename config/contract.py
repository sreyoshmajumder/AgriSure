import json
from web3 import Web3
from config.settings import SEPOLIA_RPC_URL, AGRISURE_CONTRACT_ADDRESS

# Connect to Sepolia
w3 = Web3(Web3.HTTPProvider(SEPOLIA_RPC_URL))

# Load ABI — handles both Remix full artifact AND raw ABI array
with open("config/agrisure_abi.json") as f:
    artifact = json.load(f)

# If it's a full Remix artifact dict → extract "abi" key
# If it's already a raw list → use directly
if isinstance(artifact, list):
    ABI = artifact          # raw ABI array [ {...}, {...} ]
elif isinstance(artifact, dict):
    ABI = artifact["abi"]   # full Remix artifact { "abi": [...] }
else:
    raise ValueError("agrisure_abi.json format not recognized")

# Contract instance
agrisure = w3.eth.contract(
    address=Web3.to_checksum_address(AGRISURE_CONTRACT_ADDRESS),
    abi=ABI
)

def is_connected():
    return w3.is_connected()

def get_block():
    return w3.eth.block_number