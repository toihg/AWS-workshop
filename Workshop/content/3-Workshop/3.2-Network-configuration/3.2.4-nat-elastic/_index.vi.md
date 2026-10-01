---
title : "Cấu hình NAT Gateway và Elastic IP"
date : 2026-01-01
weight : 4
chapter : false
pre : " <b> 3.2.4 </b> "
---

Sau khi cấu hình Internet Gateway, chúng ta sẽ tạo **NAT Gateway** để cho phép các tài nguyên trong **Private Subnet** thực hiện kết nối outbound ra Internet.

Trong kiến trúc TechMart:

- NAT Gateway được đặt trong **Public Subnet**.
- NAT Gateway sử dụng **Elastic IP** để giao tiếp với Internet.
- Private Subnet sử dụng NAT Gateway để thực hiện các kết nối outbound.
- Các kết nối từ Internet không thể khởi tạo trực tiếp đến các tài nguyên trong Private Subnet thông qua NAT Gateway.

---

#### Bước 1: Truy cập Elastic IPs

Trong **AWS Console**, truy cập:

**VPC → Elastic IPs**

Chọn:

**Allocate Elastic IP address**

---

#### Bước 2: Cấp phát Elastic IP

Tại mục **Network Border Group**, giữ giá trị mặc định phù hợp với Region đang sử dụng.

Tại **Public IPv4 address pool**, chọn:

**Amazon's pool of IPv4 addresses**

<p align="center">
   <img src="/images/3-Workshop/3.2/allocate_elastic.png" width="1900">
</p>

Sau đó chọn:

**Allocate**

---

#### Bước 3: Truy cập NAT Gateways

Trong **VPC Console**, truy cập:

**NAT Gateways → Create NAT gateway**

---

#### Bước 4: Cấu hình NAT Gateway

Ở mục **Availability mode** chọn:

**Zonal**

Nhập các thông tin:

| Thuộc tính |	Giá trị |
|---|---|
| Name | `TechMart-NAT-Gateway` |
| Subnet |	`TechMart-Public-Subnet` |
| Connectivity type |	Public |
| Elastic IP allocation ID |	Chọn Elastic IP vừa tạo |

<p align="center">
   <img src="/images/3-Workshop/3.2/create_nat.png" width="1900">
</p>

Sau đó chọn:

**Create NAT gateway**

Chờ đến khi **State** chuyển trạng thái **Available** để sang bước tiếp theo.

---

#### Bước 6: Cấu hình Route Table cho Private Subnet

Trong **VPC Console**, chọn:

**Route Tables → TechMart-Private-RT**

Chọn:

**Routes → Edit routes → Add route**

Thêm route:

| Destination |	Target |
|-----|-----|
| 10.0.0.0/16	| Local |
| 0.0.0.0/0 |	NAT Gateway |

Tại Target, chọn:

**TechMart-NAT-Gateway**

<p align="center">
  <img src="/images/3-Workshop/3.2/edit_routetable_private.png" width="1900">
</p>

Sau đó chọn:

**Save changes**