from pipeline.fetch_weather import fetch_weather
from pipeline.fetch_ndvi import fetch_nasa_power

def build_farm_payload(lat: float, lon: float, ndvi: float) -> dict:
    weather_df = fetch_nasa_power(lat, lon, days_back=30)
    latest = weather_df.iloc[-1]

    return {
        "region_lat": lat,
        "region_lon": lon,
        "timestamp": str(weather_df.index[-1].date()),
        "ndvi": ndvi,
        "precipitation_7d_avg": round(
            weather_df["precipitation_mm"].tail(7).mean(), 3
        ),
        "temperature_c": round(latest["temperature_c"], 2),
        "humidity_pct": round(latest["humidity_pct"], 2),
        "solar_radiation": round(latest["solar_radiation"], 2),
    }