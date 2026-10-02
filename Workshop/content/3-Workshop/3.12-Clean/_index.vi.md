---

title: "Dọn dẹp tài nguyên AWS"
date: 2026-01-01
weight: 12
chapter: false
pre: " <b> 3.12. </b> "
-----------------------

Sau khi hoàn thành quá trình triển khai và kiểm thử hệ thống TechMart, tiến hành dọn dẹp các tài nguyên AWS không còn sử dụng. Việc này nhằm giải phóng tài nguyên và hạn chế phát sinh chi phí sau khi hoàn thành workshop.

## 1. Dừng và xóa EC2 Instance

Máy chủ EC2 được sử dụng để triển khai ứng dụng TechMart. Sau khi hoàn thành workshop, nếu không cần tiếp tục duy trì hệ thống, có thể Terminate EC2 Instance.

### Thực hiện

1. Truy cập **AWS Management Console**.

2. Mở dịch vụ **EC2**.

3. Chọn **Instances**.

4. Tìm Instance của hệ thống:

   ```text
   TechMart-App-Server
   ```

5. Kiểm tra Instance ID để đảm bảo chọn đúng máy chủ.

6. Chọn **Instance state → Terminate instance**.

7. Xác nhận thao tác bằng cách chọn **Terminate**.

<p align="center">
    <img src="/images/3-Workshop/3.12/1.png" width="1400">
</p>

---

## 2. Xóa Application Load Balancer

Application Load Balancer được sử dụng để phân phối request từ người dùng đến EC2 Instance.

### Thực hiện

1. Mở dịch vụ **EC2**.
2. Chọn **Load Balancers**.
3. Tìm Load Balancer của hệ thống TechMart.
4. Chọn Load Balancer.
5. Chọn **Actions → Delete load balancer**.
6. Xác nhận thao tác xóa.

Sau khi xóa Load Balancer, hệ thống sẽ không còn nhận request thông qua địa chỉ của ALB.

---

## 3. Xóa Target Group

Target Group được sử dụng để liên kết Application Load Balancer với EC2 Instance.

### Thực hiện

1. Trong dịch vụ **EC2**, chọn **Target Groups**.
2. Tìm Target Group của TechMart.
3. Chọn Target Group.
4. Chọn **Actions → Delete**.
5. Nhập `confirm` để xác nhận
5. Ấn **Delete**.

<p align="center">
    <img src="/images/3-Workshop/3.12/2.png" width="1400">
</p>

Target Group có thể được xóa sau khi Application Load Balancer không còn sử dụng.

---

## 4. Xóa NAT Gateway

NAT Gateway được sử dụng để cho phép các tài nguyên trong Private Subnet truy cập Internet khi cần thiết. Đây là tài nguyên cần đặc biệt kiểm tra khi dọn dẹp vì có thể phát sinh chi phí trong thời gian hoạt động.

### Thực hiện

1. Mở dịch vụ **VPC**.
2. Chọn **NAT Gateways**.
3. Tìm NAT Gateway được tạo cho TechMart.
4. Chọn NAT Gateway.
5. Chọn **Action**.
6. Chọn **Delete NAT gateway**
7. Nhập `delete` để xác nhận.

<p align="center">
    <img src="/images/3-Workshop/3.12/3.png" width="1400">
</p>

6. Ấn **Delete** để xóa.

Sau khi xóa NAT Gateway, kiểm tra các Route Table để đảm bảo không còn route trỏ đến NAT Gateway đã xóa.

---

## 5. Giải phóng Elastic IP

Elastic IP được sử dụng cùng với NAT Gateway trong quá trình triển khai hệ thống.

### Thực hiện

1. Mở dịch vụ **EC2**.
2. Chọn **Elastic IPs**.
3. Tìm Elastic IP được sử dụng cho TechMart.
5. Chọn Elastic IP.
6. Chọn **Actions → Release Elastic IP addresses**.
7. Ấn **Release** để xác nhận.

---

## 6. Xóa Amazon RDS

Amazon RDS MySQL được sử dụng để lưu trữ dữ liệu của hệ thống TechMart. Nếu không cần duy trì cơ sở dữ liệu sau workshop, có thể xóa RDS Instance.

### Thực hiện

1. Mở dịch vụ **Amazon RDS**.
2. Chọn **Databases**.
3. Tìm Database Instance của TechMart.
4. Chọn Database Instance.
5. Chọn **Actions → Delete**.
6. Nhập `delete me` để xác nhận.
7. Kiểm tra tùy chọn tạo bản sao lưu trước khi xóa.
8. Ấn **Delete**.

<p align="center">
    <img src="/images/3-Workshop/3.12/4.png" width="1400">
</p>

---

## 7. Xóa CloudWatch Alarm

Trong quá trình giám sát EC2, CloudWatch Alarm được sử dụng để theo dõi các chỉ số quan trọng như CPU Utilization.

Sau khi hoàn thành workshop, các Alarm không còn cần thiết có thể được xóa.

### Thực hiện

