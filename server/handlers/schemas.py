from pydantic import BaseModel


class LoginData(BaseModel):
    email: str
    password: str


class DeleteFileData(BaseModel):
    fileName: str
    path: str


class UserModel(BaseModel):
    user_id: int
    surname: str
    name: str
    patronymic: str
    status: str
