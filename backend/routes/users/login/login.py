#!/usr/bin/env python3 

# Importing the necessary modules 
from fastapi import APIRouter

# Creating an instance of the API router 
loginRouter = APIRouter()

# Creating the user login page 
@loginRouter.get("/")
async def loginUser():
    return {"message": "Login successful"}