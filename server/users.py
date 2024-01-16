from flask import request
from application import app
from routes import reternResult


@app.route("/api/login", methods=["POST"])
def login():
    req_data = request.get_json()
    _mail = req_data.get('mail')
    _password = req_data.get('password')

    return reternResult(True), 200

