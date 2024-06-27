FROM python:3.10

# Копирование requirements.txt в контейнер
COPY requirements.txt /app/requirements.txt

# Установка зависимостей
RUN pip install --no-cache-dir -r /app/requirements.txt

# Определение рабочей директории
WORKDIR /app

COPY . /app

EXPOSE 5000

# Запускаем сервер с gunicorn и uvicorn worker
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "src.application:fastApiServer", "--bind", "0.0.0.0:5000", "--workers", "4"]
