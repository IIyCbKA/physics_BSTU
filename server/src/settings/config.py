from dotenv import load_dotenv
import os

load_dotenv()

PATH_FILES_DIRECTORY = os.path.join(os.path.dirname(os.getcwd()), 'files/')
DB_USER = os.environ.get("POSTGRES_USER")
DB_PASS = os.environ.get("POSTGRES_PASSWORD")
DB_HOST = os.environ.get("POSTGRES_HOST")
DB_PORT = os.environ.get("POSTGRES_PORT")
DB_NAME = os.environ.get("POSTGRES_DB")

CLIENT_URL = os.environ.get("CLIENT_URL")

MINIO_ADR = os.environ.get("MINIO_ADR")
MINIO_ACCESS_KEY = os.environ.get("MINIO_ACCESS_KEY")
MINIO_SECRET_KEY = os.environ.get("MINIO_SECRET_KEY")

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.environ.get("REFRESH_TOKEN_EXPIRE_DAYS"))

ACTIONS_JOURNAL_UPDATE_HOUR = int(os.environ.get("ACTIONS_JOURNAL_UPDATE_HOUR"))
ACTIONS_JOURNAL_RECORDS_EXIST_TIME = int(os.environ.get(
    "ACTIONS_JOURNAL_RECORDS_EXIST_TIME"))
