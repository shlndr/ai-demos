from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chatbot = pipeline("text-generation", model="microsoft/DialoGPT-small", device=-1)

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    message = data.get("message", "")
    try:
        result = chatbot(message, max_length=100, pad_token_id=50256)
        reply = result[0]['generated_text'] if result else "Sorry, I didn't get that."
    except Exception as e:
        reply = f"Error: {str(e)}"
    return {"response": reply}