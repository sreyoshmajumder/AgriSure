import requests
import pandas as pd
from datetime import datetime, timedelta

def fetch_nasa_power(lat: float, lon: float, days_back: int = 30) -> pd.DataFrame:
    end_date = datetime.today()
    start_date = end_date - timedelta(days=days_back)

    params = {
        "parameters": "PRECTOTCORR,T2M,RH2M,ALLSKY_SFC_SW_DWN",
        "community": "AG",
        "longitude": lon,
        "latitude": lat,
        "start": start_date.strftime("%Y%m%d"),
        "end": end_date.strftime("%Y%m%d"),
        "format": "JSON",
    }

    url = "https://power.larc.nasa.gov/api/temporal/daily/point"
    response = requests.get(url, params=params, timeout=30)
    data = response.json()

    properties = data["properties"]["parameter"]
    df = pd.DataFrame(properties)
    df.index = pd.to_datetime(df.index, format="%Y%m%d")
    df.index.name = "date"
    df.columns = [
        "precipitation_mm",
        "temperature_c",
        "humidity_pct",
        "solar_radiation"
    ]
    return df