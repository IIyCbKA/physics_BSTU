from server.storage.storage_client import minio_client

from fastapi import File, UploadFile
from io import BytesIO
from typing import Annotated


def addFileToStorage(file: Annotated[UploadFile, File()], id: int) -> bool:
    fileData = file.file.read()
    bucketName: str = "storage"
    folderName: str = "files"
    fileName: str = str(id)
    try:
        minio_client.put_object(bucketName, f"{folderName}/{fileName}",
                                BytesIO(fileData), len(fileData))
        return True
    except Exception:
        return False


def getFileObject(path: str):
    try:
        fileObject = minio_client.get_object('storage', path)
        return fileObject
    except Exception:
        return None


def deleteFileObject(path):
    try:
        minio_client.remove_object('storage', path)
        return True
    except Exception:
        return False
