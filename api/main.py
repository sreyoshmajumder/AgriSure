# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db.client import supabase
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # tighten this before production
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Request model ─────────────────────────────────────────────────────────────
class FarmCreate(BaseModel):
    name: str
    wallet_address: str
    lat: float
    lon: float

# ── POST /farms ───────────────────────────────────────────────────────────────
@app.post("/farms")
def register_farm(body: FarmCreate):
    result = supabase.table("farms").insert({
        "name":           body.name,
        "wallet_address": body.wallet_address,
        "lat":            body.lat,
        "lon":            body.lon,
    }).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Insert failed")
    return result.data[0]

# ── GET /farm/{id}/health ─────────────────────────────────────────────────────
@app.get("/farm/{farm_id}/health")
def get_farm_health(farm_id: str):
    result = supabase.table("farm_readings") \
        .select("*") \
        .eq("farm_id", farm_id) \
        .order("timestamp", desc=True) \
        .limit(1) \
        .execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="No readings found")
    return result.data[0]

# ── GET /alerts ───────────────────────────────────────────────────────────────
@app.get("/alerts")
def get_alerts():
    result = supabase.table("disaster_alerts") \
        .select("*") \
        .order("created_at", desc=True) \
        .limit(50) \
        .execute()
    return result.data or []