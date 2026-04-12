from pipeline.build_payload import build_farm_payload
from db.write import save_reading

TEST_FARM_ID = "0e94df21-ebb2-40e7-b461-07087351affb"

LAT, LON = 10.7867, 79.1378  # Thanjavur, Tamil Nadu

payload = build_farm_payload(LAT, LON, ndvi=0.55)
print("Payload built:", payload)

save_reading("0e94df21-ebb2-40e7-b461-07087351affb", payload)
print("Done — check your farm_readings table in Supabase")