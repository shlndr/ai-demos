from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import joblib
import mlflow
import mlflow.sklearn
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "model.joblib"

model = joblib.load(MODEL_PATH) if os.path.exists(MODEL_PATH) else None

@app.post("/train")
async def train():
    X = [
        'Win a free iPhone now',
        'Congratulations, you have won a lottery',
        'Call this number to claim your prize',
        'Meeting at 10am tomorrow',
        'Lunch with John at noon',
        'Project deadline is next week',
    ]
    y = ['spam', 'spam', 'spam', 'ham', 'ham', 'ham']
    new_model = make_pipeline(CountVectorizer(), MultinomialNB())
    new_model.fit(X, y)
    with mlflow.start_run():
        mlflow.sklearn.log_model(new_model, "model")
        mlflow.log_param("model_type", "MultinomialNB")
        mlflow.log_metric("train_accuracy", new_model.score(X, y))
    joblib.dump(new_model, MODEL_PATH)
    global model
    model = new_model
    return {"status": "Model retrained and logged to MLflow."}

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    text = data.get("text", "")
    if not model:
        return {"error": "Model not trained yet."}
    pred = model.predict([text])[0]
    return {"prediction": pred} 