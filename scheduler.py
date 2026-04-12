from apscheduler.schedulers.blocking import BlockingScheduler
from pipeline.build_payload import build_farm_payload
from db.read import get_all_farms
from db.write import save_reading

def run_pipeline():
    print("Pipeline started...")
    farms = get_all_farms()

    for farm in farms:
        try:
            payload = build_farm_payload(
                lat=farm["lat"],
                lon=farm["lon"],
                ndvi=0.55  # hardcoded for now, Sentinel Hub comes later
            )
            save_reading(farm["id"], payload)
            print(f"✅ Saved reading for farm {farm['id']}")
        except Exception as e:
            print(f"❌ Failed for farm {farm['id']}: {e}")

if __name__ == "__main__":
    run_pipeline()  # run once immediately on start

    scheduler = BlockingScheduler()
    scheduler.add_job(run_pipeline, "interval", hours=6)
    print("Scheduler running — next run in 6 hours")
    scheduler.start()