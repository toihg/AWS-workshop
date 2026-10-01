---
title : "Khởi tạo và cấu hình Amazon RDS MySQL"
date : 2026-01-01
weight : 3
chapter : false
pre : " <b> 3.3 </b> "
---

### Mục tiêu

Sau khi hoàn thành cấu hình hạ tầng mạng, bước tiếp theo là triển khai **Amazon RDS for MySQL** để cung cấp cơ sở dữ liệu cho hệ thống TechMart.

Amazon RDS được triển khai trong **TechMart-VPC** và sử dụng các **Private Subnet** thông qua DB Subnet Group.

---

### 1. Tạo DB Subnet Group

#### Bước 1: Truy cập RDS

Trong **AWS Management Console**, tìm:

**RDS**

Sau đó chọn:

**RDS → Subnet groups**

Chọn:

**Create DB subnet group**

---

#### Bước 2: Cấu hình DB Subnet Group

Tại phần **Subnet group details**, nhập:

| Thuộc tính | Giá trị |
|---|---|
| Name | `TechMart-DB-Subnet-Group` |
| Description | `DB Subnet Group for TechMart` |
| VPC | `TechMart-VPC` |

---

#### Bước 3: Chọn các Availability Zone

Tại **Availability Zones**, chọn:

```text
ap-southeast-1a
ap-southeast-1b
```

Sau đó chọn các Private Subnet tương ứng.

<p align="center">
  <img src="/images/3-Workshop/3.3/subnetgroup.png" width="1900">
</p

Sau khi kiểm tra, chọn:

**Create**

---

### 2. Khởi tạo Amazon RDS MySQL

#### Bước 1: Truy cập:

**RDS → Databases → Create database**

Chọn:

**Full configuration**

---

#### Bước 2: Cấu hình Engine

Tại **Engine options**, chọn:

**MySQL**


#### Bước 3: Tại mục **Choose a database creation method**

Chọn **Full configuration**

<p align="center">
  <img src="/images/3-Workshop/3.3/1.png" width="1900">
</p

---

#### Bước 5: Cấu hình Database Settings

Tại phần Settings, cấu hình:

| Thuộc tính | Giá trị |
|---|---|
| DB instance identifier | `techmart-db` |
| Master username | `admin` |
| Master password | Tự đặt |
| Confirm password | Nhập lại mật khẩu |

<p align="center">
  <img src="/images/3-Workshop/3.3/2.png" width="1900">
</p

---

#### Bước 8: Cấu hình Connectivity

Tại phần Connectivity, chọn:

Chọn:

**Don't connect to an EC2 compute resource**

Tại VPC, chọn:

**TechMart-VPC**

Tại DB subnet group, chọn:

**techmart-db-subnet-group**

Tại Public access, chọn:

**No**

Tại VPC security group, chọn:

**Choose existing**

Sau đó chọn:

**TechMart-RDS-SG**

<p align="center">
  <img src="/images/3-Workshop/3.3/3.png" width="1900">
</p

#### Bước 9:  Cấu hình Database Options

Tại Additional configuration → Database options, cấu hình:

| Thuộc tính | Giá trị |
|---|---|
| Initial database name | `ecommerce` |
| DB parameter group | `Default` |
| Option group | `Default` |


Sau khi RDS được tạo, database ecommerce sẽ được sử dụng bởi Backend Spring Boot.

**Create database**.

#### Bước 11 Lấy Endpoint của RDS

Chọn:

**RDS → Databases → techmart-db → Connectivity & security**

Tại đây có thể xem:

- Endpoint
- Port
- VPC
- Availability Zone
- VPC Security Group

Endpoint có dạng:

```text
techmart-db.xxxxxxxxxxxx.ap-southeast-1.rds.amazonaws.com
```

Port:

```text
3306
```

Endpoint này sẽ được sử dụng trong cấu hình Backend Spring Boot ở bước triển khai ứng dụng.