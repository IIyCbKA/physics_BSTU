from server.application import fastApiServer
from server.data.functions.files import *
from server.storage.functions.storage import *
from server.handlers.schemas import *

from fastapi.responses import JSONResponse, StreamingResponse
from fastapi import WebSocket, WebSocketDisconnect, File, UploadFile, Form
from typing import Dict, Annotated
from fastapi import Depends
from server.handlers.login import getCurrentUser
from server.socketManager import sockets


# Отправляет на клиент новый список файлов
async def sendFilesNameList(ip: str, path: str):
    await sockets.sendMessage('getFilesName', getFilesNameList(path), ip)


# Отправляет на клиент новый список файлов
async def sendFilesNameListToAll(path: str):
    await sockets.sendMessage('getFilesName', getFilesNameList(path))


# Роут на получение списка файлов
# Аргумент path - путь к директории папки
@fastApiServer.get('/disk{path:path}')
async def filesList(path: str, user: Annotated[dict, Depends(getCurrentUser)]):
    filesName: dict = getFilesNameList(path)
    return JSONResponse(content=filesName, status_code=200)


# Роут на добавление папки. В параметрах:
# data.folderName: имя создаваемой папки
# data.path: путь к папке
@fastApiServer.post('/api/create_folder')
async def createFolder(data: FolderData,
                       user: Annotated[dict, Depends(getCurrentUser)]):
    data.path = data.path.replace('/disk', '', 1)
    fileModel: FileModel | None = addFileToDB(data.folderName,
                                              'folder',
                                              data.path)
    if fileModel is None:
        return JSONResponse(content={'error': 'Folder was not added'},
                            status_code=500)

    await sendFilesNameListToAll(data.path)
    return JSONResponse(content={}, status_code=201)


# Роут на добавление файла
# В параметрах filename - имя файла, path - путь к нему
# также передаётся один файл
@fastApiServer.post('/api/add_file')
async def addFile(file: Annotated[UploadFile, File()],
                  path: Annotated[str, Form()],
                  user: Annotated[dict, Depends(getCurrentUser)]):
    error: JSONResponse = JSONResponse(content={'error':
                                       'File was not added'},
                                       status_code=500)

    path = path.replace('/disk', '', 1)
    fileName: str = file.filename
    fileType: str = file.filename.split('.')[-1]
    fileModel: FileModel | None = addFileToDB(fileName, fileType, path)
    if fileModel is None:
        return error

    if not addFileToStorage(file, fileModel.fileID, fileModel.fileType):
        deleteFileFromDB(fileModel.fileID)
        return error

    await sendFilesNameListToAll(path)
    return JSONResponse(content={}, status_code=201)


# Роут для удаления файла
# В параметрах filename - имя файла, path - путь к файлу
@fastApiServer.post('/api/delete_file')
async def deleteFile(data: DeleteFileData, user: Annotated[dict, Depends(getCurrentUser)]):
    try:
        fileInfo: FileModel | None = getFileInfo(data.fileID)
        if fileInfo is not None:
            if fileInfo.fileType != 'folder':
                deleteFileFromDB(fileInfo.fileID)
                deleteFileObject(fileInfo.fileID, fileInfo.fileType)
            else:
                searchPath: str = f"{fileInfo.path}{fileInfo.fileName}/%"
                deleteFolderFromDB(fileInfo.fileID, searchPath)
            await sendFilesNameListToAll(fileInfo.path)
            return JSONResponse(content={}, status_code=200)

        return JSONResponse(content={'Error': 'File not found'},
                            status_code=404)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


# Роут для загрузки файла
# path cодержит путь к файлу и его имя
@fastApiServer.get('/api/download/{fileID}')
async def handleFileDownloadRequest(fileID: str, user: Annotated[dict, Depends(getCurrentUser)]):
    async def file_iterator():
        yield data

    try:
        fileModel: FileModel | None = getFileInfo(int(fileID))
        if (fileModel is not None) and (fileModel.fileType != 'folder'):
            file = getFileObject(fileModel.fileID, fileModel.fileType)
            if file is not None:
                data = file.read()

                return StreamingResponse(file_iterator())

        return JSONResponse(content={'Error': 'File not found'},
                            status_code=404)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)
