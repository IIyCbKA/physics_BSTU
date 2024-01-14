from flask import Flask, render_template, request, json, jsonify, make_response
from flask_cors import CORS, cross_origin

authUsers = {
}

SECRET_KEY = 'v7}efa{9I$FjOB9*D&6iiD52ugi;o:W'

app = Flask(__name__)
CORS(app,
     resources={r"/data/*": {"origins": "http://localhost:3000"}})
app.config.from_object(__name__)

import users

users.initSuperUser()
print(authUsers)