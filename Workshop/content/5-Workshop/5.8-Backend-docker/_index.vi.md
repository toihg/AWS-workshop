---
title : "Đóng gói và triển khai Backend Spring Boot bằng Docker lên EC2"
date : 2026-01-01
weight : 8
chapter : false
pre : " <b> 5.8. </b> "
---

### Mục tiêu

Sau khi hoàn thành việc cấu hình mạng và cơ sở dữ liệu, tiến hành triển khai Backend của hệ thống TechMart lên Amazon EC2. Backend được xây dựng bằng Spring Boot và đóng gói dưới dạng Docker Container. EC2 được đặt trong Public Subnet để có thể kết nối và kiểm tra ứng dụng từ máy Windows 11.

---

### 1. Khởi tạo EC2 Instance

Truy cập ***AWS Console → EC2 → Instances → Launch instances*** để tạo máy chủ cho Backend.

Các thông số cấu hình:

* Name: TechMart-Backend-EC2
* AMI: Amazon Linux 2023
* Instance type: t3.micro
* Key pair: Chọn ***Create new key pair*** -> nhập t"Key pair name" -> ***Key pair type*** chọn ***RSA*** -> ***Private key file format*** chọn .ppk
* VPC: TechMart-VPC
* Subnet: TechMart-Public-Subnet
* Auto-assign Public IP: Enable
* Security Group: TechMart-EC2-SG

Chọn ***Launch instance***

Instance được tạo thành công

<p align="center">
  <img src="/images/5-Workshop/5.7-backend-docker/instance.png" width="1900">
</p>

### 2. Kết nối EC2 bằng PuTTY

Sau khi EC2 được khởi tạo, mở ***PuTTY*** trên Windows 11.

Tại mục ***Session***, nhập:

* Host Name: ec2-user@<địa chỉ ipv4 public của EC2>
* Port: 22
* Connection type: SSH

Tiếp theo vào:

<pre>
Connection
└── SSH
    └── Auth
        └── Credentials
</pre>

Tại ***Private key file for authentication***, chọn file key pair vừa tải về.

Sau đó quay lại ***Session*** và nhấn ***Open***.

Nếu kết nối thành công, terminal sẽ hiển thị môi trường Amazon Linux 2023 như sau:

<p align="center">
  <img src="/images/5-Workshop/5.7-backend-docker/putty.png" width="600">
</p>

### 3. Cài đặt Docker trên EC2

Sau khi kết nối thành công đến EC2 bằng PuTTY, tiến hành cài đặt Docker trên máy chủ Amazon Linux 2023.

Cập nhật các gói hệ thống:

```powershell
sudo dnf update -y
```

Cài đặt Docker:

```powershell
sudo dnf install docker -y
```

Khởi động Docker:

```powershell
sudo systemctl start docker
```

Thiết lập Docker tự động khởi động khi EC2 khởi động:

```powershell
sudo systemctl enable docker
```

Kiểm tra Docker:

```powershell
docker --version
```

Cấp quyền sử dụng Docker cho tài khoản ec2-user:

```powershell
sudo usermod -aG docker ec2-user
```

Sau khi thực hiện lệnh trên, thoát khỏi phiên kết nối:

```powershell
exit
``` 

### 4. Tạo Dockerfile cho Spring Boot

Tạo file `Dockerfile` trong thư mục Backend:

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

Dockerfile sử dụng Java 21 để phù hợp với phiên bản Java của Backend Spring Boot.

### 5. Build Docker Image trên Windows 11

Mở PowerShell tại thư mục Backend:

```powershell
docker build -t techmart-backend .
```

Kiểm tra Docker Image:

```powershell
docker images
```

Sau khi build thành công, Image `techmart-backend` được tạo trên máy Windows.

<p align="center">
  <img src="/images/5-Workshop/5.7-backend-docker/images.png" width="900">
</p>

### 6. Tạo Amazon ECR Repository

Truy cập:

**AWS Console → Amazon ECR → Repositories → Create repository**

Thiết lập:

* Repository name: `techmart-backend`
* Các tùy chọn còn lại giữ mặc định.

<p align="center">
  <img src="/images/5-Workshop/5.7-backend-docker/create_repo.png" width="900">
</p>

Chọn **Create repository**.

### 7. Đăng nhập Amazon ECR và Push Image

Trước tiên đăng nhập AWS CLI trên Windows.

Sau đó thực hiện đăng nhập vào Amazon ECR:

```powershell
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 215038507979.dkr.ecr.ap-southeast-1.amazonaws.com
```

Nếu thành công:

```text
Login Succeeded
```

Gắn Tag cho Docker Image:

```powershell
docker tag techmart-backend:latest 215038507979.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-backend:latest
```

Push Image lên ECR:

```powershell
docker push 215038507979.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-backend:latest
```

Sau khi hoàn thành, truy cập:

**Amazon ECR → Repositories → techmart-backend**

để kiểm tra Image đã được tải lên.

<p align="center">
  <img src="/images/5-Workshop/5.7-backend-docker/image.png" width="900">
</p>

### 8. Đăng nhập Amazon ECR trên EC2

Kết nối đến EC2 bằng PuTTY.

EC2 sử dụng IAM Role `TechMart-EC2-Role` để thực hiện các thao tác với Amazon ECR.

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

