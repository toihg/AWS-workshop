---

title: "Đề xuất"
date: 2026-09-25
weight: 2
chapter: false
pre: " <b> 2. </b> "
--------------------

# Nền Tảng Thương Mại Điện Tử TechMart Trên AWS

## Giải pháp triển khai hệ thống thương mại điện tử trên nền tảng AWS

### 1. Tóm tắt điều hành

**TechMart** là nền tảng thương mại điện tử chuyên cung cấp các sản phẩm công nghệ như laptop, điện thoại, tai nghe, thiết bị đeo và phụ kiện. Hệ thống hỗ trợ các chức năng chính như đăng ký, đăng nhập, xem và tìm kiếm sản phẩm, quản lý giỏ hàng, đặt hàng, thanh toán và theo dõi trạng thái đơn hàng. Ngoài ra, hệ thống cung cấp giao diện quản trị để quản lý sản phẩm, đơn hàng và trạng thái thanh toán.

Hệ thống được xây dựng theo mô hình Full-Stack Containerized với **Frontend Next.js, Backend Spring Boot** và **Nginx Reverse Proxy**. Ứng dụng được đóng gói bằng **Docker** và triển khai trên máy chủ **Amazon EC2**. Dữ liệu giao dịch được lưu trữ trên **Amazon RDS for MySQL**, trong khi hình ảnh sản phẩm được lưu trữ trên **Amazon S3**.

Hạ tầng được xây dựng trên **Amazon VPC**, sử dụng Public Subnet và Private Subnet để phân tách các thành phần của hệ thống. **Application Load Balancer (ALB)** được triển khai trong Public Subnet để tiếp nhận request từ Internet và chuyển tiếp request đến **Amazon EC2** trong Private Subnet thông qua Target Group.

**NAT Gateway** được sử dụng để cung cấp kết nối outbound cho các tài nguyên trong Private Subnet. **AWS IAM** được sử dụng để quản lý quyền truy cập thông qua IAM Role. **Amazon ECR** được sử dụng để lưu trữ Docker Image của ứng dụng.

Bên cạnh các thành phần triển khai ứng dụng, **Amazon CloudWatch** được sử dụng để giám sát hoạt động của hệ thống. CloudWatch cung cấp các metric cho EC2 như CPU, network và trạng thái máy chủ, đồng thời cho phép cấu hình **CloudWatch Alarm** để cảnh báo khi các chỉ số vượt ngưỡng được xác định.

---

### 2. Tuyên bố vấn đề

#### Vấn đề hiện tại

Trong quá trình phát triển cục bộ, Frontend, Backend, cơ sở dữ liệu và hình ảnh sản phẩm thường được chạy hoặc lưu trữ trên máy tính của nhà phát triển. Cách triển khai này phù hợp cho quá trình phát triển và kiểm thử nhưng chưa đáp ứng yêu cầu khi hệ thống cần được triển khai trên môi trường Cloud và truy cập thông qua Internet.

Bên cạnh đó, hệ thống cần các giải pháp riêng cho việc lưu trữ hình ảnh sản phẩm, quản lý cơ sở dữ liệu, phân phối request từ Internet, quản lý quyền truy cập và giám sát hoạt động của ứng dụng.

Việc cho phép máy chủ ứng dụng truy cập trực tiếp từ Internet cũng làm tăng phạm vi tiếp xúc của hệ thống. Do đó, cần phân tách các thành phần mạng và hạn chế khả năng truy cập trực tiếp đến các tài nguyên quan trọng như Amazon EC2 và Amazon RDS.

Ngoài ra, khi hệ thống được triển khai trên AWS, cần có cơ chế theo dõi trạng thái và mức sử dụng tài nguyên để hỗ trợ phát hiện các vấn đề trong quá trình vận hành.

#### Giải pháp

Workshop đề xuất triển khai TechMart trên AWS với các thành phần được phân tách theo chức năng:

