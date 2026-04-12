from db.client import supabase

def get_all_farms():
    result = supabase.table("farms").select("id, lat, lon").execute()
    return result.data  # returns a list of dicts