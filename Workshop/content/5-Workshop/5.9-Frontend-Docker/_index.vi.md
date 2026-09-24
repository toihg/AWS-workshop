---
title: "Đóng gói và triển khai Frontend Next.js bằng Docker lên EC2"
date: 2026-01-01
weight: 9
chapter: false
pre: "<b> 5.9. </b>"
---

### Mục tiêu

Sau khi triển khai thành công Backend, tiến hành đóng gói và triển khai Frontend của hệ thống TechMart lên Amazon EC2.

Frontend được xây dựng bằng Next.js và đóng gói dưới dạng Docker Container. Frontend sẽ gọi các API từ Backend thông qua địa chỉ Elastic IP của EC2.

---

### 1. Tạo Dockerfile cho Frontend

Tạo file `Dockerfile` trong thư mục Frontend:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
```

Dockerfile sử dụng Node.js 20 để xây dựng và chạy ứng dụng Next.js.

Quá trình build được thực hiện trong một Docker image trung gian. Sau khi build thành công, các file cần thiết được sao chép sang image chạy ứng dụng.

---

### 2. Build Docker Image trên Windows 11

Mở PowerShell tại thư mục Frontend:

```powershell
docker build -t techmart-frontend .
```

Kiểm tra Docker Image:

```powershell
docker images
```

Sau khi build thành công, Image `techmart-frontend` được tạo trên máy Windows.

<p align="center">
  <img src="/images/5-Workshop/5.8-frontend-docker/images.png" width="900">
</p>

---

### 3. Kiểm tra Frontend Container trên Windows

Trước khi đưa Image lên Amazon ECR, có thể kiểm tra Container trên máy Windows:

```powershell
docker run -d `
  --name techmart-frontend `
  -p 3000:3000 `
  techmart-frontend
```

Kiểm tra Container:

```powershell
docker ps
```

Nếu Container hoạt động, truy cập:

```text
http://localhost:3000
```

Kiểm tra giao diện, danh sách sản phẩm và hình ảnh sản phẩm.

Sau khi kiểm tra hoàn tất, dừng và xóa Container:

```powershell
docker stop techmart-frontend
docker rm techmart-frontend
```

---

### 4. Tạo Amazon ECR Repository

Truy cập:

**AWS Console → Amazon ECR → Repositories → Create repository**

Thiết lập:

* Repository name: `techmart-frontend`

* Các tùy chọn còn lại giữ mặc định.

<p align="center">
  <img src="/images/5-Workshop/5.8-frontend-docker/create_repo.png" width="900">
</p>

Chọn **Create repository**.

---

### 5. Đăng nhập Amazon ECR

Trên Windows 11, đăng nhập Amazon ECR bằng AWS CLI:

```powershell
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 215038507979.dkr.ecr.ap-southeast-1.amazonaws.com
```

Nếu đăng nhập thành công:

```text
Login Succeeded
```

---

### 6. Gắn Tag cho Frontend Image

Gắn Tag cho Docker Image:

```powershell
docker tag techmart-frontend:latest 215038507979.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-frontend:latest
```

Kiểm tra Image:

```powershell
docker images
```

---

### 7. Push Frontend Image lên Amazon ECR

Thực hiện:

```powershell
docker push 215038507979.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-frontend:latest
```

Sau khi Push thành công, truy cập:

**Amazon ECR → Repositories → techmart-frontend**

để kiểm tra Image.

<p align="center">
  <img src="/images/5-Workshop/5.8-frontend-docker/repo.png" width="900">
</p>

---

### 8. Đăng nhập Amazon ECR trên EC2

Kết nối đến EC2 bằng PuTTY.

EC2 sử dụng IAM Role `TechMart-EC2-Role` để truy cập Amazon ECR.

Kiểm tra IAM Role:

```bash
aws sts get-caller-identity
```

Sau đó đăng nhập ECR:

```bash
aws ecr get-login-password --region ap-southeast-1 | \
docker login --username AWS --password-stdin \
215038507979.dkr.ecr.ap-southeast-1.amazonaws.com
```

Nếu thành công:

```text
Login Succeeded
```

---