* **Frontend Next.js**: cung cấp giao diện người dùng và chạy trong Docker container trên Amazon EC2.
* **Backend Spring Boot**: chạy trong Docker container trên Amazon EC2 và cung cấp REST API.
* **Nginx**: hoạt động như Reverse Proxy và chuyển tiếp request đến Frontend hoặc Backend tương ứng.
* **Amazon RDS for MySQL**: lưu trữ dữ liệu người dùng, sản phẩm, giỏ hàng, đơn hàng và thanh toán.
* **Amazon S3**: lưu trữ hình ảnh sản phẩm.
* **Amazon VPC**: xây dựng môi trường mạng riêng cho hệ thống.
* **Public Subnet**: triển khai Application Load Balancer và NAT Gateway.
* **Private Subnet**: triển khai Amazon EC2 và Amazon RDS.
* **Application Load Balancer**: tiếp nhận và phân phối request từ Internet đến EC2.
* **NAT Gateway**: cung cấp kết nối outbound cho các tài nguyên trong Private Subnet.
* **AWS IAM**: quản lý quyền truy cập đến các dịch vụ AWS thông qua IAM Role.
* **Amazon ECR**: lưu trữ Docker Image của Frontend và Backend.
* **Docker**: đóng gói Frontend và Backend thành các container.
* **Amazon CloudWatch**: giám sát các metric của hệ thống và thiết lập cảnh báo thông qua CloudWatch Alarm.

Hệ thống hỗ trợ hai phương thức thanh toán là **thanh toán khi nhận hàng (COD)** và **chuyển khoản ngân hàng**. Đối với hình thức chuyển khoản, khách hàng nhập mã giao dịch và quản trị viên có thể kiểm tra, xác nhận trạng thái thanh toán.

#### Lợi ích

Giải pháp giúp hệ thống có thể truy cập qua Internet nhưng vẫn phân tách các thành phần theo chức năng và mức độ truy cập.

**Application Load Balancer** đóng vai trò điểm tiếp nhận request từ Internet, trong khi Amazon EC2 được triển khai trong Private Subnet. **NAT Gateway** cho phép EC2 thực hiện các kết nối outbound mà không cần Public IP trực tiếp.

Docker giúp chuẩn hóa môi trường chạy Frontend và Backend. Amazon RDS cung cấp môi trường cơ sở dữ liệu riêng, trong khi Amazon S3 đảm nhiệm việc lưu trữ hình ảnh sản phẩm.

**Amazon CloudWatch** hỗ trợ giám sát hoạt động của EC2 thông qua các metric như CPU, network và trạng thái máy chủ. CloudWatch Alarm có thể được cấu hình để tạo cảnh báo khi các chỉ số vượt ngưỡng được xác định, hỗ trợ theo dõi hệ thống trong quá trình vận hành.

---

### 3. Kiến trúc giải pháp

Kiến trúc TechMart được triển khai trong **Amazon VPC**, bao gồm Public Subnet và Private Subnet.

Application Load Balancer đóng vai trò là điểm truy cập từ Internet cho người dùng và quản trị viên thông qua **ALB DNS Name**, sau đó chuyển tiếp các request đến máy chủ ứng dụng trong Private Subnet.

Trình duyệt gửi request đến Application Load Balancer. ALB tiếp nhận request và chuyển tiếp đến Amazon EC2 trong Private Subnet thông qua Target Group.

Amazon EC2 chạy các Docker container bao gồm **Nginx, Next.js và Spring Boot**. Nginx hoạt động như Reverse Proxy và chuyển tiếp request đến Frontend hoặc Backend tương ứng.

Amazon RDS được triển khai trong Private Subnet và chỉ cho phép kết nối từ EC2 thông qua Security Group. Amazon S3 được sử dụng để lưu trữ hình ảnh sản phẩm. Amazon ECR lưu trữ Docker Image để EC2 có thể pull image trong quá trình triển khai.

Trong quá trình vận hành, **Amazon CloudWatch** được sử dụng để giám sát các metric của EC2. Các chỉ số như `CPUUtilization`, `NetworkIn`, `NetworkOut` và `StatusCheckFailed` được sử dụng để theo dõi tình trạng hoạt động của máy chủ. CloudWatch Alarm được cấu hình cho các metric quan trọng nhằm cảnh báo khi hệ thống vượt ngưỡng được xác định.

<p align="center">

  <img src="/images/2-Proposal/AWSAWS.drawio.svg" width="900">

</p>

#### Thiết kế thành phần

