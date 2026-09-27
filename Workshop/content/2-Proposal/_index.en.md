---
title: "Proposal"
date: 2026-09-25
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# TechMart E-Commerce Platform on AWS

## Solution for Deploying the E-Commerce System on AWS

### 1. Executive Summary

**TechMart** is an e-commerce platform specializing in technology products such as laptops, phones, headphones, wearables, and accessories. The system supports core functions such as registration, login, product browsing and search, shopping cart management, order placement, payment, and order status tracking. In addition, the system provides an administration interface for managing products, orders, and payment status.

The system is built using a Full-Stack Containerized architecture with **Frontend Next.js, Backend Spring Boot** and **Nginx Reverse Proxy**. The applications are containerized using **Docker** and deployed on **Amazon EC2**. Transaction data is stored in **Amazon RDS for MySQL**, while product images are stored in **Amazon S3**.

The infrastructure is built on **Amazon VPC**, using Public Subnets and Private Subnets to separate system components. **Application Load Balancer (ALB)** deployed in the Public Subnet receives requests from the Internet through the **ALB DNS Name** and securely forwards traffic to **Amazon EC2** located in the Private Subnet.

**NAT Gateway** is used to provide outbound connectivity for resources in the Private Subnet. **AWS IAM** is used to manage access permissions through IAM Roles, **Amazon ECR is used to store Docker Images**

---

### 2. Problem Statement

#### Current Issues

During local development, the Frontend, Backend, database, and product images are typically run or stored on the developer’s computer. This deployment approach is suitable for development and testing but does not meet the requirements when the system needs to be deployed in a Cloud environment and accessed over the Internet.

In addition, the system requires dedicated solutions for product image storage, database management, request distribution from the Internet, sensitive information management, and application monitoring.

Allowing the application server to be directly accessible from the Internet also increases the system’s exposure. Therefore, network components should be separated and direct access to critical resources such as Amazon EC2 and Amazon RDS should be restricted.

#### Solution

The workshop proposes deploying TechMart on AWS with components separated by function:

- **Frontend Next.js**: chạy bằng Docker trên Amazon EC2.
- **Backend Spring Boot**: chạy bằng Docker trên Amazon EC2 and cung cấp REST API.
- **Nginx**: hoạt động như Reverse Proxy and chuyển tiếp request đến các Docker container.
- **Amazon RDS for MySQL**: lưu trữ dữ liệu người dùng, sản phẩm, giỏ hàng, đơn hàng and thanh toán.
- **Amazon S3**: lưu trữ hình ảnh sản phẩm.
- **Amazon VPC**: xây dựng môi trường mạng riêng cho hệ thống.
- **Public Subnet**: triển khai Application Load Balancer and NAT Gateway.
- **Private Subnet**: triển khai Amazon EC2 and Amazon RDS.
- **Application Load Balancer**: tiếp nhận and phân phối request từ Internet đến EC2.
- **NAT Gateway**: cung cấp kết nối outbound cho các tài nguyên trong Private Subnet.
- **AWS IAM**: manages access permissions to AWS services.
- **Amazon ECR**: stores Docker Images for the Frontend and Backend.
- **Docker**: đóng gói Frontend and Backend thành các container.

The system supports two payment methods: **cash on delivery (COD)** and **bank transfer**. For bank transfers, customers enter the transaction code, and administrators can check and confirm the payment status.

#### Benefits

The solution allows the system to be accessed over the Internet while still separating components by function and access level.

**Application Load Balancer** serves as the entry point for requests from the Internet, while Amazon EC2 is deployed in the Private Subnet. **NAT Gateway** allows EC2 to make outbound connections without a direct Public IP.

Docker standardizes the runtime environment for the Frontend and Backend. Amazon RDS provides a dedicated database environment, Amazon S3 handles image storage.

---

### 3. Solution Architecture

The TechMart architecture is deployed in **Amazon VPC**, including Public Subnets and Private Subnets.

Application Load Balancer serves as the single access point from the Internet for both users and administrators through the ALB DNS Name, securely forwarding access requests to servers in the Private Subnet.

