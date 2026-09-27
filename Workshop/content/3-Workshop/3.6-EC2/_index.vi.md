---
title : "Khởi tạo máy chủ EC2 và Import dữ liệu vào RDS qua SSM"
date : 2026-01-01
weight : 6
chapter : false
pre : " 3.6 "
---

## Phần 1: Khởi tạo EC2 Instance và gán IAM Role

1. Truy cập **EC2 Console**.
2. Chọn **Instances**.
3. Bấm **Launch instances**.

    * Name and tags nhập `TechMart-App-Server`

    * Application and OS Images: **Amazon Linux 2023 AMI**

    * Instance type: Chọn `t3.micro` hoặc `t3.small`.

<p align="center">
  <img src="/images/3-Workshop/3.6/1.png" width="1900">
</p>

* Key pair (login):
    * Chọn **Create new key pair**
    * Nhập key pair name  `techmart_keypair`
    * Key pair type: Chọn **RSA**
    * Private key file format: Chọn **.pem**
    * Bấm **Create key pair** và tải về.

<p align="center">
  <img src="/images/3-Workshop/3.6/2.png" width="1900">
</p>

4. **Mục Network settings** bấm **Edit** và cấu hình:

    - **VPC:** Chọn `TechMart-VPC`.
    - **Subnet:** Chọn `TechMart-Private-Subnet-A` (`10.0.2.0/24`).
    - **Auto-assign public IP:** Chọn **Disable**.
    - **Firewall (Security Groups):** Chọn **Select existing security group** → chọn `TechMart-EC2-SG`.

    <p align="center">
      <img src="/images/3-Workshop/3.6/3.png" width="1900">
    </p>

5. Kiểm tra lại cấu hình và chọn **Launch instance**

6. Gán IAM Role

    * Nhấn **Action**, tìm mục **Security**, chọn **Modify IAM Role**

    * Trong mục **IAM role** chọn **TechMart-EC2-Role**

      <p align="center">
        <img src="/images/3-Workshop/3.6/add_role.png" width="1900">
      </p>

    * Chọn **Update IAM role**

---

## Phần 2: Kết nối EC2 qua SSM Session Manager


### 1. Bật DNS settings

Truy cập **AWS Management Console** -> Chọn dịch vụ **VPC**

Ở menu bên trái, chọn **Your VPCs**

Chọn **TechMart-VPC**

Bấm nút **Actions** -> chọn **Edit VPC settings**

Tại mục **DNS settings**, tích chọn cả 2 ô:
* Enable DNS resolution 
* Enable DNS hostnames 

<p align="center">
  <img src="/images/3-Workshop/3.6/dns.png" width="1300">
</p>

Bấm nút **Save changes**.

### 3. Tạo lần lượt 3 VPC Endpoints:

Truy cập **VPC Console** -> **Endpoints**

Bấm **Create endpoint**

  * Name tag: Đặt tên tương ứng từng endpoint
    * `TechMart-VPCE-SSM`,
    * `TechMart-VPCE-SSMM`,
    * `TechMart-VPCE-EC2M`,

* Service category: Chọn **AWS services**.
* Services (Dịch vụ): Tìm kiếm và chọn dịch vụ theo danh sách:

    * Endpoint 1: `com.amazonaws.ap-southeast-1.ssm`

    * Endpoint 2: `com.amazonaws.ap-southeast-1.ssmmessages`
    
    * Endpoint 3: `com.amazonaws.ap-southeast-1.ec2messages`

* VPC: Chọn **TechMart-VPC**
* Subnets: Tích chọn **TechMart-Private-Subnet** và  **TechMart-Private-SubnetB**
* IP address type: Giữ mặc định IPv4.
* Security groups: Tích chọn **TechMart-VPCEndpoint-SG**
* Policy: Chọn **Full Access**

<p align="center">
  <img src="/images/3-Workshop/3.6/endpoint1.png" width="1300">
</p>

<p align="center">
  <img src="/images/3-Workshop/3.6/endpoint2.png" width="1300">
</p>

<p align="center">
  <img src="/images/3-Workshop/3.6/endpoint3.png" width="1300">
</p>

Bấm **Create endpoint**.

### 4. Kết nối EC2 qua SSM

* Trên thanh tìm kiếm nhập `Systems Manager`
* Chọn **Session Manager** từ menu bên trái
* Nhấp **Start session**

Chọn target instance:
* Chọn **TechMart-App-Server**

<p align="center">
  <img src="/images/3-Workshop/3.6/4.png" width="1300">
</p>

Nhấp **Start session**

<p align="center">
  <img src="/images/3-Workshop/3.6/connect.png" width="1300">
</p>

---

## Phần 3: Import dữ liệu vào RDS qua SSM

Chạy lần lượt các câu lệnh sau trực tiếp trên giao diện SSM Terminal.

#### Bước 1: Chuyển sang thư mục làm việc và cài đặt Client MySQL

```bash
# Chuyển toàn bộ phiên làm việc sang ec2-user
sudo su - ec2-user
```
```bash
# Cài đặt MariaDB/MySQL Client trên Amazon Linux 2023
sudo dnf install -y mariadb105
```

#### Bước 2: Tải tệp `ecommerce.sql` từ S3 Bucket về EC2

```bash
aws s3 cp s3://techmart-product-images-1204/database_script/ecommerce.sql ./ecommerce.sql
```
```bash
# Kiểm tra file đã tải về thành công chưa
ls -lh ecommerce.sql
```

<p align="center">
  <img src="/images/3-Workshop/3.6/5.png" width="1300">
</p>

### Bước 3: Import dữ liệu vào Amazon RDS MySQL

Thay các giá trị trong câu lệnh dưới đây:

```bash
# Thực hiện Import trực tiếp file SQL vào CSDL RDS
mysql -h techmart-db.chei8cka8fg4.ap-southeast-1.rds.amazonaws.com -u admin -p < ecommerce.sql
```

Hệ thống sẽ yêu cầu nhập mật khẩu RDS. Dán mật khẩu vào và nhấn **Enter**.

### Bước 4: Kiểm tra CSDL sau khi Import thành công

```bash
# Đăng nhập vào RDS MySQL
mysql -h techmart-db.chei8cka8fg4.ap-southeast-1.rds.amazonaws.com -u admin -p

# Chạy câu lệnh SQL kiểm tra các bảng dữ liệu đã vào chưa
SHOW DATABASES;
USE ecommerce;
SHOW TABLES;
EXIT;
```

<p align="center">
  <img src="/images/3-Workshop/3.6/6.png" width="1300">
</p>
