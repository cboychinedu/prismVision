#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import jwt
import cv2
import json
import base64
import numpy as np
from datetime import datetime
from database.connect import db
from fastapi import APIRouter, UploadFile, File, Request
from machineLearning.machineLearning import PerformMachineLearningInference

# Getting the secret key 
secretKey = os.getenv("SECRET_KEY")

# Creating an instance of the perform machine learning inference 
ml = PerformMachineLearningInference() 

# Creating an instance of the API router 
dashboardRouter = APIRouter() 

# Creating the dashboard home route 
@dashboardRouter.post("/")
async def dashboardHome(request: Request, file: UploadFile = File(...)):
    # Using try except block to handle the requests
    try:
        # Access individual headers like a dictionary
        userToken = request.headers.get("prismVisionToken")
        
        # Decode the token value 
        decodedToken = jwt.decode(userToken, 
                                secretKey, 
                                algorithms=["HS256"], 
                                options={"verify_signature": True})
        
        # Getting the email address 
        email = decodedToken["email"] 
    
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
            # Checking if the user is on the database 
            userData = db.getUsersInformation(collectionName="users", email=email)
            
            # if the user is no longer on our database, Execute the block 
            # of code below 
            if not userData: 
                # Build the error message
                errorMessage = {
                    "status": "error", 
                    "message": "Invalid User!", 
                    "statusCode": 404
                }
                
                # Sending the error message 
                return errorMessage; 
            
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
                imageDataUrl = f"data:image/jpeg;base64,{base64Encoded}"
        
                # Calling the perform VLM inference method 
                # Encode the annotated numpy array back into a JPEG buffer
                success, buffer = cv2.imencode('.jpg', img)
                vlmImage = base64.b64encode(buffer).decode('utf-8')
                inferenceText, duration = ml.performVlmInference(vlmImage, predictedValues);
                
                # Getting the date data 
                fullDate = datetime.now() 
                fullDate = fullDate.strftime("%Y-%m-%d %I:%M:%S %p") 
                
                # Building the database data 
                dataBaseInferenceData = {
                    "segementedImage": imageDataUrl, 
                    "vlmText": inferenceText, 
                    "duration": duration, 
                    "createdAt": fullDate, 
                    "email": email
                }
                
                # Saving the predicted values on the mongodb database
                inferenceResultDatabase = db.saveUsersInferenceInformation(
                    collectionName="predictions", 
                    data=dataBaseInferenceData
                ); 
                
                # Checking if the data is saved on the database 
                if (inferenceResultDatabase is None): 
                    # Build the error message 
                    errorMessage = {
                        "status": "error", 
                        "message": "Unable to save the analysis on the database", 
                        "statusCode": 404
                    }
                    
                    # Sending the error message 
                    return errorMessage; 
                
                
                # Else if the data was saved on the database 
                else: 
                    # Checking the inference text 
                    if (inferenceText is None): 
                        # Build the semi complete message 
                        semiCompleteMessage = {
                            "id": dataBaseResponse.get("_id"), 
                            "status": "semi-complete",
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
                        # Convert the inference result into a json object 
                        dataBaseResponse = json.loads(inferenceResultDatabase)
                        
                        # Build the response from both analysis 
                        successMessage = {
                            "id": dataBaseResponse.get("_id"), 
                            "status": "success", 
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
        # Display the error message 
        print(f"Error: {error}")
         
        # Build the error message 
        errorMessage = {
            "status": "error", 
            "message": "Error performing inference on the image", 
            "statusCode": 500
        }
        
        # Sending the error message 
        return errorMessage; 
    
    
# Creating the route parameter route for the dashboard 
# to load the single predicted value 
@dashboardRouter.get("/{idValue}")
async def getInferenceAnalysis(request: Request, idValue: str): 
    # Using try except block to handle the requests
    try:
        # Access individual headers like a dictionary
        userToken = request.headers.get("prismVisionToken")
        
        # if the user token is not present 
        if not userToken: 
            # Buid the error message 
            errorMessage = {
                "message": "Unauthorized", 
                "status": "error", 
                "statusCode": 401
            }
            
            # Sending the error message 
            return errorMessage; 
        
        # Decode the token value 
        decodedToken = jwt.decode(userToken, 
                                secretKey, 
                                algorithms=["HS256"], 
                                options={"verify_signature": True})
        
        # Getting the user email address 
        email = decodedToken["email"]
        
        # Verify if the uer exists on the database 
        userData = db.getUsersInformation("users", email=email)
        
        # Checking if the user exists 
        if not userData: 
            # Build the error message 
            errorMessage = {
                "status": "error", 
                "message": "User no longer exists or account is invalid!", 
                "statusCode": 404
            }
            
            # Sending the error response/message 
            return errorMessage; 
        
        # Else if the user exist on the database, pull the history data 
        # with the id value 
        usersInferenceById = db.getInferenceById(
            collectionName="predictions", 
            id=idValue
        )
        
        # if the users inference by id is deleted and not present, 
        # execute the block of code below 
        if not usersInferenceById: 
            # Build the error message 
            errorMessage = {
                "status": "error", 
                "message": "inference result not found!", 
                "statusCode": 401
            }
            
            # Sending the error message
            return errorMessage; 
        
        # Else if the message is present 
        else:
            # Sending the inference result by the specified id value 
            successMessage = {
                "status": "success", 
                "message": "inference result found!", 
                "inferenceResult": usersInferenceById, 
                "statusCode": 200
            }
            
            # Sending the success message 
            return successMessage
    
    # Handle the exception 
    except Exception as error: 
        print(f"Error: {error}") 