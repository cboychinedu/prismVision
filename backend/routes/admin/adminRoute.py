#!/usr/bin/env python3 

# Importing the necessary modules 
from fastapi import APIRouter
from .login.login import loginRouter
# from .register.register import registerRouter
# from .dashboard.dashboard import dashboardRouter


# Creating the API router 
adminRouter = APIRouter()

# Including the user's route
adminRouter.include_router(loginRouter, prefix="/login", tags=["Login"])