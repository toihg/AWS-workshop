---
title : "Tạo và cấu hình Route Table cho Public Subnet"
date : 2026-01-01
weight : 5
chapter : false
pre : " <b> 5.4.5. </b> "
---

Sau khi tạo Internet Gateway, chúng ta cần tạo Route Table để định tuyến lưu lượng từ Public Subnet ra Internet thông qua Internet Gateway.

---

#### Bước 1: Tạo Route Table

Trong ***VPC Console***, chọn:

***Route Tables → Create route table***

Nhập:

| Thuộc tính |	Giá trị |
|-------|--------|
| Name |	TechMart-Public-RT |
| VPC | TechMart-VPC |

<p align="center">
  <img src="/images/5-Workshop/5.4-Network-configuration/create-route-table.png" width="1900">
</p>

Sau đó chọn ***Create route table***.

#### Bước 2: Thêm Internet Route

Chọn ***TechMart-Public-RT***, sau đó vào:

***Routes → Edit routes → Add route***

Cấu hình

| Destination | Target |
|------|-----|
| 0.0.0.0/0 | TechMart-IGW |

<p align="center">
  <img src="/images/5-Workshop/5.4-Network-configuration/edit-route.png" width="1900">
</p>

Chọn ***Save changes***.

Route Table lúc này có:

| Destination | Target |
|------|-------|
| 10.0.0.0/16 | local |
| 0.0.0.0/0 | TechMart-IGW |

#### Bước 3: Gắn Route Table với Public Subnet

Trong ***TechMart-Public-RT***, chọn:

***Subnet associations → Edit subnet associations → TechMart-Public-Subnet***

<p align="center">
  <img src="/images/5-Workshop/5.4-Network-configuration/edit-route-ass.png" width="1900">
</p>

Sau đó chọn ***Save associations***.