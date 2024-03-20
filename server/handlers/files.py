from server.application import fastApiServer
from server.settings.config import *
from server.data.functions.files import *
from server.storage.functions.storage import *
from server.handlers.schemas import *

from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi import WebSocket, WebSocketDisconnect, File, UploadFile, Form
from typing import Dict, Annotated
from fastapi import Depends
import os
from server.handlers.login import getCurrentUser

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
    await websocket.send_json(getFilesNameList(path))


# Отправляет на клиент новый список файлов
async def sendFilesNameListToAll(path: str):
    for websocket in clients.values():
        await sendFilesNameList(websocket, path)


# Роут на получение списка файлов
# Аргумент path - путь к директории папки
@fastApiServer.get('/disk{path:path}')
async def filesList(path: str, user: Annotated[dict, Depends(getCurrentUser)]):
    filesName = getFilesNameList(path)
    print(filesName)
    return JSONResponse(content=filesName, status_code=200)


# Роут на добавление файла
# В параметрах filename - имя файла, path - путь к нему
# также передаётся один файл
@fastApiServer.post('/api/add_file')
async def addFile(file: Annotated[UploadFile, File()],
                  path: Annotated[str, Form()],
                  user: Annotated[dict, Depends(getCurrentUser)]):
    path = path.replace('/disk', '', 1)
    fileID: int = addFileToDB(file, path)
    if fileID == -1:
        return JSONResponse(content={'error': 'File with that name already '
                                              'exists'}, status_code=500)
    if not addFileToStorage(file, fileID):
        deleteFileFromDB(file.filename, path)
        return JSONResponse(content={'error': 'The file could not be uploaded'},
                            status_code=500)

    await sendFilesNameListToAll(path)
    return JSONResponse(content={}, status_code=201)


# Роут для удаления файла
# В параметрах filename - имя файла, path - путь к файлу
@fastApiServer.post('/api/delete_file')
async def deleteFile(data: DeleteFileData, user: Annotated[dict, Depends(getCurrentUser)]):
    try:
        data.path = data.path.replace('/disk', '', 1)
        fileID: int = getFileID(data.fileName, data.path)
        if fileID != -1:
            deleteFileFromDB(data.fileName, data.path)
            deleteFileObject(f'files/{fileID}.{data.fileName.split(".")[-1]}')
            await sendFilesNameListToAll(data.path)
            return JSONResponse(content={}, status_code=200)

        return JSONResponse(content={'Error': 'File not found'},
                            status_code=404)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


# Роут для загрузки файла
# path cодержит путь к файлу и его имя
@fastApiServer.get('/api/download/disk{path:path}')
async def handleFileDownloadRequest(path: str, user: Annotated[dict, Depends(getCurrentUser)]):
    async def file_iterator():
        yield data

    try:
        border = path.rfind('/') + 1
        fileName: str = path[border:]
        dirPath: str = path[:border]
        fileID: int = getFileID(fileName, dirPath)
        if fileID != -1:
            file = getFileObject(f'files/{fileID}.{fileName.split(".")[-1]}')
            if file is not None:
                data = file.read()

                return StreamingResponse(file_iterator())

        return JSONResponse(content={'Error': 'File not found'},
                            status_code=404)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)
