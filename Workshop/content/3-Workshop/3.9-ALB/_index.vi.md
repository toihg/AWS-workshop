---

title: "Cấu hình Application Load Balancer"

date: 2026-01-01

weight: 9

chapter: false

pre: " <b> 3.9. </b> "

---

Sau khi triển khai thành công hệ thống TechMart trên Amazon EC2, **Application Load Balancer (ALB)** được cấu hình để làm điểm truy cập từ Internet đến ứng dụng. ALB tiếp nhận các HTTP request từ người dùng và chuyển tiếp request đến EC2 thông qua Target Group.

Kiến trúc sau khi cấu hình ALB:

```text
                         Internet
                             │
                             ▼
                  ┌────────────────────┐
                  │ Application Load   │
                  │     Balancer       │
                  │       :80          │
                  └─────────┬──────────┘
                            │
                            │ HTTP :80
                            ▼
                  ┌────────────────────┐
                  │       EC2          │
                  │                    │
                  │      Nginx :80     │
                  │         │          │
                  │    ┌────┴────┐     │
                  │    ▼         ▼     │
                  │ Frontend  Backend  │
                  │  :3000      :8080  │
                  └─────────┬──────────┘
                            │
                    ┌───────┴───────┐
                    ▼               ▼
                RDS MySQL          S3
```

### 1. Tạo Target Group

Target Group được sử dụng để xác định các EC2 Instance nhận request từ Application Load Balancer.

Truy cập:

**AWS Management Console → EC2 → Target Groups → Create target group**

Thiết lập:
* Target type: Instances
* Target group name: `techmart-target-group`
* Protocol: HTTP
* Port: 80
* IP address type: IPv4
* VPC: VPC của hệ thống TechMart

<p align="center">
  <img src="/images/3-Workshop/3.8/1.png" width="1400">
</p>

Bấm **Next**

Mục đăng ký Target, chọn **TechMart-App-Server**

<p align="center">
  <img src="/images/3-Workshop/3.8/2.png" width="1400">
</p>

Bấm **Next** rồi bấm **Create target group**

Sau khi đăng ký, kiểm tra trạng thái Target.

Target hoạt động bình thường sẽ có trạng thái:

```text
healthy
```

### 2. Tạo Application Load Balancer

Truy cập:

**EC2 → Load Balancers → Create Load Balancer**

Trong Load balancer type chọn :

**Application Load Balancer**

Cấu hình:

|Load balancer name| `techmart-alb`|
|---|----|
|Scheme| Internet-facing|
|IP address type| IPv4|

<p align="center">
  <img src="/images/3-Workshop/3.8/3.png" width="1500">
</p>

### 3. Cấu hình Network Mapping

Chọn:

* VPC của hệ thống TechMart.
* Các Availability Zone có Subnet phù hợp để ALB hoạt động.

ALB được đặt trong các **Public Subnet** để có thể nhận request từ Internet.

### 5. Gắn Security Group cho ALB

Tại phần Security Groups, chọn **TechMart-ALB-SG**.

<p align="center">
  <img src="/images/3-Workshop/3.8/4.png" width="1000">
</p>

Ấn **Create load balancer**

### 10. Kiểm tra Application Load Balancer

Sau khi Target đã ở trạng thái **healthy**, lấy DNS name của ALB tại:

**EC2 → Load Balancers → techmart-alb**

`techmart-alb-277409451.ap-southeast-1.elb.amazonaws.com`
Truy cập địa chỉ này trên trình duyệt:

Nếu cấu hình thành công, trang Web TechMart được trả về thông qua Application Load Balancer.

<p align="center">
  <img src="/images/3-Workshop/3.8/5.png" width="1000">
</p>