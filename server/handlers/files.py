from flask_socketio import emit
from flask import request
from server import app
from server.settings.constants import *
from server.data.models import *
from server.data.db_session import db
from typing import List
import base64
import os


def filesList(path):
    files: List = db.query(Files).filter(Files.path == path).all()
    filesName: List = [file.file_name for file in files]
    emit('files_list_response', filesName)


@app.route('/api/add_file', methods=['POST'])
def addFile():
    path: str = request.form.get('path')  # для бд
    fileName: str = request.form.get('filename')  # тоже пойдет в бд
    file = request.files['file']
    # добавить проверку уникальности имени (алгоритм)
    file.save(os.path.join(PATH_FILES_DIRECTORY, fileName))
    # добавление в бд
    # emit на обновление списка
    return {}, 200


@app.route('/api/delete_file', methods=['POST'])
def deleteFile(fileName):
    fullPath = os.path.join(PATH_FILES_DIRECTORY, fileName)
    try:
        os.remove(fullPath)
        db.query(Files).filter_by(file_name=fileName).delete()
        db.commit()
    except FileNotFoundError:
        pass


@app.route('/api/file_download_request', methods=['GET'])
def handleFileDownloadRequest(fileName):
    fullPath = os.path.join(PATH_FILES_DIRECTORY, fileName)
    try:
        with open(fullPath, 'rb') as file:
            fileContent = base64.b64encode(file.read()).decode('utf-8')
            emit('file', {
                'file_name': fileName,
                'file_content': fileContent
            })
    except FileNotFoundError:
        pass
