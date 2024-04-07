FROM postgres:latest

COPY db_markup.sql /docker-entrypoint-initdb.d/

# Открываем порт для подключения к базе данных
EXPOSE 5433