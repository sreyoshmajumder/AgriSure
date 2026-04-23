from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL               = os.getenv("SUPABASE_URL")
SUPABASE_KEY               = os.getenv("SUPABASE_KEY")
SENTINEL_CLIENT_ID         = os.getenv("SENTINEL_CLIENT_ID")
SENTINEL_CLIENT_SECRET     = os.getenv("SENTINEL_CLIENT_SECRET")
ORACLE_PRIVATE_KEY         = os.getenv("ORACLE_PRIVATE_KEY")
SEPOLIA_RPC_URL            = os.getenv("SEPOLIA_RPC_URL")
AGRISURE_CONTRACT_ADDRESS  = os.getenv("AGRISURE_CONTRACT_ADDRESS")
MOCKUSDC_CONTRACT_ADDRESS  = os.getenv("MOCKUSDC_CONTRACT_ADDRESS")