After receiving the DNS information, the browser sends an HTTPS request to the Application Load Balancer. The ALB receives the request and forwards it to Amazon EC2 in the Private Subnet through the Target Group.

Amazon EC2 runs Docker containers including **Nginx, Next.js and Spring Boot**. Nginx hoạt động như Reverse Proxy and chuyển tiếp request đến Frontend hoặc Backend tương ứng.

<p align="center">
  <img src="/images/2-Proposal/kien_truc.svg" width="900">
</p>

#### Component Design

- **Application Load Balancer**: receives HTTP/HTTPS requests from the Internet and forwards requests to EC2 through the Target Group.
- **Frontend**: Next.js provides the shopping interface, product search, shopping cart, checkout, and order management.
- **Backend**: Spring Boot provides REST APIs and handles business operations such as user authentication, product management, order creation, payment, and order status updates.
- **Nginx**: operates as a Reverse Proxy, forwarding requests to Next.js and Spring Boot through the Docker Internal Network.
- **Docker**: The Frontend and Backend are packaged as Docker Images and run as containers on EC2.
- **Database**: Amazon RDS for MySQL stores the system’s business data.
- **Object Storage**: Amazon S3 stores product images and separates file storage from the application server.
- **Payment**: The Backend handles two payment methods: COD and bank transfer.
- **Admin**: The administration interface supports product, order, and payment status management.
- **VPC**: provides a private network environment for AWS resources.
- **NAT Gateway**: provides outbound connectivity for EC2 in the Private Subnet.
- **IAM**: manages access permissions to AWS services.
- **ECR**: stores Docker Images for the Frontend and Backend.

---

### 4. Technical Deployment

#### Deployment Stages

The project is deployed through the following main stages:

**1. Analysis and Design**: Analyze system requirements, identify core functions, and design the deployment architecture on AWS.

**2. Application Development**: Build the Frontend with Next.js and the Backend with Spring Boot, implementing product, account, shopping cart, checkout, payment, and order management functions.

**3. Database and Storage**: Design the MySQL database, deploy it on Amazon RDS, and integrate Amazon S3 for product image storage.

**4. Application Containerization**: Create Dockerfiles and Docker Images for the Frontend and Backend, and test the applications in the container environment.

**5. Build AWS Network Infrastructure**: Set up Amazon VPC, Public Subnets, Private Subnets, Route Tables, Internet Gateway, NAT Gateway, and Security Groups.

**6. Deploy Application Load Balancer**: Configure the Application Load Balancer, Listener, Target Group, and connect the ALB to EC2 in the Private Subnet.

**8. Application Deployment**: Triển khai Docker container Frontend and Backend lên Amazon EC2. Nginx được cấu hình làm Reverse Proxy and chuyển tiếp request đến các container tương ứng.

**9. Integrate AWS Services**: Integrate Amazon S3 and Amazon ECR.

**10. Security and Access Control**: Configure IAM Roles for EC2 and Security Groups for the ALB, EC2, and RDS.

**11. Testing and Finalization**: Test the Frontend, Backend, Database, S3, DNS, Load Balancer, outbound connectivity, and system operation after deployment.

#### Technical Requirements

- **Frontend**: Next.js, TypeScript, HTML, CSS.
- **Backend**: Java, Spring Boot, Spring Data JPA, REST API.
- **Database**: MySQL, Amazon RDS for MySQL.
- **Storage**: Amazon S3.
- **Container**: Docker, Amazon ECR.
- **Networking**: Amazon VPC, Subnet, Route Table, Internet Gateway, NAT Gateway, Application Load Balancer.
- **Security**: AWS IAM, IAM Role, Security Groups.
- **Tools**: VS Code, Git, Maven and công cụ quản lý MySQL.

---

# 5. Roadmap & Deployment Milestones

### Phase 1: Analysis and Design

