---
title : "Triển khai hạ tầng mạng"
date : 2026-01-01
weight : 2
chapter : false
pre : " <b> 3.2 </b> "
---

### Mục tiêu

Trong phần này, chúng ta sẽ xây dựng hạ tầng mạng riêng cho hệ thống TechMart trên AWS bằng Amazon VPC. Hệ thống được thiết kế phân tầng với Public Subnet và Private Subnet:

* Public Subnet: Chứa Application Load Balancer (ALB) để tiếp nhận traffic từ Internet và NAT Gateway để cung cấp kết nối Outbound.

* Private Subnet: Chứa máy chủ Amazon EC2 (chạy Docker gồm Nginx, Next.js, Spring Boot) và cơ sở dữ liệu Amazon RDS MySQL nhằm đảm bảo các tài nguyên quan trọng không bị truy cập trực tiếp từ Internet.

Kiến trúc mạng sử dụng Internet Gateway, NAT Gateway, Elastic IP, Route Tables và Security Groups để kiểm soát đường đi của lưu lượng mạng và phân quyền truy cập giữa các thành phần.

---

### Nội dung thực hành

1. [3.2.1. Tạo Amazon VPC](3-Workshop/3.2-Network-configuration/3.2.1-vpc/)
2. [3.2.2. Tạo Internet Gateway](3-Workshop/3.2-Network-configuration/3.2.2-internet-gateway/)
3. [3.2.3. Tạo Public Subnet và Private Subnet](3-Workshop/3.2-Network-configuration/3.2.3-subnet/)
4. [3.2.4. Tạo NAT Gateway và Elastic IP](3-Workshop/3.2-Network-configuration/3.2.4-nat-elastic/)
5. [3.2.5. Cấu hình Security Groups cho ALB, EC2, RDS và VPC Endpoints](3-Workshop/3.2-Network-configuration/3.2.5-security-group/)

---

### Kết quả mong đợi

Sau khi hoàn thành phần này:

* Đã tạo VPC riêng cho hệ thống TechMart.
* Đã tạo và cấu hình Public Subnet và Private Subnet.
* Đã cấu hình Internet Gateway cho VPC.
* Đã cấu hình NAT Gateway cho VPC.
* Đã cấu hình Security Group cho ALB.
* Đã cấu hình Security Group cho EC2.
* Đã cấu hình Security Group cho RDS.
* Đã cấu hình Security Group cho VPC Endpoints.
* RDS trong Private Subnet không được truy cập trực tiếp từ Internet.
* EC2 trong Private Subnet không được truy cập trực tiếp từ Internet.
* EC2 có thể kết nối đến RDS thông qua port 3306.
* Lưu lượng giữa EC2 và RDS được kiểm soát bằng Security Group.