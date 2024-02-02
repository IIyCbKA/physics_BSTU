from flask_socketio import emit
from server import socketio
from server.data.models import *
from server.data.db_session import db
from typing import List
import base64
import os


@socketio.on('files_list_update')
def filesList(path):
    files: List = db.query(Files).filter(Files.path == path).all()
    filesName: List = [file.file_name for file in files]
    emit('files_list_response', filesName)


@socketio.on('add_file')
def addFile(data):
    pass


@socketio.on('delete_file')
def deleteFile(fileName):
    fullPath = os.path.join(os.path.dirname(os.getcwd()), 'files/', fileName)
    try:
        os.remove(fullPath)
        db.query(Files).filter_by(file_name=fileName).delete()
        db.commit()
    except FileNotFoundError:
        pass


@socketio.on('file_download_request')
def handleFileDownloadRequest(fileName):
    fullPath = os.path.join(os.path.dirname(os.getcwd()), 'files/', fileName)
    try:
        with open(fullPath, 'rb') as file:
            fileContent = base64.b64encode(file.read()).decode('utf-8')
            emit('file', {
                'file_name': fileName,
                'file_content': fileContent
            })
    except FileNotFoundError:
        pass
