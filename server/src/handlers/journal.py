from src.application import fastApiServer
from src.data.functions.journal import *
from src.handlers.login import getCurrentEmployee
from src.socketManager import sockets
from src.storage.functions.storage import addFileToTaskStorage
from src.strings.strings import getFileType
import json

from fastapi.responses import JSONResponse
from typing import Annotated
from fastapi import File, UploadFile, Form, Request, Depends

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


# Роут на добавления задания
@fastApiServer.post('/api/tasks/add')
async def addTask(
        user: Annotated[dict, Depends(getCurrentEmployee)],
        files: List[UploadFile],
        title: str = Form(...),
        description: str = Form(...),
        additions: str = Form(...)):
    try:
        if isTaskExists(title):
            return JSONResponse(
                content={'error': 'Task with this name already exist'},
                status_code=409)

        additions: dict = json.loads(additions)
        additions_db = addTaskAdditionsToDB(additions)

        for i in range(len(additions_db)):
            if additions_db[i].addition_type == 'file':
                if not addFileToTaskStorage(
                        files[additions[i]['fileIndex']],
                        additions_db[i].addition_id,
                        getFileType(additions_db[i].addition_title)):
                    deleteTaskAdditionsFromDB(getIdAdditionList(additions_db))
                    return JSONResponse(
                        content={'error': 'Task not added'},
                        status_code=500)

        addTaskToDB(title, description, additions_db)


        return JSONResponse(content={}, status_code=200)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)
