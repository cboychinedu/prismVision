# Importing the necessary modules 
import time 
import logging
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware 

# Configure logging to write to a file
logging.basicConfig(
    filename="logs/log.csv",
    level=logging.INFO,
    format="%(asctime)s,%(levelname)s,%(message)s",
)

# Creating the logging object 
logger = logging.getLogger(__name__)

# Create Middleware to log request/response
class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Starting the timer 
        start_time = time.time()
        
        # Log request details
        url = request.url.path
        method = request.method
        logger.info(f"{method},{url},{request.client.host}")
        # logger.info(f"Method: {method},Path: {url},IP: {request.client.host}")
        
        # Save the first request, then wait for the response
        response = await call_next(request)
        
        # Log response details
        process_time = time.time() - start_time
        logger.info(f"{url},{response.status_code},{process_time:.2f}")
        # logger.info(f"Path: {url},Status: {response.status_code},Duration: {process_time:.2f}s")
        
        # Return the response 
        return response