### 9. Tải Docker Image từ ECR về EC2

Thực hiện:

```bash
docker pull 215038507979.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-backend:latest
```

Sau khi tải thành công, kiểm tra Image:

```bash
docker images
```

<p align="center">
  <img src="/images/5-Workshop/5.7-backend-docker/putty2.png" width="900">
</p>

### 10. Chạy Backend Container trên EC2

Backend sử dụng:

* Amazon RDS MySQL làm cơ sở dữ liệu.
* Amazon S3 lưu trữ hình ảnh sản phẩm.
* S3 sử dụng Presigned URL để cung cấp quyền truy cập tạm thời vào hình ảnh.

Do đó, khi chạy Container trên EC2 cần truyền các thông tin cấu hình thông qua Environment Variables.

Trước tiên nếu đang tồn tại Container cũ:

```bash
docker stop techmart-backend
docker rm techmart-backend
```

Sau đó chạy Container mới:

```bash
docker run -d \
  --name techmart-backend \
  -p 8080:8080 \
  -e SPRING_DATASOURCE_URL="jdbc:mysql://techmart-db.chei8cka8fg4.ap-southeast-1.rds.amazonaws.com:3306/ecommerce?useSSL=false&serverTimezone=Asia/Ho_Chi_Minh&allowPublicKeyRetrieval=true" \
  -e SPRING_DATASOURCE_USERNAME="admin" \
  -e SPRING_DATASOURCE_PASSWORD="RDS_PASSWORD" \
  -e APP_S3_BUCKET_NAME="techmart-product-images-1204" \
  -e APP_S3_REGION="ap-southeast-1" \
  215038507979.dkr.ecr.ap-southeast-1.amazonaws.com/techmart-backend:latest
```

Trong đó:

* `SPRING_DATASOURCE_URL`: Endpoint của Amazon RDS.
* `SPRING_DATASOURCE_USERNAME`: Tài khoản MySQL.
* `SPRING_DATASOURCE_PASSWORD`: Mật khẩu RDS.
* `APP_S3_BUCKET_NAME`: Tên S3 Bucket chứa hình ảnh sản phẩm.
* `APP_S3_REGION`: Region của S3.

Cách cấu hình này giúp Backend sử dụng RDS và S3 trên AWS mà không cần thay đổi mã nguồn khi chuyển từ môi trường Local sang EC2.

### 11. Kiểm tra Backend Container

Kiểm tra trạng thái Container:

```bash
docker ps
```

Nếu Backend hoạt động, Container có trạng thái:

```text
Up
```

Kiểm tra log:

```bash
docker logs techmart-backend
```

Có thể theo dõi log trong thời gian thực:

```bash
docker logs -f techmart-backend
```

Backend khởi động thành công khi xuất hiện các dòng tương tự:

```text
Tomcat started on port 8080
Started EcommerceApplication
```

<p align="center">
  <img src="/images/5-Workshop/5.7-backend-docker/spring.png" width="900">
</p>

### 12. Kiểm tra kết nối Backend với RDS

Backend trên EC2 kết nối đến Amazon RDS thông qua mạng riêng trong VPC.

Kiểm tra API:

```text
http://<EC2-PUBLIC-IP>:8080/api/products
```

Nếu API trả về danh sách sản phẩm từ cơ sở dữ liệu, chứng tỏ Backend đã kết nối thành công với RDS.

<p align="center">
  <img src="/images/5-Workshop/5.7-backend-docker/product-api.png" width="1200">
</p>

### 13. Kiểm tra hình ảnh sản phẩm trên Amazon S3

Trong kết quả API `/api/products`, trường `image` chứa Presigned URL được Backend tạo từ S3.

Ví dụ:

```json
{
  "name": "iPhone 15",
  "image": "https://techmart-product-images-1204.s3.ap-southeast-1.amazonaws.com/products/iPhone%2015.jpg?... "
}
```

URL có thời hạn sử dụng được cấu hình thông qua:

```properties
app.s3.presigned-url-expiration-minutes=60
```

Điều này cho phép Bucket S3 được giữ ở chế độ riêng tư nhưng Frontend vẫn có thể hiển thị hình ảnh sản phẩm.

### 14. Kiểm tra API đăng nhập Admin

Trên máy Windows 11, sử dụng Postman hoặc công cụ kiểm thử API để gửi:

```text
POST http://<EC2-PUBLIC-IP>:8080/api/admin/login
```

Body:

```json
{
  "username": "ADMIN",
  "password": "toihoang"
}
```

Nếu API trả về thông tin tài khoản Admin, Backend đã được triển khai và hoạt động thành công trên EC2.

### 15. Kết quả triển khai

Sau khi hoàn thành, kiến trúc Backend của TechMart hoạt động theo mô hình:

```text
Windows 11
     │
     │ HTTP
     ▼
Amazon EC2
     │
     └── Docker Container
            │
            └── Spring Boot :8080
                  │
                  ├──────────────► Amazon RDS
                  │                  MySQL
                  │
                  └──────────────► Amazon S3
                                     Product Images
                                     Presigned URL
```

Backend được đóng gói bằng Docker, lưu trữ trên Amazon ECR và triển khai trên Amazon EC2. Ứng dụng sử dụng Amazon RDS để lưu trữ dữ liệu và Amazon S3 để lưu trữ hình ảnh sản phẩm.
