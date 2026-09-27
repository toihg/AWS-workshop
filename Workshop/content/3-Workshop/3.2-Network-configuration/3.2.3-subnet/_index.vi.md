---
title : "Cấu hình Public Subnet và Private Subnet"
date : 2026-01-01
weight : 3
chapter : false
pre : " <b> 3.2.3. </b> "
---

Sau khi tạo VPC, chúng ta sẽ tạo **Public Subnet** và **Private Subnet** để phân chia các tài nguyên của hệ thống TechMart theo mức độ truy cập.

Trong kiến trúc này:

- **Public Subnet** sử dụng cho các thành phần cần nhận kết nối từ Internet như Application Load Balancer và NAT Gateway.
- **Private Subnet** sử dụng cho Amazon EC2 và Amazon RDS, hạn chế khả năng truy cập trực tiếp từ Internet.
- Mỗi Subnet được gắn với **Route Table** phù hợp để xác định luồng lưu lượng mạng.

---


### Bước 1: Tạo lần lượt 2 Public Subnet

Truy cập:

**VPC Console → Subnets → Create subnet**

Chọn VPC:

**TechMart-VPC**

Nhập các thông tin:

| Thuộc tính | Giá trị |
|---|---|
| Subnet name | `TechMart-Public-Subnet-A` <br> `TechMart-Public-Subnet-B`|
| Availability Zone | `ap-southeast-1a` <br> `ap-southeast-1b`|
| IPv4 subnet CIDR block | `10.0.1.0/24` <br> `10.0.4.0/24` |

<p align="center">
  <img src="/images/3-Workshop/3.2/public_subnet_1.png" width="1500">
</p>

<p align="center">
  <img src="/images/3-Workshop/3.2/public_subnet_2.png" width="1500">
</p>

Sau đó chọn **Create subnet**.


#### Bật auto-assign public IPv4 address

Sau khi tạo Public Subnet, chọn:

**Actions → Edit subnet settings**

Bật:

**Enable auto-assign public IPv4 address**

<p align="center">
  <img src="/images/3-Workshop/3.2/auto_public_subnet_1.png" width="1500">
</p>

<p align="center">
  <img src="/images/3-Workshop/3.2/auto_public_subnet_2.png" width="1500">
</p>

Sau đó chọn **Save**.

Public Subnet sẽ được sử dụng cho các tài nguyên cần khả năng kết nối trực tiếp với Internet thông qua **Internet Gateway**.

---

### Bước 2: Tạo 2 Private Subnet

Tương tự như tạo Public Subnet, truy cập:

**VPC Console → Subnets → Create subnet**

Chọn VPC:

**TechMart-VPC**

Nhập các thông tin:

| Thuộc tính | Giá trị |
|---|---|
| Subnet name | `TechMart-Private-Subnet-A` <br> `TechMart-Private-Subnet_B` |
| Availability Zone | `ap-southeast-1a` <br> `ap-southeast-1b` |
| IPv4 subnet CIDR block | `10.0.2.0/24` <b> `10.0.3.0/24`|

Sau đó chọn **Create subnet**.

**Private Subnet không cần bật auto-assign public IPv4 address**

---

### Bước 3: Tạo Route Table cho Public Subnet

Trong **VPC Console**, chọn:

**Route Tables → Create route table**

Nhập:

| Thuộc tính | Giá trị |
|---|---|
| Name | `TechMart-Public-RT` |
| VPC | `TechMart-VPC` |

<p align="center">
  <img src="/images/3-Workshop/3.2/create_routetable.png" width="1500">
</p>

Sau đó chọn **Create route table**.

Tiếp tục vào:

**TechMart-Public-RT → Routes → Edit routes → Add route**

Cấu hình:

| Destination | Target |
|---|---|
| `10.0.0.0/16` | Local |
| `0.0.0.0/0` | Internet Gateway |

<p align="center">
  <img src="/images/3-Workshop/3.2/edit_routetable.png" width="1500">
</p>

Chọn **Save changes**

Sau đó vào:

**Subnet associations → Edit subnet associations**

Chọn 2 subnet:

`TechMart-Public-Subnet-A`
`TechMart-Public-Subnet-B`

<p align="center">
  <img src="/images/3-Workshop/3.2/subnet_ass.png" width="1500">
</p>

và chọn **Save associations**.

---

### Bước 4: Tạo Route Table cho Private Subnet

Tiếp tục chọn:

**Route Tables → Create route table**

Nhập:

| Thuộc tính | Giá trị |
|---|---|
| Name | `TechMart-Private-RT` |
| VPC | `TechMart-VPC` |

Sau đó chọn **Create route table**.

Tiếp tục vào:

**Subnet associations → Edit subnet associations**

Chọn 2 subnet:

`TechMart-Private-Subnet-A`
`TechMart-Private-Subnet-B`

và chọn **Save associations**.
