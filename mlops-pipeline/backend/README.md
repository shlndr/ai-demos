# End-to-End MLOps Pipeline Backend

This backend powers the MLOps pipeline demo, supporting model training, prediction, and experiment tracking.

## Project Structure
- `main.py` — FastAPI app with /train and /predict endpoints.
- `train_and_log.py` — Script to train and log a spam classifier to MLflow.
- `model.joblib` — Saved spam classifier model.
- `requirements.txt` — Python dependencies.
- `Dockerfile` — For containerized deployment.
- `mlruns/` — MLflow experiment tracking data.

## Usage
### Local Development
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Train the model (if not already present):
   ```bash
   python train_and_log.py
   ```
3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```
4. The API will be available at [http://localhost:8000](http://localhost:8000)

### Docker
Build and run with Docker:
```bash
  docker build -t mlops-backend .
  docker run -p 8004:8000 mlops-backend
```

## API
- `POST /train` — Retrains the model and logs to MLflow.
- `POST /predict` — Accepts `{ "text": "..." }`, returns spam/ham prediction.

## AI/ML & MLOps Details
- Uses scikit-learn for spam classification (Naive Bayes).
- MLflow for experiment tracking and model management.
- Demonstrates retraining, logging, and serving models in production.

## Why This Project?
- Showcases MLOps best practices: CI/CD, experiment tracking, and model deployment.
- Demonstrates ability to build robust, production-ready ML pipelines. 