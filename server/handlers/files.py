from application import fastApiServer
from settings.config import *
from data.models import *
from data.db_session import db
from fastapi.responses import FileResponse
from starlette.websockets import WebSocket
from typing import Dict
import os


# Отправляет на сервер новый список файлов
async def sendFilesNameList(path):
    filesName = os.listdir(os.path.join('files', path))
    fastApiServer.emit('files_list_response', filesName)


# Роут на получение списка файлов
# Аргумент path - путь к директории папки
@fastApiServer.get('/api/get_files')
async def filesList(data: Dict):
    path = data['path']
    #files: List = db.query(Files).filter(Files.path == path).all()
    #filesName: List = [file.file_name for file in files]
    await sendFilesNameList(path)
    return {}, 200


# Роут на добавление файла
# В параметрах filename - имя файла, path - путь к нему
# также передаётся один файл
@fastApiServer.post('/api/add_file')
async def addFile(data: Dict):
    path: str = data['path']  # для бд
    fileName: str = data['filename']  # тоже пойдет в бд
    file = data['file']
    # добавить проверку уникальности имени (алгоритм)
    dir_path = os.path.join(PATH_FILES_DIRECTORY, path)
    save_path = os.path.join(dir_path, fileName)
    file.save(save_path)

    await sendFilesNameList(path)
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

    await sendFilesNameList(path)

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
async def handleFileDownloadRequest(data: Dict):
    fileName: str = data['filename']
    path: str = data['path']
    return FileResponse(os.path.join(PATH_FILES_DIRECTORY, fileName),
                        filename=fileName)
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
