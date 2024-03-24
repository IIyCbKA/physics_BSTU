from server.data.models import *
from server.data.db_session import db
from server.handlers.schemas import FileModel

from sqlalchemy.exc import IntegrityError
from fastapi import File, UploadFile, Form
from typing import Annotated


# Возвращает список файлов и папок по текущему пути path
def getFilesNameList(path: str) -> dict:
    result = db.query(Files.file_id, Files.file_name,
                      Files.file_type).filter_by(path=path).all()
    result = sorted(result, key=lambda x: (x[2] != 'folder', x[1]))
    return {'files': [{'id': row[0],
                       'name': row[1],
                       'type': row[2]} for row in result]}


def addFileToDB(file: Annotated[UploadFile, File()],
                path: Annotated[str, Form()]) -> FileModel | None:
    try:
        fileType: str = file.filename.split('.')[-1]
        newFile = Files(file_name=file.filename, file_type=fileType, path=path)
        db.add(newFile)
        db.commit()
        fileModel: FileModel = FileModel(
            fileID=newFile.file_id,
            fileName=file.filename,
            fileType=fileType,
            path=path
        )
        return fileModel

    except IntegrityError:
        db.rollback()
        return None


def deleteFileFromDB(fileID: int) -> None:
    file = db.query(Files).filter_by(file_id=fileID).first()
    if file:
        db.delete(file)
        db.commit()


def getFileInfo(fileID: int) -> FileModel | None:
    file = db.query(Files).filter_by(file_id=fileID).first()
    if file:
        fileInfo: FileModel | None = FileModel(
            fileID=file.file_id,
            fileName=file.file_name,
            fileType=file.file_type,
            path=file.path
        )
    else:
        fileInfo = None

    return fileInfo
