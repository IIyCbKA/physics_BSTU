from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from src.settings.config import *

DATABASE_URL = f'postgresql+psycopg2://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}'


engine = create_engine(DATABASE_URL, echo=True)
connect = sessionmaker(bind=engine)
db = connect()
declarative_base().metadata.create_all(engine)
