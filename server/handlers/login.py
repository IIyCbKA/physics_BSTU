from server.application import fastApiServer
from server.data.functions.users import *
from server.settings.config import *

from fastapi.responses import JSONResponse
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import Dict
import requests


@fastApiServer.post("/api/login")
async def loginBstu(data: LoginData):
    login_data = {
        'login': data.email,
        'password': data.password
    }

    response = requests.post('https://lk.bstu.ru/api/login', data=login_data)
    requestResult: Dict = response.json()

    if requestResult['success']:
        responseData: dict = auth(requestResult)
        return JSONResponse(content={responseData}, status_code=200)

    return JSONResponse(content={'success': False}, status_code=401)


def auth(data: Dict) -> Dict:
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

    accessTokenExpires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    userToken: str = createAccessToken({}, accessTokenExpires)

    return {"success": True, "user": {"id": userData.user_id},
            "token": userToken}


def createAccessToken(data: dict, expiresDelta: timedelta | None = None):
    toEncode = data.copy()
    if expiresDelta:
        expire = datetime.now(timezone.utc) + expiresDelta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    toEncode.update({"exp": expire})
    encodedJWT = jwt.encode(toEncode, SECRET_KEY, algorithm=ALGORITHM)
    return encodedJWT
