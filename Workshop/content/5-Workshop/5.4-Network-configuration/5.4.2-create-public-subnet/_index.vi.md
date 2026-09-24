---
title : "Cấu hình Public Subnet"
date : 2026-01-01
weight : 2
chapter : false
pre : " <b> 5.4.2. </b> "
---

Sau khi tạo VPC, chúng ta sẽ tạo Public Subnet để triển khai Amazon EC2. Public Subnet sẽ được cấu hình để có thể kết nối với Internet thông qua Internet Gateway ở các bước tiếp theo.

---

#### Bước 1: Truy cập Subnets

Trong ***VPC Console***, chọn:

***Subnets → Create subnet***

#### Bước 2: Chọn VPC

Tại mục ***VPC ID***, chọn VPC đã tạo:

TechMart-VPC
10.0.0.0/16

#### Bước 3: Cấu hình Public Subnet

Nhập các thông tin:

| Thuộc tính | Giá trị |
|-------|--------|
| Subnet name | TechMart-Public-Subnet |
| Availability Zone	| ap-southeast-1 |
| IPv4 subnet CIDR block |	10.0.1.0/24 |


<p align="center">
  <img src="/images/5-Workshop/5.4-Network-configuration/create-public-subnet.png" width="1900">
</p>

Sau đó chọn ***Create subnet***.

#### Bước 5: Bật tự động cấp Public IPv4

Sau khi tạo subnet, chọn:

***Actions → Edit subnet settings***

Bật:

***Enable auto-assign public IPv4 address***

<p align="center">
  <img src="/images/5-Workshop/5.4-Network-configuration/edit-subnet-public.png" width="1900">
</p>

Sau đó chọn ***Save***.
