---
title : "Cấu hình Internet Gateway"
date : 2026-01-01
weight : 2
chapter : false
pre : " <b> 3.2.2 </b> "
---

Sau khi tạo VPC và chia các Subnet, chúng ta tiến hành tạo **Internet Gateway (IGW)**. Internet Gateway đóng vai trò như một cổng kết nối, cho phép các tài nguyên nằm trong Public Subnet giao tiếp với môi trường Internet bên ngoài.

---

#### Bước 1: Tạo Internet Gateway

Trong ***VPC Console***, chọn:

***Internet Gateways → Create internet gateway***

Tại mục **Name tag**

Nhập ```TechMart-IGW```

<p align="center">
  <img src="/images/3-Workshop/3.2/igw.png/" width="1900">
</p>

Sau đó chọn ***Create internet gateway.***.

---

#### Bước 2: Gắn Internet Gateway vào VPC

Chọn ***TechMart-IGW***, sau đó:

***Actions → Attach to a VPC***

Tại ***Available VPCs***, chọn:

`TechMart-VPC`

<p align="center">
  <img src="/images/3-Workshop/3.2/attach_vpc.png/" width="1900">
</p>

Sau đó chọn ***Attach internet gateway***.
