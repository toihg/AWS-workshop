---
title : "Cấu hình Internet Gateway"
date : 2026-01-01
weight : 4
chapter : false
pre : " <b> 5.4.4. </b> "
---

Internet Gateway (IGW) cho phép các tài nguyên trong Public Subnet giao tiếp với Internet. Trong hệ thống TechMart, Internet Gateway sẽ được gắn vào TechMart-VPC và được sử dụng cho EC2 trong Public Subnet.

---

#### Bước 1: Tạo Internet Gateway

Trong ***VPC Console***, chọn:

***Internet Gateways → Create internet gateway***

Nhập:

| Thuộc tính |	Giá trị |
|-------|--------|
| Name tag |	TechMart-IGW |

<p align="center">
  <img src="/images/5-Workshop/5.4-Network-configuration/create-igw.png" width="1900">
</p>

Sau đó chọn ***Create internet gateway.***.

#### Bước 2: Gắn Internet Gateway vào VPC

Chọn ***TechMart-IGW***, sau đó:

***Actions → Attach to a VPC***

Tại ***Available VPCs***, chọn:

TechMart-VPC
10.0.0.0/16

<p align="center">
  <img src="/images/5-Workshop/5.4-Network-configuration/attach-vpc.png" width="1900">
</p>

Sau đó chọn ***Attach internet gateway***.

---

Kiến trúc mạng lúc này:

<pre>
Internet
    │
    ▼
TechMart-IGW
    │
    ▼
TechMart-VPC
10.0.0.0/16
    │
    ├── Public Subnet
    │   └── 10.0.1.0/24
    │
    └── Private Subnet
        └── 10.0.2.0/24
</pre>