1. Mở dịch vụ **CloudWatch**.
2. Chọn **Alarms**.
3. Tìm Alarm của hệ thống TechMart.
4. Chọn Alarm cần xóa.
5. Chọn **Action**
6. Chọn **Delete**.
6. Xác nhận thao tác.

<p align="center">
    <img src="/images/3-Workshop/3.12/5.png" width="1400">
</p>


Việc xóa Alarm không ảnh hưởng đến EC2 Instance hoặc các tài nguyên ứng dụng khác.

---

## 8. Xóa CloudWatch Dashboard

Nếu đã tạo Dashboard để theo dõi các metric của EC2, có thể xóa Dashboard sau khi hoàn thành quá trình giám sát.

### Thực hiện

1. Mở **CloudWatch**.
2. Chọn **Dashboards**.
3. Chọn Dashboard của TechMart.
4. Chọn **Delete**.
5. Xác nhận thao tác.

<p align="center">
    <img src="/images/3-Workshop/3.12/6.png" width="1400">
</p>

---

## 9. Kiểm tra Amazon S3

Bucket Amazon S3 được sử dụng để lưu trữ dữ liệu hình ảnh sản phẩm của TechMart.

Nếu bucket không còn được sử dụng sau workshop, có thể tiến hành xóa dữ liệu và bucket.

### Thực hiện

1. Mở dịch vụ **Amazon S3**.
2. Chọn bucket của TechMart.
3. Chọn **Empty**
4. Nhập `permanently delete` để xác nhận.
5. Ấn **Empty**

<p align="center">
    <img src="/images/3-Workshop/3.12/7.png" width="1400">
</p>

6. Trở về giao diện của dịch vụ S3, tiếp tục chọn bucket của TechMart
7. Ấn **Delete**
8. Nhập tên của bucket để xác nhận xóa.
9. Ấn **Delete bucket.

---

## 10. Kiểm tra các tài nguyên mạng

Sau khi xóa các tài nguyên chính, kiểm tra lại VPC và các thành phần mạng được tạo cho hệ thống TechMart.

Các tài nguyên cần kiểm tra gồm:

* VPC.
* Public Subnet.
* Private Subnet.
* Internet Gateway.
* NAT Gateway.
* Route Table.
* Security Groups.
* VPC Endpoints.

Nếu VPC chỉ được sử dụng cho workshop và không còn tài nguyên phụ thuộc, có thể tiến hành xóa VPC.

### Thực hiện

1. Mở dịch vụ **VPC**.

2. Chọn **Your VPCs**.

3. Tìm VPC:

   ```text
   TechMart-VPC
   ```

4. Kiểm tra các tài nguyên đang sử dụng VPC.

5. Xóa các tài nguyên phụ thuộc không còn sử dụng.

6. Xóa Internet Gateway nếu không còn cần thiết.

7. Xóa các Subnet và Route Table không còn sử dụng.

8. Xóa VPC sau khi các tài nguyên phụ thuộc đã được xử lý.


---

## 11. Kiểm tra tài nguyên sau khi dọn dẹp

Sau khi hoàn thành quá trình dọn dẹp, tiến hành kiểm tra lại các dịch vụ AWS để đảm bảo các tài nguyên không còn sử dụng đã được xử lý.

| Dịch vụ    | Tài nguyên kiểm tra                                      |
| ---------- | -------------------------------------------------------- |
| EC2        | Instance, ALB, Target Group, Elastic IP                  |
| RDS        | Database Instance                                        |
| VPC        | NAT Gateway, VPC, Subnet, Internet Gateway, VPC Endpoint |
| S3         | Bucket và dữ liệu                                        |
| CloudWatch | Alarm, Dashboard                                         |

Đặc biệt cần kiểm tra các tài nguyên có khả năng phát sinh chi phí như:

* EC2 Instance.
* RDS.
* NAT Gateway.
* Application Load Balancer.
* Elastic IP.
* EBS Volume.
* S3 Storage.

---

## 12. Kết quả

Sau khi hoàn thành quá trình dọn dẹp, các tài nguyên AWS được tạo phục vụ cho workshop và không còn nhu cầu sử dụng đã được kiểm tra và loại bỏ.

Quy trình dọn dẹp được thực hiện theo thứ tự:

```text
Hoàn thành kiểm thử
        │
        ▼
Xóa EC2 và Application Load Balancer
        │
        ▼
Xóa Target Group
        │
        ▼
Xóa NAT Gateway và Elastic IP
        │
        ▼
Xóa RDS nếu không còn sử dụng
        │
        ▼
Xóa CloudWatch Alarm và Dashboard
        │
        ▼
Kiểm tra S3
        │
        ▼
Kiểm tra các tài nguyên VPC
        │
        ▼
Kiểm tra toàn bộ tài nguyên AWS
```

Việc dọn dẹp giúp giải phóng các tài nguyên không còn sử dụng và hạn chế phát sinh chi phí không cần thiết sau khi hoàn thành workshop.
