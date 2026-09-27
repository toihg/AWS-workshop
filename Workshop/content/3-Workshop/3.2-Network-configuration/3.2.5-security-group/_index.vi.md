---
title : "Cấu hình Security Groups cho ALB, EC2, RDS và VPC Endpoints"
date : 2026-01-01
weight : 5
chapter : false
pre : " <b> 3.2.5. </b> "
---

Sau khi hoàn thành cấu hình VPC, Subnet, Internet Gateway và NAT Gateway, chúng ta sẽ cấu hình **Security Groups** để kiểm soát lưu lượng giữa các thành phần của hệ thống TechMart.

---

#### Bước 1: Truy cập Security Groups

Trong **AWS Console**, truy cập:

**VPC → Security Groups**

Chọn:

**Create security group**

---

#### Bước 2: Tạo TechMart-ALB-SG

Nhập các thông tin:

| Thuộc tính |	Giá trị |
|----|----|
| Security group name |	`TechMart-ALB-SG` |
| Description	Security | `Group for TechMart ALB` |
| VPC |	TechMart-VPC |

---

#### Bước 3: Cấu hình Inbound Rules cho ALB

Tại **Inbound rules**, chọn:

**Add rule**

Cấu hình:

| Type |	Protocol |	Port |	Source |
|------|-------|-------|-------|
| HTTP | TCP |	80 |	0.0.0.0/0 |
| HTTPS |	TCP |	443 |	0.0.0.0/0 |

---

#### Bước 4: Cấu hình Outbound Rules cho ALB

Giữ cấu hình mặc định:

All traffic → 0.0.0.0/0

<p align="center">
  <img src="/images/3-Workshop/3.2/sg_alb.png/" width="1900">
</p>

Sau đó chọn:

**Create security group**

---

#### Bước 5: Tạo TechMart-EC2-SG

Chọn:

**Create security group**

Nhập:

|Thuộc tính	|Giá trị|
|---|---|
|Security group name|	`TechMart-EC2-SG`|
|Description	|`Security Group for TechMart EC2`|
|VPC|	TechMart-VPC|

---

#### Bước 6: Cấu hình Inbound Rules cho EC2

Cấu hình:

|Type|	Protocol|	Port|	Source|
|----|----|----|---|
|HTTP	|TCP	|80	|TechMart-ALB-SG|

---

#### Bước 7: Cấu hình Outbound Rules cho EC2

Giữ cấu hình:

All traffic → 0.0.0.0/0

Sau đó chọn:

**Create security group**

---

#### Bước 8: Tạo TechMart-RDS-SG

Chọn:

**Create security group**

Nhập:

|Thuộc tính|	Giá trị|
|---|---|
|Security group name| `TechMart-RDS-SG`|
|Description|	`Security Group for TechMart RDS`|
|VPC| TechMart-VPC|

---

#### Bước 9: Cấu hình Inbound Rules cho RDS

Cấu hình:

|Type|	Protocol|	Port|	Source|
|---|---|---|---|
|MySQL/Aurora	|TCP	|3306	|TechMart-EC2-SG|

---

#### Bước 10: Cấu hình Outbound Rules cho RDS

Có thể giữ cấu hình mặc định:

All traffic → 0.0.0.0/0

Sau đó chọn:

**Create security group**

#### Bước 11: Tạo TechMart-VPCEndpoint-SG

Chọn:

**Create security group**

Nhập:

|Thuộc tính|	Giá trị|
|---|---|
|Security group name| `TechMart-VPCEndpoint-SG`|
|Description|	`Security Group for VPC Endpoints`|
|VPC| TechMart-VPC|

---

#### Bước 12: Cấu hình Inbound Rules cho TechMart-VPCEndpoint-SG


Cấu hình:

|Type|	Protocol|	Port|	Source|
|---|---|---|---|
|	HTTPS|TCP	|443	|TechMart-EC2-SG|

---

#### Bước 13: Cấu hình Outbound Rules cho TechMart-VPCEndpoint-SG

Có thể giữ cấu hình mặc định:

All traffic → 0.0.0.0/0

Sau đó chọn:

**Create security group**
