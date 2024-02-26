from flask_socketio import emit
from flask import request, jsonify, send_file
from server import app, socketio
from server.settings.config import *
from server.data.models import *
from server.data.db_session import db
import base64
import os


# Отправляет на сервер новый список файлов
def sendFilesNameList(path):
    filesName = os.listdir(os.path.join('files', path))
    socketio.emit('files_list_response', filesName)

# Роут на получение списка файлов
# Аргумент path - путь к директории папки
@app.route('/api/get_files', methods=['GET'])
def filesList():
    path = request.args.get('path')
    #files: List = db.query(Files).filter(Files.path == path).all()
    #filesName: List = [file.file_name for file in files]
    sendFilesNameList(path)
    return {}, 200

# Роут на добавление файла
# В параметрах filename - имя файла, path - путь к нему
# также передаётся один файл
@app.route('/api/add_file', methods=['POST'])
def addFile():
    path: str = request.form.get('path')  # для бд
    fileName: str = request.form.get('filename')  # тоже пойдет в бд
    file = request.files['file']
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
@app.route('/api/delete_file', methods=['POST'])
def deleteFile():
    data = request.json
    fileName: str = data.get('filename')
    path: str = data.get('path')

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
@app.route('/api/file_download_request', methods=['GET'])
def handleFileDownloadRequest():
    fileName = request.args.get('filename')
    path: str = request.args.get('path')
    return send_file(os.path.join(PATH_FILES_DIRECTORY, fileName),
                      as_attachment=True, download_name=fileName)
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
