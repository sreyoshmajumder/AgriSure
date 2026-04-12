import openmeteo_requests
import requests_cache
from retry_requests import retry

cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)

def fetch_weather(lat: float, lon: float) -> dict:
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": [
            "temperature_2m",
            "relative_humidity_2m",
            "rain",
            "precipitation"
        ],
    }
    responses = openmeteo.weather_api(
        "https://api.open-meteo.com/v1/forecast", params=params
    )
    response = responses[0]
    current = response.Current()

    return {
        "temperature_c": round(current.Variables(0).Value(), 2),
        "humidity_pct": round(current.Variables(1).Value(), 2),
        "rain_mm": round(current.Variables(2).Value(), 2),
        "precipitation_mm": round(current.Variables(3).Value(), 2),
    }