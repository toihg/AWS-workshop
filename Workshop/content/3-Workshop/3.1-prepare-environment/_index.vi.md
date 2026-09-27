---
title : "Chuẩn bị môi trường"
date : 2026-09-25
weight : 1
chapter : false
pre : " <b> 3.1. </b> "
---

### Mục tiêu

Phần này hướng dẫn chuẩn bị môi trường cần thiết để phát triển và triển
khai hệ thống TechMart trên Windows 11. Các công cụ bao gồm Java, Maven,
Node.js, Git, Visual Studio Code và Docker.

Ngoài ra, cần chuẩn bị tài khoản AWS và GitHub để thực hiện các bước cấu
hình hạ tầng, xây dựng Docker Image, lưu trữ Image trên Amazon ECR và
triển khai ứng dụng lên Amazon EC2.

------------------------------------------------------------------------

## 1. Yêu cầu môi trường

Máy tính sử dụng trong workshop cần đáp ứng:

-   Hệ điều hành: Windows 11 64-bit, Linux hoặc MacOS.

-   RAM: tối thiểu 8GB, khuyến nghị 16GB.

-   Dung lượng ổ đĩa: tối thiểu 20GB trống.

-   Kết nối Internet ổn định.

-   Có quyền cài đặt phần mềm và sử dụng Docker.

-   Có trình duyệt web để truy cập AWS Management Console.

------------------------------------------------------------------------

## 2. Các công cụ cần cài đặt

### 2.1. Java và Maven

Backend được phát triển bằng Spring Boot, sử dụng Java và Maven.

Sau khi cài đặt Java JDK, mở **PowerShell** và kiểm tra:

``` powershell
java --version
```

Kiểm tra Maven:

``` powershell
mvn -version
```

Nếu các lệnh trên trả về thông tin phiên bản, Java và Maven đã được cài
đặt thành công.

<p align="center">
  <img src="/images/3-Workshop/3.1/java_maven-version.png" width="900">
</p>

### 2.2. Node.js và npm

Frontend được phát triển bằng Next.js, sử dụng Node.js và npm.

Kiểm tra phiên bản:

``` powershell
node -v
npm -v
```

Nếu các lệnh trên trả về thông tin phiên bản, Node.js và npm đã sẵn
sàng.

<p align="center">
  <img src="/images/3-Workshop/3.1/node_npm-version.png" width="900">
</p>

### 2.3. Git

Git được sử dụng để quản lý mã nguồn và kết nối với GitHub.

Kiểm tra Git:

``` powershell
git --version
```

Cấu hình thông tin Git:

``` powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Kiểm tra lại cấu hình:

``` powershell
git config --global --list
```

Thông tin **user.name** và **user.email** sẽ được sử dụng khi tạo commit.

<p align="center">
  <img src="/images/3-Workshop/3.1/git-version.png" width="900">
</p>

### 2.4. Visual Studio Code

Visual Studio Code được sử dụng làm môi trường phát triển cho Frontend
và Backend.

Sau khi cài đặt, mở Visual Studio Code để kiểm tra môi trường phát triển
và mở thư mục chứa mã nguồn TechMart.

<p align="center">
  <img src="/images/3-Workshop/3.1/vscode.png" width="900">
</p>

### 2.5. Docker Desktop

Docker được sử dụng để đóng gói Frontend Next.js và Backend Spring Boot
thành Docker Image trước khi triển khai lên Amazon EC2.

Sau khi cài đặt Docker Desktop, mở PowerShell và kiểm tra:

``` powershell
docker --version
```

Kiểm tra Docker Compose:

``` powershell
docker compose version
```

Nếu các lệnh trên trả về thông tin phiên bản, Docker đã được cài đặt thành công.

<p align="center">
  <img src="/images/3-Workshop/3.1/docker.png" width="900">
</p>

------------------------------------------------------------------------

## 3. Chuẩn bị tài khoản AWS

Cần có tài khoản AWS để thực hiện các bước triển khai hệ thống.

Các dịch vụ AWS được sử dụng trong workshop:

-   Amazon VPC
-   Internet Gateway
-   NAT Gateway
-   Elastic IP
-   Application Load Balancer
-   Amazon EC2
-   Amazon RDS for MySQL
-   Amazon S3
-   Amazon ECR
-   Amazon Route 53
-   AWS IAM
-   AWS Secrets Manager
-   Amazon CloudWatch

Tài khoản AWS cần có quyền phù hợp để tạo và cấu hình các tài nguyên
trên.

------------------------------------------------------------------------

## 4. Chuẩn bị mã nguồn

Mã nguồn được lưu trữ trên Github ở repository, tiến hành clone mã nguồn

```powershell
git clone https://github.com/toihg/AWS-workshop.git
```
Sau khi clone thành công, mã nguồn sẽ được tải về máy.

<p align="center">
  <img src="/images/3-Workshop/3.1/clone_code.png" width="900">
</p>

------------------------------------------------------------------------

## 6. Kiểm tra ứng dụng

### 6.1. Kiểm tra Backend

Di chuyển vào thư mục Backend:

``` powershell
cd ecommerce
```

Build project:

``` powershell
mvn clean package
```

Chạy ứng dụng:

``` powershell
mvn spring-boot:run
```
Springboot khởi chạy thành công

<p align="center">
  <img src="/images/3-Workshop/3.1/backend_run.png" width="900">
</p>

### 6.2. Kiểm tra Frontend

Mở một cửa sổ PowerShell mới và di chuyển vào thư mục Frontend:

``` powershell
cd frontend
```

Cài đặt các thư viện:

``` powershell
npm install
```

Chạy ứng dụng:

``` powershell
npm run dev
```

Frontend mặc định chạy tại:

``` text
http://localhost:3000
```

Mở địa chỉ trên bằng trình duyệt để kiểm tra giao diện Frontend.

<p align="center">
  <img src="/images/3-Workshop/3.1/frontend_run.png" width="900">
</p>

------------------------------------------------------------------------

## 9. Kết quả

Sau khi hoàn thành phần này:

-   Java và Maven đã được cài đặt.

-   Node.js và npm đã sẵn sàng.

-   Git và GitHub được cấu hình.

-   Visual Studio Code được cài đặt.

-   Docker Desktop được cài đặt.

-   Tài khoản AWS đã được chuẩn bị.

-   Backend Spring Boot có thể chạy trên môi trường local.

-   Frontend Next.js có thể chạy trên môi trường local.