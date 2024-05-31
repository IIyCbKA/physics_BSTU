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

JOURNAL_SOCKET = 'journal'
EMPLOYEE_GROUP_SOCKET = 'employee_group'

# Роут на получение списка групп
@fastApiServer.get('/api/groups')
async def groupsList(user: Annotated[UserModel, Depends(getCurrentEmployee)]):
    try:
        groups: dict = getGroupsList()
        return JSONResponse(content=groups, status_code=200)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


# Роут на получение списка студентов группы
# Аргумент id - идентификатор группы
@fastApiServer.get('/api/group_students')
async def groupStudentsList(groupID: int,
                        user: Annotated[UserModel, Depends(getCurrentEmployee)]):
    try:
        groups: dict = getGroupStudentsList(groupID)
        return JSONResponse(content=groups, status_code=200)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


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

            sendData = {
                'work': {'file_id': work.work_file_id,
                         'filename': work.filename},
                'task_id': work.task_id, 'student_id': work.student_id
            }
            await sockets.sendMessageToUser('addWork', sendData,
                                            JOURNAL_SOCKET, user.userID)
            # добавить сокеты для преподавателя
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
                sendData = {
                    'work': {'file_id': work.work_file_id,
                             'filename': work.filename},
                    'task_id': work.task_id, 'student_id': work.student_id
                }

                deleteWorkFileObject(data.work_file_id, getFileType(work.filename))
                deleteWork(work)

                await sockets.sendMessageToUser('deleteWork', sendData,
                                                JOURNAL_SOCKET, user.userID)
                # добавить сокеты для преподавателя
                return JSONResponse(content={}, status_code=200)
            else:
                return JSONResponse(
                    content={'error': 'Work not exist'},
                    status_code=404)

    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


async def setGradeWorkCommon(user_status: str, require_status: str,
                             student_id: int, task_id,
                             grade_status: str | None = None,
                             author_id: int | None = None,
                             grade: str | None = None):
    try:
        if user_status == require_status:
            gradeInfo = setGrade(student_id, task_id,
                                 grade_status, author_id, grade)
            group_id = getStudentGroup(student_id).group_id
            sendData = {'task_id': task_id,
                'student_id': student_id, 'group_id': group_id, 'grade': {
                'grade': gradeInfo.grade, 'author': gradeInfo.author_id,
                'status': gradeInfo.status
            }}
            await sockets.sendMessageToUser('updateGrade', sendData,
                                            JOURNAL_SOCKET, student_id)
            sendData['work_files'] = getStudentWorkFiles(student_id,
                                                         task_id, grade_status)
            await sockets.sendMessageEmployeeGroup('updateGradeEmployee',
                                                   sendData, group_id)
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
        user.status, 'employee', data.student_id,
        data.task_id, GRADE_WORK_NONE, user.userID)


@fastApiServer.post('/api/works/setGrade')
async def setStudentFinishedGrade(
        user: Annotated[UserModel, Depends(getCurrentEmployee)],
        data: EmployeeWorkGradeModel):
    return await setGradeWorkCommon(
        user.status, 'employee',
        data.student_id, data.task_id, None, user.userID, data.grade)


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


def deleteAllTaskWorks(task_id: int):
    works = getAllTaskWorks(task_id)
    for work in works:
        deleteWorkFileObject(work.work_file_id, getFileType(work.filename))
        db.delete(work)
    grades = getAllTaskGrades(task_id)
    for grade in grades:
        db.delete(grade)
    db.commit()


@fastApiServer.post('/api/tasks/delete')
async def deleteTask(data: DeleteTaskData,
                     user: Annotated[UserModel, Depends(getCurrentEmployee)]):
    try:
        taskInfo = getTaskInfo(data.taskID)
        groups = getTaskGroupsIds(data.taskID)
        if taskInfo is not None:
            deleteAllTaskWorks(data.taskID)
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
@sockets.onSocket(JOURNAL_SOCKET)
async def journalSocket(ws: WebSocket,
                      token: str,
                      data: dict):
    user = (await getCurrentUserS(token))
    sockets.addSocket(user.userID, user.status, ws, JOURNAL_SOCKET)


# регистрирует преподавателя в просмотре групп
@sockets.onSocket(EMPLOYEE_GROUP_SOCKET)
async def employeeGroupSocket(ws: WebSocket,
                      token: str,
                      data: dict):
    user = (await getCurrentUserS(token))
    sockets.addSocketEmployeeGroup(user.userID, user.status,
                                   ws, data['group_id'])
