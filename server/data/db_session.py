from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('postgresql://admin:qwerty@localhost:5432/postgres', echo=True)
connect = sessionmaker(bind=engine)
db = connect()
declarative_base().metadata.create_all(engine)
