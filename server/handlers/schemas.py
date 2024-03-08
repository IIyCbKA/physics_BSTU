from fastapi import File, UploadFile, Form
from pydantic import BaseModel
from typing import Annotated


class LoginData(BaseModel):
    email: str
    password: str


class AddFileData(BaseModel):
    file: Annotated[UploadFile, File()]
    path: Annotated[str, Form()]


class DeleteFileData(BaseModel):
    fileName: str
    path: str


class UserModel(BaseModel):
    user_id: int
    surname: str
    name: str
    patronymic: str
    status: str
