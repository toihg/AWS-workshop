---
title : "Package the Application with Docker"
date : 2026-01-01
weight : 7
chapter : false
pre : " 3.7 "
---

## Package the Application with Docker Locally

After completing application development and testing, package the system with Docker to create a consistent deployment environment. The TechMart application consists of three main components: Frontend, Backend, and Nginx.

The local Docker deployment has the following structure:

```text
TechMart
├── Frontend
│   └── Dockerfile
├── ecommerce
│   └── Dockerfile
├── nginx
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── .env
```

### 1. Package the Backend

The backend is built with Spring Boot and Maven. Its Dockerfile uses a multi-stage build. In the first stage, Maven compiles the source code and creates a `.jar` file. In the runtime stage, the application runs on JRE 21, reducing the image size by including only the components required to run the application.

```dockerfile
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

Build the image:

```bash
cd ecommerce
docker build -t techmart-backend:latest .
```

After the build completes, the `techmart-backend:latest` image is ready to be used for the Backend container.

### 2. Package the Frontend

The frontend is built with Next.js. Its Dockerfile uses two stages: the `builder` stage installs dependencies and builds the application, and the runtime stage runs the application in production mode.

```dockerfile
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG NEXT_PUBLIC_API_URL=http://backend:8080
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["sh", "-c", "npx next start -H 0.0.0.0 -p 3000"]
```

Build the image:

```bash
cd Frontend
docker build -t techmart-frontend:latest .
```

The resulting image runs the Frontend on port `3000` inside the Docker network.

### 3. Package Nginx

Nginx acts as the reverse proxy and the system's main entry point. It receives requests from users and forwards them to the Frontend or Backend as appropriate.

The Nginx configuration uses Docker service names for communication between containers:

```nginx
events {}

http {
  client_max_body_size 20M;

    upstream frontend {
        server frontend:3000;
    }

    upstream backend {
        server backend:8080;
    }

    server {
        listen 80;

        location /api/ {
            proxy_pass http://backend;

            proxy_http_version 1.1;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location / {
            proxy_pass http://frontend;

            proxy_http_version 1.1;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

The Nginx Dockerfile:

```dockerfile
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Build the Nginx image:

```bash
cd nginx
docker build -t techmart-nginx:latest .
```

Check the images after the build:

```bash
docker images
```

<p align="center">
  <img src="/images/3-Workshop/3.7/images.png" width="1900">
</p>

### 4. Configure Environment Variables

Values that depend on the deployment environment should not be hard-coded in the Docker image. Database connection details, administrator credentials, and S3 settings are passed through environment variables.

Place the `.env` file in the same directory as `docker-compose.yml`.

```text
DB_HOST=techmart-db.chei8cka8fg4.ap-southeast-1.rds.amazonaws.com
DB_PORT=3306
DB_NAME=ecommerce
DB_USERNAME=admin
DB_PASSWORD=matkhau

ADMIN_USERNAME=ADMIN
ADMIN_PASSWORD=matkhau

APP_S3_BUCKET_NAME=techmart-product-images-1204
APP_S3_REGION=ap-southeast-1
APP_S3_PRESIGNED_URL_EXPIRATION_MINUTES=60
```

### 5. Start the Entire System with Docker Compose

After creating the three Docker images, use Docker Compose to start the entire system.

```yaml
services:
  nginx:
    build:
      context: ./nginx
      dockerfile: Dockerfile
    image: techmart-nginx:latest
    container_name: techmart-nginx
    ports:
      - "80:80"
    depends_on:
      - frontend
      - backend
    restart: unless-stopped

  frontend:
    build:
      context: ./Frontend
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_API_URL: http://backend:8080/api
    image: techmart-frontend:latest
    container_name: techmart-frontend
    environment:
      NEXT_PUBLIC_API_URL: http://backend:8080/api
      API_URL: http://backend:8080/api
      NEXT_PUBLIC_BASE_URL: http://backend:8080/api
    expose:
      - "3000"
    restart: unless-stopped

  backend:
    build:
      context: ./ecommerce
      dockerfile: Dockerfile
    image: techmart-backend:latest
    container_name: techmart-backend
    extra_hosts:
      - "host.docker.internal:host-gateway"
    ports:
      - "8080:8080"
    expose:
      - "8080"
    environment:
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_NAME: ${DB_NAME}
      DB_USERNAME: ${DB_USERNAME}
      DB_PASSWORD: ${DB_PASSWORD}
      ADMIN_USERNAME: ${ADMIN_USERNAME:-ADMIN}
      ADMIN_PASSWORD: ${ADMIN_PASSWORD:-toihoang}
      APP_S3_BUCKET_NAME: ${APP_S3_BUCKET_NAME}
      APP_S3_REGION: ${APP_S3_REGION:-ap-southeast-1}
      APP_S3_PRESIGNED_URL_EXPIRATION_MINUTES: ${APP_S3_PRESIGNED_URL_EXPIRATION_MINUTES:-60}
    restart: unless-stopped
```

Start the services:

```bash
docker compose up -d
```

Check the container status:

```bash
docker compose ps
```

The following containers should be in the `Up` state:

```text
techmart-nginx
techmart-frontend
techmart-backend
```

<p align="center">
  <img src="/images/3-Workshop/3.7/up.png" width="1900">
</p>