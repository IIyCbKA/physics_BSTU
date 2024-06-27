FROM node:20

# Указываем рабочую директорию в контейнере
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем фронтенд-приложение
RUN npm run build

# Экспонируем порт
EXPOSE 3000

CMD ["npm", "start"]