* **Application Load Balancer**: tiếp nhận HTTP request từ Internet và chuyển tiếp request đến EC2 thông qua Target Group.
* **Frontend**: Next.js cung cấp giao diện mua sắm, tìm kiếm sản phẩm, giỏ hàng, checkout và quản lý đơn hàng.
* **Backend**: Spring Boot cung cấp REST API và xử lý các nghiệp vụ như xác thực người dùng, quản lý sản phẩm, tạo đơn hàng, thanh toán và cập nhật trạng thái đơn hàng.
* **Nginx**: hoạt động như Reverse Proxy, chuyển tiếp request đến Next.js và Spring Boot thông qua Docker Internal Network.
* **Docker**: Frontend và Backend được đóng gói thành Docker Image và chạy dưới dạng container trên EC2.
* **Database**: Amazon RDS for MySQL lưu trữ dữ liệu nghiệp vụ của hệ thống.
* **Object Storage**: Amazon S3 lưu trữ hình ảnh sản phẩm và tách phần lưu trữ file khỏi máy chủ ứng dụng.
* **Payment**: Backend xử lý hai phương thức COD và chuyển khoản ngân hàng.
* **Admin**: giao diện quản trị hỗ trợ quản lý sản phẩm, đơn hàng và trạng thái thanh toán.
* **VPC**: cung cấp môi trường mạng riêng cho các tài nguyên AWS.
* **NAT Gateway**: cung cấp kết nối outbound cho EC2 trong Private Subnet.
* **IAM**: quản lý quyền truy cập đến các dịch vụ AWS.
* **ECR**: lưu trữ Docker Image của Frontend và Backend.
* **CloudWatch**: giám sát metric của EC2 và cung cấp CloudWatch Alarm để cảnh báo khi các chỉ số vượt ngưỡng cấu hình.

---

### 4. Triển khai kỹ thuật

#### Các giai đoạn triển khai

Dự án được triển khai qua các giai đoạn chính:

**1. Phân tích và thiết kế**: Phân tích yêu cầu của hệ thống, xác định các chức năng chính và thiết kế kiến trúc triển khai trên AWS.

**2. Phát triển ứng dụng**: Xây dựng Frontend bằng Next.js và Backend bằng Spring Boot, triển khai các chức năng sản phẩm, tài khoản, giỏ hàng, checkout, thanh toán và quản lý đơn hàng.

**3. Cơ sở dữ liệu và lưu trữ**: Thiết kế cơ sở dữ liệu MySQL, triển khai lên Amazon RDS và tích hợp Amazon S3 để lưu trữ hình ảnh sản phẩm.

**4. Docker hóa ứng dụng**: Tạo Dockerfile và Docker Image cho Frontend và Backend, kiểm tra ứng dụng trong môi trường container.

**5. Xây dựng hạ tầng mạng AWS**: Thiết lập Amazon VPC, Public Subnet, Private Subnet, Route Table, Internet Gateway, NAT Gateway và Security Groups.

**6. Triển khai Application Load Balancer**: Cấu hình Application Load Balancer, Listener, Target Group và kết nối ALB với EC2 trong Private Subnet.

**7. Triển khai ứng dụng**: Triển khai Docker container Frontend và Backend lên Amazon EC2. Nginx được cấu hình làm Reverse Proxy và chuyển tiếp request đến các container tương ứng.

**8. Tích hợp các dịch vụ AWS**: Tích hợp Amazon S3 và Amazon ECR với ứng dụng.

**9. Bảo mật và phân quyền**: Cấu hình IAM Role cho EC2 và Security Groups cho ALB, EC2, RDS và các thành phần liên quan.

**10. Giám sát hệ thống**: Cấu hình Amazon CloudWatch để theo dõi các metric của EC2 và thiết lập CloudWatch Alarm cho các chỉ số quan trọng.

**11. Kiểm thử và hoàn thiện**: Kiểm tra chức năng Frontend, Backend, Database, S3, Load Balancer, kết nối outbound, CloudWatch và khả năng hoạt động của hệ thống sau khi triển khai.

#### Yêu cầu kỹ thuật

* **Frontend**: Next.js, TypeScript, HTML, CSS.
* **Backend**: Java, Spring Boot, Spring Data JPA, REST API.
* **Database**: MySQL, Amazon RDS for MySQL.
* **Storage**: Amazon S3.
* **Container**: Docker, Amazon ECR.
* **Networking**: Amazon VPC, Subnet, Route Table, Internet Gateway, NAT Gateway, Application Load Balancer.
* **Security**: AWS IAM, IAM Role, Security Groups.
* **Monitoring**: Amazon CloudWatch, CloudWatch Metrics, CloudWatch Alarms.
* **Công cụ**: VS Code, Git, Maven và công cụ quản lý MySQL.

---

# 5. Lộ trình & Mốc triển khai

### Giai đoạn 1: Phân tích và thiết kế

