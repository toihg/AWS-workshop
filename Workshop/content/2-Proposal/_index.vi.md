---
title: "Đề xuất"
date: 2026-01-01
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# Nền Tảng Thương Mại Điện Tử TechMart Trên AWS

## Giải pháp triển khai hệ thống thương mại điện tử trên nền tảng AWS

### 1. Tóm tắt điều hành

**TechMart** là nền tảng thương mại điện tử chuyên cung cấp các sản phẩm công nghệ như laptop, điện thoại, tai nghe, thiết bị đeo và phụ kiện. Hệ thống hỗ trợ các chức năng chính như đăng ký, đăng nhập, xem và tìm kiếm sản phẩm, quản lý giỏ hàng, đặt hàng, thanh toán và theo dõi trạng thái đơn hàng. Ngoài ra, hệ thống cung cấp giao diện quản trị để quản lý sản phẩm, đơn hàng và trạng thái thanh toán.

Ứng dụng được xây dựng với **Frontend Next.js, Backend Spring Boot** và cơ sở dữ liệu **MySQL**. Hệ thống được triển khai trên AWS với **Amazon EC2** chạy Frontend và Backend bằng **Docker**, **Amazon RDS for MySQL** lưu trữ dữ liệu và **Amazon S3** lưu hình ảnh sản phẩm. **Amazon SES** được sử dụng để gửi email tự động, **Amazon CloudWatch** dùng để theo dõi logs và metrics, trong khi **Amazon VPC, Security Groups và IAM** đảm bảo việc quản lý mạng và quyền truy cập. Quy trình CI/CD được xây dựng với **GitHub, AWS CodeBuild và Amazon ECR**.

---

### 2. Tuyên bố vấn đề

#### Vấn đề hiện tại

Trong quá trình phát triển cục bộ, Frontend, Backend, cơ sở dữ liệu và hình ảnh sản phẩm thường được chạy hoặc lưu trữ trên máy tính của nhà phát triển. Cách triển khai này phù hợp cho việc phát triển và kiểm thử nhưng chưa thuận tiện khi cần đưa hệ thống lên môi trường thực tế để người dùng truy cập qua Internet.

Bên cạnh đó, hệ thống cần một giải pháp riêng cho việc lưu trữ hình ảnh sản phẩm, quản lý cơ sở dữ liệu, theo dõi hoạt động của ứng dụng và gửi thông báo đến khách hàng. Việc triển khai và cập nhật ứng dụng thủ công cũng làm tăng thời gian và công sức khi hệ thống có nhiều phiên bản.

#### Giải pháp

Workshop đề xuất triển khai TechMart trên AWS theo mô hình các thành phần được phân tách theo chức năng:

* **Frontend Next.js**: chạy bằng Docker trên Amazon EC2.
* **Backend Spring Boot**: chạy bằng Docker trên Amazon EC2 và cung cấp REST API.
* **Amazon RDS for MySQL**: lưu thông tin người dùng, sản phẩm, giỏ hàng, đơn hàng, thanh toán và trạng thái giao hàng.
* **Amazon S3**: lưu trữ hình ảnh sản phẩm thay vì lưu trực tiếp trên EC2.
* **Amazon SES**: gửi email tự động đến khách hàng.
* **Amazon CloudWatch**: thu thập logs và metrics để theo dõi hệ thống.
* **Amazon VPC**: xây dựng môi trường mạng cho các tài nguyên AWS.
* **IAM và Security Groups**: quản lý quyền truy cập và kết nối.
* **Docker**: đóng gói Frontend và Backend thành các container.
* **GitHub, CodeBuild và ECR**: xây dựng quy trình CI/CD để build, lưu trữ và triển khai Docker Image.

Hệ thống hỗ trợ hai phương thức thanh toán là thanh toán khi nhận hàng (COD) và chuyển khoản ngân hàng. Sau khi khách hàng đặt hàng hoặc khi trạng thái đơn hàng được cập nhật, Backend có thể sử dụng Amazon SES để gửi email thông báo tự động.

#### Lợi ích

Giải pháp giúp hệ thống có thể truy cập qua Internet, đồng thời tách biệt ứng dụng, cơ sở dữ liệu và lưu trữ hình ảnh. Docker giúp chuẩn hóa môi trường chạy ứng dụng, còn CI/CD giúp tự động hóa quá trình build và triển khai. Các dịch vụ SES và CloudWatch lần lượt hỗ trợ gửi thông báo và giám sát hệ thống.

---

