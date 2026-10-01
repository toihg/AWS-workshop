---
title: "Triển khai ứng dụng lên Amazon EC2"
date: 2026-01-01
weight: 8
chapter: false
pre: " <b> 3.8. </b> "
---

Sau khi hoàn tất quá trình đóng gói và kiểm thử bằng Docker tại local, các Docker image của hệ thống được đưa lên Amazon Elastic Container Registry (ECR). Amazon EC2 sau đó được cấu hình để tải các image từ ECR và khởi chạy ứng dụng bằng Docker Compose.

---

### 1. Đưa Docker image lên Amazon ECR

Amazon Elastic Container Registry (ECR) được sử dụng để lưu trữ các Docker image của ứng dụng. Hệ thống có ba image tương ứng với ba thành phần:

```text
techmart-backend
techmart-frontend
techmart-nginx
```

Trên máy local, đăng nhập Docker vào ECR:

```bash
aws ecr get-login-password --region ap-southeast-1 | \
docker login --username AWS --password-stdin \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com
```
<p align="center">
  <img src="/images/3-Workshop/3.8/1.png" width="1000">
</p>


Trong đó `<ACCOUNT_ID>` là AWS Account ID của tài khoản triển khai.

Sau khi đăng nhập, các image local được gắn tag theo địa chỉ repository trên ECR.

Đối với Backend:

```bash
docker tag techmart-backend:latest \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-backend:latest
```

Đối với Frontend:

```bash
docker tag techmart-frontend:latest \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-frontend:latest
```

Đối với Nginx:

```bash
docker tag techmart-nginx:latest \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-nginx:latest
```


Tạo Repository trên ECR:

Đối với Backend:

```powershell 
aws ecr create-repository --repository-name techmart-ecommerce --region ap-southeast-1
```

Đối với Frontend:
```powershell
aws ecr create-repository --repository-name techmart-nginx --region ap-southeast-1
```

Đối với nginx:
```powershell
aws ecr create-repository --repository-name techmart-nginx --region ap-southeast-1
```

Sau đó push các image lên ECR:

```bash
docker push \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-backend:latest
```

```bash
docker push \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-frontend:latest
```

```bash
docker push \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-nginx:latest
```

### 2. Cài đặt Docker trên EC2

Sau khi kết nối vào EC2, kiểm tra Docker:

```bash
docker --version
```

Kiểm tra Docker Compose:

```bash
docker compose version
```


Nếu Docker chưa được cài đặt, tiến hành cài đặt Docker và bật Docker service trước khi triển khai ứng dụng.

```bash
sudo dnf install docker -y

sudo mkdir -p /root/.docker/cli-plugins && sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o /root/.docker/cli-plugins/docker-compose && sudo chmod +x /root/.docker/cli-plugins/docker-compose

```

### 4. Xác thực EC2 với Amazon ECR

EC2 sử dụng IAM Role để lấy thông tin xác thực từ ECR:

```bash
aws ecr get-login-password --region ap-southeast-1 | \
docker login --username AWS --password-stdin \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com
```

Sau khi đăng nhập thành công, EC2 có thể tải các Docker image từ ECR.

### 5. Tải Docker image từ ECR

Trên EC2, thực hiện:

```bash
sudo docker pull \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-backend:latest
```

```bash
sudo docker pull \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-frontend:latest
```

```bash
sudo docker pull \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-nginx:latest
```

Kiểm tra các image đã tải:

```bash
sudo docker images
```

Kết quả sẽ bao gồm:

```text
techmart-backend
techmart-frontend
techmart-nginx
```

### 6. Cấu hình Docker Compose trên EC2

Tạo file docker-compose.yml:

```bash
nano docker-compose.yml
```

Docker Compose trên EC2 sử dụng các image được lưu trên ECR:

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
Nhấn **Ctrl O** để lưu file và **Ctrl X** để thoát
### 7. Cấu hình biến môi trường trên EC2

Tạo file `.env` trong thư mục triển khai:

```bash
nano .env
```

Cấu hình thông tin kết nối đến RDS:

```env
DB_HOST=techmart-db.chei8cka8fg4.ap-southeast-1.rds.amazonaws.com
DB_PORT=3306
DB_NAME=ecommerce
DB_USERNAME=admin
DB_PASSWORD=12345678

ADMIN_USERNAME=ADMIN
ADMIN_PASSWORD=toihoang

APP_S3_BUCKET_NAME=techmart-product-images-1204
APP_S3_REGION=ap-southeast-1
APP_S3_PRESIGNED_URL_EXPIRATION_MINUTES=60
```

File `.env` không được đưa lên GitHub vì chứa thông tin xác thực.

### 8. Khởi chạy hệ thống

Khởi chạy toàn bộ container:

```bash
sudo docker compose up -d
```
Kiểm tra trạng thái:

```bash
sudo docker compose ps
```
<p align="center">
  <img src="/images/3-Workshop/3.8/3.png" width="1900">
</p>

