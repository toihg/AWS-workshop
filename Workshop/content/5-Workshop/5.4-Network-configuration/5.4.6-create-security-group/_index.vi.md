---
title : "Cấu hình Security Group cho EC2"
date : 2026-01-01
weight : 6
chapter : false
pre : " <b> 5.4.6. </b> "
---

Security Group được sử dụng để kiểm soát các kết nối đến Amazon EC2. Trong bước này, chúng ta tạo Security Group riêng cho EC2 và chỉ mở các port cần thiết cho hệ thống TechMart.

---

#### Bước 1: Tạo Security Group

Trong ***VPC Console***, chọn:

***Security Groups → Create security group***

Cấu hình:

| Thuộc tính |	Giá trị |
|------------|----------|
| Security group name |	TechMart-EC2-SG |
| Description |	Security Group for TechMart EC2 |
| VPC |	TechMart-VPC |

#### Bước 2: Cấu hình Inbound Rules

Thêm các rule sau:

| Type |	Port |	Source |	Mục đích |
|-----|------|------|-----|
| SSH	| 22 |	My IP |	Kết nối quản trị EC2 |
| HTTP |	80 |	0.0.0.0/0 |	Truy cập ứng dụng |
| Custom TCP |	3000 |	0.0.0.0/0 |	Truy cập Next.js |
| Custom TCP |	8080 |	0.0.0.0/0	| Truy cập Spring Boot |

Đối với SSH, nên chọn My IP thay vì mở:

0.0.0.0/0

để hạn chế các kết nối SSH từ Internet.

#### Bước 3: Cấu hình Outbound Rules

Giữ cấu hình mặc định:

All traffic → 0.0.0.0/0

<p align="center">
  <img src="/images/5-Workshop/5.4-Network-configuration/create-security-group.png" width="1900">
</p>

Sau đó chọn ***Create security group***.