### 3. Kiến trúc giải pháp
Kiến trúc TechMart được triển khai trong Amazon VPC, gồm các subnet phục vụ ứng dụng và cơ sở dữ liệu. Người dùng truy cập hệ thống thông qua Internet, sau đó kết nối đến ứng dụng chạy trên Amazon EC2.

<p align="center">
  <img src="/images/2-Proposal/kien_truc.png" width="900">
</p>

#### Thiết kế thành phần

* **Frontend**: Next.js cung cấp giao diện mua sắm, tìm kiếm sản phẩm, giỏ hàng, checkout và quản lý đơn hàng.

* **Backend**: Spring Boot cung cấp REST API và xử lý các nghiệp vụ như xác thực người dùng, quản lý sản phẩm, tạo đơn hàng, thanh toán và cập nhật trạng thái đơn hàng.

* **Docker**: Frontend và Backend được đóng gói thành Docker Image để đảm bảo môi trường triển khai thống nhất trên EC2.

* **Database**: Amazon RDS for MySQL lưu trữ dữ liệu nghiệp vụ của hệ thống.

* **Object Storage**: Amazon S3 lưu hình ảnh sản phẩm và tách phần lưu trữ này khỏi máy chủ ứng dụng.

* **Payment**: Backend xử lý hai phương thức COD và chuyển khoản ngân hàng.

* **Admin**: Giao diện quản trị hỗ trợ quản lý sản phẩm, đơn hàng và trạng thái thanh toán.

* **Email**: Amazon SES gửi email tự động khi có sự kiện liên quan đến đơn hàng.

* **Monitoring**: Amazon CloudWatch theo dõi logs và metrics của hệ thống.

* **CI/CD**: GitHub lưu trữ mã nguồn, AWS CodeBuild thực hiện build và kiểm thử, Amazon ECR lưu Docker Image trước khi triển khai lên EC2.

---

### 4. Triển khai kỹ thuật
#### Các giai đoạn triển khai

Dự án được triển khai qua các giai đoạn chính:

**1. Phân tích và thiết kế**: Phân tích yêu cầu của hệ thống, xác định các chức năng chính và thiết kế kiến trúc triển khai trên AWS.

**2. Phát triển ứng dụng**: Xây dựng Frontend bằng Next.js và Backend bằng Spring Boot, triển khai các chức năng sản phẩm, tài khoản, giỏ hàng, checkout, thanh toán và quản lý đơn hàng.

**3. Cơ sở dữ liệu và lưu trữ**: Thiết kế cơ sở dữ liệu MySQL, triển khai lên Amazon RDS và tích hợp Amazon S3 để lưu hình ảnh sản phẩm

**4. Docker hóa ứng dụng**: Tạo Dockerfile và Docker Image cho Frontend và Backend, kiểm tra ứng dụng trong môi trường container.

**5. Triển khai AWS**: Thiết lập Amazon VPC, subnet, Security Groups, Amazon EC2 và Amazon RDS; sau đó triển khai các container ứng dụng lên EC2.

**6. Tích hợp dịch vụ AWS**: Cấu hình Amazon SES để gửi email tự động và Amazon CloudWatch để theo dõi logs, metrics.

**7. CI/CD**: Kết nối GitHub với AWS CodeBuild để tự động build và kiểm thử, sau đó lưu Docker Image lên Amazon ECR và triển khai Image lên EC2.

**8. Kiểm thử và hoàn thiện**: Kiểm tra chức năng Frontend, Backend, Database, lưu trữ S3, gửi email SES và quy trình CI/CD sau khi triển khai.

#### Yêu cầu kỹ thuật

* **Frontend**: Next.js, TypeScript, HTML, CSS.
* **Backend**: Java, Spring Boot, Spring Data JPA, REST API.
* **Database**: MySQL, Amazon RDS for MySQL.
* **Storage**: Amazon S3.
* **Container**: Docker, Amazon ECR.
* **CI/CD**: GitHub, AWS CodeBuild.
* **AWS**: EC2, VPC, IAM, Security Groups, SES, CloudWatch.
* **Công cụ**: VS Code, Git, Maven và công cụ quản lý MySQL.

---

### 5. Lộ trình & Mốc triển khai

#### Giai đoạn 1: Phân tích và thiết kế

* Phân tích yêu cầu và các chức năng của hệ thống TechMart.
* Thiết kế cơ sở dữ liệu MySQL.
* Thiết kế kiến trúc triển khai trên AWS.
* Xác định các dịch vụ AWS cần sử dụng.

#### Giai đoạn 2: Phát triển Backend

