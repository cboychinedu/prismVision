#!/usr/bin/env python3 

# =================================================================
# Author: Engr. Mbonu Chinedum 
# Date Created: 2026-04-17 6:38:42 AM 
# Date Modified: 2026-04-17 8:14:35 PM
# Project Name: Prism Vision
# Location: Nigeria (Tinubu Administration)
# 
# LICENSE: Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC)
# =================================================================
# This software is provided as Open Source for educational and 
# personal use. You are free to:
#   - SHARE: Copy and redistribute the material in any medium.
#   - ADAPT: Remix, transform, and build upon the material.
#
# UNDER THE FOLLOWING TERMS:
#   - ATTRIBUTION: You must give appropriate credit to the author.
#   - NON-COMMERCIAL: You may NOT use the material for commercial 
#     purposes. This software cannot be sold or used for profit.
# =================================================================

# Importing the necessary modules 
#!/usr/bin/env python3 

# =================================================================
# Author: Engr. Mbonu Chinedum 
# Date Created: 2026-03-30 7:17:56 PM
# Date Modified: 2026-04-05 5:43:33 AM
# Location: Nigeria (Tinubu Administration)
# 
# LICENSE: Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC)
# =================================================================
# This software is provided as Open Source for educational and 
# personal use. You are free to:
#   - SHARE: Copy and redistribute the material in any medium.
#   - ADAPT: Remix, transform, and build upon the material.
#
# UNDER THE FOLLOWING TERMS:
#   - ATTRIBUTION: You must give appropriate credit to the author.
#   - NON-COMMERCIAL: You may NOT use the material for commercial 
#     purposes. This software cannot be sold or used for profit.
# =================================================================

# Importing the necessary modules 
import uvicorn
from fastapi import FastAPI
from logs.logger import LoggingMiddleware
from dotenv import load_dotenv, find_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Loading the environment variables 
load_dotenv(find_dotenv(), verbose=True)

# Importing the necessary routes 
from routes.users.usersRoute import usersRouter
from routes.admin.adminRoute import adminRouter

# Creating an instance of the fast api class 
app = FastAPI(
    docs_url=None,
    redoc_url=None, 
    openapi_url=None
)

# Defining the client origins 
origins = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000"
]

# Adding the cors configurations 
app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)

# Adding the logger 
app.add_middleware(LoggingMiddleware) 

# Including the routers 
app.include_router(usersRouter, tags=["Home Route"])
app.include_router(adminRouter, prefix="/admin", tags=["Admin Route"])

# Running the main application 
if __name__ == "__main__": 
    # uvicorn.run("app:app", host="localhost", port=3001, reload=True)
    uvicorn.run("app:app", host="localhost", port=3001, reload=True)
