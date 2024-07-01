from src.application import fastApiServer
from src.data.functions.files import *
from src.storage.functions.storage import *
from src.handlers.schemas import *

from fastapi.responses import JSONResponse, StreamingResponse
from fastapi import File, UploadFile, Form, HTTPException, WebSocket
from typing import Annotated
from fastapi import Depends
from src.handlers.login import (getCurrentUser, getCurrentEmployee,
                                getCurrentUserS, getUserFullName)
from src.socketManager import sockets
from src.strings.strings import getFileType
from src.data.functions.actions import (
    addCreateFolderAction, addAddFileAction, addDeleteFileEndAction,
    addDeleteFileStartAction, addDeleteFolderStartAction)


# Отправляет на клиент новый список файлов
async def sendFilesNameListToUser(path: str, userID: int):
    await sockets.sendMessageToUser('getFilesName', getDiskFilesNameList(path),
                                    path, userID)


# Роут на получение списка файлов
# Аргумент path - путь к директории папки
@fastApiServer.get('/api/check/disk{path:path}')
async def checkDir(path: str,
                   user: Annotated[UserModel, Depends(getCurrentUser)]):
    checkDiskPath(path)
    # filesName: dict = getDiskFilesNameList(path)
    return JSONResponse(content={}, status_code=200)


# регистрирует пользователя в хранилище
@sockets.onSocket('files')
async def filesSocket(socketID: str,
                      token: str,
                      data: dict):
    user = (await getCurrentUserS(token))
    sockets.addSocketRoute(user.userID, user.status, socketID, data['path'])
    await sendFilesNameListToUser(data['path'], user.userID)


# Роут на добавление папки. В параметрах:
# data.folderName: имя создаваемой папки
# data.path: путь к папке
@fastApiServer.post('/api/create_folder')
async def createFolder(data: FolderData,
                       user: Annotated[UserModel, Depends(getCurrentEmployee)]):
    if '/' in data.folderName:
        return JSONResponse(content={'error': 'Folder name cannot contain \\'},
                            status_code=400)
    data.path = data.path.replace('/disk', '', 1)
    fileModel: FileModel | None = addDiskFileToDB(data.folderName,
                                              'folder',
                                              data.path, 0)
    if fileModel is None:
        return JSONResponse(content={'error': 'Folder was not added'},
                            status_code=500)

    addCreateFolderAction(user, data.folderName, data.path)

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
    await makeFoldersPath(path)
    fileName: str = file.filename
    fileType: str = getFileType(file.filename)
    fileSize = file.size
    fileModel: FileModel | None = addDiskFileToDB(fileName, fileType,
                                                  path, fileSize)
    if fileModel is None:
        return JSONResponse(content={'error':
                                       'File was not added to DB'},
                                       status_code=500)

    if not addFileToStorage(file, fileModel.fileID, fileModel.fileType):
        deleteDiskFileFromDB(fileModel.fileID)
        return JSONResponse(content={'error':
                                       'File was not added to storage'},
                                       status_code=500)

    addAddFileAction(user, fileName, path)
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
                addDeleteFileStartAction(user, fileInfo.fileName,
                                         fileInfo.path)
                deleteDiskFileFromDB(fileInfo.fileID)
                if not deleteFileObject(fileInfo.fileID, fileInfo.fileType):
                    addDiskFileToDB(fileInfo.fileName, fileInfo.fileType,
                                    fileInfo.path, fileInfo.fileSize,
                                    fileInfo.fileID)
                    return JSONResponse(
                        content={
                            'Error': 'File don`t delete from file storage'},
                        status_code=500)
            else:
                addDeleteFolderStartAction(user, fileInfo.fileName,
                                           fileInfo.path)
                searchPath: str = f"{fileInfo.path}{fileInfo.fileName}/%"
                deleteFolderFromDB(fileInfo.fileID, searchPath)

            addDeleteFileEndAction(user, fileInfo.fileName)

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
