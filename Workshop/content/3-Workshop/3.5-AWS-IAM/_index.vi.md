---
title : "Cấu hình IAM Role cho Máy chủ EC2"
date : 2026-01-01
weight : 5
chapter : false
pre : "  3.5  "
---

#### Bước 1: Khởi tạo IAM Role (TechMart-EC2-Role)

1. Truy cập **AWS Management Console**.
2. Tìm và chọn dịch vụ **IAM**.
3. Tại menu bên trái, chọn **Roles**.
4. Bấm **Create role**.
5. Tại mục **Select trusted entity**:
   - **Trusted entity type:** Chọn **AWS service**.
   - **Use case:** Chọn **EC2**.

<p align="center">
  <img src="/images/3-Workshop/3.5/create_role.png" width="1100">
</p>

6. Bấm **Next**.

---

#### Bước 2: Đính kèm các Managed Policies chuẩn AWS

Tại màn hình **Add permissions**, tìm kiếm và tích chọn lần lượt 3 AWS Managed Policies sau:

`AmazonSSMManagedInstanceCore`

**Mục đích:** Cho phép agent trên EC2 kết nối với AWS Systems Manager, hỗ trợ quản trị từ xa qua SSM Session Manager mà không cần mở Port 22 SSH.

`AmazonS3ReadOnlyAccess`

**Mục đích:** Cho phép máy chủ EC2 đọc và tải tập tin sao lưu cơ sở dữ liệu (`ecommerce.sql`) cũng như các tệp tĩnh từ Amazon S3 Bucket.

`AmazonEC2ContainerRegistryFullAccess` 

**Mục đích:** Cấp toàn quyền thao tác với Amazon ECR (Elastic Container Registry).

Bấm **Next** sau khi đã tích chọn đủ 3 policy trên.

---

#### Bước 3: Đặt tên và hoàn tất khởi tạo

- **Role name:** Nhập `TechMart-EC2-Role`.
- **Description:** Nhập `IAM Role cho EC2 truy cap SSM, S3 va CloudWatch`.


Kiểm tra lại danh sách 3 policies đã gắn trong phần **Permissions summary**.

<p align="center">
  <img src="/images/3-Workshop/3.5/1.png" width="1900">
</p>

Bấm **Create role**.

#### Bước 5: Tạo inline policy cho phép backend ghi file lên S3

1. Truy cập **AWS Management Console**.
2. Tìm và chọn dịch vụ **IAM**.
3. Tại menu bên trái, chọn **Roles**.
4. Chọn **TechMart-EC2-Role**.
5. Bấm **Add permissions**
6. Chọn **Inline policy**
7. Tại mục **Policy editor** chọn **JSON**

 ```bash
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "TechMartProductImages",
			"Effect": "Allow",
			"Action": [
				"s3:PutObject",
				"s3:GetObject",
				"s3:DeleteObject"
			],
			"Resource": "arn:aws:s3:::techmart-product-images-1204/*"
		},
		{
			"Sid": "ListTechMartProductImages",
			"Effect": "Allow",
			"Action": "s3:ListBucket",
			"Resource": "arn:aws:s3:::techmart-product-images-1204"
		}
	]
}
 ```

 <p align="center">
  <img src="/images/3-Workshop/3.5/policy.png" width="1100">
</p>

8. Nhập tên cho policy `Allow_Write_S3`

9. Bấm **Create policy**




