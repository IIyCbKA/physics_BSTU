from typing import Annotated
from src.handlers.schemas import UserModel
from src.application import fastApiServer
from apscheduler.schedulers.background import BackgroundScheduler
from fastapi import Depends
from src.handlers.login import getCurrentEmployee
from fastapi.responses import JSONResponse, StreamingResponse
from src.data.functions.actions import getAllActions, delOldActions
from src.settings.config import ACTIONS_JOURNAL_UPDATE_HOUR


# Планировщик задач
scheduler = BackgroundScheduler()
scheduler.add_job(delOldActions, 'cron', hour=ACTIONS_JOURNAL_UPDATE_HOUR)
scheduler.start()


# Остановка планировщика при завершении работы приложения
@fastApiServer.on_event("shutdown")
def shutdown_event():
    scheduler.shutdown()


# отправляет ответом файл работы с work_file_id равным fileID
@fastApiServer.get('/api/actions/download')
async def handleActionsFileDownloadRequest(
        user: Annotated[UserModel, Depends(getCurrentEmployee)]):
    async def file_iterator():
        yield data

    try:
        data = getAllActions()
        return StreamingResponse(file_iterator())

    except Exception as e:
        return JSONResponse(content={'Error': e}, status_code=500)