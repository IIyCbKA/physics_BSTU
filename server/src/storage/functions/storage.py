from src.storage.storage_client import minio_client

from fastapi import File, UploadFile
from io import BytesIO
from typing import Annotated


def addFileToStorage(file: Annotated[UploadFile, File()], id: int,
                     fileType: str) -> bool:
    fileData = file.file.read()
    bucketName: str = "storage"
    folderName: str = "files"
    fileName: str = f"{id}.{fileType}"
    try:
        minio_client.put_object(bucketName, f"{folderName}/{fileName}",
                                BytesIO(fileData), len(fileData))
        return True
    except Exception:
        return False


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
