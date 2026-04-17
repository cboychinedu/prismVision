#!/usr/bin/env python3 

# Importing the necessary modules 
from fastapi import APIRouter

# Creating an instance of the API router 
registerRouter = APIRouter()

# Creating the home route 
@registerRouter.get("/")
async def registerUser():
    return {"message": "User registered"}