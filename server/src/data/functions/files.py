from fastapi import HTTPException
from src.data.models import *
from src.data.db_session import db
from src.handlers.schemas import FileModel
from src.storage.functions.storage import *

from sqlalchemy.exc import IntegrityError


# проверяет, что указанный путь path существует
# и вызывает ошибку в противном случае
def checkFilePathExist(path: str):
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
    path_exist = db.query(Files.file_id).filter_by(
        path=forderPath, file_name=folderName).all()

    if not path_exist:
        raise file_path_exception


# Возвращает список файлов и папок по текущему пути path
def getFilesNameList(path: str) -> dict:
    checkFilePathExist(path)
    result = db.query(Files.file_id, Files.file_name,
                      Files.file_type).filter_by(path=path).all()
    result = sorted(result, key=lambda x: (x[2] != 'folder', x[1]))
    return {'files': [{'id': row[0],
                       'name': row[1],
                       'type': row[2]} for row in result]}


def addFileToDB(fileName: str, fileType: str, path: str) -> FileModel | None:
    checkFilePathExist(path)
    try:
        newFile = Files(file_name=fileName, file_type=fileType, path=path)
        db.add(newFile)
        db.commit()
        fileModel: FileModel = FileModel(
            fileID=newFile.file_id,
            fileName=fileName,
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


def deleteFolderFromDB(folderID: int, searchPath: str):
    result: list = db.query(Files).filter(Files.path.like(searchPath)).all()
    for item in result:
        if item.file_type != 'folder':
            deleteFileObject(item.file_id, item.file_type)
        db.delete(item)
    deleteFileFromDB(folderID)
    db.commit()
