from flask import request, jsonify
from flask_socketio import emit
from server import app
import os

currentDirectory = os.getcwd()
filesDirectory = os.path.join(currentDirectory, "../../files")
absoluteFilesDirectory = os.path.abspath(filesDirectory)


@app.route('/api/files', methods=['POST'])
def addFile():
    file = request.files['file']
    file.save(os.path.join(absoluteFilesDirectory, file.filename))
    emit('file_added', {'message': 'File has been added'},
         broadcast=True)
    return jsonify({'message': 'File has been added'})


@app.route('/api/files/<filename>', methods=['DELETE'])
def deleteFile(filename):
    os.remove(os.path.join(absoluteFilesDirectory, filename))
    emit('file_deleted', {'message': 'File has been deleted'},
         broadcast=True)
    return jsonify({'message': 'File has been deleted'})


@app.route('/api/files/list', methods=['GET'])
def listFiles():
    # здесь запрос к базе данных
    return jsonify({'files': 'image123.png'})
