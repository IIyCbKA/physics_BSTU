from server.data.models import *
from server.data.db_session import db
from server.handlers.schemas import *


def searchUser(id: int) -> bool:
    result = db.query(Users).filter_by(user_id=id).first()
    return result is True


def getGroupID(name: str) -> int:
    result = db.query(Groups).filter_by(group_name=name).first()
    return result[0] if result else -1


def addUser(data: UserModel) -> None:
    db.add(Users(
        user_id=data.user_id,
        surname=data.surname,
        name=data.name,
        patronymic=data.patronymic,
        status=data.status
    ))
    db.commit()


def addGroup(groupName: str) -> None:
    db.add(Groups(
        group_name=groupName
    ))
    db.commit()


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