* Phân tích yêu cầu và các chức năng của hệ thống TechMart.
* Thiết kế cơ sở dữ liệu MySQL.
* Thiết kế kiến trúc triển khai trên AWS.
* Xác định các dịch vụ AWS cần sử dụng.
* Thiết kế Public Subnet và Private Subnet.
* Xác định luồng request giữa User, ALB, EC2 và RDS.

### Giai đoạn 2: Phát triển Backend

* Xây dựng Backend bằng Spring Boot.
* Xây dựng REST API cho tài khoản, sản phẩm, giỏ hàng và đơn hàng.
* Xử lý thanh toán COD và chuyển khoản.
* Kết nối và thao tác dữ liệu với MySQL.

### Giai đoạn 3: Phát triển Frontend

* Xây dựng giao diện bằng Next.js.
* Phát triển các chức năng đăng nhập, sản phẩm, tìm kiếm và giỏ hàng.
* Xây dựng trang checkout và quản lý đơn hàng.
* Xây dựng giao diện quản trị.

### Giai đoạn 4: Tích hợp Database và Storage

* Triển khai MySQL trên Amazon RDS.
* Kết nối Backend với RDS.
* Tích hợp Amazon S3 để lưu trữ hình ảnh sản phẩm.
* Kiểm tra quyền truy cập và khả năng tải lên, tải xuống dữ liệu.

### Giai đoạn 5: Xây dựng hạ tầng mạng AWS

* Tạo Amazon VPC.
* Tạo Public Subnet và Private Subnet.
* Cấu hình Internet Gateway.
* Cấu hình NAT Gateway.
* Thiết lập Route Table.
* Cấu hình Security Groups.
* Kiểm tra khả năng kết nối giữa các subnet.

### Giai đoạn 6: Docker và triển khai ứng dụng

* Tạo Dockerfile cho Frontend và Backend.
* Build và kiểm tra Docker Image.
* Push Docker Image lên Amazon ECR.
* Tạo Amazon EC2 trong Private Subnet.
* Pull Docker Image từ ECR.
* Triển khai Frontend và Backend bằng Docker.
* Cấu hình Nginx làm Reverse Proxy.

### Giai đoạn 7: Application Load Balancer

* Tạo Application Load Balancer trong Public Subnet.
* Cấu hình Listener và Target Group.
* Đăng ký máy chủ EC2 chạy Nginx làm Target.
* Kiểm tra trạng thái Health Check để đảm bảo Target ở trạng thái Healthy.
* Lấy địa chỉ ALB DNS Name do AWS cung cấp.
* Kiểm tra khả năng truy cập hệ thống End-to-End thông qua ALB DNS Name.

### Giai đoạn 8: Giám sát hệ thống với Amazon CloudWatch

* Truy cập Amazon CloudWatch và lựa chọn namespace **AWS/EC2**.
* Lựa chọn EC2 Instance của hệ thống TechMart để theo dõi.
* Theo dõi các metric quan trọng như `CPUUtilization`, `NetworkIn`, `NetworkOut`, và `StatusCheckFailed`.
* Cấu hình CloudWatch Alarm cho metric `CPUUtilization`.
* Thiết lập ngưỡng cảnh báo phù hợp với môi trường workshop.
* Cấu hình Period và điều kiện đánh giá Alarm.
* Cấu hình SNS Topic nếu cần gửi thông báo khi Alarm chuyển sang trạng thái **In alarm**.
* Kiểm tra trạng thái Alarm và xác nhận CloudWatch nhận được dữ liệu từ EC2.

### Giai đoạn 9: Kiểm thử và hoàn thiện

* Kiểm thử các chức năng của Frontend và Backend.
* Kiểm tra kết nối giữa ALB và EC2.
* Kiểm tra kết nối giữa EC2 và RDS.
* Kiểm tra kết nối EC2 đến S3 và ECR.
* Kiểm tra NAT Gateway và các kết nối outbound.
* Kiểm tra quyền IAM.
* Kiểm tra trạng thái Docker container.
* Kiểm tra các metric trên CloudWatch.
* Kiểm tra trạng thái CloudWatch Alarm.
* Hoàn thiện hệ thống và tài liệu triển khai.

---

# 6. Ước tính ngân sách

### Chi phí hạ tầng dự kiến

