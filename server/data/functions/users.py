from server.data.models import *
from server.data.db_session import db
from server.handlers.schemas import *


def getUser(id: int) -> tuple | None:
    result = db.query(Users).filter_by(user_id=id).first()
    return result if result else None


def getUserDict(id: int) -> dict | None:
    result = getUser(id)
    if result is None:
        return None

    resultDict = {
        'userID': result[0],
        'surname': result[1],
        'name': result[2],
        'patronymic': result[3],
        'status': result[4]
    }

    return resultDict


def getGroupID(name: str) -> int:
    result = db.query(Groups).filter_by(group_name=name).first()
    return result[0] if result else -1


def addUser(data: UserModel) -> None:
    # !!!проверить это
    db.add(Users(*data))
    db.commit()


def addGroup(groupName: str) -> None:
    # !!!проверить это
    db.add(Groups(*groupName))
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
