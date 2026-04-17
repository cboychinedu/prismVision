#!/usr/bin/env python3 

# Importing the necessary modules 
from fastapi import APIRouter

# Creating an instance of the API router 
dashboardRouter = APIRouter() 

# Creating the dashboard home route 
@dashboardRouter.get("/")
def dashboardHome(): 
    return { "message": "Dashboard home" }