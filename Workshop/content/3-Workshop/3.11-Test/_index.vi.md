---

title: "Kiểm thử hệ thống"
date: 2026-01-01
weight: 11
chapter: false
pre: " <b> 3.11. </b> "
-----------------------

Sau khi hoàn thành quá trình triển khai hệ thống TechMart trên AWS, tiến hành kiểm tra các chức năng chính của ứng dụng nhằm xác nhận hệ thống có thể truy cập và các chức năng dành cho người dùng và quản trị viên hoạt động đúng theo yêu cầu.

## 1. Kiểm thử truy cập website

### Mục tiêu

Kiểm tra khả năng truy cập hệ thống TechMart thông qua địa chỉ website sau khi ứng dụng được triển khai trên AWS.

### Thực hiện

1. Mở trình duyệt web.
2. Nhập địa chỉ website của hệ thống TechMart: `http://techmart-alb-277409451.ap-southeast-1.elb.amazonaws.com/`.
3. Chờ trang web tải hoàn tất.
4. Kiểm tra giao diện trang chủ và các thành phần chính của website.

### Kết quả mong đợi

* Website có thể truy cập thành công.
* Trang chủ được hiển thị đầy đủ.
* Các thành phần giao diện không bị lỗi.
* Người dùng có thể tương tác với các chức năng trên website.

### Kết quả thực tế

Website TechMart truy cập thành công và giao diện trang chủ được hiển thị bình thường.

<p align="center">
    <img src="/images/3-Workshop/3.11/3.png" width="1400">
</p>

---

## 2. Kiểm thử đăng ký tài khoản

### Mục tiêu

Kiểm tra chức năng đăng ký tài khoản mới và khả năng lưu thông tin người dùng vào hệ thống.

### Thực hiện

1. Truy cập website TechMart.
2. Chọn chức năng **Đăng ký (Register)**.
3. Nhập các thông tin cần thiết, bao gồm:

   * Họ và tên.
   * Email.
   * Số điện thoại.
   * Mật khẩu.
4. Chọn **Đăng ký**.

<p align="center">
    <img src="/images/3-Workshop/3.11/1.png" width="1400">
</p>

### Kết quả mong đợi

* Hệ thống tiếp nhận thông tin đăng ký.
* Thông tin hợp lệ được lưu vào cơ sở dữ liệu.
* Tài khoản được tạo thành công.
* Hệ thống chuyển người dùng về trang chủ sau khi đăng ký thành công.

### Kết quả thực tế

Người dùng có thể nhập thông tin đăng ký và tạo tài khoản thành công. Sau khi đăng ký, hệ thống chuyển người dùng về trang chủ.

<p align="center">
    <img src="/images/3-Workshop/3.11/2.png" width="1400">
</p>

---

## 3. Kiểm thử đăng nhập

### Mục tiêu

Kiểm tra khả năng xác thực người dùng bằng tài khoản đã đăng ký.

### Thực hiện

1. Truy cập website TechMart.
2. Chọn chức năng **Đăng nhập**.
3. Nhập email hoặc số điện thoại và mật khẩu của tài khoản đã đăng ký.
4. Chọn **Đăng nhập**.

<p align="center">
    <img src="/images/3-Workshop/3.11/4.png" width="1400">
</p>

### Kết quả mong đợi

* Hệ thống tiếp nhận thông tin đăng nhập.
* Thông tin tài khoản được xác thực chính xác.
* Người dùng đăng nhập thành công khi thông tin hợp lệ.
* Hệ thống chuyển người dùng về trang chủ sau khi đăng nhập.

### Kết quả thực tế

Tài khoản đã đăng ký có thể sử dụng email hoặc số điện thoại và mật khẩu để đăng nhập vào hệ thống thành công.

<p align="center">
    <img src="/images/3-Workshop/3.11/2.png" width="1400">
</p>

---

## 4. Kiểm thử chức năng đặt hàng

### Mục tiêu

Kiểm tra khả năng tạo đơn hàng từ các sản phẩm đã được thêm vào giỏ hàng.

