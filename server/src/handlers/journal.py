from src.application import fastApiServer
from src.data.functions.journal import *
from src.handlers.login import (
    getCurrentEmployee, getCurrentUser, getCurrentUserS)
from src.storage.functions.storage \
    import (addFileToTaskStorage, deleteTaskFileObject, getAdditionFileObject,
            addFileToWorkStorage, deleteWorkFileObject, getWorkFileObject)
from src.strings.strings import getFileType
from src.handlers.schemas import DeleteTaskData
from src.handlers.schemas \
    import (UserModel, StudentWorkModel, EmployeeWorkReturnModel,
            EmployeeWorkGradeModel, WorkFileDeleteModel)
import json

from fastapi.responses import JSONResponse, StreamingResponse
from typing import Annotated
from fastapi import UploadFile, Form, Request, Depends, WebSocket, File
from src.socketManager import sockets

# Роут на получение списка групп
@fastApiServer.get('/api/groups')
async def groupsList(user: Annotated[UserModel, Depends(getCurrentEmployee)]):
    groups: dict = getGroupsList()
    return JSONResponse(content=groups, status_code=200)


# Роут на получение списка студентов группы
# Аргумент id - идентификатор группы
@fastApiServer.get('/api/group_students')
async def groupStudentsList(groupID: int,
                        user: Annotated[UserModel, Depends(getCurrentEmployee)]):
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
        if not addition['remote']:
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


async def getUserTasks(user: UserModel) -> dict:
    if user.status == 'employee':
        tasks = getAllTasks()
    elif user.status == 'student':
        tasks = getGroupTasks(getStudentGroupID(user.userID))
    else:
        tasks = []

    result = convertDBTasksToDict(tasks)
    if user.status == 'student':
        addWorksInfoToTasksInfo(user.userID, result)

    return result


# Роут на добавление файла к работе студента
@fastApiServer.post('/api/works/add_file')
async def addFileToWork(user: Annotated[UserModel, Depends(getCurrentUser)],
                        file: Annotated[UploadFile, File()],
                        task_id: Annotated[int, Form()]):
    try:
        if user.status == 'student':
            work = addWork(user.userID, task_id, file.filename)
            if not addFileToWorkStorage(
                    file,
                    work.work_file_id,
                    getFileType(work.filename)):
                deleteWork(work)
                return JSONResponse(
                    content={'error': 'Work not added'},
                    status_code=500)

            # добавить сокеты?
            return JSONResponse(content={}, status_code=200)

    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


# Роут на удаление файла из работы студента
@fastApiServer.post('/api/works/delete_file')
async def deleteFileFromWork(user: Annotated[UserModel, Depends(getCurrentUser)],
                             data: WorkFileDeleteModel):
    try:
        if user.status == 'student':
            work = getWork(data.work_file_id)
            if work is not None:
                deleteWorkFileObject(data.work_file_id, getFileType(work.filename))
                deleteWork(work)
                # добавить сокеты
                return JSONResponse(content={}, status_code=200)
            else:
                return JSONResponse(
                    content={'error': 'Work not exist'},
                    status_code=404)

    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


async def setGradeWorkCommon(user_status: str, require_status: str,
                             student_id: int, task_id, grade: str,
                             author_id: int | None = None):
    try:
        if user_status == require_status:
            setGrade(student_id, task_id, grade, author_id)
            return JSONResponse(content={}, status_code=200)
        else:
            JSONResponse(content={'Error': f'user is not a {require_status}'},
                         status_code=403)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


@fastApiServer.post('/api/works/handIn')
async def handInTheWork(user: Annotated[UserModel, Depends(getCurrentUser)],
                        data: StudentWorkModel):
    return await setGradeWorkCommon(user.status, 'student',
                                    user.userID, data.task_id, GRADE_WORK_SEND)


@fastApiServer.post('/api/works/return/student')
async def returnOwnWork(user: Annotated[UserModel, Depends(getCurrentUser)],
                        data: StudentWorkModel):
    return await setGradeWorkCommon(user.status, 'student',
                                    user.userID, data.task_id, GRADE_WORK_NONE)


