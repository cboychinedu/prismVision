#!/usr/bin/env python3 

# Importing the necessary modules 
from fastapi import APIRouter
from .login.login import loginRouter
from .register.register import registerRouter
from .dashboard.dashboard import dashboardRouter

# Creating the API router 
usersRouter = APIRouter()

# Including the user's route
usersRouter.include_router(loginRouter, prefix="/login", tags=["Login"])
usersRouter.include_router(registerRouter, prefix="/register", tags=["Register"])
usersRouter.include_router(dashboardRouter, prefix="/dashboard", tags=["Dashboard"])