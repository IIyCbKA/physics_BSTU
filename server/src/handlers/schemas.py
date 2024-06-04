from pydantic import BaseModel


class LoginData(BaseModel):
    email: str
    password: str


class DeleteFileData(BaseModel):
    fileID: int


class DeleteTaskData(BaseModel):
    taskID: int


class FolderData(BaseModel):
    folderName: str
    path: str


class UserModel(BaseModel):
    userID: int
    surname: str
    name: str
    patronymic: str
    status: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    userID: int | None = None


class FileModel(BaseModel):
    fileID: int
    fileName: str
    fileType: str
    path: str
    fileSize: int


class AdditionFileModel(BaseModel):
    fileID: int
    fileName: str
    fileType: str


class StudentWorkModel(BaseModel):
    task_id: int


class WorkFileDeleteModel(BaseModel):
    work_file_id: int


class EmployeeWorkReturnModel(BaseModel):
    task_id: int
    student_id: int


class EmployeeWorkGradeModel(BaseModel):
    task_id: int
    student_id: int
    grade: str
