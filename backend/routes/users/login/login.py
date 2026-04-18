#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import jwt
import json 
import bcrypt 
import datetime
from database.connect import db 
from fastapi import APIRouter, Request

# Getting the secret key 
secretKey = os.getenv("SECRET_KEY")

# Creating an instance of the API router 
loginRouter = APIRouter()

# Creating the user login page 
@loginRouter.post("/")
async def loginUser(request: Request):
    # Using try except block to connect to the database, and 
    # Check if the user is on the database 
    try:
        # Getting the user login data 
        userData = await request.json() 
        
        # Getting the individual user's data 
        email = userData.get("email")
        password = userData.get("password")
        
        # Checking if the email is null/None value 
        if email is None: 
            # Build the error message 
            errorMessage = {
                "message": "Email is required!", 
                "status": "error", 
                "statusCode": 400
            } 
            
            # Sending the error message 
            return errorMessage; 
        
        # Checking if the password is null/None values 
        elif password is None: 
            # Build the error message 
            errorMessage = {
                "message": "Password is required!", 
                "status": "error", 
                "statusCode": 400
            }
            
            # Sending the error message 
            return errorMessage; 
        
        # If the request body is not empty, execute the block of code below 
        else: 
            # Checking if the user is already registered on the database 
            result = db.getUsersInformation("users", email=email)
            
            # If the result is None 
            if result is None: 
                # Create an error message 
                errorMessage = {
                    "message": "Invalid email or password!", 
                    "status": "error", 
                    "statusCode": 401
                }
                
                # Sending the error message 
                return errorMessage; 
            
            # Else if the result exists, execute the block of code below 
            else: 
                # converting the result into a json object 
                databaseDataResult = json.loads(result)
                
                # Getting the password 
                databaseStoredPasswordHash = databaseDataResult["password"]
                
                # if the hash is stored as the string "b"$2b$05...'", strip the wrappers 
                if databaseStoredPasswordHash.startswith("b") and databaseStoredPasswordHash.endswith("'"): 
                    databaseStoredPasswordHash = databaseStoredPasswordHash[2:-1]
                    
                # Convert the password into bytes formats 
                password = password.encode("utf-8")
                databaseStoredPasswordHash = databaseStoredPasswordHash.encode("utf-8")
                
                # Verifying the password hash 
                condition = bcrypt.checkpw(password, databaseStoredPasswordHash)
                
                # Checking the condition if the password verification is correct 
                if (condition): 
                    # Generate a token for the user and send it back to the client 
                    payload = {
                        "email": email, 
                        "fullname": databaseDataResult.get("fullname"), 
                        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=10),
                        "isLoggedIn": "true"
                    }
                    
                    # Encoding the jwt payload 
                    encodedJwt = jwt.encode(
                        payload, 
                        secretKey, 
                        algorithm="HS256"
                    )
                    
                    # Building the success message 
                    successMessage = {
                        "status": "success", 
                        "message": "User logged in successfully!", 
                        "token": encodedJwt, 
                        "statusCode": 200
                    }
                    
                    # Sending the success message 
                    return successMessage; 
                
                # Else if the user password is incorrect, execute the block of code below 
                else: 
                    # Create an error message 
                    errorMessage = {
                        "status": "error", 
                        "message": "Invalid email or password!", 
                        "statusCode": 401
                    }
                    
                    # Sending the error message 
                    return errorMessage; 
                
    # Except exception as error, execute the block of code below           
    except Exception as error: 
        # Display the error message to the console 
        print(f"[ERROR]: Error encountered: {str(error)}")
        
        # Creating the error message 
        errorMessage = {
            "message": "Error connecting to the database!", 
            "status": "error", 
            "statusCode": 500
        }
        
        # Sending the error message 
        return errorMessage; 