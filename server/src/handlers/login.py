from src.application import fastApiServer
from src.data.functions.users import *
from src.settings.config import *
from src.data.functions.journal import getStudentGroup

from fastapi import Depends, HTTPException, WebSocketException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import Annotated
import requests
from src.socketManager import sockets


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def getUserInfo(userData: UserModel):
    return {"id": userData.userID,
            "status": userData.status,
            "name": userData.name,
            "surname": userData.surname,
            "patronymic": userData.patronymic}

def getUserInfoWithGroup(userData: UserModel):
    userInfo = getUserInfo(userData)
    if userData.status == 'student':
        userInfo['group'] = getStudentGroup(
            userData.userID).group_name
    return userInfo


@fastApiServer.post("/token")
async def login(data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    login_data = {
        'login': data.username,
        'password': data.password
    }

    response = requests.post('https://lk.bstu.ru/api/login',
                             data=login_data)

    requestResult: dict = response.json()
    # requestResult: dict = {'success': True}

    if requestResult['success']:
        responseData: dict = auth(requestResult)
        responseData['access_token'] = responseData['token']
        responseData['token_type'] = 'bearer'
        return JSONResponse(content=responseData, status_code=200)

    raise HTTPException(
        status_code=401,
        detail="Could not login",
    )


@fastApiServer.post("/api/login")
async def loginBstu(data: LoginData):
    login_data = {
        'login': data.email,
        'password': data.password
    }

    response = requests.post('https://lk.bstu.ru/api/login',
                             data=login_data)

    requestResult: dict = response.json()
    # requestResult: dict = {'success': True}

    if requestResult['success']:
        responseData: dict = auth(requestResult)
        return JSONResponse(content=responseData, status_code=200)

    raise HTTPException(
        status_code=401,
        detail="Could not login",
    )


def auth(data: dict) -> dict:
    userData: UserModel = UserModel(
        userID=data['result']['user_info']['default_account_id'],
        surname=data['result']['user_info']['surname'],
        name=data['result']['user_info']['name'],
        patronymic=data['result']['user_info']['patronymic'],
        status=data['result']['user_info']['default_account_key']
    )
    # userData: UserModel = UserModel(
    #     userID=123123,
    #     surname='surname',
    #     name='name',
    #     patronymic='patronymic',
    #     status='student'
    # )

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
    refreshTokenExpires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    userToken: str = createToken({'userID': userData.userID},
                                 accessTokenExpires)
    refreshToken: str = createToken({'userID': userData.userID},
                                    refreshTokenExpires)

    return {"success": True,
            "user": getUserInfoWithGroup(userData),
            "token": userToken,
            "refresh_token": refreshToken}


def createToken(data: dict, expiresDelta: timedelta | None = None):
    toEncode = data.copy()
    if expiresDelta:
        expire = datetime.now(timezone.utc) + expiresDelta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    toEncode.update({"exp": expire})
    encodedJWT = jwt.encode(toEncode, SECRET_KEY, algorithm=ALGORITHM)
    return encodedJWT


async def getCurrentUserCommon(token: str,
                               credentials_exception: Exception):
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

    return userData


async def getCurrentUser(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials by token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    return await getCurrentUserCommon(token, credentials_exception)

async def getCurrentEmployee(userInfo: Annotated[UserModel, Depends(getCurrentUser)]):
    credentials_exception = HTTPException(
        status_code=403,
        detail="User is not employee",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if userInfo.status != "employee":
        raise credentials_exception

    return userInfo

async def getCurrentUserRefresh(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not update refresh token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    userData = await getCurrentUserCommon(token, credentials_exception)

    accessTokenExpires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    userToken: str = createToken({'userID': userData.userID},
                                 accessTokenExpires)

    return {'user': getUserInfoWithGroup(userData), 'token': userToken}


@fastApiServer.get("/api/auth_token")
async def getAuthToken(userData: Annotated[UserModel, Depends(getCurrentUser)]):
    if userData != 'null':
        userInfo = {'user': getUserInfoWithGroup(userData)}
        return JSONResponse(content=userInfo, status_code=200)
    else:
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials by token",
        )


@fastApiServer.get("/api/auth_refresh_token")
async def getAuthRefreshToken(
        userInfo: Annotated[dict, Depends(getCurrentUserRefresh)]):
    if userInfo != 'null':
        refreshTokenExpires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
        newRefreshToken: str = createToken({'userID':
                                            userInfo['user']['id']},
                                           refreshTokenExpires)
        userInfo['refresh_token'] = newRefreshToken
        return JSONResponse(content=userInfo, status_code=200)
    else:
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials by refresh token",
        )

async def getCurrentUserS(token: str):
    e = WebSocketException(code=status.WS_1008_POLICY_VIOLATION)
    return await getCurrentUserCommon(token, e)


@sockets.onSocket('auth')
async def authSocket(token: dict):
    print()




