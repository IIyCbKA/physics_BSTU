from dotenv import load_dotenv
import os

load_dotenv()

PATH_FILES_DIRECTORY = os.path.join(os.path.dirname(os.getcwd()), 'files/')
DB_USER = os.environ.get("DB_USER")
DB_PASS = os.environ.get("DB_PASSWORD")
DB_HOST = os.environ.get("DB_HOST")
DB_PORT = os.environ.get("DB_PORT")
DB_NAME = os.environ.get("DB_NAME")
