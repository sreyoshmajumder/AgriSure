from db.client import supabase
from datetime import datetime

def save_reading(farm_id: str, payload: dict):
    data = {
        "farm_id": farm_id,
        "timestamp": datetime.utcnow().isoformat(),
        "ndvi": payload["ndvi"],
        "precipitation_7d_avg": payload["precipitation_7d_avg"],
        "temperature_c": payload["temperature_c"],
        "humidity_pct": payload["humidity_pct"],
        "solar_radiation": payload["solar_radiation"],
    }
    result = supabase.table("farm_readings").insert(data).execute()
    print("Saved reading:", result.data)
    return result.data

def save_alert(farm_id: str, ml_result: dict):
    data = {
        "farm_id": farm_id,
        "timestamp": datetime.utcnow().isoformat(),
        "event_type": ml_result["event"],
        "disaster_score": ml_result["score"],
        "threshold_breached": ml_result["score"] > 0.75,
        "oracle_submitted": False,
    }
    result = supabase.table("disaster_alerts").insert(data).execute()
    print("Saved alert:", result.data)
    return result.data