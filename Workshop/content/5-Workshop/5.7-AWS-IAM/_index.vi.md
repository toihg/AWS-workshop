---

title : "Cấu hình quyền truy cập với AWS IAM"

date : 2026-01-01

weight : 7

chapter : false

pre : " <b> 5.7. </b> "

---

#### 1. Tạo IAM Role cho EC2

EC2 cần quyền truy cập Amazon ECR để có thể lấy Docker Image về và triển khai Backend.

Thực hiện:

1. Truy cập **AWS Console → IAM → Roles**.
2. Chọn **Create role**.
3. Tại **Trusted entity type**, chọn **AWS service**.
4. Chọn **EC2** làm use case.
5. Chọn **Next**.
6. Tìm và chọn policy:

   `AmazonEC2ContainerRegistryReadOnly`

7. Chọn **Next**.
8. Đặt tên Role:

   `TechMart-EC2-Role`

9. Chọn **Create role**.

Role `TechMart-EC2-Role` cho phép EC2 thực hiện các thao tác đọc cần thiết trên Amazon ECR để lấy Docker Image của ứng dụng.

---

#### 2. Gán IAM Role cho EC2

Sau khi tạo Role, tiến hành gán `TechMart-EC2-Role` cho EC2.

Thực hiện:

1. Truy cập **AWS Console → EC2 → Instances**.
2. Chọn instance:

   `TechMart-Backend-EC2`

3. Chọn **Actions → Security → Modify IAM role**.
4. Tại phần IAM role, chọn:

   `TechMart-EC2-Role`

5. Chọn **Update IAM role**.

---

#### 3. Tạo IAM Role cho AWS CodeBuild

AWS CodeBuild cần quyền để thực hiện quá trình build Docker Image, ghi log và đẩy Docker Image lên Amazon ECR.

Thực hiện:

1. Truy cập **AWS Console → IAM → Roles**.
2. Chọn **Create role**.
3. Tại **Trusted entity type**, chọn **AWS service**.
4. Chọn **CodeBuild** làm use case.
5. Chọn **Next**.
6. Thêm các policy cần thiết.

Các quyền sử dụng cho CodeBuild:

- **AmazonEC2ContainerRegistryPowerUser** – cho phép CodeBuild xác thực và đẩy Docker Image lên Amazon ECR.
- **CloudWatchLogsFullAccess** – cho phép CodeBuild ghi và quản lý log trên Amazon CloudWatch Logs.

7. Đặt tên Role:

   `TechMart-CodeBuild-Role`

8. Chọn **Create role**.

Quy trình CI/CD sử dụng Role này:

```text
GitHub → AWS CodeBuild → Amazon ECR → EC2
```

Không cấp `AdministratorAccess` cho CodeBuild nếu không cần thiết.

---

#### 4. Cấu hình quyền cho Amazon S3

Backend Spring Boot sử dụng Amazon S3 để lưu trữ hình ảnh sản phẩm.

Bucket được sử dụng:

```text
techmart-product-images-<unique>
```

Backend cần các quyền sau:

- `s3:PutObject` – cho phép tải hình ảnh sản phẩm lên S3.
- `s3:GetObject` – cho phép đọc hình ảnh sản phẩm từ S3.
- `s3:DeleteObject` – cho phép xóa hình ảnh sản phẩm khỏi S3.

Tạo policy riêng cho S3:

1. Truy cập **AWS Console → IAM → Policies**.
2. Chọn **Create policy**.
3. Chọn **JSON**.
4. Nhập policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::techmart-product-images-<unique>/*"
    }
  ]
}
```

5. Chọn **Next**.
6. Đặt tên:

```text
TechMart-S3-Policy
```

7. Chọn **Create policy**.

Sau đó gắn policy `TechMart-S3-Policy` vào Role được sử dụng bởi Backend:

**IAM → Roles → TechMart-EC2-Role → Add permissions → Attach policies**

Chọn:

```text
TechMart-S3-Policy
```
---

#### 5. Cấu hình quyền gửi email với Amazon SES

Backend sử dụng Amazon SES để gửi email tự động đến khách hàng khi có các sự kiện liên quan đến đơn hàng.

IAM Role sử dụng cho Backend cần các quyền:

```text
ses:SendEmail
ses:SendRawEmail
```

Các quyền này cho phép Backend gửi email thông qua Amazon SES.

Có thể tạo policy riêng:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
```

Đặt tên policy:

```text
TechMart-SES-Policy
```

Sau đó gắn policy vào IAM Role được sử dụng bởi Backend.

Backend sử dụng quyền IAM này để gửi email thông báo tự động mà không cần lưu AWS Access Key và Secret Key trên EC2.
