#!/usr/bin/env python3 

# Importing the necessary modules 
import cv2
import numpy as np
from fastapi import APIRouter, UploadFile, File

# Creating an instance of the API router 
dashboardRouter = APIRouter() 

# Creating the dashboard home route 
@dashboardRouter.post("/")
async def dashboardHome(file: UploadFile = File(...)):

    # Read uploaded bytes
    image_bytes = await file.read()

    print(f"Received file: {file.filename}")
    print(f"Bytes: {len(image_bytes)}")

    # Convert bytes -> numpy
    nparr = np.frombuffer(image_bytes, np.uint8)

    # Decode image with OpenCV
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img is None:
        return {
            "error": "Image decoding failed"
        }

    print("Decoded successfully:", img.shape)

    # Run YOLO here later...
    
    return {
        "segmented_image": None,
        "vlm_text": "Image received and decoded successfully."
    }