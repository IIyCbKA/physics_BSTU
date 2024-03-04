from fastapi import File, UploadFile, Form
from pydantic import BaseModel
from typing import Annotated


class LoginData(BaseModel):
    email: str
    password: str


class GetFilesData(BaseModel):
    path: str


class AddFileData(BaseModel):
    file: Annotated[UploadFile, File()]
    path: Annotated[str, Form()]


class DeleteFileData(BaseModel):
    fileName: str
    path: str


class FileDownloadRequestData(BaseModel):
    filename: str
    path: str
