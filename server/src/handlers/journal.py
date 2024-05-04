from src.application import fastApiServer
from src.data.functions.journal import *
from src.handlers.login import getCurrentEmployee, getCurrentUser
from src.storage.functions.storage import getAdditionFileObject
from src.storage.functions.storage \
    import addFileToTaskStorage, deleteTaskFileObject
from src.strings.strings import getFileType
from src.handlers.schemas import DeleteTaskData
import json

from fastapi.responses import JSONResponse, StreamingResponse
from typing import Annotated
from fastapi import File, UploadFile, Form, Request, Depends
from src.socketManager import sockets

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


def updateAdditions(task: Tasks, files: List[UploadFile], newVals: List[dict]):
    oldSavedIdsLs = []
    for val in newVals:
        if val['remote']:
            oldSavedIdsLs.append(val['id'])
    oldSavedIdsS = set(oldSavedIdsLs)
    for oldId in task.additions_id:
        if oldId not in oldSavedIdsS:
            addition = getAddition(oldId)
            deleteTaskFileObject(oldId, getFileType(addition.addition_title))
            deleteAddition(addition)

    newAdds = []
    for addition in newVals:
        if addition['remote'] == False:
            newAdds.append(addition)
    additions = addTaskAdditionsToDB(newAdds)

    for i in range(len(newAdds)):
        if newAdds[i]['type'] == 'file':
            if not addFileToTaskStorage(files[newAdds[i]['fileIndex']],
                                        additions[i].addition_id,
                                        getFileType(additions[i].addition_title)):
                deleteTaskAdditionsFromDB(getIdAdditionList(additions))
                return JSONResponse(
                    content={'error': 'impossible to add addition file'},
                    status_code=500)

    task.additions_id = oldSavedIdsLs + getIdAdditionList(additions)


async def getUserTasks(user: dict) -> dict:
    if user['user']['status'] == 'employee':
        tasks = getAllTasks()
    elif user['user']['status'] == 'student':
        tasks = getGroupTasks(getStudentGroup(user['user']['id']))
    else:
        tasks = []

    result = convertDBTasksToDict(tasks)

    return result


async def sendAllTasks(group_id: int):
    tasks = getAllTasks()


# Роут на получение списка групп
@fastApiServer.get('/api/tasks/all')
async def allTasks(user: Annotated[dict, Depends(getCurrentUser)],
                   request: Request):
    if user['user']['status'] == 'employee':
        sockets.addPath(
            request.client.host,
            'employee')

    elif user['user']['status'] == 'student':
        sockets.addPath(
            request.client.host,
            'group' + getStudentGroup(user['user']['id']))

    return JSONResponse(content=await getUserTasks(user), status_code=200)


# Роут на добавления задания
@fastApiServer.post('/api/tasks/add')
async def addTask(
        user: Annotated[dict, Depends(getCurrentEmployee)],
        files: List[UploadFile] = [],
        title: str = Form(...),
        description: str = Form(...),
        groups: str = Form(...),
        additions: str = Form(...)):
    try:
        if isTaskExists(title):
            return JSONResponse(
                content={'error': 'Task with this name already exist'},
                status_code=409)

        groups = list(map(int, groups.split(',')))
        additions = json.loads(additions)
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

        task = addTaskToDB(title, description, additions_db)
        addTaskGroups(task.task_id, groups)


        return JSONResponse(content={}, status_code=200)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


# Роут на изменения задания
@fastApiServer.post('/api/tasks/update')
async def updateTask(
        user: Annotated[dict, Depends(getCurrentEmployee)],
        id: int = Form(...),
        files: List[UploadFile] = [],
        title: str = Form(...),
        description: str = Form(...),
        groups: str = Form(''),
        additions: str = Form(...)):
    try:
        task = getTaskInfo(id)
        if task is None:
            return JSONResponse(
                content={'error': 'Task not exist'},
                status_code=404)

        if task.task_name != title:
            if isTaskExists(title):
                return JSONResponse(
                    content={'error': 'Task with this name already exist'},
                    status_code=409)

        groups = list(map(int, groups.split(','))) if len(groups) else []
        additions = json.loads(additions)
        updateAdditions(task, files, additions)

        task.task_description = description
        task.task_name = title
        updateGroups(task.task_id, groups)

        return JSONResponse(content={}, status_code=200)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


@fastApiServer.post('/api/tasks/delete')
async def deleteTask(data: DeleteTaskData,
                     user: Annotated[dict, Depends(getCurrentEmployee)]):
    try:
        taskInfo = getTaskInfo(data.taskID)
        if taskInfo is not None:
            for addition_id in taskInfo.additions_id:
                addition = getAddition(addition_id)
                if addition is not None:
                    if addition.addition_type == 'file':
                        deleteTaskFileObject(
                            addition_id, getFileType(addition.addition_title))

                    deleteAddition(addition)

            deleteTaskOnlyFromDB(taskInfo)

            return JSONResponse(content={}, status_code=200)

        return JSONResponse(content={'Error': 'Task not found'},
                            status_code=404)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


@fastApiServer.get('/api/journal/download/{fileID}')
async def handleJournalFileDownloadRequest(fileID: str, user: Annotated[dict, Depends(getCurrentUser)]):
    async def file_iterator():
        yield data

    try:
        fileID = int(fileID)
        fileModel = getAdditionFileInfo(fileID)
        # получаем инфу о файле из бд, проверяем, что он типа file
        if (fileModel is not None) and (fileModel.fileType != 'folder'):
            # получаем файл из хранилища, проверяем, что он существует
            file = getAdditionFileObject(fileModel.fileID, fileModel.fileType)
            if file is not None:
                data = file.read()

                return StreamingResponse(file_iterator())

        return JSONResponse(content={'Error': 'File not found'},
                            status_code=404)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)
