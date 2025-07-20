# AI-based Predictive Analytics Dashboard Backend

This backend powers the sales prediction dashboard demo, serving real-time ML predictions via API.

## Project Structure
- `main.py` — FastAPI app with /predict endpoint, loads a pre-trained regression model.
- `train_and_save_model.py` — Script to train and save the model.
- `model.joblib` — Saved regression model (scikit-learn).
- `requirements.txt` — Python dependencies.
- `Dockerfile` — For containerized deployment.

## Usage
### Local Development
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Train the model (if not already present):
   ```bash
   python train_and_save_model.py
   ```
3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```
4. The API will be available at [http://localhost:8000](http://localhost:8000)

### Docker
Build and run with Docker:
```bash
  docker build -t dashboard-backend .
  docker run -p 8002:8000 dashboard-backend
```

## API
- `POST /predict` — Accepts `{ "ad_spend": 1234 }`, returns predicted sales.

## AI/ML Details
- Uses scikit-learn LinearRegression for sales prediction.
- Model trained on simulated data (ad spend vs. sales).
- Demonstrates real-time ML inference in a production API.

## Why This Project?
- Showcases ML model deployment, API integration, and real-time analytics.
- Demonstrates ability to build data-driven dashboards for business use cases. 