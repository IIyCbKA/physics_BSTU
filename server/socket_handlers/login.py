from server.data.models import *
from server.data.db_session import db
from typing import Optional
from server import socketio
from flask_socketio import emit
import requests


@socketio.on('login')
def login(data):
    _email: str = data.get('email')
    _password: str = data.get('password')
    print(_email)
    #loginBstu(_email, _password)


def loginBstu(login: str, password: str) -> None:
    login_data = {
        'login': login,
        'password': password
    }

    response = requests.post('https://lk.bstu.ru/api/login', data=login_data)
    data: dict = response.json()
    auth(data)


def auth(data: dict) -> None:
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


def searchStudent(id: str) -> Optional[Students]:
    result = db.query(Students).filter_by(student_id=id).first()
    return result


def addStudent(data: dict) -> None:
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
