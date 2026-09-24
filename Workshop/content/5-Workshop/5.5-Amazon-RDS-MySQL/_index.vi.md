---

title : "Khởi tạo và cấu hình Amazon RDS MySQL"

date : 2026-01-01

weight : 5

chapter : false

pre : " <b> 5.5 </b> "

---

### Mục tiêu

Trong phần này, chúng ta sẽ tạo cơ sở dữ liệu **MySQL trên Amazon RDS** và triển khai RDS trong **Private Subnet** đã cấu hình ở phần 5.4.

RDS sẽ lưu trữ dữ liệu của hệ thống TechMart như tài khoản, sản phẩm, giỏ hàng và đơn hàng. Backend Spring Boot trên EC2 sẽ kết nối đến RDS thông qua port 3306.

---

### 1. Các bước tạo RDS MySQL

1. Truy cập AWS Management Console và tìm **RDS**.

   Chọn **Aurora and RDS → Databases → Create database → Full Configuration**.

2. Tại mục **Engine options**, chọn **MySQL**.

<p align="center">
  <img src="/images/5-Workshop/5.5-Amazon-RDS-MySQL/engine-option.png" width="1900">
</p>

3. Tại **Templates**, chọn template **Free tier**.

<p align="center">
  <img src="/images/5-Workshop/5.5-Amazon-RDS-MySQL/template.png" width="1900">
</p>

4. Cấu hình database:

| Thuộc tính             | Giá trị           |
| ---------------------- | ----------------- |
| DB instance identifier | `techmart-db`     |
| Master username        | `admin`           |
| Master password        | Tự đặt mật khẩu   |
| Confirm password       | Nhập lại mật khẩu |

<p align="center">
  <img src="/images/5-Workshop/5.5-Amazon-RDS-MySQL/setting.png" width="1900">
</p>

5. Cấu hình **Instance specifications**:

* Chọn instance class là **db.t4g.micro**.
* Chọn storage type là **General Purpose SSD (gp3)**.
* Allocated storage là **20 GiB**.

<p align="center">
  <img src="/images/5-Workshop/5.5-Amazon-RDS-MySQL/type.png" width="1900">
</p>

6. Cấu hình **Connectivity**:

* Chọn **Don’t connect to an EC2 compute resource**.
* Tại mục VPC, chọn **TechMart-VPC**.
* Public access chọn **No**.
* VPC security group chọn **Choose existing**.
* Existing VPC security group chọn **TechMart-RDS-SG**.
* Availability Zone chọn **ap-southeast-1a**.

<p align="center">
  <img src="/images/5-Workshop/5.5-Amazon-RDS-MySQL/connect.png" width="1900">
</p>

7. Chọn **Create database** để tạo RDS.

Sau khi RDS được tạo thành công, lấy **Endpoint** tại:

**RDS → Databases → techmart-db → Connectivity & security**

Endpoint này sẽ được sử dụng để Backend trên EC2 kết nối đến RDS.

---

### 2. Đưa database từ máy local lên Amazon RDS

Database `ecommerce` đang được sử dụng trên máy local cần được sao lưu và đưa lên Amazon RDS để hệ thống trên AWS sử dụng dữ liệu hiện có.

Do RDS được cấu hình **Private Subnet** và **Public access = No**, máy local không thể kết nối trực tiếp đến RDS. Vì vậy, EC2 được sử dụng làm máy trung gian để kết nối và import dữ liệu vào RDS.

Quy trình thực hiện:

```text
MySQL local
     │
     │ Export
     ▼
ecommerce_backup.sql
     │
     │ Upload qua SFTP
     ▼
EC2
     │
     │ MySQL
     ▼
Amazon RDS MySQL
```

#### Bước 1: Export database từ MySQL local

1. Mở **Command Prompt** với quyền Administrator và di chuyển đến thư mục cài đặt MySQL:

```powershell
cd "C:\Program Files\MySQL\MySQL Server 26.7\bin"
```

2. Sử dụng `mysqldump` để xuất database `ecommerce`:

