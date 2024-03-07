from minio import Minio
from server.settings.config import *


minio_client = Minio(MINIO_ADR,
                     access_key=MINIO_ACCESS_KEY,
                     secret_key=MINIO_SECRET_KEY,
                     secure=False)
