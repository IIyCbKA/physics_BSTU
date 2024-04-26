from sqlalchemy import (Column, String, Integer, ARRAY, ForeignKey,
                        UniqueConstraint)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from typing import List

Base = declarative_base()


class Users(Base):
    __tablename__ = 'users'

    user_id: int = Column(Integer, primary_key=True, unique=True,
                          nullable=False)
    surname: str = Column(String(63), nullable=False)
    name: str = Column(String(63), nullable=False)
    patronymic: str = Column(String(63), nullable=False)
    status: str = Column(String(63), nullable=False)


class Groups(Base):
    __tablename__ = 'groups'

    group_id: int = Column(Integer, primary_key=True, autoincrement=True)
    group_name: str = Column(String(15), nullable=False)
    task_numbers: List = Column(ARRAY(Integer))


class Students(Base):
    __tablename__ = 'students'

    student_id: int = Column(Integer, ForeignKey('users.user_id'),
                             primary_key=True, unique=True, nullable=False)
    group_id: int = Column(Integer, ForeignKey('groups.group_id'),
                           nullable=False)


class Employees(Base):
    __tablename__ = 'employees'

    employee_id: int = Column(Integer, ForeignKey('users.user_id'),
                              primary_key=True, unique=True, nullable=False)


class Tasks(Base):
    __tablename__ = 'tasks'

    task_id: int = Column(Integer, primary_key=True, autoincrement=True)
    task_name: str = Column(String(255), nullable=False)
    task_description: str = Column(String, nullable=False)
    additions_id: List = Column(ARRAY(Integer))


class Files(Base):
    __tablename__ = 'files'

    file_id: int = Column(Integer, primary_key=True, autoincrement=True)
    file_name: str = Column(String, nullable=False)
    file_type: str = Column(String, nullable=False)
    path: str = Column(String, nullable=False)
    __table_args__ = (
        UniqueConstraint('file_name', 'path'),
    )


class Works(Base):
    __tablename__ = 'works'

    work_file_id: int = Column(Integer, primary_key=True, autoincrement=True)
    task_id: int = Column(Integer, ForeignKey('tasks.task_id'), nullable=False)
    student_id: int = Column(Integer, ForeignKey('students.student_id'),
                             nullable=False)
    __table_args__ = (
        UniqueConstraint('student_id', 'task_id'),
    )


class Grades(Base):
    __tablename__ = 'grades'

    grade_id: int = Column(Integer, primary_key=True, autoincrement=True,
                           nullable=False)
    student_id: int = Column(Integer, ForeignKey('students.student_id'),
                             nullable=False)
    author_id: int = Column(Integer, ForeignKey('employees.employee_id'),
                            nullable=False)
    task_id: int = Column(Integer, ForeignKey('tasks.task_id'), nullable=False)
    grade: str = Column(String(15), nullable=False)

    __table_args__ = (
        UniqueConstraint('student_id', 'task_id'),
    )


class Additions(Base):
    __tablename__ = 'additions'

    addition_id: int = Column(Integer, primary_key=True, autoincrement=True)
    addition_title: str = Column(String(255), nullable=False)
    addition_type: str = Column(String(255), nullable=False)

class TasksGroups(Base):
    __tablename__ = 'tasks_groups'

    task_group_id = Column(Integer, primary_key=True)
    task_id = Column(Integer, ForeignKey('tasks.task_id',
                                         onupdate='CASCADE',
                                         ondelete='CASCADE'), nullable=False)
    group_id = Column(Integer, ForeignKey('groups.group_id',
                                          onupdate='CASCADE',
                                          ondelete='CASCADE'), nullable=False)

    task = relationship("Tasks", backref="tasks_groups")
    group = relationship("Groups", backref="tasks_groups")

    def __repr__(self):
        return (f"<TasksGroups(id={self.id}, "
                f"task_id={self.task_id}, group_id={self.group_id})>")
