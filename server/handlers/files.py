from server import server
from server.settings.config import *
from server.data.models import *
from server.data.db_session import db
from fastapi.responses import FileResponse
from typing import Dict
import os


# Отправляет на сервер новый список файлов
async def sendFilesNameList(path):
    filesName = os.listdir(os.path.join('files', path))
    server.emit('files_list_response', filesName)


# Роут на получение списка файлов
# Аргумент path - путь к директории папки
@server.get('/api/get_files')
async def filesList(data: Dict):
    path = data['path']
    #files: List = db.query(Files).filter(Files.path == path).all()
    #filesName: List = [file.file_name for file in files]
    sendFilesNameList(path)
    return {}, 200


# Роут на добавление файла
# В параметрах filename - имя файла, path - путь к нему
# также передаётся один файл
@server.post('/api/add_file')
async def addFile(data: Dict):
    path: str = data['path']  # для бд
    fileName: str = data['filename']  # тоже пойдет в бд
    file = data['file']
    # добавить проверку уникальности имени (алгоритм)
    dir_path = os.path.join(PATH_FILES_DIRECTORY, path)
    save_path = os.path.join(dir_path, fileName)
    file.save(save_path)

    sendFilesNameList(path)
    # добавление в бд
    # emit на обновление списка
    return {}, 200


# Роут для удаления файла
# В параметрах filename - имя файла, path - путь к файлу
@server.post('/api/delete_file')
async def deleteFile(data: Dict):
    fileName: str = data['filename']
    path: str = data['path']

    os.remove(os.path.join(PATH_FILES_DIRECTORY, fileName))

    sendFilesNameList(path)

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
@server.get('/api/file_download_request')
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