### 9. Tải Frontend Image từ ECR về EC2

Thực hiện:

```bash
docker pull 215038507979.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-frontend:latest
```

Kiểm tra Image:

```bash
docker images
```

<p align="center">
  <img src="/images/5-Workshop/5.8-frontend-docker/images2.png" width="900">
</p>

---

### 11. Chạy Frontend Container trên EC2

Nếu đang tồn tại Container cũ:

```bash
docker stop techmart-frontend
docker rm techmart-frontend
```

Sau đó chạy Container:

```bash
docker run -d \
  --name techmart-frontend \
  -p 3000:3000 \
  215038507979.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-frontend:latest
```

Trong đó:

* `--name techmart-frontend`: đặt tên cho Container.
* `-p 3000:3000`: ánh xạ cổng 3000 của EC2 vào cổng 3000 của Container.
* `techmart-frontend:latest`: Docker Image được tải từ Amazon ECR.

---

### 12. Kiểm tra Frontend Container

Kiểm tra trạng thái Container:

```bash
docker ps
```

Nếu Frontend hoạt động, Container sẽ có trạng thái:

```text
Up
```

Kiểm tra log:

```bash
docker logs techmart-frontend
```

Có thể theo dõi log trong thời gian thực:

```bash
docker logs -f techmart-frontend
```

Nếu ứng dụng khởi động thành công, Next.js sẽ hiển thị thông tin tương tự:

```text
Ready in ...
Local: http://localhost:3000
```

<p align="center">
  <img src="/images/5-Workshop/5.8-frontend-docker/status.png" width="1900">
</p>

---

### 13. Truy cập Frontend từ máy Windows 11

Sau khi Container hoạt động, mở trình duyệt trên Windows 11 và truy cập:

```text
http://<ELASTIC-IP>:3000
```

Nếu trang TechMart hiển thị thành công, Frontend đã được triển khai trên EC2.

<p align="center">
  <img src="/images/5-Workshop/5.8-frontend-docker/frontend.png" width="1400">
</p>

---

### 14. Kiểm tra Frontend kết nối với Backend

Sau khi truy cập Frontend, kiểm tra các chức năng:

* Hiển thị danh sách sản phẩm.
* Hiển thị thông tin sản phẩm.
* Hiển thị hình ảnh sản phẩm từ Amazon S3.
* Đăng nhập Admin.
* Gửi request đến Backend.

Frontend gửi request đến:

```text
http://<ELASTIC-IP>:8080/api
```

Backend tiếp nhận request và truy vấn dữ liệu từ Amazon RDS.

Đối với hình ảnh sản phẩm, Backend tạo Presigned URL từ Amazon S3 và trả URL về cho Frontend.

Mô hình hoạt động:

```text
Frontend
    │
    │ HTTP :8080
    ▼
Backend Spring Boot
    │
    ├──────────────► Amazon RDS
    │                 MySQL
    │
    └──────────────► Amazon S3
                      Product Images
                      Presigned URL
```

---

### 15. Kết quả triển khai

Sau khi hoàn thành, hệ thống TechMart được triển khai theo mô hình:

```text
Windows 11 / Web Browser
          │
          │ HTTP :3000
          ▼
    Amazon EC2
          │
          ├── Docker Container
          │      └── Next.js Frontend :3000
          │
          └── Docker Container
                 └── Spring Boot Backend :8080
                          │
                          ├──────────────► Amazon RDS
                          │                 MySQL
                          │
                          └──────────────► Amazon S3
                                            Product Images
                                            Presigned URL
```

Frontend được đóng gói bằng Docker, lưu trữ trên Amazon ECR và triển khai trên Amazon EC2. Frontend sử dụng Elastic IP để kết nối đến Backend và cung cấp giao diện cho người dùng. Backend tiếp tục xử lý dữ liệu từ Amazon RDS và cung cấp hình ảnh sản phẩm thông qua Presigned URL của Amazon S3.

Hệ thống sau khi triển khai hoàn chỉnh có thể được truy cập thông qua:

```text
Frontend:
http://<ELASTIC-IP>:3000

Backend:
http://<ELASTIC-IP>:8080/api
```
