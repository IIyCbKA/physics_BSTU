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


def getFileObject(fileID: int, fileType: str):
    folderName: str = 'files'
    try:
        fileObject = minio_client.get_object('storage',
                                             f'{folderName}/{fileID}.{fileType}'
                                             )
        return fileObject
    except Exception:
        return None


def deleteFileObject(fileID: int, fileType: str):
    folderName: str = 'files'
    try:
        minio_client.remove_object('storage',
                                   f'{folderName}/{fileID}.{fileType}')
    except Exception:
        pass
