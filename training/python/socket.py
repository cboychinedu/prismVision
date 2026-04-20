### pip install "python-socketio[asyncio]" 

import socketio
from fastapi import FastAPI
import numpy as np
import cv2

# Create a Socket.IO server
# cors_allowed_origins="*" allows your Next.js app to connect
sio = socketio.AsyncServer(async_mode='asio', cors_allowed_origins='*')
app = FastAPI()
# Wrap FastAPI with the Socket.IO middleware
socket_app = socketio.ASGIApp(sio, app)

@sio.event
async def connect(sid, environ):
    print(f"Connected: {sid}")

@sio.on("send_image")
async def handle_image(sid, data):
    # 'data' arrives as bytes from the frontend
    nparr = np.frombuffer(data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img is not None:
        h, w, _ = img.shape
        # Send a confirmation back to the specific client
        await sio.emit("response", {"message": f"Processed {w}x{h} image"}, to=sid)

# Run with: uvicorn main:socket_app --reload