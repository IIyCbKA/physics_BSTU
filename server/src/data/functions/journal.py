from src.data.models import *
from src.data.db_session import db
from src.strings.strings import getFileType
from src.handlers.schemas import AdditionFileModel
from sqlalchemy import desc
from copy import deepcopy

GRADE_WORK_NONE: str = 'Назначено'
GRADE_WORK_SEND: str = 'Сдано'
GRADE_WORK_RETURNED: str = 'Возвращено'
GRADE_FINISHED = 'Оценено'

def getAdditionFileInfo(fileID: int) -> Additions | None:
    file = db.query(Additions).filter_by(addition_id=fileID).first()
    if file:
        fileInfo: AdditionFileModel | None = AdditionFileModel(
            fileID=file.addition_id,
            fileName=file.addition_title,
            fileType=getFileType(file.addition_title)
        )
    else:
        fileInfo = None

    return fileInfo

def getGroupsList() -> dict:
    result = db.query(Groups.group_id, Groups.group_name).all()
    result = sorted(result, key=lambda x: x[1])
    return {'groups': [{'id': row[0],
                       'name': row[1]} for row in result]}


def getTasksGroupDict(tasks: List[Tasks]) -> dict:
    result = {}
    for task in tasks:
        result[task.task_id] = task.task_name
    return result


def getGroupStudentsList(groupID: int) -> dict:
    result = (db.query(Users)
              .join(Students, Users.user_id == Students.student_id)
              .filter_by(group_id=groupID)
              .order_by(Users.surname, Users.name, Users.patronymic).all())
    students = []
    tasks = getGroupTasks(groupID)
    studentTasks = list(map(lambda x: {'id': x.task_id}, tasks))
    for student in result:
        works = deepcopy(studentTasks)
        addFilesInfoToWorksInfoEmployee(student.user_id, works)
        studentInfo = {
            'id': student.user_id,
            'surname': student.surname,
            'name': student.name,
            'patronymic': student.patronymic,
            'works': works
        }
        students.append(studentInfo)
    tasks = list(map(lambda x: {'id': x.task_id, 'name': x.task_name}, tasks))
    groupName = db.query(Groups).filter_by(group_id=groupID).first().group_name
    return {'students': students, 'groupID': groupID, 'groupName': groupName,
            'tasks': tasks}


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


def addTaskAdditionsToDB(additions: List[dict]) -> list[Additions]:
    db_additions = [
        Additions(addition_title=addition['name'],
                  addition_type=addition['type'])
        for addition in additions]

    db.add_all(db_additions)
    db.commit()
    return db_additions


def getIdAdditionList(additions: list[Additions]):
    return list(map(lambda x: x.addition_id, additions))


def updateGroups(taskId: int, newGroups: list[int]):
    newGroupsS = set(newGroups)
    oldGroups = getTaskGroups(taskId)
    oldGroupsS = set(getIdsFromTaskGroups(oldGroups))
    for group in oldGroups:
        if group.group_id not in newGroupsS:
            db.delete(group)

    for group in newGroups:
        if group not in oldGroupsS:
            db.add(TasksGroups(group_id=group, task_id=taskId))

    db.commit()


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
    return (
        db.query(Tasks)
        .order_by(desc(Tasks.task_id))
        .all()
    )


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
        .order_by(desc(Tasks.task_id))
        .all()
    )
    return tasks


def getStudentGroupID(student_id: int):
    return db.query(Students.group_id).\
        filter_by(student_id=student_id).first()[0]


def getStudentGroup(student_id: int) -> Groups:
    return db.query(Groups).join(Students, Students.group_id == Groups.group_id).\
        filter_by(student_id=student_id).first()


def getAddition(addition_id: int):
    return db.query(Additions).filter_by(addition_id=addition_id).first()


def deleteAddition(addition: Additions):
    db.delete(addition)
    db.commit()


def convertDBAdditionToDict(addition: Additions):
    res = {
        'id': addition.addition_id,
        'type': addition.addition_type,
        'title': addition.addition_title
    }
    if res['type'] == 'file':
        res['content'] = {}
        res['content']['fileType'] = getFileType(addition.addition_title)
    return res


def getTaskGroups(task_id: int) -> List[TasksGroups]:
    return db.query(TasksGroups).filter_by(task_id=task_id).all()


def getIdsFromTaskGroups(tg: List[TasksGroups]) -> List[int]:
    return list(map(lambda x: x.group_id, tg))


def getTaskGroupsIds(task_id: int):
    result = getTaskGroups(task_id)
    return getIdsFromTaskGroups(result)


