---
title : "Đóng gói ứng dụng bằng Docker"
date : 2026-01-01
weight : 7
chapter : false
pre : " 3.7 "
---

## Đóng gói ứng dụng bằng Docker tại local

Sau khi hoàn thành quá trình phát triển và kiểm thử ứng dụng, hệ thống được đóng gói bằng Docker để tạo môi trường triển khai thống nhất. Ứng dụng TechMart được chia thành ba thành phần chính gồm Frontend, Backend và Nginx.

Cấu trúc triển khai Docker tại local:

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

### 1. Đóng gói Backend

Backend được xây dựng bằng Spring Boot và sử dụng Maven. Dockerfile sử dụng mô hình multi-stage build. Ở giai đoạn đầu, Maven được sử dụng để biên dịch mã nguồn và tạo file `.jar`. Ở giai đoạn sau, ứng dụng được chạy trên JRE 21 nhằm giảm kích thước image và chỉ giữ lại các thành phần cần thiết để chạy ứng dụng.

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

Tiến hành build image:

```bash
cd ecommerce
docker build -t techmart-backend:latest .
```

Sau khi hoàn tất, image `techmart-backend:latest` được tạo và sử dụng làm image cho container Backend.

### 2. Đóng gói Frontend

Frontend được xây dựng bằng Next.js. Dockerfile sử dụng hai giai đoạn: giai đoạn `builder` cài đặt dependencies và build ứng dụng, sau đó giai đoạn runtime chạy ứng dụng ở chế độ production.

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

Build image:

```bash
cd Frontend
docker build -t techmart-frontend:latest .
```

Image sau khi tạo được sử dụng để chạy Frontend trên cổng `3000` bên trong Docker network.

### 3. Đóng gói Nginx

Nginx được sử dụng làm Reverse Proxy và là điểm truy cập chính của hệ thống. Nginx tiếp nhận request từ người dùng và chuyển tiếp request đến Frontend hoặc Backend tương ứng.

Cấu hình Nginx sử dụng tên service Docker để giao tiếp giữa các container:

```
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
Dockerfile của nginx

```dockerfile
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Docker image của Nginx được tạo bằng:

```bash
cd nginx
docker build -t techmart-nginx:latest .
```

Kiểm tra các images sau khi build

```bash
docker images
```

<p align="center">
  <img src="/images/3-Workshop/3.7/images.png" width="1900">
</p>

### 4. Cấu hình biến môi trường

Các thông tin phụ thuộc vào môi trường triển khai không được ghi cố định trong Docker image. Các thông tin như thông tin kết nối cơ sở dữ liệu, tài khoản quản trị và thông tin S3 được truyền thông qua biến môi trường.

File `.env` được đặt cùng thư mục với `docker-compose.yml`.

```
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

### 5. Khởi chạy toàn bộ hệ thống bằng Docker Compose

Sau khi tạo ba Docker image, Docker Compose được sử dụng để khởi chạy toàn bộ hệ thống.

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

Khởi chạy:

```bash
docker compose up -d
```

Kiểm tra trạng thái các container:

```bash
docker compose ps
```

Kết quả yêu cầu:

```text
techmart-nginx
techmart-frontend
techmart-backend
```

cùng ở trạng thái `Up`.

<p align="center">
  <img src="/images/3-Workshop/3.7/up.png" width="1900">
</p>