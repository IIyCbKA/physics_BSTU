from flask import request
from flask_socketio import emit
from server import app, socketio
from server.data.models import *
from server.data.db_session import db
from typing import Optional, Dict
import requests


@app.route("/api/login", methods=["POST"])
def loginBstu():
    data = request.json
    login_data = {
        'login': data.get('email'),
        'password': data.get('password')
    }

    response = requests.post('https://lk.bstu.ru/api/login', data=login_data)
    data: Dict = response.json()
    auth(data)

    return {}, 200


def auth(data: Dict) -> None:
    if data['success']:
        id: str = data['result']['user_info']['default_account_id']
        status: str = data['result']['user_info']['default_account_key']
        if status == 'student':
            studentInDB: Optional[Students] = searchStudent(id)
            if studentInDB is None:
                addStudent(data)

            group_name: str = data['result']['user_info']['accounts'][0]['data']['group']['name']
            groupInDB: Optional[Groups] = searchGroup(group_name)
            if groupInDB is None:
                addGroup(group_name)
    else:
        socketio.emit('incorrect_data')


def searchStudent(id: str) -> Optional[Students]:
    result = db.query(Students).filter_by(student_id=id).first()
    return result


def addStudent(data: Dict) -> None:
    db.add(Students(
        student_id=data['result']['user_info']['default_account_id'],
        surname=data['result']['user_info']['surname'],
        name=data['result']['user_info']['name'],
        patronymic=data['result']['user_info']['patronymic'],
        group_name=data['result']['user_info']['accounts'][0]['data']['group']['name']
    ))
    db.commit()


def searchGroup(name: str) -> Optional[Groups]:
    result = db.query(Groups).filter_by(group_name=name).first()
    return result


def addGroup(name: str) -> None:
    db.add(Groups(
        group_name=name
    ))
    db.commit()