def convertDBTaskToDict(task: Tasks):
    result = {}
    result['id'] = task.task_id
    result['title'] = task.task_name
    result['description'] = task.task_description
    result['groups'] = getTaskGroupsIds(task.task_id)
    result['additions'] = []
    for addition_id in task.additions_id:
        addition = getAddition(addition_id)
        if addition is not None:
            result['additions'].append(convertDBAdditionToDict(addition))
    return result


# возвращает массив, где хранятся словари с двумя ключами:
# file_id - идентификатор файла
# filename - имя файла
def getTaskWorksInfo(works: list[Works]):
    result = []
    for work in works:
        result.append({'file_id': work.work_file_id,
                       'filename': work.filename})

    return result


def getAllStudentTaskWorks(student_id: int, task_id: int) -> Works:
    return db.query(Works).filter_by(student_id=student_id,
                                     task_id=task_id).all()


def getGradeInfo(grade: Grades) -> dict:
    if grade is not None:
        return {'grade': grade.grade, 'author': grade.author_id,
                'status': grade.status}
    else:
        return {'grade': '', 'author': None, 'status': GRADE_WORK_NONE}


# изменяет массив заданий tasks, добавляя информацию о работах
# студента с идентификатором student_id
def addWorksInfoToTasksInfo(student_id: int, tasks: list[dict]):
    for task in tasks:
        works = getAllStudentTaskWorks(student_id, task['id'])
        task['works'] = getTaskWorksInfo(works)
        grade = getStudentGrade(student_id, task['id'])
        task['grade'] = getGradeInfo(grade)


def getStudentWorkFiles(student_id: int, task_id: int,
                        status: str | None):
    if status is None:
        return None
    elif status == GRADE_WORK_SEND:
        works = getAllStudentTaskWorks(student_id, task_id)
        return getTaskWorksInfo(works)
    else:
        return []

# изменяет массив заданий works, добавляя информацию о работах
# студента с идентификатором student_id со статусом "Отправлено"
def addFilesInfoToWorksInfoEmployee(student_id: int, tasks: list[dict]):
    for task in tasks:
        grade = getStudentGrade(student_id, task['id'])
        task['grade'] = getGradeInfo(grade)
        if grade is not None:
            task['works'] = getStudentWorkFiles(student_id, task['id'],
                                                grade.status)
        else:
            task['works'] = []


def addWork(student_id: int, task_id: int, filename: str) -> Works:
    work = Works(student_id=student_id, task_id=task_id, filename=filename)
    db.add(work)
    db.commit()

    return work


def deleteWork(work: int | Works):
    if isinstance(work, int):
        work = db.query(Works).filter_by(work_file_id=work).first()

    if work is not None:
        db.delete(work)
        db.commit()


def deleteAllStudentTaskWorks(student_id: int, task_id: int):
    works = getAllStudentTaskWorks(student_id, task_id)
    db.delete(works)
    db.commit()


def getAllTaskWorks(task_id: int):
    return db.query(Works).filter_by(task_id=task_id).all()


def getWork(work_file_id: int):
    return db.query(Works).filter_by(work_file_id=work_file_id).first()


def getGrade(grade_id: int):
    return db.query(Grades).filter_by(grade_id=grade_id).first()


def addGrade(student_id: int, task_id: int,
             status: str, author_id: int, grade: str = None) -> Grades:
    if grade is None:
        grade = ''
    if status is None:
        status = GRADE_WORK_NONE

    grade = Grades(student_id=student_id, task_id=task_id,
                   author_id=author_id, grade=grade, status=status)
    db.add(grade)
    db.commit()
    return grade



def getStudentGrade(student_id: int, task_id: int) -> Grades | None:
    return db.query(Grades).filter_by(student_id=student_id,
                                      task_id=task_id).first()


# Устанавливает оценку
# Если author_id не None, то устанавливает автора
def setGrade(student_id: int, task_id: int, grade_status: str | None = None,
             author_id: Grades | None = None, new_grade: str | None = None):
    grade = getStudentGrade(student_id, task_id)
    if grade is None:
        grade = addGrade(student_id, task_id, grade_status, author_id, new_grade)
    else:
        if grade_status is not None:
            grade.status = grade_status
        if author_id is not None:
            grade.author_id = author_id
            if new_grade is not None:
                grade.grade = new_grade
            if grade_status == GRADE_WORK_NONE:
                grade.status = GRADE_WORK_RETURNED

        db.commit()
    return grade


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
    for tg in db.query(TasksGroups).filter_by(task_id=task.task_id).all():
        db.delete(tg)
    db.delete(task)
    db.commit()
