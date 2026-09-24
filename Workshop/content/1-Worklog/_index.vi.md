---
title: "Nhật ký công việc"
date: 2026-01-01
weight: 1
chapter: false
pre: " <b> 1. </b> "
---

# Nhật Ký Công Việc (Worklog) - 12 Tuần Thực Tập

Mục này tổng hợp nhật ký công việc hằng tuần trong quá trình nghiên cứu, phát triển và triển khai hệ thống **Apple Store E-Commerce Full-Stack (Spring Boot 3 + Next.js 16)** lên điện toán đám mây AWS.

---

### Tóm Tắt Tiến Độ Theo Tuần

* **Tuần 1:** Khảo sát bài toán E-Commerce, khởi tạo dự án Java Spring Boot 3 với Maven và dự án Frontend Next.js 16 (App Router).
* **Tuần 2:** Thiết kế CSDL quan hệ cho 3 đối tượng `User`, `Product`, `Order`. Viết JPA Entities ([User.java](file:///c:/Users/Toi%20Hoang/Code/ecommerce/src/main/java/com/ecommerce/entity/User.java), [Product.java](file:///c:/Users/Toi%20Hoang/Code/ecommerce/src/main/java/com/ecommerce/entity/Product.java), [Order.java](file:///c:/Users/Toi%20Hoang/Code/ecommerce/src/main/java/com/ecommerce/entity/Order.java)) và cấu hình CORS.
* **Tuần 3:** Xây dựng `ProductService` & `ProductController` cho phép lấy danh sách sản phẩm, lọc theo category (`MacBook`, `iPhone`, `iPad`, `AirPods`, `Apple Watch`). Phát triển `AuthService` đăng ký/đăng nhập.
* **Tuần 4:** Viết `OrderService.java` xử lý tạo đơn hàng: kiểm tra tồn kho, tính toán chi phí, lưu đơn hàng trong CSDL và gửi mail qua `EmailNotificationService.java`.
* **Tuần 5:** Xây dựng giao diện trang chủ Next.js 16 (`app/page.tsx`), tích hợp Hero Section, Category Showcase và Perks Section.
* **Tuần 6:** Xây dựng `cart-context.tsx` quản lý giỏ hàng phía Client Side. Viết trang danh sách sản phẩm `app/products/page.tsx` kèm bộ lọc `product-filters.tsx`.
* **Tuần 7:** Phát triển trang Checkout `app/checkout/page.tsx` và trang thanh toán `app/payment/page.tsx` (Hỗ trợ COD và Chuyển khoản ngân hàng).
* **Tuần 8:** Xây dựng trang danh sách đơn hàng `app/orders/page.tsx` và tích hợp component `order-event-timeline.tsx` hiển thị tiến trình xử lý đơn hàng.
* **Tuần 9:** Phát triển trang Admin Dashboard `app/admin/page.tsx` và `AdminController.java` cho phép quản trị viên xem doanh thu và cập nhật trạng thái đơn hàng.
* **Tuần 10:** Tối ưu hóa hiệu năng, định nghĩa chuẩn DTOs (`OrderResponse.java`) và tập trung xử lý lỗi toàn cục phía Backend & Client API `lib/api.ts`.
* **Tuần 11:** Viết Dockerfile đóng gói ứng dụng, khởi tạo **Amazon S3 Bucket** lưu ảnh sản phẩm, khởi tạo **Amazon RDS MySQL** và triển khai ứng dụng lên **Amazon EC2 / App Runner**.
* **Tuần 12:** Cấu hình **Amazon CloudWatch Logs & Metrics**, tiến hành E2E Testing toàn hệ thống và hoàn thiện tài liệu báo cáo thực tập Hugo Workshop.