* Xây dựng Backend bằng Spring Boot.
* Xây dựng REST API cho tài khoản, sản phẩm, giỏ hàng và đơn hàng.
* Xử lý thanh toán COD và chuyển khoản.
* Kết nối và thao tác dữ liệu với MySQL.\

#### Giai đoạn 3: Phát triển Frontend

* Xây dựng giao diện bằng Next.js.
* Phát triển các chức năng đăng nhập, sản phẩm, tìm kiếm và giỏ hàng.
* Xây dựng trang checkout và quản lý đơn hàng.
* Xây dựng giao diện quản trị.

#### Giai đoạn 4: Tích hợp Database và Storage

* Triển khai MySQL trên Amazon RDS.
* Kết nối Backend với RDS.
* Tích hợp Amazon S3 để lưu trữ hình ảnh sản phẩm.
* Kiểm tra quyền truy cập và khả năng tải lên, tải xuống dữ liệu.

#### Giai đoạn 5: Docker và triển khai AWS

* Tạo Dockerfile cho Frontend và Backend.
* Build và kiểm tra Docker Image.
* Thiết lập Amazon VPC, Subnet và Security Groups.
* Triển khai các container Frontend và Backend trên Amazon EC2.

#### Giai đoạn 6: Tích hợp Email và Monitoring

* Cấu hình Amazon SES.
* Tích hợp chức năng gửi email tự động khi đặt hàng và cập nhật trạng thái đơn hàng.
* Cấu hình Amazon CloudWatch để thu thập logs và metrics.
* Kiểm tra hoạt động của email và hệ thống giám sát.

#### Giai đoạn 7: Xây dựng CI/CD

* Đưa mã nguồn lên GitHub.
* Cấu hình AWS CodeBuild để tự động build và kiểm thử.
* Build Docker Image và lưu trữ trên Amazon ECR.
* Thiết lập quy trình triển khai Image lên Amazon EC2.

#### Giai đoạn 8: Kiểm thử và hoàn thiện

* Kiểm thử các chức năng của Frontend và Backend.
* Kiểm tra kết nối giữa EC2, RDS và S3.
* Kiểm tra thanh toán, gửi email và quản lý đơn hàng.
* Kiểm tra quy trình CI/CD và khả năng triển khai phiên bản mới.
* Hoàn thiện hệ thống và tài liệu triển khai.

---

### 6. Ước tính ngân sách

#### Chi phí hạ tầng dự kiến

| Dịch vụ | Cấu hình | Chi phí ước tính |
|------|-------|-------|
| EC2 | t3.micro × 730h | ~$9.5 |
| EBS | gp3 20GB | ~$1.6 |
| Public IPv4 | 1 IP × 730h | ~$3.65 |
| RDS MySQL | db.t3.micro × 730h | ~$20–21 |
| RDS Storage | 20GB | ~$2–3 |
| S3 | 10GB | ~$0.23 |
| ECR | Lưu trữ Docker Image | ~$0–1 |
| CodeBuild | Build và kiểm thử ở mức thấp | ~$0–2 |
| SES | 5000 email | ~$0.5 |
| CloudWatch | Mức sử dụng thấp | ~$0–2 |
| **Tổng ước tính** | | **~38–43 USD/tháng** |

#### Kiểm soát chi phí

* **AWS Budgets:** Thiết lập cảnh báo khi chi phí đạt **5 USD** và **10 USD**.
* **Amazon EC2:** Sử dụng cấu hình máy chủ phù hợp và tắt EC2 khi không sử dụng.
* **Amazon RDS:** Sử dụng cấu hình cơ sở dữ liệu phù hợp và dừng tài nguyên khi không cần thiết.
* **Amazon S3:** Kiểm soát dung lượng lưu trữ hình ảnh sản phẩm và xóa các tệp không còn sử dụng.
* **Amazon ECR:** Xóa các Docker Image cũ không còn sử dụng để hạn chế dung lượng lưu trữ.
* **AWS CodeBuild:** Hạn chế các lần build không cần thiết để kiểm soát chi phí.
* **Amazon SES:** Chỉ gửi email cần thiết và theo dõi số lượng email sử dụng.
* **Amazon CloudWatch:** Giới hạn thời gian lưu trữ log và chỉ tạo các metric, alarm cần thiết để tránh phát sinh chi phí không cần thiết.
* **Dọn dẹp sau demo:** Xóa hoặc dừng các tài nguyên không còn sử dụng như EC2, RDS, ECR, S3 và các cấu hình CloudWatch sau khi hoàn thành dự án.

