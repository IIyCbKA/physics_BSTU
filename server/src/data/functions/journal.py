from src.data.models import *
from src.data.db_session import db
from src.strings.strings import divideFileName


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


def getTaskInfo(taskNameOrID) -> Tasks | None:
    if type(taskNameOrID) == str:
        result = db.query(Tasks).filter_by(task_name=taskNameOrID).first()
    elif type(taskNameOrID) == int:
        result = db.query(Tasks).filter_by(task_id=taskNameOrID).first()
    else:
        result = None

    return result


def isTaskExists(taskName) -> bool:
    result = getTaskInfo(taskName)
    return result is not None


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
                additions: list[Additions]) -> Tasks:
    task = Tasks(task_name=task_name,
                 task_description=task_description,
                 additions_id=getIdAdditionList(additions))
    db.add(task)
    db.commit()
    return task


def getAllTasks():
    return db.query(Tasks).all()


def addTaskGroups(task_id: int, groups_id: List[int]):
    db_tasks_groups = [
        TasksGroups(task_id=task_id,
                    group_id=group_id)
        for group_id in groups_id]

    db.add_all(db_tasks_groups)
    db.commit()


def getGroupTasks(group_id: int) -> List:
    tasks = (
        db.query(Tasks)
        .join(TasksGroups)
        .filter_by(group_id=group_id)
        .all()
    )
    return tasks


def getStudentGroup(student_id: int):
    return db.query(Students.group_id).\
        filter_by(student_id=student_id).first()[0]


def getAddition(addition_id: int):
    return db.query(Additions).filter_by(addition_id=addition_id).first()


def deleteAddition(addition: Additions):
    db.delete(addition)
    db.commit()


def convertDBAdditionToDict(addition: Additions):
    res = {
        'id': addition.addition_id,
        'type': addition.addition_type
    }
    if res['type'] == 'file':
        res['content'] = {}
        res['title'], res['content']['fileType'] = divideFileName(
            addition.addition_title)
    else:
        res['title'] = addition.addition_title
    return res


def convertDBTaskToDict(task: Tasks):
    result = {}
    result['id'] = task.task_id
    result['title'] = task.task_name
    result['description'] = task.task_description
    result['additions'] = []
    for addition_id in task.additions_id:
        addition = getAddition(addition_id)
        if addition is not None:
            result['additions'].append(convertDBAdditionToDict(addition))
    return result


def convertDBTasksToDict(tasks: List[Tasks]):
    return list(map(convertDBTaskToDict, tasks))


def deleteTaskAdditionFromDB(addition_id: int):
    addition_to_delete = (db.query(Additions).
                          filter_by(addition_id=addition_id).first())
    db.delete(addition_to_delete)


def deleteTaskAdditionsFromDB(additions_id: list[int]):
    for addition_id in additions_id:
        deleteTaskAdditionFromDB(addition_id)


def deleteTaskOnlyFromDB(task: Tasks):
    db.delete(task)
    db.commit()
