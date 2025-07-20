from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pre-trained sales prediction model
model = joblib.load("model.joblib")

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    ad_spend = data.get("ad_spend", 0)
    X = np.array([[ad_spend]])
    pred = model.predict(X)[0]
    return {"prediction": float(pred)}