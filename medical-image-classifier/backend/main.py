from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from torchvision import models, transforms
from PIL import Image
import torch
import io
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ResNet18 model
model = models.resnet18(pretrained=True)
model.eval()

with open("imagenet_class_index.json", "r") as f:
    idx_to_label = {int(key): value[1] for key, value in json.load(f).items()}

preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    input_tensor = preprocess(image).unsqueeze(0)
    with torch.no_grad():
        outputs = model(input_tensor)
        _, predicted = outputs.max(1)
        class_idx = predicted.item()
        class_label = idx_to_label.get(class_idx, "Unknown")
    return {"result": class_label} 