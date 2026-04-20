import socketio

# Initialize the AsyncServer here
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')