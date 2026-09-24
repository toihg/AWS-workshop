---
title : "Thiết lập mạng AWS với Amazon VPC"
date : 2026-01-01
weight : 4
chapter : false
pre : " <b> 5.4 </b> "
---

### Mục tiêu

Trong phần này, chúng ta sẽ xây dựng mạng riêng cho hệ thống TechMart trên AWS bằng Amazon VPC. Hệ thống được chia thành Public Subnet và Private Subnet nhằm tách biệt các tài nguyên có khả năng truy cập từ Internet và các tài nguyên cần được bảo vệ.

Trong kiến trúc này, Amazon EC2 được triển khai trong Public Subnet để phục vụ Frontend Next.js và Backend Spring Boot. Amazon RDS MySQL được đặt trong Private Subnet và chỉ cho phép kết nối từ EC2.

Kiến trúc mạng sử dụng Internet Gateway, Route Table và Security Group.

---

### Nội dung thực hành

1. [5.4.1. Tạo Amazon VPC](5-Workshop/5.4-Network-configuration/5.4.1-create-vpc/)
2. [5.4.2. Tạo Public Subnet](5-Workshop/5.4-Network-configuration/5.4.2-create-public-subnet/)
3. [5.4.3. Tạo Private Subnet](5-Workshop/5.4-Network-configuration/5.4.3-create-private-subnet/)
4. [5.4.4. Tạo Internet Gateway](5-Workshop/5.4-Network-configuration/5.4.4-create-internet-gateway/)
5. [5.4.5. Tạo Route Table cho Public Subnet](5-Workshop/5.4-Network-configuration/5.4.5-create-route-table/)
6. [5.4.6. Cấu hình Security Group cho EC2](5-Workshop/5.4-Network-configuration/5.4.6-create-security-group/)
6. [5.4.6. Cấu hình Security Group cho RDS](5-Workshop/5.4-Network-configuration/5.4.7-create-security-group-rds/)


---

### Kết quả mong đợi

Sau khi hoàn thành phần này:

* Đã tạo VPC riêng cho TechMart.
* Đã tạo Public Subnet và Private Subnet.
* Đã cấu hình Internet Gateway.
* Đã cấu hình Route Table cho Public Subnet.
* Đã cấu hình Security Group cho EC2.
* Đã cấu hình Security Group cho RDS.
* EC2 có thể giao tiếp với Internet.
* RDS không được truy cập trực tiếp từ Internet.
* EC2 có thể kết nối RDS thông qua port 3306.