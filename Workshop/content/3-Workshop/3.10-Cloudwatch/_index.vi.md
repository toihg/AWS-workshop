---

title: "Giám sát hệ thống với Amazon CloudWatch"

date: 2026-01-01

weight: 10

chapter: false

pre: " <b> 3.10. </b> "

---

Amazon CloudWatch được sử dụng để giám sát hệ thống TechMart đang chạy trên Amazon EC2. Trong workshop này, CloudWatch được cấu hình để theo dõi các metric của EC2, tạo Dashboard giám sát và thiết lập Alarm kết hợp với Amazon SNS để gửi thông báo qua email.

EC2 Instance được sử dụng cho hệ thống TechMart:

| Thuộc tính   | Giá trị               |
| ------------ | --------------------- |
| Tên Instance | `TechMart-App-Server` |
| Instance ID  | `i-064490182f202c711` |
| AWS Region   | `ap-southeast-1`      |

---

## 1. Giám sát các Metric của EC2

CloudWatch tự động thu thập nhiều metric từ Amazon EC2. Trong workshop này, các metric được lựa chọn để giám sát gồm:

| Metric              | Mô tả                                                                          |
| ------------------- | ------------------------------------------------------------------------------ |
| `CPUUtilization`    | Tỷ lệ sử dụng CPU của EC2 Instance                                             |
| `NetworkIn`         | Lượng dữ liệu nhận vào EC2 Instance                                            |
| `NetworkOut`        | Lượng dữ liệu gửi ra từ EC2 Instance                                           |
| `StatusCheckFailed` | Cho biết EC2 Instance có gặp lỗi trong quá trình kiểm tra trạng thái hay không |

### Bước 1: Truy cập CloudWatch

1. Đăng nhập vào **AWS Management Console**.

2. Mở dịch vụ **CloudWatch**.

3. Trong thanh điều hướng, chọn **Classic metrics**.

<p align="center">
  <img src="/images/3-Workshop/3.10/1.png" width="1400">
</p>

### Bước 2: Theo dõi CPU

Trong mục Browse, tìm  metric `CPUUtilization` của máy chủ EC2 TechMart-App-Server.

Biểu đồ thể hiện mức sử dụng CPU của EC2 Instance theo thời gian.

Metric này giúp đánh giá mức độ sử dụng tài nguyên xử lý của máy chủ khi ứng dụng TechMart đang hoạt động.

Nếu CPU Utilization duy trì ở mức cao trong thời gian dài, cần kiểm tra các tiến trình hoặc Docker container đang chạy trên EC2 Instance.

### Bước 3: Theo dõi lưu lượng mạng

Chọn hai metric:

`
NetworkIn`
`
NetworkOut
`

Trong đó:

* **NetworkIn**: lượng dữ liệu được nhận vào EC2 Instance.
* **NetworkOut**: lượng dữ liệu được gửi từ EC2 Instance.

Các metric này giúp theo dõi hoạt động mạng của hệ thống khi người dùng truy cập ứng dụng TechMart.

### Bước 4: Theo dõi trạng thái EC2

Chọn metric:

`
StatusCheckFailed
`

Metric này được sử dụng để theo dõi kết quả kiểm tra trạng thái của EC2 Instance.

Trong điều kiện hoạt động bình thường, EC2 Instance không nên liên tục xuất hiện lỗi status check. Nếu xảy ra lỗi, cần kiểm tra EC2 Instance và các tài nguyên liên quan.

<p align="center">
  <img src="/images/3-Workshop/3.10/2.png" width="1400">
</p>

---

## 2. Tạo CloudWatch Dashboard

CloudWatch Dashboard được sử dụng để hiển thị các metric quan trọng trên cùng một giao diện. Điều này giúp thuận tiện hơn trong quá trình giám sát EC2 Instance của hệ thống TechMart.

### Bước 1: Tạo Dashboard

1. Mở **CloudWatch**.

2. Chọn **Dashboards** trong thanh điều hướng.

3. Chọn **Create dashboard**.

4. Đặt tên Dashboard:

   `
   TechMart-EC2-Monitoring
   `

<p align="center">
  <img src="/images/3-Workshop/3.10/3.png" width="1400">
</p>

5. Chọn **Create dashboard**.

### Bước 2: Thêm CPU Utilization

1. Chọn **Add widget**.

2. Chọn **Cloudwatch**.

3. Chọn **Metrics**.

4. Chọn **Metrics Console**.

2. Chọn loại biểu đồ **Line**.

6. Ấn **Next**


<p align="center">
  <img src="/images/3-Workshop/3.10/4.png" width="1400">
</p>

7. Chọn **EC2**

4. Chọn metric của TechMart-App-Server:

   `
   CPUUtilization
   `

    <p align="center">
    <img src="/images/3-Workshop/3.10/5.png" width="1400">
    </p>

6. Ấn **Create widge**

Widget sẽ hiển thị mức sử dụng CPU của EC2 theo thời gian.

### Bước 3: Thêm các Metric mạng

Thêm hai widget cho:

`NetworkIn`, `NetworkOut`

Đối với mỗi metric:

Thực hiện các bước như thêm metric CPUUtilization

### Bước 4: Thêm Status Check

Thêm một widget cho metric:

`
StatusCheckFailed
`

Widget này giúp theo dõi trạng thái kiểm tra của EC2 Instance trực tiếp trên Dashboard.

