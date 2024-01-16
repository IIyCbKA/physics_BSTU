from flask import request, jsonify
from application import app

RESULT_TITLE = 'result'


def reternResult(result):
    return jsonify({RESULT_TITLE: result})


@app.after_request
def ar_user(response):
    if request.method != "OPTIONS" and response.status_code == 200:
        if RESULT_TITLE not in response.json.keys():
            newData = response.get_json()
            newData.update({RESULT_TITLE: True})
            response = jsonify(newData)

        response.headers['Content-Type'] = 'application/json'
    return response

