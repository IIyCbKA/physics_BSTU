from sqlalchemy import (Column, String, Integer, ARRAY, ForeignKey,
                        UniqueConstraint)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from typing import List

Base = declarative_base()


class Users(Base):
    __tablename__ = 'users'

    user_id: Column[int] = Column(Integer, primary_key=True, unique=True,
                                  nullable=False)
    surname: Column[str] = Column(String, nullable=False)
    name: Column[str] = Column(String, nullable=False)
    patronymic: Column[str] = Column(String, nullable=False)
    status: Column[str] = Column(String, nullable=False)


class Groups(Base):
    __tablename__ = 'groups'

    group_id: Column[int] = Column(Integer, primary_key=True,
                                   autoincrement=True)
    group_name: Column[str] = Column(String, nullable=False)


class Students(Base):
    __tablename__ = 'students'

    student_id: Column[int] = Column(Integer, ForeignKey('users.user_id'),
                                     primary_key=True, unique=True,
                                     nullable=False)
    group_id: Column[int] = Column(Integer, ForeignKey('groups.group_id'),
                                   nullable=False)


class Employees(Base):
    __tablename__ = 'employees'

    employee_id: Column[int] = Column(Integer, ForeignKey('users.user_id'),
                                      primary_key=True, unique=True,
                                      nullable=False)


class Tasks(Base):
    __tablename__ = 'tasks'

    task_id: Column[int] = Column(Integer, primary_key=True, autoincrement=True)
    task_name: Column[str] = Column(String, nullable=False)
    task_description: Column[str] = Column(String, nullable=False)
    additions_id: Column[List] = Column(ARRAY(Integer))


class Files(Base):
    __tablename__ = 'files'

    file_id: Column[int] = Column(Integer, primary_key=True, autoincrement=True)
    file_name: Column[str] = Column(String, nullable=False)
    file_type: Column[str] = Column(String, nullable=False)
    path: Column[str] = Column(String, nullable=False)
    __table_args__ = (
        UniqueConstraint('file_name', 'path'),
    )


class Works(Base):
    __tablename__ = 'works'

    work_file_id: Column[int] = Column(Integer, primary_key=True,
                                       autoincrement=True)
    task_id: Column[int] = Column(Integer, ForeignKey('tasks.task_id',
                                                      ondelete='CASCADE'),
                                  nullable=False)
    student_id: Column[int] = Column(Integer, ForeignKey('students.student_id',
                                                         ondelete='CASCADE'),
                                     nullable=False)
    filename: Column[str] = Column(String, nullable=False)


class Grades(Base):
    __tablename__ = 'grades'

    grade_id: Column[int] = Column(Integer, primary_key=True,
                                   autoincrement=True,
                                   nullable=False)
    student_id: Column[int] = Column(Integer, ForeignKey('students.student_id',
                                                         ondelete='CASCADE'),
                                     nullable=False)
    author_id: Column[int] = Column(Integer,
                                    ForeignKey('employees.employee_id',
                                               ondelete='CASCADE'),
                                    nullable=False)
    task_id: Column[int] = Column(Integer, ForeignKey('tasks.task_id',
                                                      ondelete='CASCADE'),
                                  nullable=False)
    grade: Column[str] = Column(String, nullable=False)

    __table_args__ = (
        UniqueConstraint('student_id', 'task_id'),
    )


class Additions(Base):
    __tablename__ = 'additions'

    addition_id: Column[int] = Column(Integer, primary_key=True,
                                      autoincrement=True)
    addition_title: Column[str] = Column(String, nullable=False)
    addition_type: Column[str] = Column(String, nullable=False)


class TasksGroups(Base):
    __tablename__ = 'tasks_groups'

    task_group_id: Column[int] = Column(Integer, primary_key=True)
    task_id: Column[int] = Column(Integer, ForeignKey('tasks.task_id',
                                                      onupdate='CASCADE',
                                                      ondelete='CASCADE'),
                                  nullable=False)
    group_id: Column[int] = Column(Integer, ForeignKey('groups.group_id',
                                                       onupdate='CASCADE',
                                                       ondelete='CASCADE'),
                                   nullable=False)

    task = relationship("Tasks", backref="tasks_groups")
    group = relationship("Groups", backref="tasks_groups")

    def __repr__(self):
        return (f"<TasksGroups(id={self.id}, "
                f"task_id={self.task_id}, group_id={self.group_id})>")
