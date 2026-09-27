---
title : "Tạo Amazon VPC"
date : 2026-01-01
weight : 1
chapter : false
pre : " 3.2.1. "
---

Trong bước này, chúng ta sẽ khởi tạo **Amazon VPC (Virtual Private Cloud)** đóng vai trò là mạng nội bộ riêng biệt trên AWS cho hệ thống TechMart. Mạng riêng này cung cấp môi trường cách ly an toàn chứa tất cả tài nguyên hệ thống như Application Load Balancer, các máy chủ ứng dụng EC2 và cơ sở dữ liệu RDS MySQL.

---

#### Bước 1: Truy cập dịch vụ Amazon VPC

1. Đăng nhập vào **AWS Management Console**.
2. Tại thanh tìm kiếm ở phía trên cùng, nhập *VPC* và chọn dịch vụ **VPC** để truy cập vào **VPC Dashboard**.

<p align="center">
  <img src="/images/3-Workshop/3.2/search_vpc.png" width="1500">
</p>

---

#### Bước 2: Thiết lập thông số VPC

1. Tại danh mục bên trái, chọn **Your VPCs**.
2. Nhấn nút **Create VPC** ở góc trên bên phải.
3. Ở tùy chọn **Resources to create**, chọn **VPC only**.
4. Điền các thông tin cấu hình chi tiết theo bảng sau:

| Thuộc tính | Giá trị cấu hình | Giải thích |
| --- | --- | --- |
| **Name tag** | `techmart-vpc` | Tên định danh cho VPC của dự án |
| **IPv4 CIDR block** | `10.0.0.0/16` | Dải mạng chính cấp phát tới 65,536 địa chỉ IP |
| **IPv6 CIDR block** | *No IPv6 CIDR block* | Tắt hỗ trợ địa chỉ IPv6 |
| **Tenancy** | *Default* | Sử dụng phần cứng dùng chung mặc định của AWS |

---

#### Bước 3: Xác nhận và khởi tạo

1. Kiểm tra lại thông tin tổng quan đã thiết lập:

   - **Name:** `techmart-vpc`
   - **IPv4 CIDR:** `10.0.0.0/16`
   - **Tenancy:** `Default`

<p align="center">
  <img src="/images/3-Workshop/3.2/create_vpc.png" width="1500">
</p>

2. Nhấn nút **Create VPC** để tiến hành khởi tạo.
3. Hệ thống sẽ chuyển hướng sang trang chi tiết VPC, kiểm tra mục **State** hiển thị trạng thái **Available**.

---

#### Kết quả đạt được

Sau bước này, hạ tầng mạng chính đã sẵn sàng hoạt động:

- **VPC ID / Name:** `techmart-vpc`
- **CIDR Block:** `10.0.0.0/16`
