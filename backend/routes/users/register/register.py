#!/usr/bin/env python3 

# Importing the necessary modules 
import bcrypt
from datetime import datetime 
from database.connect import db
from fastapi import APIRouter, Request

# Creating an instance of the API router 
registerRouter = APIRouter()

# Creating the home route 
@registerRouter.post("/")
async def registerUser(request: Request):
    # Using try except block to connect to the database, and 
    # Check if the user is already registered on the database, 
    # if not, regiser the user. 
    try: 
        # Getting the user registration data 
        userData = await request.json() 
        
        # Getting the individual user's data 
        fullname = userData.get("fullname")
        email = userData.get("email")
        password = userData.get("password")
        
        # Checking that the full name is not null values 
        if fullname is None: 
            # Build the error message 
            errorMessage = {
                "message": "Fullname is required!", 
                "status": "error", 
                "statusCode": 400
            }
            
            # Sending the error message 
            return errorMessage; 
        
        # Checking that the email is not null values 
        elif email is None: 
            # Building the error message 
            errorMessage = {
                "message": "Email address is required!", 
                "status": "error", 
                "statusCode": 400
            }
            
            # Sending the error message 
            return errorMessage; 
        
        # Checking that the password is not null/None values 
        elif password is None:
            # Building the error message 
            errorMessage = {
                "message": "Password is required!", 
                "status": "error", 
                "statusCode": 400
            } 
            
            # Sending the error message 
            return errorMessage; 
        
        # If the request body is not empty, execute the block of code below 
        else:
            # Checking if the user is already registered on the database 
            databaseCheck = db.getUsersInformation("users", email=email)
            
            # If the databaseCheck is None 
            if databaseCheck is None: 
                # If the result is None, which means the user with the specified email 
                # address is not registered on the database, perform the block of code below 
                # Encrypt the password 
                password = bytes(password.encode("utf-8"))
                passwordHash = bcrypt.hashpw(password, bcrypt.gensalt(5))
                
                # Getting the date data 
                fullDate = datetime.now() 
                fullDate = fullDate.strftime("%Y-%m-%d %I:%M:%S %p")
                
                # Saving the user's registered data on the database 
                registeredData = {
                    "fullname": fullname, 
                    "email": email, 
                    "password": passwordHash, 
                    "dateCreated": fullDate
                }
                
                # Saving the registered user's data 
                result = db.saveUsersInformation("users", registeredData)
                
                # if the data is saved on the database, execute the 
                # block of code below 
                if (result): 
                    # Building the success message 
                    successMessage = {
                        "message": "User registered!", 
                        "status": "success", 
                        "statusCode": 200
                    }
                    
                    # Sending back the success message 
                    return successMessage; 
                
                # Else if the data is not saved on the database, execute 
                # the block of code belwo 
                else: 
                    # Building the error message 
                    errorMessage = {
                        "message": "User not saved on the database!", 
                        "status": "error", 
                        "statusCode": 404
                    }
                    
                    # Sending back the error message 
                    return errorMessage; 
                
            # Else if the user is already registered on the database 
            else: 
                # Building the error message 
                errorMessage = {
                    "message": "User already exist!", 
                    "status": "error", 
                    "statusCode": 409
                }
                
                # Returning the error message 
                return errorMessage; 
            
    
    # Except exception as error 
    except Exception as error: 
        # Execute this block of code if there was an error connecting 
        # to the database 
        # Display the error to the console 
        print(f"[ERROR]: Error connecting to the database. {error}")
        
        # Building the error message 
        errorMessage = {
            "message": "Error connecting to the database!", 
            "status": "error", 
            "statusCode": 500
        }
        
        # Returning the error message 
        return errorMessage; 