### Thực hiện
1. Thêm sản phẩm vào giỏ hàng.
2. Mở icon giỏ hàng.
4. Kiểm tra sản phẩm, số lượng và tổng giá trị đơn hàng.
5. Ấn tiếp tục thanh toán
6. Nhập thông tin giao hàng:

    * Họ và tên người nhận.
    * Số điện thoại.
    * Email
    * Địa chỉ nhận hàng.
7. Lựa chọn phương thức thanh toán.
    * Với lựa chọn chuyển khoản ngân hàng cần nhập 4 số cuối của mã giao dịch và ấn xác nhận đã chuyển khoản.
8. Kiểm tra lại thông tin đơn hàng.
9. Xác nhận đặt hàng.

### Kết quả mong đợi

* Hệ thống hiển thị chính xác các sản phẩm trong đơn hàng.
* Số lượng và giá sản phẩm được tính toán chính xác.
* Thông tin giao hàng được tiếp nhận đầy đủ.
* Đơn hàng được tạo thành công.
* Hệ thống hiển thị thông báo xác nhận đặt hàng.
* Thông tin đơn hàng được lưu vào hệ thống.

### Kết quả thực tế

Người dùng có thể hoàn tất quá trình đặt hàng. Hệ thống tạo đơn hàng thành công và lưu thông tin đơn hàng vào cơ sở dữ liệu.

<p align="center">
    <img src="/images/3-Workshop/3.11/5.png" width="1400">
</p>

---

# 5. Kiểm thử chức năng quản trị

## 5.1. Kiểm thử thêm sản phẩm

### Mục tiêu

Kiểm tra khả năng của Admin trong việc thêm sản phẩm mới vào hệ thống.

### Thực hiện

1. Đăng nhập bằng tài khoản Admin.
2. Truy cập trang quản trị sản phẩm.
3. Vào mục **Quản lý sản phẩm**.
4. Nhập thông tin sản phẩm:

   * Tên sản phẩm.
   * Thương hiệu
   * Danh mục.
   * Giá sản phẩm.
   * Tồn kho.
   * Mô tả.
   * Đánh giá.
   * Hình ảnh sản phẩm.
   * Mô tả
5. Chọn **Thêm sản phẩm**.

<p align="center">
    <img src="/images/3-Workshop/3.11/6.png" width="1400">
</p>

6. Kiểm tra danh sách sản phẩm.

### Kết quả mong đợi

* Hệ thống tiếp nhận thông tin sản phẩm.
* Sản phẩm mới được tạo thành công.
* Thông tin sản phẩm được lưu vào cơ sở dữ liệu.
* Sản phẩm xuất hiện trong danh sách quản lý.
* Sản phẩm có thể được hiển thị trên website.

### Kết quả thực tế

Admin có thể nhập thông tin và thêm sản phẩm mới thành công. Sản phẩm được lưu vào hệ thống và hiển thị trong danh sách quản lý.

<p align="center">
    <img src="/images/3-Workshop/3.11/7.png" width="1400">
</p>

<p align="center">
    <img src="/images/3-Workshop/3.11/8.png" width="1400">
</p>

---

## 5.2. Kiểm thử xóa sản phẩm

### Mục tiêu

Kiểm tra khả năng của Admin trong việc xóa sản phẩm khỏi hệ thống.

### Thực hiện

1. Đăng nhập bằng tài khoản Admin.
2. Truy cập trang quản trị sản phẩm.
3. Vào mục **Quản lý sản phẩm**.
4. Nhập sản phẩm cần xóa vào ô tìm kiếm

<p align="center">
    <img src="/images/3-Workshop/3.11/9.png" width="1400">
</p>

5. Ấn **Xóa**

### Kết quả mong đợi

* Hệ thống yêu cầu xác nhận trước khi xóa.
* Sản phẩm được xóa thành công sau khi Admin xác nhận.
* Sản phẩm không còn xuất hiện trong danh sách quản lý.
* Sản phẩm không còn được hiển thị trong kết quả tìm kiếm.

### Kết quả thực tế

Admin có thể lựa chọn sản phẩm và thực hiện thao tác xóa. Sau khi xác nhận, sản phẩm được xóa khỏi hệ thống.

