---
title : "Tổng quan Workshop"
date : 2026-01-01
weight : 1
chapter : false
pre : " <b> 5.1. </b> "
---

# Tổng quan hệ thống và kiến trúc AWS

### Mục tiêu

Workshop hướng dẫn xây dựng và triển khai hệ thống thương mại điện tử TechMart trên nền tảng AWS. Hệ thống được phát triển theo mô hình Full-Stack, sử dụng Next.js cho Frontend và Spring Boot cho Backend.

Trong quá trình thực hiện, ứng dụng được đóng gói bằng Docker và triển khai trên Amazon EC2. Backend kết nối với Amazon RDS MySQL, hình ảnh sản phẩm được lưu trữ trên Amazon S3, và hoạt động của hệ thống được theo dõi bằng Amazon CloudWatch.

## 1. Giới thiệu bài toán và giải pháp

TechMart là hệ thống thương mại điện tử hỗ trợ người dùng xem, tìm kiếm sản phẩm, quản lý tài khoản, giỏ hàng và đặt hàng. Hệ thống cần đảm bảo dữ liệu được lưu trữ an toàn, hình ảnh sản phẩm được quản lý riêng và các thành phần có thể hoạt động ổn định trên môi trường AWS.

Hệ thống sử dụng Next.js cho Frontend và Spring Boot cho Backend. Backend kết nối với Amazon RDS MySQL để lưu trữ dữ liệu và Amazon S3 để lưu trữ hình ảnh sản phẩm. Frontend và Backend được đóng gói bằng Docker và triển khai trên Amazon EC2. Amazon VPC, Security Group và IAM được sử dụng để quản lý mạng và quyền truy cập. Amazon CloudWatch được sử dụng để giám sát tài nguyên và log của hệ thống.

---

## 2. Kiến trúc hệ thống

Kiến trúc TechMart gồm các thành phần chính:

- Người dùng
- Frontend Next.js
- Backend Spring Boot
- Docker
- Amazon EC2
- Amazon RDS MySQL
- Amazon S3
- Amazon CloudWatch
- Amazon ECR
- Amazon VPC
- Amazon IAM

<p align="center">
  <img src="/images/5-Workshop/5.1-Workshop-overview/kien_truc.png" width="900">
</p>

---

## 3. Quy trình hoạt động của hệ thống

Luồng hoạt động của hệ thống được thực hiện như sau:

1. Người dùng truy cập giao diện Next.js thông qua trình duyệt.
2. Frontend gửi yêu cầu đến Backend Spring Boot.
3. Backend xử lý nghiệp vụ và truy xuất dữ liệu từ Amazon RDS MySQL.
4. Hình ảnh sản phẩm được lưu trữ và truy xuất từ Amazon S3.
5. Backend gửi email thông báo thông qua Amazon SES khi có các sự kiện phù hợp.
6. Frontend và Backend chạy dưới dạng Docker container trên Amazon EC2.
7. Logs và metrics của hệ thống được theo dõi thông qua Amazon CloudWatch.
8. Mã nguồn được quản lý trên GitHub, Docker Image được build bằng AWS CodeBuild và lưu trữ trên Amazon ECR trước khi triển khai lên EC2.

---

## 4. Các dịch vụ được sử dụng

### Hạ tầng mạng

- Amazon VPC
- Public Subnet
- Private Subnet
- Internet Gateway
- Security Groups

### Ứng dụng

- Frontend Next.js
- Backend Spring Boot
- Docker
- Amazon EC2

### Cơ sở dữ liệu

- Amazon RDS MySQL

### Lưu trữ

- Amazon S3

### Email

- Amazon SES

### Bảo mật

- AWS IAM

### CI/CD

- GitHub
- AWS CodeBuild
- Amazon ECR

### Giám sát

- Amazon CloudWatch

---

## 5. Kết quả đạt được

Sau khi hoàn thành workshop, người thực hiện có thể:

- Xây dựng và cấu hình hạ tầng mạng trên AWS với Amazon VPC, các subnet, Internet Gateway và Security Groups.
- Đóng gói ứng dụng Next.js và Spring Boot bằng Docker.
- Triển khai Frontend và Backend trên Amazon EC2.
- Thiết lập Amazon RDS MySQL và kết nối cơ sở dữ liệu với Backend.
- Cấu hình Amazon S3 để lưu trữ hình ảnh sản phẩm.
- Tích hợp Amazon SES để gửi email thông báo.
- Xây dựng quy trình CI/CD với GitHub, AWS CodeBuild và Amazon ECR.
- Sử dụng Amazon CloudWatch để theo dõi logs và hoạt động của hệ thống.
- Kiểm thử khả năng kết nối và hoạt động của các thành phần sau khi triển khai.
- Nắm được quy trình triển khai một ứng dụng Full-Stack từ môi trường phát triển lên AWS.
- Thực hiện dọn dẹp các tài nguyên AWS sau khi hoàn thành workshop.