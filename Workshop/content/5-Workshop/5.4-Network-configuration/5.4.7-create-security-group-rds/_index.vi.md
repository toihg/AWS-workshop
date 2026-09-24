---
title : "Cấu hình Security Group cho RDS"
date : 2026-01-01
weight : 7
chapter : false
pre : " <b> 5.4.7. </b> "
---

Trong bước này, chúng ta tạo Security Group cho Amazon RDS MySQL. RDS chỉ cho phép kết nối từ EC2 thông qua cổng 3306.

---

#### Bước 1: Tạo Security Group

Trong ***VPC Console***, chọn:

***Security Groups → Create security group***

Cấu hình:

| Thuộc tính |	Giá trị |
|------------|----------|
| Security group name |	TechMart-RDS-SG |
| Description |	Security Group for TechMart RDS |
| VPC |	TechMart-VPC |

#### Bước 2: Cấu hình Inbound Rules

Thêm các rule sau:

| Type |	Port |	Source |	Mục đích |
|-----|------|------|-----|
| MySQL/Aurora	| 3306 |	TechMart-EC2-SG |	Cho phép EC2 kết nối RDS

Đối với SSH, nên chọn My IP thay vì mở:

0.0.0.0/0

để hạn chế các kết nối SSH từ Internet.

#### Bước 3: Cấu hình Outbound Rules

Giữ cấu hình mặc định:

All traffic → 0.0.0.0/0

<p align="center">
  <img src="/images/5-Workshop/5.4-Network-configuration/create-security-group-rds.png" width="1900">
</p>

Sau đó chọn ***Create security group***.