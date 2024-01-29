from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

SECRET_KEY = 'v7}efa{9I$FjOB9*D&6iiD52ugi;o:W'

app = Flask(__name__)
CORS(app)
app.config.from_object(__name__)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")
