---
title: "Workshop"
date: 2026-01-01
weight: 3
chapter: false
pre: " <b> 3. </b> "
---

# Triển Khai Hệ Thống Thương Mại Điện Tử TechMart Trên AWS

#### Tổng Quan Bài Lab

Trong workshop này, chúng ta sẽ xây dựng và triển khai hệ thống thương mại điện tử TechMart trên nền tảng AWS. Hệ thống được phát triển theo mô hình Full-Stack với Spring Boot làm Backend, Next.js làm Frontend và Nginx đóng vai trò Reverse Proxy.

Ứng dụng được đóng gói bằng Docker và triển khai trên máy chủ Amazon EC2. Amazon RDS for MySQL được sử dụng để lưu trữ dữ liệu giao dịch, Amazon S3 dùng để lưu trữ hình ảnh sản phẩm và Amazon ECR được sử dụng để lưu trữ Docker Images.

Hệ thống được triển khai trong Amazon VPC với Public Subnet và Private Subnet nhằm đảm bảo tính bảo mật. Application Load Balancer và NAT Gateway được triển khai trong Public Subnet, trong khi Amazon EC2 và Amazon RDS được triển khai an toàn trong Private Subnet. NAT Gateway được gán Elastic IP để cung cấp kết nối outbound từ các tài nguyên trong Private Subnet ra Internet thông qua Internet Gateway.

Application Load Balancer (ALB) tiếp nhận các request từ Internet thông qua địa chỉ ALB DNS Name (được AWS cung cấp mặc định) và chuyển tiếp request đến Nginx Reverse Proxy trên Amazon EC2 trong Private Subnet để phân luồng traffic nội bộ đến Next.js và Spring Boot.

AWS IAM được sử dụng để quản lý quyền truy cập đến các dịch vụ AWS thông qua IAM Role.

Trong quá trình thực hiện, chúng ta sẽ chuẩn bị môi trường và mã nguồn, xây dựng hạ tầng mạng với Amazon VPC (Public Subnet, Private Subnet, Route Table, Internet Gateway, NAT Gateway, Elastic IP), khởi tạo Amazon RDS MySQL và Amazon S3, cấu hình AWS IAM, thiết lập Amazon ECR, đóng gói ứng dụng bằng Docker, triển khai Backend và Frontend lên EC2, cấu hình Nginx Reverse Proxy và Application Load Balancer, giám sát và kiểm thử toàn bộ hệ thống End-to-End.

Cuối cùng, các tài nguyên AWS được tạo trong workshop sẽ được dọn dẹp để tránh phát sinh chi phí không cần thiết.

---

#### Cấu Trúc Bài Lab Kỹ Thuật

1. [3.1. Chuẩn bị môi trường](http://localhost:1313/Workshop/3-workshop/3.1-prepare-environment/)
2. [3.2. Triển khai hạ tầng mạng](http://localhost:1313/Workshop/3-workshop/3.2-network-configuration/)
3. [3.3. Khởi tạo và cấu hình Amazon RDS MySQL](http://localhost:1313/Workshop/3-workshop/3.3-amazon-rds/)
4. [3.4. Cấu hình Amazon S3](http://localhost:1313/Workshop/3-workshop/3.4-amazon-s3/)
5. [3.5. Cấu hình IAM Role cho Máy chủ EC2](http://localhost:1313/Workshop/3-workshop/3.5-aws-iam/)
6. [3.6. Khởi tạo máy chủ EC2 và Import dữ liệu vào RDS qua SSM](http://localhost:1313/Workshop/3-workshop/3.6-ec2/)
7. [3.7. Đóng gói ứng dụng bằng Docker](http://localhost:1313/Workshop/3-workshop/3.7-docker-build)
8. [3.8. Triển khai ứng dụng lên Amazon EC2](http://localhost:1313/Workshop/3-workshop/3.8-deploy/)
9. [3.9. Cấu hình Application Load Balancer](http://localhost:1313/Workshop/3-workshop/3.9-alb/)
10. [3.10. Dọn dẹp tài nguyên AWS](http://localhost:1313/Workshop/3-workshop/3.10-clean/)