- Phân tích yêu cầu and các chức năng của hệ thống TechMart.
- Thiết kế cơ sở dữ liệu MySQL.
- Thiết kế kiến trúc triển khai trên AWS.
- Xác định các dịch vụ AWS cần sử dụng.
- Thiết kế Public Subnet and Private Subnet.
- Xác định luồng request giữa User, ALB, EC2 and RDS.

### Phase 2: Backend Development

- Build the Backend with Spring Boot.
- Build REST APIs for accounts, products, shopping carts, and orders.
- Handle COD and bank transfer payments.
- Connect to and manipulate data in MySQL.

### Phase 3: Frontend Development

- Build the interface with Next.js.
- Develop login, product, search, and shopping cart functions.
- Build the checkout and order management pages.
- Build the administration interface.

### Phase 4: Database and Storage Integration

- Deploy MySQL on Amazon RDS.
- Connect the Backend to RDS.
- Integrate Amazon S3 for product image storage.
- Test access permissions and the ability to upload and download data.

### Phase 5: Build AWS Network Infrastructure

- Create an Amazon VPC.
- Create Public Subnets and Private Subnets.
- Configure the Internet Gateway.
- Configure the NAT Gateway.
- Set up Route Tables.
- Configure Security Groups.
- Test connectivity between subnets.

### Phase 6: Docker and Application Deployment

- Create Dockerfiles for the Frontend and Backend.
- Build and test the Docker Images.
- Push Docker Images to Amazon ECR.
- Create an Amazon EC2 instance in the Private Subnet.
- Pull Docker Images from ECR.
- Deploy the Frontend and Backend using Docker.
- Configure Nginx as a Reverse Proxy.

### Phase 7: Application Load Balancer

- Create an Application Load Balancer (ALB) in the Public Subnet.
- Configure the Listener (Port 80) and Target Group.
- Register the EC2 server (Nginx) as a Target.
- Check the Health Check status to ensure the Target is Healthy.
- Obtain the ALB DNS Name provided by AWS.
- Test end-to-end system accessibility through the ALB DNS Name.

### Phase 9: Testing and Finalization

- Test Frontend and Backend functions.
- Test connectivity between the ALB and EC2.
- Test connectivity between EC2 and RDS.
- Test EC2 connectivity to S3 and ECR.
- Test the NAT Gateway and outbound connections.
- Test IAM permissions.
- Check Docker container status.
- Finalize the system and deployment documentation.

---

# 6. Budget Estimate

### Estimated Infrastructure Costs

| AWS Service | Configuration & Detailed Usage | Estimated Cost / Month |
|---|---|---:|
| **Amazon EC2** | 1 × `t3.micro` ($0.0132/giờ × 720h) | **~$9.50** |
| **Amazon RDS MySQL** | 1 × `db.t3.micro` Single-AZ ($0.029/giờ × 720h) | **~$20.88** |
| **RDS Storage** | 20 GB `gp2/gp3` Storage ($0.138/GB/tháng) | **~$2.76** |
| **Amazon S3** | 10 GB Standard Storage + GET/PUT requests | **~$0.30** |
| **Amazon ECR** | ~2–3 GB Docker Image storage | **~$0.30** |
| **Application Load Balancer** | 1 ALB ($0.0225/giờ × 720h) + LCU cơ bản | **~$18.00** |
| **NAT Gateway** | Maintenance fee: $0.045/giờ × 720h (~$32.40); Data processing fee: ~$0.045/GB (estimated ~10 GB traffic); Elastic IP: $0 (Free because it is assigned to the NAT Gateway) | ~$32.85 |
| ESTIMATED TOTAL COST | (Continuous operation 24/7 for 30 days) | ~$86.51 / tháng |

### Cost Control

- **AWS Budgets:** Set alerts when costs reach the desired thresholds.
- **Amazon EC2:** Use an appropriate configuration and stop EC2 when not in use.
- **Amazon RDS:** Use a configuration appropriate for the workshop and stop or delete resources when completed.
- **NAT Gateway:** Monitor uptime and the amount of data transferred through the NAT Gateway.
- **Application Load Balancer:** Monitor usage and delete the ALB when no longer needed.
- **Amazon S3:** Control image storage capacity.
- **Amazon ECR:** Delete old Docker Images that are no longer used.
- **Post-workshop Cleanup:** Delete or stop AWS resources that are no longer used after completion.

