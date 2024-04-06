from src.data.models import *
from src.data.db_session import db
from src.handlers.schemas import *


def getUser(id: int) -> tuple | None:
    result = db.query(Users).filter_by(user_id=id).first()
    return result if result else None


def getUserModel(id: int) -> UserModel | None:
    result: tuple | None = getUser(id)
    if result is None:
        return None

    resultModel: UserModel = UserModel(
        userID=result.user_id,
        surname=result.surname,
        name=result.name,
        patronymic=result.patronymic,
        status=result.status
    )

    return resultModel


def getGroupID(name: str) -> int:
    result = db.query(Groups).filter_by(group_name=name).first()
    return result[0] if result else -1


def addUser(data: UserModel) -> None:
    db.add(Users(
        user_id=data.userID,
        surname=data.surname,
        name=data.name,
        patronymic=data.patronymic,
        status=data.status
    ))
    db.commit()


def addGroup(groupName: str) -> int:
    newGroup = Groups(group_name=groupName)
    db.add(newGroup)
    db.commit()
    return newGroup.group_id


def addStudent(studentID: int, groupID: int) -> None:
    db.add(Students(
        student_id=studentID,
        group_id=groupID
    ))
    db.commit()


def addEmployee(employeeID: int) -> None:
    db.add(Employees(
        employee_id=employeeID
    ))
    db.commit()
