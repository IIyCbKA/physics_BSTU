FROM postgres:latest

COPY init.sql /docker-entrypoint-initdb.d/

# Открываем порт для подключения к базе данных
EXPOSE 5432