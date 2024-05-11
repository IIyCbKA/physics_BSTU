from src.application import fastApiServer
from src.data.functions.files import *
from src.storage.functions.storage import *
from src.handlers.schemas import *

from fastapi.responses import JSONResponse, StreamingResponse
from fastapi import File, UploadFile, Form, HTTPException, WebSocket
from typing import Annotated
from fastapi import Depends
from src.handlers.login import (getCurrentUser,
                                getCurrentEmployee,
                                getCurrentUserS)
from src.socketManager import sockets
from src.strings.strings import getFileType


# Отправляет на клиент новый список файлов
async def sendFilesNameListToAll(path: str):
    await sockets.sendMessageRoom('getFilesName', getDiskFilesNameList(path), path)


# Роут на получение списка файлов
# Аргумент path - путь к директории папки
@fastApiServer.get('/disk{path:path}')
async def filesList(path: str,
                    user: Annotated[UserModel, Depends(getCurrentUser)]):
    checkDiskPath(path)
    filesName: dict = getDiskFilesNameList(path)
    return JSONResponse(content=filesName, status_code=200)


# регистрирует пользователя в хранилище
@sockets.onSocket('files')
async def filesSocket(ws: WebSocket,
                      token: str,
                      data: dict):
    user = (await getCurrentUserS(token))
    sockets.addSocket(user.userID, user.status, ws, data['path'])

# Роут на добавление папки. В параметрах:
# data.folderName: имя создаваемой папки
# data.path: путь к папке
@fastApiServer.post('/api/create_folder')
async def createFolder(data: FolderData,
                       user: Annotated[UserModel, Depends(getCurrentEmployee)]):
    data.path = data.path.replace('/disk', '', 1)
    fileModel: FileModel | None = addDiskFileToDB(data.folderName,
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
                  user: Annotated[UserModel, Depends(getCurrentEmployee)]):
    error: JSONResponse = JSONResponse(content={'error':
                                       'File was not added'},
                                       status_code=500)

    path = path.replace('/disk', '', 1)
    checkDiskPath(path)
    fileName: str = file.filename
    fileType: str = getFileType(file.filename)
    fileModel: FileModel | None = addDiskFileToDB(fileName, fileType, path)
    if fileModel is None:
        return error

    if not addFileToStorage(file, fileModel.fileID, fileModel.fileType):
        deleteDiskFileFromDB(fileModel.fileID)
        return error

    await sendFilesNameListToAll(path)
    return JSONResponse(content={}, status_code=201)


# Роут для удаления файла
# В параметрах filename - имя файла, path - путь к файлу
@fastApiServer.post('/api/delete_file')
async def deleteFile(data: DeleteFileData,
                     user: Annotated[UserModel, Depends(getCurrentEmployee)]):
    try:
        fileInfo: FileModel | None = getDiskFileInfo(data.fileID)
        if fileInfo is not None:
            if fileInfo.fileType != 'folder':
                deleteDiskFileFromDB(fileInfo.fileID)
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
@fastApiServer.get('/api/disk/download/{fileID}')
async def handleDiskFileDownloadRequest(
        fileID: str, user: Annotated[UserModel, Depends(getCurrentUser)]):
    async def file_iterator():
        yield data

    try:
        fileModel: FileModel | None = getDiskFileInfo(int(fileID))
        if (fileModel is not None) and (fileModel.fileType != 'folder'):
            file = getFileObject(fileModel.fileID, fileModel.fileType)
            if file is not None:
                data = file.read()

                return StreamingResponse(file_iterator())

        return JSONResponse(content={'Error': 'File not found'},
                            status_code=404)
    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)


def checkDiskPath(path: str) -> None:
    file_path_exception = HTTPException(
        status_code=404,
        detail="Could not find a folder",
    )

    if path == '/':
        return

    if path.count('/') < 2 or path[-1] != '/':
        raise file_path_exception

    pathCut = path[:-1]
    folderNamePos = pathCut.rfind('/') + 1
    folderName = pathCut[folderNamePos:]
    forderPath = pathCut[:folderNamePos]
    isFolderExist: bool = getFolderByPath(forderPath, folderName) != []

    if not isFolderExist:
        raise file_path_exception
