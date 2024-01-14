from flask import Flask, render_template, request, json, jsonify, make_response
from application import app

# Хранит данные следующим образом:
# Ключами выступают категории(строка) данных
# Значение - это словарь, ключи которого
# целые ID
data = {
    'groups' : {
        1: {'title': 'ПИ-211'},
        2: {'title': 'ПИ-212'},
        3: {'title': 'ПИ-221'},
        4: {'title': 'ПИ-222'},
        5: {'title': 'ПИ-231'},
        6: {'title': 'ПИ-232'},
        7: {'title': 'ПИ-233'},
    }
}

SECTION_TITLE = 'section'
ID_TITLE = 'id'
RESULT_TITLE = 'result'

def retRes(result):
    return jsonify({RESULT_TITLE: result})

@app.route("/data/post", methods=["POST", "OPTIONS"])
def postData():
    if request.method == "POST":
        val = request.json
        section = val[SECTION_TITLE]
        del val[SECTION_TITLE]
        id = int(val[ID_TITLE])
        del val[ID_TITLE]

        if section not in data.keys():
            data[section] = {}
        data[section][id] = val

        return retRes(True)

    return retRes(False)


@app.route("/data/get", methods=["POST"])
def getData():
    if request.method == "POST":
        section = request.json.get(SECTION_TITLE)
        id = int(request.json.get(ID_TITLE))

        if section not in data.keys() or id not in data[section].keys():
            return retRes(False)

        return jsonify(data[section][id])

    return retRes(False)


@app.before_request
def bfr_user():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        response.headers.add('Access-Control-Request-Method', 'GET, POST')
        response.headers.add('Access-Control-Request-Headers', 'Content-Type')
        return response



@app.after_request
def ar_user(response):
    if request.method != "OPTIONS" and response.status_code == 200:
        #if response.
        if RESULT_TITLE not in response.json.keys():
            newData = response.get_json()
            newData.update({RESULT_TITLE: True})
            response = jsonify(newData)

        response.headers['Content-Type'] = 'application/json'
    return response


@app.teardown_request
def tr_user(response):
    return response


@app.route('/')
def index():
    return render_template()
