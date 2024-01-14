import jwt
from datetime import datetime, timedelta
from flask import Flask, render_template, request, json, jsonify, make_response
from application import app, authUsers, SECRET_KEY
from routes import retRes
import bcrypt


class User:
    def __init__(self, mail, salt, password, role="student"):
        self.mail = mail
        self.password = password
        self.role = role
        self.salt = salt
        self.tokenEnd = datetime.utcnow() + timedelta(minutes=30)


def hashPassword(password, salt):
    return bcrypt.kdf(password.encode('utf-8'), salt, 32, 200)


def initSuperUser():
    user1_password = 'X$o{d}P-qr%3s!t"0|f8`cz,U.5r][/4Pf'
    salt = bcrypt.gensalt(30, b'2a')
    key = hashPassword(user1_password, salt)
    authUsers['superUser'] = User('superUser', salt, key, 'admin')


def checkPassword(user: User, password: str):
    return hashPassword(password, user.salt) == user.password


@app.route("/api/login", methods=["POST"])
def login():
    req_data = request.get_json()
    _mail = req_data.get('mail')
    _password = req_data.get('password')

    userExist = _mail in authUsers.keys()

    if not userExist:
        # Реализовать:
        # делаем запрос к БД и пытаемся найти пользователя там
        # при успехе добавляем в словарь авторизованных пользователей
        # при неудаче пытаемся авторизоваться на БГТУ
        # если неудачно, то возвращаем отрицательный результат
        # иначе регистрируем пользователя в БД и добавляем в словарь
        # authUsers и возвращаем JWT-токен авторизованного пользователя
        #
        return retRes(False), 400

    if not checkPassword(authUsers[_mail], _password):
        return retRes(False), 400

    token = jwt.encode({'mail': _mail}, SECRET_KEY)
    return {"token": token}, 200





