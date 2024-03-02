from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.settings.config import CLIENT_URL

fastApiServer = FastAPI()

fastApiServer.add_middleware(
    CORSMiddleware,
    allow_origins=[CLIENT_URL],
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP методы
    allow_headers=["*"],  # Разрешаем все заголовки
)
