# Medical Image Classifier Backend

This backend powers the medical image classifier demo, providing AI-based image classification for X-ray/MRI images.

## Project Structure
- `main.py` — FastAPI app with /upload endpoint, uses pre-trained ResNet18 for image classification.
- `imagenet_class_index.json` — ImageNet class labels.
- `requirements.txt` — Python dependencies.
- `Dockerfile` — For containerized deployment.

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
  docker build -t classifier-backend .
  docker run -p 8003:8000 classifier-backend
```

## API
- `POST /upload` — Accepts image file, returns top-1 predicted class.

## AI/ML Details
- Uses PyTorch and torchvision ResNet18 pre-trained on ImageNet.
- Demonstrates computer vision, image preprocessing, and model inference.
- Easily extendable for custom medical models (e.g., pneumonia detection).

## Why This Project?
- Showcases deep learning, computer vision, and real-world AI deployment.
- Demonstrates ability to build AI tools for healthcare and diagnostics. 