from server.application import fastApiServer
from server.data.functions.users import *

from fastapi.responses import JSONResponse
from typing import Dict
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

    return JSONResponse(content={}, status_code=200)


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
            groupID: int = getGroupID(groupName)
            if groupID == -1:
                addGroup(groupName)
            addStudent(userData.user_id, groupID)
        else:
            addEmployee(userData.user_id)
