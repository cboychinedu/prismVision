#!/usr/bin/env python3 

# Importing the necessary modules 
import cv2
import base64
import numpy as np
from fastapi import APIRouter, UploadFile, File
from machineLearning.machineLearning import PerformMachineLearningInference

# Creating an instance of the perform machine learning inference 
ml = PerformMachineLearningInference() 

# Creating an instance of the API router 
dashboardRouter = APIRouter() 

# Creating the dashboard home route 
@dashboardRouter.post("/")
async def dashboardHome(file: UploadFile = File(...)):
    # Using try except block to handle the requests
    try:
        # Reading the image bytes 
        imageBytes = await file.read()

        # Convert the image into numpy image array 
        numpyImageArray = np.frombuffer(imageBytes, np.uint8)

        # Decode image with OpenCV
        img = cv2.imdecode(numpyImageArray, cv2.IMREAD_COLOR)
        
        # if the image is none, execute the block of code below 
        if img is None:
            # Build the error message 
            errorMessage = {
                "status": "error", 
                "message": "Image decoding failed!", 
                "status": 505
            }
            
            # Sending the error message 
            return errorMessage; 
        
        # Else if the image is not None, parse the image into the 
        # machine learning class to perform the instance segemetation process 
        else: 
            # Calling the perform instance segmentation method 
            annotatedImage, predictedValues = ml.performInstanceSegmentation(imageBytes=img); 
            
            # Encode the annotated numpy array back into a JPEG buffer
            success, buffer = cv2.imencode('.jpg', annotatedImage)
            
            # if success is not true, return an error message 
            if not success: 
                # Build the error message 
                errorMessage = {
                    "status": "error", 
                    "message": "Error performing inference on the image", 
                    "statusCode": 404
                }
                
                # Sending the error message 
                return errorMessage; 
            
            # Else if the success is true, execute the block of code below 
            else: 
                # Convert the buffer to Base64 bytes, and then to UTF-8 string
                base64Encoded = base64.b64encode(buffer).decode('utf-8')
                imageDataUrl = f"data:image/jpej;base64, {base64Encoded}"
        
                # Calling the perform VLM inference method 
                # Encode the annotated numpy array back into a JPEG buffer
                success, buffer = cv2.imencode('.jpg', img)
                vlmImage = base64.b64encode(buffer).decode('utf-8')
                inferenceText, duration = ml.performVlmInference(vlmImage, predictedValues); 
                
                # Checking the inference text 
                if inferenceText is None: 
                    # Build the semi complete message 
                    semiCompleteMessage = {
                        "segmentedImage": imageDataUrl,
                        "vlmText": "No analysis for this image", 
                        "message": "Inference was semi completed", 
                        "duration": "redracted", 
                        "statusCode": 301
                    }
                    
                    # Sending the semi complete message 
                    return semiCompleteMessage; 
                
                # Else if the vlm analysis was a success, execute 
                # the block of code below 
                else:
                    # Build the response from both analysis 
                    successMessage = {
                        "segmentedImage": imageDataUrl,
                        "vlmText": inferenceText, 
                        "message": "Success in inference analysis",
                        "duration": duration,  
                        "statusCode": 200
                    }
                    
                    # Sending the success message 
                    return successMessage; 
                
    # On exception as error, execute the block of code below 
    except Exception as error: 
        # Build the error message 
        errorMessage = {
            "status": "error", 
            "message": "Error performing inference on the image", 
            "statusCode": 500
        }
        
        # Sending the error message 
        return errorMessage; 