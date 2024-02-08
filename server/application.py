import os;
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app, cors_allowed_origins=os.getenv('CLIENT_URL'))
app.config.from_object(__name__)
socketio = SocketIO(app, cors_allowed_origins=os.getenv('CLIENT_URL'))
