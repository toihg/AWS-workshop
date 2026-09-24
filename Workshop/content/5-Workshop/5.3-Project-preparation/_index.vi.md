---
title : "Chuẩn bị mã nguồn Spring Boot và Next.js"
date : 2026-01-01
weight : 3
chapter : false
pre : " <b> 5.3. </b> "

---

### Mục tiêu

Trong phần này, chúng ta sẽ lấy mã nguồn TechMart từ repository GitHub và chuẩn bị môi trường để chạy thử Backend Spring Boot và Frontend Next.js trên máy local.

Sau khi hoàn thành, mã nguồn sẽ được kiểm tra và sẵn sàng cho các bước cấu hình AWS.

---

## 1 Clone repository

Mở PowerShell và di chuyển đến thư mục muốn lưu project:

```powershell
cd "C:\Users\Toi Hoang\Code\"
```

Clone repository:

```powershell
git clone https://github.com/toihg/TechMart-AWS-Workshop.git
```

Di chuyển vào thư mục project:

```powershell
cd TechMart-AWS-Workshop
```
---

## 2 Khởi chạy backend

Di chuyển vào thư mục Backend:

```powershell
cd ecommerce
```

Cài đặt và build project:

```powershell
mvn clean package
```

Nếu build thành công, chạy Backend:

```powershell
mvn spring-boot:run
```

Backend sẽ được khởi động thành công:

<p align="center">
  <img src="/images/5-Workshop/5.3-Project-preparation/backend.png" width="1100">
</p>

## 3 Khởi chạy frontend Frontend

Mở một cửa sổ PowerShell mới và di chuyển đến thư mục Frontend:

```powershell
cd "C:\Users\Toi Hoang\Code\TechMart\Frontend"
```

Cài đặt các package:

```powershell
npm install
```

Khởi động Next.js:

```pơershell
npm run dev
```

Truy cập:

http://localhost:3000

Giao diện TechMart khởi chạy thành công

<p align="center">
  <img src="/images/5-Workshop/5.3-Project-preparation/frontend.png" width="1100">
</p>

## 4 Kết quả

Sau khi hoàn thành:

* Mã nguồn TechMart được clone từ GitHub.
* Backend Spring Boot được kiểm tra và chạy được trên local.
* Frontend Next.js được kiểm tra và chạy được trên local.