| Dịch vụ AWS                   | Cấu hình & Mức sử dụng chi tiết             |                  Chi phí ước tính / Tháng |
| ----------------------------- | ------------------------------------------- | ----------------------------------------: |
| **Amazon EC2**                | 1 × `t3.micro`, vận hành 720 giờ/tháng      |                                **~$9.50** |
| **Amazon RDS MySQL**          | 1 × `db.t3.micro`, Single-AZ, 720 giờ/tháng |                               **~$20.88** |
| **RDS Storage**               | 20 GB General Purpose Storage               |                                **~$2.76** |
| **Amazon S3**                 | 10 GB Standard Storage + GET/PUT requests   |                                **~$0.30** |
| **Amazon ECR**                | ~2–3 GB lưu trữ Docker Images               |                                **~$0.30** |
| **Application Load Balancer** | 1 ALB + LCU sử dụng cơ bản                  |                               **~$18.00** |
| **NAT Gateway**               | Phí duy trì + lượng dữ liệu xử lý dự kiến   |                               **~$32.85** |
| **Amazon CloudWatch**         | EC2 metrics và Alarm trong phạm vi workshop |                 **Phụ thuộc mức sử dụng** |
| **TỔNG CHI PHÍ DỰ KIẾN**      | Vận hành liên tục 24/7 trong 30 ngày        | **~$86.51 + CloudWatch phát sinh nếu có** |


### Kiểm soát chi phí

* **AWS Budgets**: thiết lập cảnh báo khi chi phí đạt các mức giới hạn mong muốn.
* **Amazon EC2**: sử dụng cấu hình phù hợp và dừng hoặc Terminate EC2 khi không còn sử dụng.
* **Amazon RDS**: sử dụng cấu hình phù hợp với mục đích workshop và dừng hoặc xóa tài nguyên khi hoàn thành.
* **NAT Gateway**: theo dõi thời gian hoạt động và lượng dữ liệu truyền qua NAT Gateway.
* **Application Load Balancer**: theo dõi mức sử dụng và xóa ALB khi không còn cần thiết.
* **Amazon S3**: kiểm soát dung lượng lưu trữ hình ảnh.
* **Amazon ECR**: xóa Docker Image cũ không còn sử dụng.
* **Amazon CloudWatch**: theo dõi mức sử dụng và các thành phần được cấu hình để tránh tạo các tài nguyên giám sát không cần thiết.
* **Dọn dẹp sau workshop**: xóa hoặc dừng các tài nguyên AWS không còn sử dụng sau khi hoàn thành.

---

# 7. Đánh giá rủi ro

### Ma trận rủi ro

* **EC2 không hoạt động**: Ảnh hưởng cao, xác suất trung bình.
* **Application Load Balancer không chuyển được request**: Ảnh hưởng cao, xác suất trung bình.
* **Không kết nối được RDS**: Ảnh hưởng cao, xác suất trung bình.
* **NAT Gateway không hoạt động**: Ảnh hưởng trung bình đến cao, xác suất trung bình.
* **Upload hình ảnh lên S3 thất bại**: Ảnh hưởng trung bình, xác suất thấp.
* **Cấu hình Security Group sai**: Ảnh hưởng cao, xác suất trung bình.
* **IAM Role thiếu quyền**: Ảnh hưởng trung bình, xác suất trung bình.
* **Docker container không hoạt động**: Ảnh hưởng cao, xác suất trung bình.
* **CloudWatch Alarm được cấu hình không chính xác**: Ảnh hưởng trung bình, xác suất thấp.
* **Chi phí AWS vượt dự kiến**: Ảnh hưởng trung bình, xác suất trung bình.

### Chiến lược giảm thiểu

* Kiểm tra trạng thái EC2.
* Kiểm tra trạng thái Target và Health Check của Application Load Balancer.
* Kiểm tra kết nối giữa EC2 và RDS, đặc biệt là Security Group và thông tin kết nối.
* Kiểm tra Route Table khi EC2 không thể kết nối outbound.
* Kiểm tra trạng thái NAT Gateway khi EC2 không thể truy cập các dịch vụ bên ngoài.
* Kiểm tra IAM permissions khi EC2 truy cập S3 và ECR.
* Kiểm tra metric của EC2 trên CloudWatch.
* Kiểm tra ngưỡng và trạng thái của CloudWatch Alarm.
* Sử dụng AWS Budgets để theo dõi và cảnh báo chi phí.
* Sao lưu dữ liệu cơ sở dữ liệu khi cần thiết.

### Kế hoạch dự phòng

