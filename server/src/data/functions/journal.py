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
