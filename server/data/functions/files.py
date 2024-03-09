from server.data.models import *
from server.data.db_session import db

from sqlalchemy.exc import IntegrityError
from fastapi import File, UploadFile, Form
from typing import Annotated


def getFiles(path: str) -> list:
    result = db.query(StorageFiles.file_name).filter_by(path=path).all()
    return [row[0] for row in result]


def getDirs(path: str) -> list:
    result = db.query(Dirs.dir_name).filter_by(path=path).all()
    return result


# Возвращает список файлов и папок по текущему пути path
def getFilesNameList(path: str) -> dict:
    dirsList: list = getDirs(path)
    filesList: list = getFiles(path)
    return {'dirs': dirsList, 'files': filesList}


def addFileToDB(file: Annotated[UploadFile, File()],
                path: Annotated[str, Form()]) -> int:
    try:
        newFile = StorageFiles(file_name=file.filename, path=path)
        db.add(newFile)
        db.commit()
        return newFile.file_id
    except IntegrityError:
        db.rollback()
        return -1


def deleteFileFromDB(fileName: str, path: str):
    db.query(StorageFiles).filter_by(file_name=fileName, path=path).delete()
    db.commit()
