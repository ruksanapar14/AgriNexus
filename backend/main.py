from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="SmartFarm Twin API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://agri-nexus-alpha.vercel.app",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SimulationRequest(BaseModel):
    crop: str
    soil: str
    irrigation: float
    fertilizer: float
    rainfall: float
    weather: str


@app.get("/")
def root():
    return {
        "status": "online",
        "service": "SmartFarm Twin Simulation Engine"
    }


@app.post("/simulate")
def simulate(data: SimulationRequest):

    base_yield = {
        "Rice": 5.0,
        "Wheat": 4.2,
        "Maize": 5.5,
        "Tomato": 6.0,
        "Cotton": 2.8,
    }.get(data.crop, 4.0)

    soil_factor = {
        "Loamy": 1.00,
        "Black Soil": 1.05,
        "Clay": 0.92,
        "Sandy": 0.86,
    }.get(data.soil, 0.95)

    weather_factor = {
        "Normal": 1.00,
        "Drought": 0.82,
        "Heavy Rain": 0.90,
        "Heat Wave": 0.84,
        "Ideal": 1.08,
    }.get(data.weather, 1.0)

    water_factor = min(data.irrigation / 4200, 1.1)

    nutrient_factor = min(
        0.75 + (data.fertilizer / 100) * 0.25,
        1.0
    )

    expected_yield = (
        base_yield
        * soil_factor
        * weather_factor
        * water_factor
        * nutrient_factor
    )

    if expected_yield < base_yield * 0.75:
        risk = "HIGH"
    elif expected_yield < base_yield * 0.9:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    cost = (
        data.irrigation * 1.2
        + data.fertilizer * 45
        + 8000
    )

    return {
        "expected_yield": round(expected_yield, 2),
        "water_used": round(data.irrigation, 0),
        "fertilizer_used": round(data.fertilizer, 1),
        "estimated_cost": round(cost, 0),
        "risk": risk,
        "weather": data.weather,
        "is_simulation": True,
    }