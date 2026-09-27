---

title: "Dọn dẹp tài nguyên"

date: 2026-01-01

weight: 10

chapter: false

pre: " <b> 3.10. </b> "

---

## Dọn dẹp hệ thống AWS

Sau khi hoàn thành quá trình triển khai và kiểm thử hệ thống TechMart trên AWS, tiến hành dọn dẹp các tài nguyên không còn sử dụng nhằm tránh phát sinh chi phí ngoài dự kiến và đảm bảo môi trường AWS luôn gọn gàng.

### 1. Xóa EC2 Instance

Trước tiên, dừng và xóa các EC2 Instance được sử dụng để triển khai ứng dụng. Truy cập **AWS Management Console → EC2 → Instances**, chọn instance cần xóa và thực hiện **Terminate instance**.

Việc terminate EC2 Instance sẽ giải phóng tài nguyên máy chủ và chấm dứt chi phí tính toán phát sinh từ instance đó.

### 2. Xóa các tài nguyên liên quan đến EC2

Sau khi terminate EC2, kiểm tra các tài nguyên liên quan như:

* Elastic IP không còn sử dụng.
* EBS Volume không còn được gắn với instance.
* AMI và Snapshot không còn cần thiết.
* Security Group không còn được sử dụng.
* Key Pair không còn cần thiết.

Đặc biệt, cần kiểm tra các **EBS Volume** và **Elastic IP** để tránh tiếp tục phát sinh chi phí sau khi EC2 đã được xóa.

### 3. Xóa Amazon RDS

Nếu cơ sở dữ liệu RDS chỉ được sử dụng cho môi trường thực hành, tiến hành xóa DB Instance sau khi đã hoàn thành kiểm thử.

Trước khi xóa, cần kiểm tra và sao lưu dữ liệu cần thiết. Trong trường hợp không cần giữ lại dữ liệu, có thể bỏ qua việc tạo final snapshot để tránh phát sinh chi phí lưu trữ.

Thực hiện tại:

**AWS Management Console → RDS → Databases → chọn database → Actions → Delete**

### 4. Xóa Amazon S3

Kiểm tra các bucket S3 được tạo trong quá trình triển khai. Nếu bucket không còn sử dụng, xóa toàn bộ các object bên trong trước khi xóa bucket.

Thực hiện tại:

**AWS Management Console → S3 → Bucket → Delete objects → Delete bucket**

Đối với các bucket chứa dữ liệu sản phẩm, hình ảnh hoặc file phục vụ ứng dụng, chỉ xóa khi đã xác định dữ liệu không còn cần thiết.

### 5. Kiểm tra VPC và Network Resources

Kiểm tra các tài nguyên mạng được tạo riêng cho hệ thống, bao gồm:

* VPC.
* Subnet.
* Internet Gateway.
* NAT Gateway.
* Route Table.
* VPC Endpoint nếu có.

Nếu môi trường AWS được tạo riêng cho workshop và không còn sử dụng, có thể xóa các tài nguyên này theo thứ tự phù hợp.

Đặc biệt, cần kiểm tra **NAT Gateway**, vì đây là tài nguyên có thể phát sinh chi phí ngay cả khi hệ thống không có nhiều lưu lượng truy cập.

### 6. Kiểm tra IAM

Kiểm tra các IAM User, IAM Role và Policy được tạo riêng cho workshop.

Các tài khoản hoặc quyền truy cập không còn cần thiết nên được loại bỏ để giảm số lượng tài nguyên quản lý và hạn chế quyền truy cập không cần thiết.

Đối với IAM Role được EC2 sử dụng, chỉ xóa sau khi EC2 và các dịch vụ liên quan đã được dọn dẹp.

### 7. Kiểm tra Amazon ECR

Nếu sử dụng Amazon ECR để lưu trữ Docker Image, kiểm tra các repository và image đã tạo.

Các image hoặc repository không còn sử dụng có thể được xóa để giảm dung lượng lưu trữ.

### 8. Kiểm tra chi phí AWS

Sau khi hoàn tất việc xóa tài nguyên, truy cập:

**AWS Billing and Cost Management → Bills / Cost Explorer**

để kiểm tra các dịch vụ vẫn đang phát sinh chi phí.

Có thể kiểm tra theo từng dịch vụ như:

* Amazon EC2
* Amazon RDS
* Amazon S3
* Amazon ECR
* Amazon VPC

Việc kiểm tra chi phí giúp xác nhận rằng các tài nguyên không cần thiết đã được loại bỏ.

### 10. Kết quả

Sau quá trình dọn dẹp, các tài nguyên AWS không còn sử dụng được loại bỏ, giảm nguy cơ phát sinh chi phí ngoài dự kiến. Các tài nguyên cần thiết cho việc lưu trữ kết quả, mã nguồn hoặc tài liệu của dự án được giữ lại để phục vụ việc tham khảo và phát triển trong tương lai.

Quá trình dọn dẹp cũng giúp môi trường AWS trở nên rõ ràng hơn, hạn chế các tài nguyên dư thừa và tăng tính an toàn trong quá trình quản lý hệ thống.
