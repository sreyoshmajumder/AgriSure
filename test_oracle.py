from web3 import Web3
from config.settings import SEPOLIA_RPC_URL

w3 = Web3(Web3.HTTPProvider(SEPOLIA_RPC_URL))
print("Connected:", w3.is_connected())
print("Block number:", w3.eth.block_number)
