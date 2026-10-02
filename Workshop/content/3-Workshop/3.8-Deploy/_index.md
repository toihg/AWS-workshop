---
title: "Deploying the Application to Amazon EC2"
date: 2026-01-01
weight: 8
chapter: false
pre: " <b> 3.8. </b> "
---

After completing the packaging and testing process with Docker locally, the system’s Docker images are uploaded to Amazon Elastic Container Registry (ECR). Amazon EC2 is then configured to pull the images from ECR and run the application using Docker Compose.

---

### 1. Push Docker Images to Amazon ECR

Amazon Elastic Container Registry (ECR) is used to store the application’s Docker images. The system has three images corresponding to three components:

```text
techmart-backend
techmart-frontend
techmart-nginx
```

On the local machine, log Docker in to ECR:

```bash
aws ecr get-login-password --region ap-southeast-1 | \
docker login --username AWS --password-stdin \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com
```
<p align="center">
  <img src="/images/3-Workshop/3.7/1.png" width="1000">
</p>


Here, `<ACCOUNT_ID>` is the AWS Account ID of the deployment account.

After logging in, the local images are tagged with the repository address on ECR.

For the Backend:

```bash
docker tag techmart-backend:latest \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-backend:latest
```

For the Frontend:

```bash
docker tag techmart-frontend:latest \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-frontend:latest
```

For Nginx:

```bash
docker tag techmart-nginx:latest \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-nginx:latest
```


Create repositories on ECR:

For the Backend:

```powershell 
aws ecr create-repository --repository-name techmart-ecommerce --region ap-southeast-1
```

For the Frontend:
```powershell
aws ecr create-repository --repository-name techmart-nginx --region ap-southeast-1
```

For nginx:
```powershell
aws ecr create-repository --repository-name techmart-nginx --region ap-southeast-1
```

Then push the images to ECR:

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

### 2. Install Docker on EC2

After connecting to EC2, check Docker:

```bash
docker --version
```

Check Docker Compose:

```bash
docker compose version
```


If Docker is not installed, install Docker and enable the Docker service before deploying the application.

```bash
sudo dnf install docker -y

sudo mkdir -p /root/.docker/cli-plugins && sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o /root/.docker/cli-plugins/docker-compose && sudo chmod +x /root/.docker/cli-plugins/docker-compose

```

### 4. Authenticate EC2 with Amazon ECR

EC2 uses an IAM Role to obtain authentication credentials from ECR:

```bash
aws ecr get-login-password --region ap-southeast-1 | \
docker login --username AWS --password-stdin \
<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com
```

After a successful login, EC2 can pull Docker images from ECR.

### 5. Pull Docker Images from ECR

On EC2, run:

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

Check the downloaded images:

```bash
sudo docker images
```

The result will include:

```text
techmart-backend
techmart-frontend
techmart-nginx
```

### 6. Configure Docker Compose on EC2

Create the docker-compose.yml file:

```bash
nano docker-compose.yml
```

Docker Compose on EC2 uses the images stored in ECR:

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
Press **Ctrl O** to save the file and **Ctrl X** to exit
### 7. Configure Environment Variables on EC2

Create the `.env` file in the deployment directory:

```bash
nano .env
```

Configure the connection information for RDS:

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

The `.env` file must not be uploaded to GitHub because it contains authentication credentials.

### 8. Start the System

Start all containers:

```bash
sudo docker compose up -d
```
Check the status:

```bash
sudo docker compose ps
```
<p align="center">
  <img src="/images/3-Workshop/3.7/3.png" width="1900">
</p>
