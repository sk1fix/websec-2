from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("cities.json", encoding="utf-8") as f:
    cities = json.load(f)

@app.get("/cities")
def get_cities():
    return cities

@app.get("/weather")
def get_weather(lat: float, lon: float):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_max,precipitation_sum,wind_speed_10m_max&timezone=auto"
    r = requests.get(url)
    return r.json()