<p align="center">
    <img src="/images/3-Workshop/3.11/10.png" width="1400">
</p>

<p align="center">
    <img src="/images/3-Workshop/3.11/12.png" width="1400">
</p>

---

## 5.3. Kiểm thử xác nhận đơn hàng thanh toán chuyển khoản

### Mục tiêu

Kiểm tra khả năng của Admin trong việc kiểm tra và xác nhận các đơn hàng sử dụng phương thức thanh toán chuyển khoản.

### Thực hiện

1. Đăng nhập bằng tài khoản Admin.
2. Truy cập trang quản lý đơn hàng.
3. Tìm đơn hàng có vừa được khách hàng tạo bằng hình thức chuyển khoản.
4. Kiểm tra thông tin số giao dịch trong app ngân hàng và của khách.
5. Sau khi xác nhận khoản thanh toán hợp lệ, chọn **Đã có mã - xác nhận**.

<p align="center">
    <img src="/images/3-Workshop/3.11/13.png" width="1400">
</p>

7. Kiểm tra trạng thái đơn hàng sau khi xác nhận.

### Kết quả mong đợi

* Admin có thể xem đầy đủ thông tin đơn hàng.
* Admin có thể kiểm tra trạng thái thanh toán chuyển khoản.
* Thanh toán được xác nhận thành công.
* Trạng thái thanh toán được cập nhật trong hệ thống.
* Trạng thái đơn hàng được cập nhật tương ứng.
* Thông tin đơn hàng được lưu chính xác vào cơ sở dữ liệu.

### Kết quả thực tế

Admin có thể kiểm tra thông tin đơn hàng và xác nhận thanh toán chuyển khoản. Sau khi xác nhận, trạng thái thanh toán và trạng thái đơn hàng được cập nhật thành công.

<p align="center">
    <img src="/images/3-Workshop/3.11/14.png" width="1400">
</p>

---

## 8. Tổng hợp kết quả kiểm thử

| STT | Chức năng                            | Kết quả mong đợi                                                 | Kết quả |
| --: | ------------------------------------ | ---------------------------------------------------------------- | ------- |
|   1 | Truy cập website                     | Website hiển thị và có thể tương tác                             | Đạt     |
|   2 | Đăng ký tài khoản                    | Tạo tài khoản mới thành công                                     | Đạt     |
|   3 | Đăng nhập                            | Xác thực và đăng nhập thành công                                 | Đạt     |
|   4 | Tìm kiếm sản phẩm                    | Hiển thị sản phẩm phù hợp với từ khóa                            | Đạt     |
|   5 | Thêm sản phẩm vào giỏ hàng           | Sản phẩm được thêm và thông tin giỏ hàng được cập nhật chính xác | Đạt     |
|   6 | Đặt hàng                             | Đơn hàng được tạo và lưu thành công                              | Đạt     |
|   7 | Admin thêm sản phẩm                  | Sản phẩm mới được tạo và hiển thị trong hệ thống                 | Đạt     |
|   8 | Admin xóa sản phẩm                   | Sản phẩm được xóa khỏi hệ thống                                  | Đạt     |
|   9 | Admin xác nhận đơn hàng chuyển khoản | Thanh toán và trạng thái đơn hàng được cập nhật thành công       | Đạt     |

## Kết luận

Qua quá trình kiểm thử, các chức năng chính của hệ thống TechMart dành cho người dùng và Admin đều hoạt động đúng theo yêu cầu.

Đối với người dùng, hệ thống hỗ trợ **truy cập website, đăng ký tài khoản, đăng nhập, tìm kiếm sản phẩm, thêm sản phẩm vào giỏ hàng và đặt hàng**.

Đối với Admin, hệ thống hỗ trợ **thêm sản phẩm, xóa sản phẩm và xác nhận đơn hàng thanh toán bằng hình thức chuyển khoản**.

Kết quả kiểm thử cho thấy hệ thống có thể tiếp nhận và xử lý các thao tác chính của người dùng và quản trị viên sau khi được triển khai trên AWS.
