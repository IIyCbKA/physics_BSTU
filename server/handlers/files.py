from server.application import fastApiServer
from server.settings.config import *
from server.data.models import *
from server.data.db_session import db
from fastapi.responses import FileResponse
from fastapi import WebSocket, WebSocketDisconnect, Request, File, UploadFile, Form
from typing import Dict, Annotated
import os


clients: Dict = {}


@fastApiServer.websocket("/ws")
async def websocket_processing(websocket: WebSocket):
    await websocket.accept()
    client_ip = websocket.client.host
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
@fastApiServer.get('/api/get_files/')
async def filesList(path: str, request: Request):
    client_ip = request.client.host
    if client_ip in clients:
        await sendFilesNameList(clients[client_ip], path)
        return {}, 200
    else:
        return {"error": "Client not connected"}, 400


# Роут на добавление файла
# В параметрах filename - имя файла, path - путь к нему
# также передаётся один файл
@fastApiServer.post('/api/add_file')
async def addFile(file: Annotated[UploadFile, File()],
                  path: Annotated[str, Form()]):
    filename: str = file.filename  # для бд
    # # добавить проверку уникальности имени (алгоритм)
    save_path = os.path.join(PATH_FILES_DIRECTORY, filename)
    with open(save_path, "wb") as f:
        f.write(await file.read())

    await sendFilesNameListToAll(path)
    # добавление в бд
    # emit на обновление списка
    return {}, 200


# Роут для удаления файла
# В параметрах filename - имя файла, path - путь к файлу
@fastApiServer.post('/api/delete_file')
async def deleteFile(data: Dict):
    fileName: str = data['filename']
    path: str = data['path']

    os.remove(os.path.join(PATH_FILES_DIRECTORY, fileName))

    await sendFilesNameListToAll(path)

    return {}, 200

    # fullPath = os.path.join(PATH_FILES_DIRECTORY, fileName)
    # try:
    #     os.remove(fullPath)
    #     db.query(Files).filter_by(file_name=fileName).delete()
    #     db.commit()
    # except FileNotFoundError:
    #     pass


# Роут для загрузки файла
# В параметрах filename - имя файла и path - путь км нему
@fastApiServer.get('/api/file_download_request')
async def handleFileDownloadRequest(filename: str, path: str):
    print(filename)
    fpath = os.path.join(PATH_FILES_DIRECTORY, filename)
    print(fpath)
    return FileResponse(fpath, filename=filename)
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
