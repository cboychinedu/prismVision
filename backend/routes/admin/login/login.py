#!/usr/bin/env python3 

# Importing the necessary modules 
from fastapi import APIRouter

# Creating an instance of the API router 
loginRouter = APIRouter()

# Creating the admin login page 
@loginRouter.get("/")
async def loginUser():
    return {"message": "Admin Login successful"}