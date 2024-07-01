from src.data.models import *
from src.data.db_session import db
from src.handlers.schemas import FileModel
from src.storage.functions.storage import *
from sqlalchemy.exc import IntegrityError
from src.socketManager import sockets

# Отправляет на клиент новый список файлов
async def sendFilesNameListToAll(path: str):
    await sockets.sendMessageRoom('getFilesName', getDiskFilesNameList(path), path)


def getFolderByPath(path: str, folderName: str) -> list:
    result = db.query(Files.file_id).filter_by(
        path=path, file_name=folderName, file_type='folder').all()
    return result


# Возвращает список файлов и папок по текущему пути path
def getDiskFilesNameList(path: str) -> dict:
    result = db.query(Files.file_id, Files.file_name, Files.file_type,
                      Files.file_size).filter_by(path=path).all()
    result = sorted(result, key=lambda x: (x[2] != 'folder', x[1]))
    return {'files': [{'id': row[0],
                       'name': row[1],
                       'type': row[2],
                       'file_size': row[3]} for row in result]}


def addDiskFileToDB(fileName: str, fileType: str, path: str, file_size: int,
                    file_id: int | None = None) -> FileModel | None:
    try:
        if file_id is not None:
            newFile = Files(file_name=fileName, file_type=fileType,
                            path=path, file_size=file_size, file_id=file_id)
        else:
            newFile = Files(file_name=fileName, file_type=fileType,
                            path=path, file_size=file_size)
        db.add(newFile)
        db.commit()
        fileModel: FileModel = FileModel(
            fileID=newFile.file_id,
            fileName=fileName,
            fileType=fileType,
            path=path,
            fileSize=file_size
        )
        return fileModel

    except IntegrityError:
        db.rollback()
        return None


def deleteDiskFileFromDB(fileID: int) -> Files | None:
    file = db.query(Files).filter_by(file_id=fileID).first()
    if file:
        db.delete(file)
        db.commit()
    return file


def getDiskFileInfo(fileID: int) -> FileModel | None:
    file = db.query(Files).filter_by(file_id=fileID).first()
    if file:
        fileInfo: FileModel | None = FileModel(
            fileID=file.file_id,
            fileName=file.file_name,
            fileType=file.file_type,
            path=file.path,
            fileSize=file.file_size
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
    deleteDiskFileFromDB(folderID)
    db.commit()


async def makeFoldersPath(path):
    if path == '/':
        return

    slash_inc_index = path[:-1].rfind('/') + 1
    folder_name = path[slash_inc_index: -1]
    folder_path = path[:slash_inc_index]
    record = db.query(Files).filter_by(path=folder_path,
                                       file_type='folder',
                                       file_name=folder_name).first()
    if record is None:
        addDiskFileToDB(folder_name, 'folder', folder_path, 0)
        await makeFoldersPath(folder_path)
        await sendFilesNameListToAll(folder_path)


