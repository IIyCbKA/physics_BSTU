from server.application import fastApiServer
from server.data.models import *
from server.data.db_session import db
from typing import Optional, Dict
from starlette.websockets import WebSocket
from server.handlers.schemas import *
import requests


@fastApiServer.post("/api/login")
async def loginBstu(data: LoginData):
    login_data = {
        'login': data.email,
        'password': data.password
    }

    response = requests.post('https://lk.bstu.ru/api/login', data=login_data)
    reqResult: Dict = response.json()
    if reqResult['success']:
        auth(reqResult)

    return {}, 200


def auth(data: Dict) -> None:
    userData: UserModel = UserModel(
        user_id=data['result']['user_info']['default_account_id'],
        surname=data['result']['user_info']['surname'],
        name=data['result']['user_info']['name'],
        patronymic=data['result']['user_info']['patronymic'],
        status=data['result']['user_info']['default_account_key']
    )

    if not searchUser(userData.id):
        addUser(userData)

        if userData.status == 'student':
            groupName: str = data['result']['user_info']['accounts'][0]
            groupID: int = searchGroup(groupName)
            if groupID == -1:
                addGroup(groupName)
            addStudent(userData.user_id, groupID)
        else:
            addEmployee(userData.user_id)


def searchUser(id: str) -> bool:
    result = db.query(Users).filter_by(user_id=id).first()
    return result is True


def searchGroup(name: str) -> int:
    result = db.query(Groups).filter_by(group_name=name).first()
    return result[0] if result else -1


def addUser(data: UserModel) -> None:
    db.add(Users(
        user_id=data.user_id,
        surname=data.surname,
        name=data.name,
        patronymic=data.patronymic,
        status=data.status
    ))
    db.commit()


def addGroup(groupName: str) -> None:
    db.add(Groups(
        group_name=groupName
    ))
    db.commit()


def addStudent(studentID: int, groupID: int) -> None:
    db.add(Students(
        student_id=studentID,
        group_id=groupID
    ))
    db.commit()


def addEmployee(employeeID: int) -> None:
    db.add(Employees(
        employee_id=employeeID
    ))
    db.commit()
