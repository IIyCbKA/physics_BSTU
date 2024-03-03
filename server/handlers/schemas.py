from pydantic import BaseModel


class LoginData(BaseModel):
    email: str
    password: str


class GetFilesData(BaseModel):
    path: str
