from flask_socketio import emit
from flask import request, jsonify
from server import app, socketio
from server.settings.constants import *
from server.data.models import *
from server.data.db_session import db
import base64
import os

@app.route('/api/get_files', methods=['GET'])
def filesList():
    path = request.args.get('path')
    #files: List = db.query(Files).filter(Files.path == path).all()
    #filesName: List = [file.file_name for file in files]
    filesName = os.listdir(os.path.join('files', path))
    socketio.emit('files_list_response', filesName)
    return {}, 200


@app.route('/api/add_file', methods=['POST'])
def addFile():
    path: str = request.form.get('path')  # для бд
    fileName: str = request.form.get('filename')  # тоже пойдет в бд
    file = request.files['file']
    # добавить проверку уникальности имени (алгоритм)
    dir_path = os.path.join('files', path)
    save_path = os.path.join(dir_path, fileName)
    file.save(save_path)
    # filesName = list(iter(os.listdir(dir_path)))
    # filesName.append(fileName)
    # socketio.emit('files_list_response', filesName)
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
