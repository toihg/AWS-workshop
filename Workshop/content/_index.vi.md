---
title: "Báo cáo thực tập"
date: 2026-09-27
weight: 1
chapter: false
---

# Báo Cáo Thực Tập FCAJ Workforce Bootcamp 2026

### Thông tin sinh viên

&emsp; **Họ và tên:** Hoàng Văn Tới

&emsp; **Số điện thoại:** 0355452305

&emsp; **Email:** toih1204@gmail.com

&emsp; **Trường:** Đại học Xây dựng Hà Nội

&emsp; **Ngành:** Công nghệ thông tin

&emsp; **Lớp:** 67CNCS

&emsp; **Công ty thực tập:** Công ty TNHH Amazon Web Services Việt Nam

&emsp; **Chương trình:** Workforce Bootcamp - First Cloud AI Journey (FCAJ)

&emsp; **Thời gian thực tập:** Từ ngày 03/08/2026 đến ngày 07/09/2026

<p align="center">
  <img src="/images/avatar.jpg" width="400" alt="Avatar">
</p>

---

### Tóm Tắt Dự Án Báo Cáo

Báo cáo thực tập tổng kết quá trình xây dựng, đóng gói và triển khai nền tảng **thương mại điện tử TechMart** trên hạ tầng điện toán đám mây AWS.

Backend Service: Xây dựng bằng Java 21 và Spring Boot 3, sử dụng Spring Data JPA để tương tác dữ liệu. Hệ thống cung cấp các RESTful APIs xử lý toàn bộ logic nghiệp vụ cốt lõi: quản lý danh mục sản phẩm, xác thực/phân quyền tài khoản người dùng, giỏ hàng, quy trình tạo đơn và quản trị hệ thống.

Frontend Web App: Phát triển bằng Next.js, React, TypeScript và Tailwind CSS. Giao diện người dùng trực quan, lọc sản phẩm theo hệ sinh thái thiết bị Apple (MacBook, iPhone, iPad, AirPods, Apple Watch), quản lý trạng thái giỏ hàng phía người mua , quy trình thanh toán COD/Chuyển khoản ngân hàng, trực quan hóa tiến trình đơn hàng và trang quản trị Admin Dashboard.

Đóng gói & Phân phối Container:
  * Frontend, Backend và Nginx Reverse Proxy được đóng gói thành các Docker Image và chạy trên Docker Compose.
  * Các Docker Image được quản lý, lưu trữ và phân phốitrên Amazon ECR.
  * Nginx Container đóng vai trò làm cổng tiếp nhận request , xử lý định tuyến (Reverse Proxy): chuyển hướng các truy vấn giao diện đến Frontend Container và các truy vấn API đến Backend Container.

Hạ tầng Mạng & Máy chủ (AWS VPC & EC2): Hệ thống chạy trong môi trường mạng Amazon VPC, phân chia rõ ràng giữa Public Subnet (chứa Application Load Balancer, NAT Gateway) và Private Subnet (chứa ứng dụng Backend/Frontend trên Amazon EC2).

Cơ sở Dữ liệu & Lưu trữ: Sử dụng Amazon RDS (MySQL) đặt tại Private Subnet và Amazon S3 để lưu trữ, phân phối tài nguyên hình ảnh sản phẩm.

Bảo mật & Giám sát Vận hành: Áp dụng AWS IAM để kiểm soát quyền cùng Amazon CloudWatch thu thập nhật ký và giám sát chỉ số hệ thống theo thời gian thực.

---

### Nội Dung Báo Cáo

1. [Worklog (Nhật ký làm việc 12 tuần)](1-Worklog/)

2. [Proposal (Đề xuất dự án)](2-Proposal/)

3. [Workshop (Hướng dẫn triển khai hệ thống trên AWS)](3-Workshop/)

4. [Tự đánh giá](4-Self-evaluation/)

5. [Chia sẻ và đóng góp ý kiến](5-Feedback/)