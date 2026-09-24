---
title: "Workshop"
date: 2026-01-01
weight: 5
chapter: false
pre: " <b> 5. </b> "
---

# Triển Khai Hệ Thống Thương Mại Điện Tử TechMart Trên AWS

#### Tổng Quan Bài Lab

Trong workshop này, chúng ta sẽ xây dựng và triển khai hệ thống thương mại điện tử TechMart trên nền tảng AWS. Hệ thống được phát triển theo mô hình Full-Stack với Spring Boot làm Backend và Next.js làm Frontend.

Ứng dụng được đóng gói bằng Docker và triển khai trên Amazon EC2. Amazon RDS MySQL được sử dụng để lưu trữ dữ liệu, Amazon S3 dùng để lưu trữ hình ảnh sản phẩm. Amazon CloudWatch được sử dụng để theo dõi và giám sát hoạt động của hệ thống.

Trong quá trình thực hiện, chúng ta sẽ chuẩn bị môi trường và mã nguồn, cấu hình Amazon RDS MySQL và Amazon S3, đóng gói ứng dụng bằng Docker, triển khai Backend và Frontend lên EC2, thiết lập kết nối giữa các thành phần, giám sát và kiểm thử toàn bộ hệ thống. Cuối cùng, các tài nguyên AWS được tạo trong workshop sẽ được dọn dẹp.

---

#### Cấu Trúc Bài Lab Kỹ Thuật

1. [5.1. Tổng quan hệ thống và kiến trúc AWS](http://localhost:1313/Workshop/5-workshop/5.1-workshop-overview/)
2. [5.2. Chuẩn bị môi trường phát triển](http://localhost:1313/Workshop/5-workshop/5.2-development-environment/)
3. [5.3. Chuẩn bị mã nguồn Spring Boot và Next.js](http://localhost:1313/Workshop/5-workshop/5.3-project-preparation/)
4. [5.4. Thiết lập mạng AWS với Amazon VPC](http://localhost:1313/Workshop/5-workshop/5.4-network-configuration/)
5. [5.5. Khởi tạo và cấu hình Amazon RDS MySQL](http://localhost:1313/Workshop/5-workshop/5.5-amazon-rds-mysql/)
6. [5.6. Cấu hình Amazon S3](http://localhost:1313/Workshop/5-workshop/5.6-amazon-s3/)
7. [5.7. Cấu hình quyền truy cập với AWS IAM](http://localhost:1313/Workshop/5-workshop/5.7-aws-iam/)
8. [5.8. Đóng gói và triển khai Backend Spring Boot bằng Docker lên EC2](http://localhost:1313/Workshop/5-workshop/5.8-backend-docker/)
9. [5.9. Đóng gói và triển khai Frontend Next.js bằng Docker lên EC2](http://localhost:1313/Workshop/5-workshop/5.9-frontend-docker/)
10. [5.10. Giám sát hệ thống với Amazon CloudWatch](http://localhost:1313/Workshop/5-workshop/5.10-monitoring/)
11. [5.11. Kiểm thử hệ thống End-to-End](http://localhost:1313/Workshop/5-workshop/5.11-testing/)
12. [5.12. Dọn dẹp tài nguyên AWS](http://localhost:1313/Workshop/5-workshop/5.12-cleanup/)