---

# 7. Risk Assessment

### Risk Matrix

- *EC2 is not operational*: High impact, medium probability.
- *Application Load Balancer cannot forward requests*: High impact, medium probability.
- *Unable to connect to RDS*: High impact, medium probability.
- *NAT Gateway is not operational*: Medium to high impact, medium probability.
- *Product image upload to S3 fails*: Medium impact, low probability.
- *Incorrect Security Group configuration*: High impact, medium probability.
- *IAM Role lacks permissions*: Medium impact, medium probability.
- *Docker container is not operational*: High impact, medium probability.
- *AWS costs exceed expectations*: Medium impact, medium probability.

### Mitigation Strategy

- Check the EC2 status.
- Check the Target status and Health Check of the Application Load Balancer.
- Check connectivity between EC2 and RDS, especially the Security Group and connection information.
- Check the Route Table when EC2 cannot establish outbound connectivity.
- Check the NAT Gateway status when EC2 cannot access external services.
- Check IAM permissions when EC2 accesses S3 and ECR.
- Use AWS Budgets to monitor and alert on costs.
- Back up database data when necessary.

### Contingency Plan

- Restart or redeploy Docker containers on EC2.
- Check and update the Target Group or Security Group when the ALB cannot connect to EC2.
- Check and update the Route Table or NAT Gateway when EC2 cannot establish outbound connectivity.
- Restore the database from an RDS backup when necessary.
- Check the IAM Role if EC2 cannot access AWS services.
- The local environment can be used to test the Backend if the AWS environment encounters issues.

---

# 8. Expected Results

### Technical Improvements

The e-commerce system is deployed on AWS with the Next.js Frontend and Spring Boot Backend packaged using Docker, connected to a MySQL database on Amazon RDS, with images stored on Amazon S3.

Kiến trúc sử dụng **Application Load Balancer (ALB)** để tiếp nhận request từ Internet thông qua địa chỉ **ALB DNS Name**, trong khi Amazon EC2 được triển khai an toàn trong Private Subnet. **NAT Gateway** cung cấp khả năng kết nối outbound ra Internet cho EC2.

Access to AWS services is granted through **IAM Role**, Docker Images are stored on **Amazon ECR**.

### Deployment Results

- The Next.js Frontend and Spring Boot Backend are deployed using Docker on Amazon EC2.
- Docker Images are stored on Amazon ECR.
- MySQL is deployed on Amazon RDS.
- Product images are stored on Amazon S3.
- The Application Load Balancer receives and distributes requests to EC2.
- The NAT Gateway provides outbound connectivity for EC2 in the Private Subnet.
- IAM Roles are used to grant EC2 access to AWS services.
- Resources are deployed in Amazon VPC.
- Security Groups are used to control connectivity between the ALB, EC2, and RDS.

### System Functions

- Customers can register and log in.
- Customers can browse and search for products.
- Customers can add products to the shopping cart.
- Customers can place orders.
- Customers can pay by COD.
- Customers can pay by bank transfer and enter the transaction code.
- Customers can track order status.
- Administrators can view and process orders.
- Administrators can confirm bank transfer payments.
- Administrators can manage products.
- Product images are stored on Amazon S3.

### Long-Term Value

The workshop provides a Full-Stack e-commerce application deployment model on AWS, demonstrating how to combine **VPC, Public Subnet, Private Subnet, , Application Load Balancer, NAT Gateway, EC2, RDS, S3, ECR and IAM** in a complete system.

Using Docker standardizes the application runtime environment, while separating Public Subnets and Private Subnets provides clearer network infrastructure organization. The Application Load Balancer handles requests from the Internet, EC2 focuses on application processing, RDS stores data, and S3 stores images.

This architecture provides a foundation for future system expansion, such as adding more EC2 instances to the Application Load Balancer Target Group or scaling application components as demand increases.