FROM python:3.10

# Копирование requirements.txt в контейнер
COPY requirements.txt /app/requirements.txt

# Установка зависимостей
RUN pip install --no-cache-dir -r /app/requirements.txt

# Определение рабочей директории
WORKDIR /app

COPY . /app

EXPOSE 5000