@fastApiServer.post('/api/works/return/employee')
async def returnStudentWork(
        user: Annotated[UserModel, Depends(getCurrentEmployee)],
        data: EmployeeWorkReturnModel):
    return await setGradeWorkCommon(
        user.status, 'employee',
        data.student_id, data.task_id, GRADE_WORK_NONE, user.userID)


@fastApiServer.post('/api/works/setGrade')
async def setStudentFinishedGrade(
        user: Annotated[UserModel, Depends(getCurrentEmployee)],
        data: EmployeeWorkGradeModel):
    if data.grade not in POSSIBLE_GRADES:
        return JSONResponse(content={'Error': 'incorrect grade'},
                            status_code=400)
    return await setGradeWorkCommon(
        user.status, 'employee',
        data.student_id, data.task_id, data.grade, user.userID)


async def sendAllTasks(group_id: int):
    tasks = getAllTasks()


# Роут на получение списка групп
@fastApiServer.get('/api/tasks/all')
async def allTasks(user: Annotated[UserModel, Depends(getCurrentUser)],
                   request: Request):
    return JSONResponse(content=await getUserTasks(user), status_code=200)


# Роут на добавления задания
@fastApiServer.post('/api/tasks/add')
async def addTask(
        user: Annotated[UserModel, Depends(getCurrentEmployee)],
        files: List[UploadFile] = [],
        title: str = Form(...),
        description: str = Form(default=''),
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

        taskSendData = convertDBTaskToDict(task)
        await sockets.sendMessageGroups('addTask', taskSendData, groups)
        await sockets.sendMessageEmpoyees('addTask', taskSendData)

        return JSONResponse(content={}, status_code=200)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


# Роут на изменения задания
@fastApiServer.post('/api/tasks/update')
async def updateTask(
        user: Annotated[UserModel, Depends(getCurrentEmployee)],
        id: int = Form(...),
        files: List[UploadFile] = [],
        title: str = Form(...),
        description: str = Form(default=''),
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

        taskSendData = convertDBTaskToDict(task)
        await sockets.sendMessageGroups('updateTask', taskSendData, groups)
        await sockets.sendMessageEmpoyees('updateTask', taskSendData)

        return JSONResponse(content={}, status_code=200)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


@fastApiServer.post('/api/tasks/delete')
async def deleteTask(data: DeleteTaskData,
                     user: Annotated[UserModel, Depends(getCurrentEmployee)]):
    try:
        taskInfo = getTaskInfo(data.taskID)
        groups = getTaskGroupsIds(data.taskID)
        if taskInfo is not None:
            for addition_id in taskInfo.additions_id:
                addition = getAddition(addition_id)
                if addition is not None:
                    if addition.addition_type == 'file':
                        deleteTaskFileObject(
                            addition_id, getFileType(addition.addition_title))

                    deleteAddition(addition)

            deleteTaskOnlyFromDB(taskInfo)

            await sockets.sendMessageGroups('deleteTask', data.taskID, groups)
            await sockets.sendMessageEmpoyees('deleteTask', data.taskID)

            return JSONResponse(content={}, status_code=200)

        return JSONResponse(content={'Error': 'Task not found'},
                            status_code=404)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


@fastApiServer.get('/api/works/download/{fileID}')
async def handleWorkFileDownloadRequest(
        fileID: str, user: Annotated[UserModel, Depends(getCurrentUser)]):
    async def file_iterator():
        yield data

    try:
        work_file_id = int(fileID)
        work = getWork(work_file_id)
        if work is not None:
            # получаем файл из хранилища, проверяем, что он существует
            file = getWorkFileObject(work_file_id, getFileType(work.filename))
            if file is not None:
                data = file.read()

                return StreamingResponse(file_iterator())

        return JSONResponse(content={'Error': 'File not found'},
                            status_code=404)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


@fastApiServer.get('/api/journal/download/{fileID}')
async def handleJournalFileDownloadRequest(
        fileID: str, user: Annotated[UserModel, Depends(getCurrentUser)]):
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


# регистрирует пользователя в хранилище
@sockets.onSocket('journal')
async def journalSocket(ws: WebSocket,
                      token: str,
                      data: dict):
    user = (await getCurrentUserS(token))
    sockets.addSocket(user.userID, user.status, ws)

