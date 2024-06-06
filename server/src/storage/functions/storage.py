from src.storage.storage_client import minio_client

from fastapi import File, UploadFile
from io import BytesIO
from typing import Annotated


def addFileToMinio(folderName: str, file: Annotated[UploadFile, File()],
                   id: int, fileType: str) -> bool:
    fileData = file.file.read()
    bucketName: str = "storage"
    fileName: str = f"{id}.{fileType}"
    try:
        minio_client.put_object(bucketName, f"{folderName}/{fileName}",
                                BytesIO(fileData), len(fileData))
        return True
    except Exception:
        return False


def addFileToStorage(file: Annotated[UploadFile, File()], id: int,
                     fileType: str) -> bool:
    return addFileToMinio('files', file, id, fileType)


def addFileToTaskStorage(file: Annotated[UploadFile, File()], id: int,
                     fileType: str) -> bool:
    return addFileToMinio('tasks', file, id, fileType)


def addFileToWorkStorage(file: Annotated[UploadFile, File()], id: int,
                     fileType: str) -> bool:
    return addFileToMinio('works', file, id, fileType)


def getStorageObject(folderName: str, fileID: int, fileType: str):
    try:
        fileObject = minio_client.get_object('storage',
                                             f'{folderName}/{fileID}.{fileType}'
                                             )
        return fileObject
    except Exception:
        return None


def getFileObject(fileID: int, fileType: str):
    return getStorageObject('files', fileID, fileType)


def getAdditionFileObject(fileID: int, fileType: str):
    return getStorageObject('tasks', fileID, fileType)


def getWorkFileObject(fileID: int, fileType: str):
    return getStorageObject('works', fileID, fileType)


def deleteStorageObject(folderName: str, objID: int, fileType: str):
    try:
        minio_client.remove_object('storage',
                                   f'{folderName}/{objID}.{fileType}')
    except Exception:
        pass


def deleteFileObject(fileID: int, fileType: str):
    deleteStorageObject('files', fileID, fileType)


def deleteTaskFileObject(fileID: int, fileType: str):
    deleteStorageObject('tasks', fileID, fileType)


def deleteWorkFileObject(fileID: int, fileType: str):
    deleteStorageObject('works', fileID, fileType)
