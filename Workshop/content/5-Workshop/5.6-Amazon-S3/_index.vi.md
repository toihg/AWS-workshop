---
title : "Cấu hình Amazon S3"
date : 2026-01-01
weight : 6
chapter : false
pre : " <b> 5.6. </b> "
---

### Mục tiêu

Amazon S3 được sử dụng để lưu trữ hình ảnh sản phẩm của hệ thống TechMart. Thay vì lưu trực tiếp hình ảnh trong cơ sở dữ liệu hoặc trên máy chủ EC2, ứng dụng sẽ tải hình ảnh lên S3 và lưu đường dẫn hình ảnh trong MySQL trên Amazon RDS.

---

#### 1. Truy cập Amazon S3

1. Đăng nhập vào AWS Management Console.

2. Tìm kiếm dịch vụ S3.

3. Chọn S3 trong danh sách dịch vụ.

4. Nhấn Create bucket để tạo bucket mới.

---

#### 2. Cấu hình Bucket

Tại giao diện tạo bucket, thiết lập các thông tin sau:

| Thuộc tính | Giá trị |
|------------|---------|
| Bucket name | techmart-product-images-1204 |
| AWS Region | Asia Pacific (Singapore) ap-southeast-1 |
| Object Ownership | ACLs disabled |
| Block Public Access | Giữ nguyên tùy chọn mặc định |
| Bucket Versioning | Disable |
| Default Encryption | Enable |
| Encryption type | SSE-S3 |

Chọn ***Create budet***

#### 3. Tạo thư mục lưu trữ hình ảnh

Sau khi tạo bucket thành công:

1. Truy cập bucket `techmart-product-images-1204`.

2. Chọn **Create folder**.

3. Đặt tên thư mục là:

```text
products
```
4. Chọn Create folder

#### 4. Đưa hình ảnh sản phẩm lên Amazon S3

Để đưa hình ảnh lên S3:

1. Mở bucket techmart-product-images-1204.
2. Truy cập thư mục products.
3. Chọn Upload.
4. Chọn Add files hoặc Add folder.
5. Chọn các hình ảnh sản phẩm từ thư mục:
    public/images/
6. Kiểm tra danh sách file cần tải lên.
7. Chọn Upload để bắt đầu tải hình ảnh lên S3.

Sau khi upload thành công, thư mục products sẽ chứa hình ảnh sản phẩm
<p align="center">
  <img src="/images/5-Workshop/5.6-Amazon-S3/upload.png" width="1100">
</p>