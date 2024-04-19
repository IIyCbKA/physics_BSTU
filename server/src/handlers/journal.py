from src.application import fastApiServer
from src.data.functions.files import *
from src.data.functions.journal import *
from src.handlers.schemas import *
from fastapi.responses import JSONResponse
from fastapi import Request, HTTPException
from typing import Annotated
from fastapi import Depends
from src.handlers.login import getCurrentEmployee
from src.socketManager import sockets


# Роут на получение списка груп
@fastApiServer.get('/api/groups')
async def groupsList(user: Annotated[dict, Depends(getCurrentEmployee)]):
    groups: dict = getGroupsList()
    return JSONResponse(content=groups, status_code=200)


# Роут на получение списка студентов группы
# Аргумент id - идентификатор группы
@fastApiServer.get('/api/group_students')
async def groupStudentsList(groupID: int,
                        user: Annotated[dict, Depends(getCurrentEmployee)]):
    groups: dict = getGroupStudentsList(groupID)
    return JSONResponse(content=groups, status_code=200)
