from datetime import datetime, timedelta
from src.data.db_session import db
from src.data.models import Actions
from src.settings.config import ACTIONS_JOURNAL_RECORDS_EXIST_TIME
from src.data.functions.users import getUserFullName
from src.handlers.schemas import UserModel


def addAction(info: str):
    action = Actions(info=info)
    db.add(action)
    db.commit()


def actionToStr(action: Actions) -> str:
    return f'{action.created_at}: {action.info}'


def getAllActions() -> str:
    actions = db.query(Actions).all()
    lines: list[str] = []
    for action in actions:
        lines.append(actionToStr(action))

    return '\n'.join(lines)


def delOldActions():
    thirty_days_ago = datetime.utcnow() - timedelta(
        days=ACTIONS_JOURNAL_RECORDS_EXIST_TIME)
    db.query(Actions).filter(Actions.created_at < thirty_days_ago).delete()
    db.commit()


def addUpdateTaskStartAction(user: UserModel, task_id: int, title: str,
                             description: str, groups: str, additions: str):
    addAction(f'Пользователь {getUserFullName(user)} пытается обновить '
              f'задание {task_id}. Новые значения: title = "{title}" '
              f'description = "{description}" groups = "{groups}" '
              f'additions = "{additions}"')


def addAddTaskStartAction(user: UserModel, title: str, description: str,
                          groups: str, additions: str):
    addAction(f'Пользователь {getUserFullName(user)} пытается создать '
              f'задание с title = "{title}" '
              f'description = "{description}" '
              f'groups = "{groups}" '
              f'additions = "{additions}"')


def addDeleteTaskStartAction(user: UserModel, task_id: int, title: str):
    addAction(f'Пользователь {getUserFullName(user)} пытается удалить '
              f'задание {task_id} с title = "{title}')


def addDeleteTaskEndAction(user: UserModel, task_id: int):
    addAction(f'Пользователь {getUserFullName(user)} успешно удалил '
              f'задание {task_id}')


def addUpdateTaskEndAction(user: UserModel, task_id: int):
    addAction(f'Пользователь {getUserFullName(user)} успешно обновил '
              f'задание {task_id}')


def addAddTaskEndAction(user: UserModel, task_id: int):
    addAction(f'Пользователь {getUserFullName(user)} успешно создал '
              f'задание {task_id}')


def addCreateFolderAction(user: UserModel, folderName: str, path: str):
    addAction(f'Пользователь {getUserFullName(user)} '
              f'успешно создал папку {folderName} по пути {path}')


def addAddFileAction(user: UserModel, fileName: str, path: str):
    addAction(f'Пользователь {getUserFullName(user)} '
              f'успешно создал файл {fileName} '
              f'по пути {path}')


def addDeleteFileStartAction(user: UserModel, fileName: str, path: str):
    addAction(f'Пользователь {getUserFullName(user)} '
              f'пытается удалить файл {fileName}, '
              f'находящийся по пути {path}')


def addDeleteFolderStartAction(user: UserModel, folderName: str, path: str):
    addAction(f'Пользователь {getUserFullName(user)} '
              f'пытается удалить папку {folderName}, '
              f'находящийся по пути {path}')


def addDeleteFileEndAction(user: UserModel, fileName: str):
    addAction(f'Пользователь {getUserFullName(user)} '
              f'успешно удалил {fileName}')

