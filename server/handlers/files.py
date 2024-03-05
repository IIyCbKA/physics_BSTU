from server.application import fastApiServer
from server.settings.config import *
from server.data.models import *
from server.data.db_session import db
from server.handlers.schemas import *

from fastapi.responses import FileResponse, JSONResponse
from fastapi import WebSocket, WebSocketDisconnect, Request, HTTPException
from starlette import status
from typing import Dict
import os


clients: Dict = {}


@fastApiServer.websocket("/ws")
async def websocket_processing(websocket: WebSocket):
    await websocket.accept()
    client_ip = websocket.client.host

    if client_ip not in clients.keys():
        await sendFilesNameList(websocket, '/')

    clients[client_ip] = websocket

    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        if client_ip in clients.keys():
            del clients[client_ip]
    except Exception as e:
        print(e)


# Отправляет на клиент новый список файлов
async def sendFilesNameList(websocket: WebSocket, path: str):
    filesName = os.listdir(PATH_FILES_DIRECTORY)
    await websocket.send_json(filesName)


# Отправляет на клиент новый список файлов
async def sendFilesNameListToAll(path: str):
    filesName = os.listdir(PATH_FILES_DIRECTORY)
    for websocket in clients.values():
        await websocket.send_json(filesName)


# Роут на получение списка файлов
# Аргумент path - путь к директории папки
@fastApiServer.post('/disk/{path:path}')
async def filesList(path: str, request: Request):
    path = '/' + path
    client_ip: str = request.client.host
    if client_ip in clients:
        await sendFilesNameList(clients[client_ip], path)
    # что-то вернуть


# Роут на добавление файла
# В параметрах filename - имя файла, path - путь к нему
# также передаётся один файл
@fastApiServer.post('/api/add_file')
async def addFile(data: AddFileData):
    filename: str = data.file.filename  # для бд
    # # добавить проверку уникальности имени (алгоритм)
    save_path = os.path.join(PATH_FILES_DIRECTORY, filename)
    with open(save_path, "wb") as f:
        f.write(await data.file.read())

    await sendFilesNameListToAll(data.path)
    # добавление в бд
    # emit на обновление списка
    return JSONResponse(content={}, status_code=200)


# Роут для удаления файла
# В параметрах filename - имя файла, path - путь к файлу
@fastApiServer.post('/api/delete_file')
async def deleteFile(data: DeleteFileData):
    os.remove(os.path.join(PATH_FILES_DIRECTORY, data.fileName))

    await sendFilesNameListToAll(data.path)

    return JSONResponse(content={}, status_code=200)

    # fullPath = os.path.join(PATH_FILES_DIRECTORY, fileName)
    # try:
    #     os.remove(fullPath)
    #     db.query(Files).filter_by(file_name=fileName).delete()
    #     db.commit()
    # except FileNotFoundError:
    #     pass


# Роут для загрузки файла
# В параметрах filename - имя файла и path - путь к нему
@fastApiServer.get('/api/file_download_request')
async def handleFileDownloadRequest(data: FileDownloadRequestData):
    print(data.filename)
    fpath = os.path.join(PATH_FILES_DIRECTORY, data.filename)
    print(fpath)
    return FileResponse(fpath, filename=data.filename)
    # fullPath = os.path.join(PATH_FILES_DIRECTORY, fileName)
    # try:
    #     with open(fullPath, 'rb') as file:
    #         fileContent = base64.b64encode(file.read()).decode('utf-8')
    #         emit('file', {
    #             'file_name': fileName,
    #             'file_content': fileContent
    #         })
    # except FileNotFoundError:
    #     pass