---

### 7. Đánh giá rủi ro

#### Ma trận rủi ro

* *EC2 không hoạt động*: Ảnh hưởng cao, xác suất trung bình.
* *Không kết nối được RDS*: Ảnh hưởng cao, xác suất trung bình.
* *Upload hình ảnh lên S3 thất bại*: Ảnh hưởng trung bình, xác suất thấp.
* *SES không gửi được email*: Ảnh hưởng trung bình, xác suất trung bình.
* *Cấu hình Security Group sai*: Ảnh hưởng cao, xác suất trung bình.
* *CI/CD build hoặc deploy thất bại*: Ảnh hưởng trung bình, xác suất trung bình.
* *Chi phí AWS vượt dự kiến*: Ảnh hưởng trung bình, xác suất trung bình.

#### Chiến lược giảm thiểu

* Kiểm tra trạng thái EC2 và logs trên CloudWatch.
* Kiểm tra kết nối giữa EC2 và RDS, đặc biệt là Security Group và thông tin kết nối.
* Kiểm tra IAM permissions khi Backend truy cập Amazon S3.
* Kiểm tra cấu hình Amazon SES và địa chỉ email người nhận.
* Kiểm tra Docker Image và quy trình build trên CodeBuild, ECR.
* Sử dụng AWS Budgets để theo dõi và cảnh báo chi phí.
* Sao lưu dữ liệu cơ sở dữ liệu khi cần thiết.
* Kiểm tra từng thành phần trước khi triển khai toàn bộ hệ thống.

#### Kế hoạch dự phòng

* Khởi động lại hoặc triển khai lại các Docker container trên EC2.
* Build lại Docker Image và triển khai phiên bản ổn định trước đó khi CI/CD gặp lỗi.
* Khôi phục cơ sở dữ liệu từ bản sao lưu RDS khi cần thiết.
* Kiểm tra và cập nhật lại Security Group.
* Kiểm tra lại quyền IAM nếu Backend không truy cập được S3 hoặc SES.
* Có thể tạm thời sử dụng môi trường local để kiểm thử Backend trong trường hợp môi trường AWS gặp sự cố.

---

### 8. Kết quả kỳ vọng

#### Cải tiến kỹ thuật:

Hệ thống thương mại điện tử được triển khai trên AWS với Frontend Next.js và Backend Spring Boot được đóng gói bằng Docker, kết nối với cơ sở dữ liệu MySQL trên Amazon RDS và lưu trữ hình ảnh trên Amazon S3.

#### Kết quả triển khai:

* Frontend Next.js và Backend Spring Boot được triển khai bằng Docker trên Amazon EC2.
* Docker Image được build thông qua AWS CodeBuild và lưu trữ trên Amazon ECR.
* MySQL được triển khai trên Amazon RDS.
* Hình ảnh sản phẩm được lưu trữ trên Amazon S3.
* Email thông báo được gửi thông qua Amazon SES.
* Logs và metrics được theo dõi bằng Amazon CloudWatch.
* Quyền truy cập AWS được quản lý bằng IAM.
* Các tài nguyên được triển khai và kiểm soát truy cập trong môi trường Amazon VPC.
* Mã nguồn được quản lý trên GitHub và hỗ trợ quy trình CI/CD tự động.

#### Chức năng hệ thống:

* Khách hàng có thể đăng ký và đăng nhập.
* Khách hàng có thể xem và tìm kiếm sản phẩm.
* Khách hàng có thể thêm sản phẩm vào giỏ hàng.
* Khách hàng có thể đặt hàng.
* Khách hàng có thể thanh toán COD.
* Khách hàng có thể thanh toán chuyển khoản và nhập mã giao dịch.
* Khách hàng có thể theo dõi trạng thái đơn hàng.
* Quản trị viên có thể xem và xử lý đơn hàng.
* Quản trị viên có thể xác nhận thanh toán chuyển khoản.
* Khách hàng nhận được email khi có các cập nhật quan trọng về đơn hàng.

#### Giá trị dài hạn:

Workshop cung cấp mô hình triển khai thực tế cho ứng dụng thương mại điện tử trên AWS, minh họa cách kết hợp EC2, RDS, S3, SES, CloudWatch, IAM, VPC, CodeBuild và ECR trong một hệ thống hoàn chỉnh. Kiến trúc sử dụng Docker và CI/CD giúp đơn giản hóa quá trình triển khai, đồng thời tạo nền tảng để hệ thống có thể tiếp tục được mở rộng và cải tiến trong tương lai.