* Khởi động lại hoặc triển khai lại các Docker container trên EC2.
* Kiểm tra và cập nhật Target Group hoặc Security Group khi ALB không thể kết nối EC2.
* Kiểm tra và cập nhật Route Table hoặc NAT Gateway khi EC2 không thể kết nối outbound.
* Khôi phục cơ sở dữ liệu từ bản sao lưu RDS khi cần thiết.
* Kiểm tra IAM Role nếu EC2 không truy cập được các dịch vụ AWS.
* Kiểm tra CloudWatch metric và Alarm khi không nhận được dữ liệu giám sát hoặc cảnh báo không hoạt động.
* Có thể sử dụng môi trường local để kiểm thử Backend trong trường hợp môi trường AWS gặp sự cố.

---

# 8. Kết quả kỳ vọng

### Cải tiến kỹ thuật

Hệ thống thương mại điện tử được triển khai trên AWS với Frontend Next.js và Backend Spring Boot được đóng gói bằng Docker, kết nối với cơ sở dữ liệu MySQL trên Amazon RDS và lưu trữ hình ảnh trên Amazon S3.

Kiến trúc sử dụng **Application Load Balancer (ALB)** để tiếp nhận request từ Internet thông qua địa chỉ **ALB DNS Name**, trong khi Amazon EC2 được triển khai trong Private Subnet. **NAT Gateway** cung cấp khả năng kết nối outbound cho EC2.

Quyền truy cập các dịch vụ AWS được cấp thông qua **IAM Role**, Docker Image được lưu trữ trên **Amazon ECR**.

**Amazon CloudWatch** được sử dụng để giám sát hoạt động của EC2 thông qua các metric và CloudWatch Alarm. Các metric này cung cấp thông tin về mức sử dụng tài nguyên và trạng thái của máy chủ, hỗ trợ theo dõi hệ thống trong quá trình vận hành.

### Kết quả triển khai

* Frontend Next.js và Backend Spring Boot được triển khai bằng Docker trên Amazon EC2.
* Docker Image được lưu trữ trên Amazon ECR.
* MySQL được triển khai trên Amazon RDS.
* Hình ảnh sản phẩm được lưu trữ trên Amazon S3.
* Application Load Balancer tiếp nhận và phân phối request đến EC2.
* NAT Gateway cung cấp kết nối outbound cho EC2 trong Private Subnet.
* IAM Role được sử dụng để cấp quyền cho EC2 truy cập các dịch vụ AWS.
* Các tài nguyên được triển khai trong Amazon VPC.
* Security Groups được sử dụng để kiểm soát kết nối giữa ALB, EC2 và RDS.
* Amazon CloudWatch được cấu hình để giám sát các metric của EC2.
* CloudWatch Alarm được thiết lập để cảnh báo khi metric quan trọng vượt ngưỡng cấu hình.

### Chức năng hệ thống

* Khách hàng có thể đăng ký và đăng nhập.
* Khách hàng có thể xem và tìm kiếm sản phẩm.
* Khách hàng có thể thêm sản phẩm vào giỏ hàng.
* Khách hàng có thể đặt hàng.
* Khách hàng có thể thanh toán COD.
* Khách hàng có thể thanh toán chuyển khoản và nhập mã giao dịch.
* Khách hàng có thể theo dõi trạng thái đơn hàng.
* Quản trị viên có thể xem và xử lý đơn hàng.
* Quản trị viên có thể xác nhận thanh toán chuyển khoản.
* Quản trị viên có thể thêm, chỉnh sửa và xóa sản phẩm.
* Hình ảnh sản phẩm được lưu trữ trên Amazon S3.

### Giá trị dài hạn

Workshop cung cấp mô hình triển khai ứng dụng thương mại điện tử Full-Stack trên AWS, minh họa cách kết hợp **VPC, Public Subnet, Private Subnet, Application Load Balancer, NAT Gateway, EC2, RDS, S3, ECR, IAM và CloudWatch** trong một hệ thống hoàn chỉnh.

Việc sử dụng Docker giúp chuẩn hóa môi trường chạy ứng dụng, trong khi việc phân tách Public Subnet và Private Subnet giúp tổ chức hạ tầng mạng rõ ràng hơn. Application Load Balancer đảm nhiệm việc tiếp nhận request từ Internet, EC2 tập trung xử lý ứng dụng, RDS lưu trữ dữ liệu, S3 lưu trữ hình ảnh và CloudWatch hỗ trợ giám sát hoạt động của hạ tầng.