```powershell
mysqldump -u root -p --single-transaction --set-gtid-purged=OFF ecommerce > "C:\Users\Toi Hoang\ecommerce.sql"
```

Nhập mật khẩu MySQL local khi được yêu cầu.

Sau khi thực hiện thành công, file backup sẽ được tạo tại:

```text
C:\Users\Toi Hoang\ecommerce.sql
```

#### Bước 2: Upload file database lên EC2

Do RDS nằm trong Private Subnet, file backup sẽ được đưa lên EC2 trước.

Sử dụng **WinSCP** để kết nối đến EC2 thông qua giao thức **SFTP**.

Cấu hình kết nối:

| Thuộc tính       | Giá trị             |
| ---------------- | ------------------- |
| File protocol    | `SFTP`              |
| Host name        | Public IPv4 của EC2 |
| Port             | `22`                |
| User name        | `ec2-user`          |
| Private key file | `keypem.ppk`        |

Sau khi kết nối, upload file:

```text
ecommerce.sql
```

vào thư mục:

```text
/home/ec2-user/
```

<p align="center">
  <img src="/images/5-Workshop/5.5-Amazon-RDS-MySQL/upload-sql.png" width="1900">
</p>

Kiểm tra file trên EC2:

```bash
ls -lh ~/ecommerce.sql
```

Nếu file xuất hiện trong danh sách, quá trình upload đã hoàn tất.

#### Bước 3: Kiểm tra kết nối từ EC2 đến RDS

Trên EC2, kiểm tra port 3306 của RDS:

```bash
nc -zv techmart-db.chei8cka8fg4.ap-southeast-1.rds.amazonaws.com 3306
```

Nếu kết nối thành công, hệ thống sẽ hiển thị thông báo tương tự:

```text
Connection to techmart-db.chei8cka8fg4.ap-southeast-1.rds.amazonaws.com
3306 port [tcp/mysql] succeeded!
```

Điều này cho thấy EC2 có thể kết nối đến MySQL trên RDS.

#### Bước 4: Kết nối đến RDS từ EC2

Cài đặt MySQL client trên EC2:

```bash
sudo dnf install mariadb105 -y
```

Sau đó kết nối đến RDS:

```bash
mysql \
-h techmart-db.chei8cka8fg4.ap-southeast-1.rds.amazonaws.com \
-P 3306 \
-u admin \
-p
```

Nhập mật khẩu Master password đã cấu hình khi tạo RDS.

#### Bước 5: Tạo database `ecommerce`

Sau khi kết nối thành công, tạo database:

```sql
CREATE DATABASE ecommerce;
```

Kiểm tra:

```sql
SHOW DATABASES;
```

Database `ecommerce` sẽ xuất hiện trong danh sách.

Thoát khỏi MySQL:

```sql
EXIT;
```

#### Bước 6: Import database vào RDS

Trên EC2, thực hiện lệnh:

```bash
mysql \
-h techmart-db.chei8cka8fg4.ap-southeast-1.rds.amazonaws.com \
-P 3306 \
-u admin \
-p \
ecommerce < ~/ecommerce_backup.sql
```

Nhập mật khẩu RDS khi được yêu cầu.

Quá trình này sẽ đưa toàn bộ cấu trúc bảng và dữ liệu từ database local vào database `ecommerce` trên RDS.

#### Bước 7: Kiểm tra dữ liệu sau khi import

Kết nối lại đến RDS:

```bash
mysql \
-h techmart-db.chei8cka8fg4.ap-southeast-1.rds.amazonaws.com \
-P 3306 \
-u admin \
-p
```

Chọn database:

```sql
USE ecommerce;
```

Kiểm tra các bảng:

```sql
SHOW TABLES;
```

Kiểm tra dữ liệu trong bảng `products`:

```sql
SELECT name, image, slug
FROM products
ORDER BY name;
```

<p align="center">
  <img src="/images/5-Workshop/5.5-Amazon-RDS-MySQL/show.png" width="900">
</p>

