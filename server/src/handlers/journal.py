from src.application import fastApiServer
from src.data.functions.journal import *
from src.handlers.login import getCurrentEmployee
from src.socketManager import sockets

from fastapi.responses import JSONResponse
from typing import Annotated
from fastapi import Depends


# Роут на получение списка групп
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