Dashboard hoàn chỉnh gồm:

```text
TechMart-EC2-Monitoring
│
├── CPUUtilization
├── NetworkIn
├── NetworkOut
└── StatusCheckFailed
```

### Bước 5: Lưu Dashboard

Sau khi thêm đầy đủ các widget, chọn **Save**.

Dashboard có thể được sử dụng làm giao diện giám sát tập trung cho EC2 Instance của hệ thống TechMart.

<p align="center">
    <img src="/images/3-Workshop/3.10/6.png" width="1400">
    </p>

---

## 3. Tạo CloudWatch Alarm và thông báo qua SNS

CloudWatch Alarm được sử dụng để tự động phát hiện khi một metric vượt quá ngưỡng được thiết lập.

Trong workshop này, Alarm được tạo cho metric:

```text
CPUUtilization
```

với ngưỡng:

```text
CPUUtilization > 80%
```

Khi điều kiện được đáp ứng, CloudWatch chuyển Alarm sang trạng thái `ALARM` và gửi thông báo thông qua Amazon SNS.

### Bước 1: Tạo Alarm

1. Mở **CloudWatch**.

2. Chọn **Alarms**.

3. Chọn **Create alarm**.

4. Chọn **Select metric**.

5. Chọn **EC2**.

6. Chọn **Per-Instance Metrics**.

7. Chọn metric `CPUUtilization` của **TechMart-App-Server**

8. Ấn **Select metric**

### Bước 2: Cấu hình Metric

Thiết lập các thông số:

| Thiết lập           | Giá trị       |
| ------------------- | ------------- |
| Statistic           | `Average`     |
| Period              | `5 minutes`   |
| Threshold type      | `Static`      |
| Condition           | `Greater (>)` |
| Threshold           | `80`          |

Điều kiện Alarm là:

```text
CPUUtilization > 80%
```

trong một datapoint thuộc khoảng thời gian 5 phút.

<p align="center">
    <img src="/images/3-Workshop/3.10/7.png" width="1400">
    </p>

Ấn **Next**

### Bước 3: Cấu hình thông báo SNS

Tại bước **Configure actions**:

1. Đặt trạng thái kích hoạt:

   ```text
   In alarm
   ```

2. Tại phần **Send a notification to the following SNS topic**, chọn:

   ```text
   Create new topic
   ```

3. Đặt tên SNS Topic:

   ```text
   TechMart-CPU-Alert
   ```

4. Nhập địa chỉ email nhận thông báo.

5. Tạo SNS Topic.

AWS sẽ gửi email xác nhận đăng ký đến địa chỉ email đã nhập.

<p align="center">
    <img src="/images/3-Workshop/3.10/8.png" width="1400">
    </p>

Mở email và chọn **Confirm subscription** để xác nhận.

Ấn **Next**

### Bước 4: Cấu hình thông tin Alarm

Đặt tên Alarm:

```text
TechMart-EC2-High-CPU
```

Có thể thêm mô tả:

```text
Alarm when TechMart-App-Server CPU utilization exceeds 80%.
```

Ấn **Next**

### Bước 5: Kiểm tra và tạo Alarm

Kiểm tra lại cấu hình:

| Thành phần | Giá trị                 |
| ---------- | ----------------------- |
| Metric     | `CPUUtilization`        |
| Instance   | `TechMart-App-Server`   |
| Statistic  | `Average`               |
| Period     | `5 minutes`             |
| Condition  | `CPUUtilization > 80%`  |
| Action     | SNS notification        |
| Alarm name | `TechMart-EC2-High-CPU` |

Sau khi kiểm tra, chọn **Create alarm**.

### Bước 6: Kiểm tra trạng thái Alarm

Sau khi tạo Alarm, truy cập:

**CloudWatch → Alarms → All alarms**

Alarm có thể có một trong ba trạng thái:

| Trạng thái          | Ý nghĩa                                              |
| ------------------- | ---------------------------------------------------- |
| `OK`                | CPU đang nằm trong ngưỡng được cấu hình              |
| `ALARM`             | CPU đã vượt quá ngưỡng được cấu hình                 |
| `INSUFFICIENT_DATA` | CloudWatch chưa có đủ dữ liệu để xác định trạng thái |

<p align="center">
    <img src="/images/3-Workshop/3.10/9.png" width="1400">
    </p>

Trong điều kiện hoạt động bình thường, Alarm sẽ ở trạng thái:

```text
OK
```

Nếu CPU Utilization vượt quá 80% trong khoảng thời gian được cấu hình, Alarm sẽ chuyển sang:

```text
ALARM
```

và Amazon SNS gửi thông báo đến email đã đăng ký.

---

## Kết quả

Sau khi hoàn thành cấu hình, hệ thống TechMart có một cơ chế giám sát và cảnh báo cơ bản:

```text
EC2 Instance
TechMart-App-Server
        │
        ├── CPUUtilization
        ├── NetworkIn
        ├── NetworkOut
        └── StatusCheckFailed
                │
                ▼
       CloudWatch Dashboard
                │
                ▼
       CloudWatch Alarm
                │
        CPU > 80% condition
                │
                ▼
              SNS
                │
                ▼
        Email Notification
```

Cấu hình này cho phép theo dõi tập trung hoạt động của EC2 Instance, đồng thời tự động gửi thông báo khi mức sử dụng CPU vượt quá ngưỡng được thiết lập.
