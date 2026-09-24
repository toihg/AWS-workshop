---
title : "Chuẩn bị môi trường phát triển"
date : 2026-01-01
weight : 2
chapter : false
pre : " <b> 5.2. </b> "
---

### Mục tiêu

Phần này hướng dẫn chuẩn bị môi trường cần thiết để phát triển và triển khai hệ thống TechMart trên Windows 11. Các công cụ bao gồm Java, Maven, Node.js, Git, Visual Studio Code và Docker.

---

## 1. Yêu cầu môi trường

Máy tính sử dụng trong workshop cần đáp ứng:

* Hệ điều hành: Windows 11 64-bit.
* RAM: tối thiểu 8GB, khuyến nghị 16GB.
* Dung lượng ổ đĩa: tối thiểu 20GB trống.
* Kết nối Internet ổn định.
* Có quyền cài đặt phần mềm và sử dụng Docker.

---

## 2. Các công cụ cần cài đặt

### 2.1. Java và Maven

Backend được phát triển bằng Spring Boot, sử dụng Java và Maven.

Sau khi cài đặt Java JDK, mở **PowerShell** và kiểm tra:

```powershell
java --version
```

Kiểm tra Maven:

```powershell
mvn -version
```

Nếu các lệnh trên trả về thông tin phiên bản, Java và Maven đã được cài đặt thành công.

### 2.2. Node.js và npm

Frontend được phát triển bằng Next.js, sử dụng Node.js và npm.

Kiểm tra phiên bản:

```powershell
node -v
npm -v
```

Nếu các lệnh trên trả về thông tin phiên bản, Node.js và npm đã sẵn sàng.

### 2.3. Git

Git được sử dụng để quản lý mã nguồn và kết nối với GitHub.

Kiểm tra Git:

```powershell
git --version
```

Cấu hình thông tin Git:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Kiểm tra lại cấu hình:

```powershell
git config --global --list
```

Thông tin user.name và user.email sẽ được sử dụng khi tạo commit.

### 2.4. Visual Studio Code

Visual Studio Code được sử dụng làm môi trường phát triển cho Frontend và Backend.

Sau khi cài đặt, mở Visual Studio Code để kiểm tra môi trường phát triển.

### 2.5. Docker Desktop

Docker được sử dụng để đóng gói Frontend Next.js và Backend Spring Boot thành Docker Image trước khi triển khai lên Amazon EC2.

Sau khi cài đặt Docker Desktop, mở PowerShell và kiểm tra:

```powershell
docker --version
```

Kiểm tra Docker Compose:

```powershell
docker compose version
```

Kiểm tra Docker hoạt động:

```powershell
docker run hello-world
```

Nếu Docker trả về thông báo xác nhận container chạy thành công, Docker đã được cài đặt và hoạt động bình thường.

---

## 3. Chuẩn bị tài khoản AWS

Cần có tài khoản AWS để thực hiện các bước triển khai hệ thống.

Các dịch vụ AWS được sử dụng trong workshop:

* Amazon EC2
* Amazon RDS for MySQL
* Amazon S3
* Amazon SES
* Amazon CloudWatch
* Amazon ECR
* AWS CodeBuild
* Amazon VPC
* AWS IAM

Tài khoản AWS cần có quyền phù hợp để tạo và cấu hình các tài nguyên trên.

---

## 4. Chuẩn bị tài khoản GitHub

GitHub được sử dụng để lưu trữ mã nguồn của dự án và làm nguồn cho quy trình CI/CD.

Chuẩn bị:

* Tài khoản GitHub.
* Repository chứa mã nguồn TechMart.
* Mã nguồn Backend Spring Boot.
* Mã nguồn Frontend Next.js.

Kiểm tra repository hiện tại:

```powershell
git remote -v
```

---

### 5. Kiểm tra môi trường

Sau khi hoàn tất cài đặt, mở PowerShell và thực hiện:

```powershell
java -version
mvn -version
node -v
npm -v
git --version
docker --version
docker compose version
```

Nếu các lệnh trên trả về đúng thông tin phiên bản, môi trường phát triển đã được chuẩn bị thành công.

---

## 6. Kiểm tra ứng dụng

6.1. Kiểm tra Backend

Di chuyển vào thư mục Backend:

```powershell
cd backend
```

Build project:

```powershell
mvn clean package
```

Chạy ứng dụng:

```powershell
mvn spring-boot:run
```

Backend mặc định chạy tại:

```powershell
http://localhost:8080
````

----

## 6.2. Kiểm tra Frontend

Mở một cửa sổ PowerShell mới và di chuyển vào thư mục Frontend:

```powershell
cd frontend
```

Cài đặt các thư viện:

```powershell
npm install
```

Chạy ứng dụng:

```poershell
npm run dev
```

Frontend mặc định chạy tại:

```powershell
http://localhost:3000
```

---

## 7. Kết quả

Sau khi hoàn thành phần này:

* Java và Maven đã được cài đặt.
* Node.js và npm đã sẵn sàng.
* Git và GitHub được cấu hình.
* Visual Studio Code được chuẩn bị cho việc phát triển.
* Docker Desktop được cài đặt và kiểm tra.
* Tài khoản AWS và GitHub đã được chuẩn bị.
* Frontend Next.js và Backend Spring Boot có thể chạy trên môi trường local.
* Môi trường phát triển đã sẵn sàng cho các bước tiếp theo của workshop.