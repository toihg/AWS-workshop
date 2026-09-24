---
title : "Tạo Amazon VPC"
date : 2026-01-01
weight : 1
chapter : false
pre : " <b> 5.4.1. </b> "
---

Trong bước này, chúng ta sẽ tạo một Amazon VPC riêng cho hệ thống TechMart. VPC sẽ là mạng chính chứa các tài nguyên AWS của hệ thống, bao gồm Amazon EC2 và Amazon RDS.

---

#### Bước 1 Truy cập Amazon VPC

Đăng nhập vào ***AWS Management Console***.

Tại thanh tìm kiếm dịch vụ, tìm:

***VPC***

Chọn VPC để mở ***VPC Dashboard***.

#### Bước 2: Tạo VPC

Trong menu bên trái, chọn:

***Your VPCs → Create VPC***

Tại phần Resources to create, chọn:

***VPC only***

Sau đó cấu hình:

| Thuộc tính | Giá trị |
|--------|---------|
| Name tag | TechMart-VPC |
| IPv4 CIDR block |	10.0.0.0/16 |
| IPv6 CIDR block | Không sử dụng |
| Tenancy | Default |


#### Bước 3: Tạo VPC

Kiểm tra lại các thông tin:

Name:        TechMart-VPC
IPv4 CIDR:   10.0.0.0/16
Tenancy:     Default

<p align="center">
  <img src="/images/5-Workshop/5.4-Network-configuration/create-vpc.png" width="1900">
</p>

Sau đó chọn:

***Create VPC***

VPC được tạo thành công
<p align="center">
  <img src="/images/5-Workshop/5.4-Network-configuration/view-vpc.png" width="1900">
</p>

---

#### Kết quả

Sau bước này, hệ thống có:

TechMart-VPC
CIDR: 10.0.0.0/16

Không gian địa chỉ này sẽ được chia thành các subnet ở bước tiếp theo:

<pre>
TechMart-VPC
10.0.0.0/16
│
├── Public Subnet
│   └── 10.0.1.0/24
│
└── Private Subnet
    └── 10.0.2.0/24
</pre>