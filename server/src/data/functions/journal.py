from src.data.models import *
from src.data.db_session import db


def getGroupsList() -> dict:
    result = db.query(Groups.group_id, Groups.group_name).all()
    result = sorted(result, key=lambda x: x[1])
    return {'groups': [{'id': row[0],
                       'name': row[1]} for row in result]}


def getGroupStudentsList(groupID: int) -> dict:
    result = (db.query(Users.user_id, Users.surname, Users.name, Users.patronymic)
              .join(Students, Users.user_id == Students.student_id)
              .filter_by(group_id=groupID).all())
    result = sorted(result, key=lambda x: x[1] + x[2] + x[3])
    return {'students': [{'id': row[0],
                          'surname': row[1],
                          'name': row[2],
                          'patronymic': row[3]} for row in result]}


def isTaskExists(taskName: str) -> bool:
    result = db.query(Tasks.task_id).filter_by(task_name=taskName).count()
    return result == 1


def addTaskAdditionsToDB(additions: dict) -> list[Additions]:
    db_additions = [
        Additions(addition_title=addition['name'],
                  addition_type=addition['type'])
        for addition in additions]

    db.add_all(db_additions)
    db.commit()
    return db_additions


def getIdAdditionList(additions: list[Additions]):
    return list(map(lambda x: x.addition_id, additions))



def addTaskToDB(task_name: str,
                task_description: str,
                additions: list[Additions]):
    task = Tasks(task_name=task_name,
                 task_description=task_description,
                 additions_id=getIdAdditionList(additions))
    db.add(task)
    db.commit()


def deleteTaskAdditionFromDB(addition_id: int):
    addition_to_delete = db.query(Additions).filter_by(addition_id=addition_id)
    db.delete(addition_to_delete)


def deleteTaskAdditionsFromDB(additions_id: list[int]):
    for addition_id in additions_id:
        deleteTaskAdditionFromDB(addition_id)

