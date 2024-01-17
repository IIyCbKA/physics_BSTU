from flask import Flask
from flask_cors import CORS

SECRET_KEY = 'v7}efa{9I$FjOB9*D&6iiD52ugi;o:W'

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.config.from_object(__name__)