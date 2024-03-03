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
    data: Dict = response.json()
    auth(data)

    return {}, 200


def auth(data: Dict) -> None:
    if data['success']:
        id: str = data['result']['user_info']['default_account_id']
        status: str = data['result']['user_info']['default_account_key']
        if status == 'student':
            pass
    else:
        fastApiServer.emit('incorrect_data')
