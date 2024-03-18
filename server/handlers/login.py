from server.application import fastApiServer
from server.data.functions.users import *
from server.settings.config import *

from fastapi import Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import Annotated
import requests


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@fastApiServer.post("/api/login")
async def loginBstu(data: LoginData):
    login_data = {
        'login': data.email,
        'password': data.password
    }

    response = requests.post('https://lk.bstu.ru/api/login',
                             data=login_data)

    requestResult: dict = response.json()

    if requestResult['success']:
        responseData: dict = auth(requestResult)
        return JSONResponse(content=responseData, status_code=200)

    return JSONResponse(content={'success': False}, status_code=401)


def auth(data: dict) -> dict:
    userData: UserModel = UserModel(
        userID=data['result']['user_info']['default_account_id'],
        surname=data['result']['user_info']['surname'],
        name=data['result']['user_info']['name'],
        patronymic=data['result']['user_info']['patronymic'],
        status=data['result']['user_info']['default_account_key']
    )

    if getUser(userData.userID) is None:
        addUser(userData)
        if userData.status == 'student':
            groupName: str = data['result']['user_info']['accounts'][0][
                'data']['group']['name']
            groupID: int = getGroupID(groupName)
            if groupID == -1:
                groupID = addGroup(groupName)
            addStudent(userData.userID, groupID)
        else:
            addEmployee(userData.userID)

    accessTokenExpires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    userToken: str = createAccessToken({'userID': userData.userID},
                                       accessTokenExpires)

    return {"success": True, "user": {"id": userData.userID},
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


@fastApiServer.post("/api/auth_token")
async def getCurrentUser(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        userID: int = payload.get("userID")
        if userID is None:
            raise credentials_exception
        tokenData = TokenData(userID=userID)
    except JWTError:
        raise credentials_exception
    userData: UserModel | None = getUserModel(tokenData.userID)
    if userData is None:
        raise credentials_exception

    accessTokenExpires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    userToken: str = createAccessToken({'userID': userData.userID},
                                       accessTokenExpires)

    return JSONResponse(content={"success": True,
                                 "user": {"id": userData.userID},
                                 "token": userToken}, status_code=200)
