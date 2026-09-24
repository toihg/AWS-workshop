---
title : "Triển khai Amazon CloudWatch"
date : 2026-01-01
weight : 10
chapter : false
pre : " <b> 5.10. </b> "
---

---

title: "Triển khai Amazon CloudWatch"
date: 2026-01-01
weight: 10
chapter: false
pre: "<b> 5.10. </b>"
---------------------

## 1. Mục tiêu

Amazon CloudWatch được sử dụng để giám sát và theo dõi hoạt động của EC2 trong hệ thống TechMart. CloudWatch được triển khai để thu thập các thông số CPU, RAM, Disk và log của ứng dụng Backend.

## 2. Cài đặt CloudWatch Agent

Đăng nhập vào EC2 và cài đặt CloudWatch Agent:

```bash
sudo dnf install amazon-cloudwatch-agent -y
```

Kiểm tra CloudWatch Agent:

```bash
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a -?
```

## 3. Cấu hình CloudWatch Agent

Tạo file cấu hình:

```bash
sudo nano /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json
```

Sử dụng cấu hình sau:

```json
{
  "agent": {
    "metrics_collection_interval": 60
  },
  "metrics": {
    "namespace": "TechMart/EC2",
    "metrics_collected": {
      "cpu": {
        "measurement": [
          "cpu_usage_idle",
          "cpu_usage_user",
          "cpu_usage_system"
        ],
        "totalcpu": true
      },
      "mem": {
        "measurement": [
          "mem_used_percent"
        ]
      },
      "disk": {
        "measurement": [
          "used_percent"
        ],
        "resources": [
          "*"
        ]
      }
    }
  },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/lib/docker/containers/*/*.log",
            "log_group_name": "/techmart/docker",
            "log_stream_name": "{instance_id}/docker",
            "timezone": "UTC"
          }
        ]
      }
    }
  }
}
```

Cấu hình trên cho phép thu thập:

* CPU của EC2.
* Mức sử dụng RAM.
* Dung lượng Disk.
* Log của các Docker container.

## 4. Khởi động CloudWatch Agent

Sau khi cấu hình, khởi động Agent:

```bash
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
-a fetch-config \
-m ec2 \
-c file:/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json \
-s
```

Kiểm tra trạng thái:

```bash
sudo systemctl status amazon-cloudwatch-agent
```

Nếu hiển thị:

```text
Active: active (running)
```

CloudWatch Agent đã hoạt động.

## 5. Kiểm tra Metrics

Truy cập:

**AWS Console → CloudWatch → Metrics → All metrics → Custom namespaces → `TechMart/EC2`**

Tại đây có thể theo dõi:

* `cpu_usage_idle`
* `cpu_usage_user`
* `cpu_usage_system`
* `mem_used_percent`
* `disk_used_percent`

Các metrics được cập nhật định kỳ 60 giây.

## 6. Kiểm tra Logs

Truy cập:

**AWS Console → CloudWatch → Logs → Log groups**

Chọn:

```text
/techmart/docker
```

Log của Docker container trên EC2 sẽ được tập trung tại đây. Điều này giúp theo dõi hoạt động của Backend mà không cần đăng nhập trực tiếp vào EC2.

## 7. Tạo CloudWatch Alarm

Để phát hiện khi tài nguyên EC2 sử dụng quá mức, tạo các CloudWatch Alarm.

### CPU

Tạo Alarm:

```text
Tên: TechMart-EC2-High-CPU
Điều kiện: CPU > 80%
Thời gian: 5 phút
```

### RAM

Tạo Alarm:

```text
Tên: TechMart-EC2-High-Memory
Điều kiện: RAM > 80%
Thời gian: 5 phút
```

### Disk

Tạo Alarm:

```text
Tên: TechMart-EC2-High-Disk
Điều kiện: Disk > 80%
Thời gian: 5 phút
```

Các Alarm giúp phát hiện sớm tình trạng tài nguyên EC2 vượt ngưỡng cho phép.

## 8. Gửi cảnh báo qua SNS

Có thể kết hợp CloudWatch Alarm với **Amazon SNS** để gửi thông báo khi Alarm chuyển sang trạng thái `ALARM`.

Quy trình:

```text
EC2
 ↓
CloudWatch Agent
 ↓
CloudWatch Metrics
 ↓
CloudWatch Alarm
 ↓
Amazon SNS
 ↓
Email thông báo
```

## 9. Kết quả

Sau khi triển khai, hệ thống TechMart có khả năng:

* Theo dõi CPU, RAM và Disk của EC2.
* Tập trung log Docker lên CloudWatch.
* Phát hiện tài nguyên sử dụng vượt ngưỡng.
* Gửi cảnh báo khi xảy ra sự cố.
* Theo dõi tình trạng máy chủ mà không cần kiểm tra thủ công trên EC2.

Kiến trúc monitoring của hệ thống:

```text
                    Amazon CloudWatch
                           │
             ┌─────────────┼─────────────┐
             │             │             │
          Metrics         Logs         Alarms
             │             │             │
       ┌─────┼─────┐       │        ┌────┼────┐
       │     │     │       │        │    │    │
      CPU   RAM   Disk   Docker    CPU  RAM  Disk
                           Logs
             │             │
             └──────┬──────┘
                    │
                   EC2
                    │
             Docker Backend
```
