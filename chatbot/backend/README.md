# AI-Powered Customer Support Chatbot Backend

This backend powers the AI chatbot demo, providing multi-turn dialog and NLP-based responses.

## Project Structure
- `main.py` — FastAPI app with /chat endpoint, integrates Hugging Face Transformers (DialoGPT) for conversational AI.
- `requirements.txt` — Python dependencies.
- `Dockerfile` — For containerized deployment.
- `venv/` — (local) Python virtual environment.

## Usage
### Local Development
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the server:
   ```bash
   uvicorn main:app --reload
   ```
3. The API will be available at [http://localhost:8000](http://localhost:8000)

### Docker
Build and run with Docker:
```bash
  docker build -t chatbot-backend .
  docker run -p 8001:8000 chatbot-backend
```

## API
- `POST /chat` — Accepts `{ "message": "..." }`, returns AI-generated response.

## AI/ML Details
- Uses Hugging Face Transformers (`microsoft/DialoGPT-small`) for conversational AI.
- Demonstrates NLP, intent detection, and multi-turn dialog.
- Easily extendable for intent classification, NER, or escalation to human agent.

## Why This Project?
- Showcases real-world NLP integration in a production-ready API.
- Demonstrates containerization, API design, and ML deployment skills.

