---
title : "Cấu hình Private Subnet"
date : 2026-01-01
weight : 3
chapter : false
pre : " <b> 5.4.3. </b> "
---

Sau khi tạo Public Subnet, chúng ta tiếp tục tạo Private Subnet để triển khai Amazon RDS MySQL. Private Subnet sẽ không được cấu hình truy cập trực tiếp từ Internet.

---

#### Bước 1: Truy cập Subnets

Trong ***VPC Console***, chọn:

***Subnets → Create subnet***

Bước 2: Chọn VPC

Tại mục ***VPC ID***, chọn:

TechMart-VPC
10.0.0.0/16

Bước 3: Cấu hình ***Private Subnet***

Nhập các thông tin:

| Thuộc tính |	Giá trị |
|---------|-----------|
| Subnet name |	TechMart-Private-Subnet |
| Availability Zone |	ap-southeast-1 |
| IPv4 subnet CIDR block |	10.0.2.0/24 |

<p align="center">
  <img src="/images/5-Workshop/5.4-Network-configuration/create-private-subnet.png" width="1900">
</p>

Sau đó chọn ***Create subnet***.
