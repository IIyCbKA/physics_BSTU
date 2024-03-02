from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.settings.config import CLIENT_URL

fastApiServer = FastAPI()

# Разрешаем CORS для всех доменов (настраивайте по необходимости)
fastApiServer.add_middleware(
    CORSMiddleware,
    allow_origins=[CLIENT_URL],  # Разрешаем доступ с любых доменов
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP методы
    allow_headers=["*"],  # Разрешаем все заголовки
)


@fastApiServer.get('/api/temp/')
async def filesList():

    return {'asd': 45}, 200
