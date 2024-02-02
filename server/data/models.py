from sqlalchemy import Column, String, Integer, ARRAY, ForeignKey, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Students(Base):
    __tablename__ = 'students'

    student_id = Column(Integer, primary_key=True, unique=True, nullable=False)
    surname = Column(String(63), nullable=False)
    name = Column(String(63), nullable=False)
    patronymic = Column(String(63), nullable=False)
    group_name = Column(String(15), nullable=False)


class Groups(Base):
    __tablename__ = 'groups'

    group_id = Column(Integer, primary_key=True, autoincrement=True)
    group_name = Column(String(15), nullable=False)
    task_numbers = Column(ARRAY(Integer))


class Tasks(Base):
    __tablename__ = 'tasks'

    task_id = Column(Integer, primary_key=True, autoincrement=True)
    task_name = Column(String(255), nullable=False)


class Files(Base):
    __tablename__ = 'files'

    file_id = Column(Integer, primary_key=True, autoincrement=True)
    file_name = Column(String, nullable=False, unique=True)
    path = Column(String, nullable=False)


class Grades(Base):
    __tablename__ = 'grades'

    grade_id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey('students.student_id'), nullable=False)
    task_id = Column(Integer, ForeignKey('tasks.task_id'), nullable=False)
    grade = Column(String(15), nullable=False)

    __table_args__ = (
        UniqueConstraint('student_id', 'task_id'),
    )
