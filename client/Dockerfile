# Stage 1: Build the react app
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the react app
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/build /app/build

EXPOSE 3000

CMD ["npx", "serve", "-s", "build", "-l", "3000"]
