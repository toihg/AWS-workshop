---
title: "Proposal"
date: 2026-09-25
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# TechMart E-Commerce Platform on AWS

## Proposal for Deploying an E-Commerce System on AWS

### 1. Executive Summary

**TechMart** is an e-commerce platform for technology products such as laptops, mobile phones, headphones, wearables, and accessories. Its core features include registration, login, product browsing and search, cart management, ordering, payment, and order-status tracking. The system also provides an administration interface for managing products, orders, and payment statuses.

The system uses a **full-stack, containerized architecture** with a **Next.js frontend, Spring Boot backend, and Nginx reverse proxy**. The application is packaged with **Docker** and deployed on **Amazon EC2**. Transactional data is stored in **Amazon RDS for MySQL**, while product images are stored in **Amazon S3**.

The infrastructure is built on **Amazon VPC**, with public and private subnets separating system components. An **Application Load Balancer (ALB)** in the public subnet receives requests from the Internet and forwards them to **Amazon EC2** in the private subnet through a target group.

A **NAT Gateway** provides outbound connectivity for resources in the private subnet. **AWS IAM** manages access through IAM roles, and **Amazon ECR** stores the application's Docker images.

In addition to hosting the application, **Amazon CloudWatch** monitors system activity. It provides EC2 metrics such as CPU, network, and instance status, and supports **CloudWatch Alarms** that notify operators when metrics exceed defined thresholds.

---

### 2. Problem Statement

#### Current Challenges

During local development, the frontend, backend, database, and product images are often run or stored on a developer's computer. This works for development and testing, but does not meet the needs of deploying the system to the cloud and making it accessible over the Internet.

The system also needs dedicated solutions for product-image storage, database management, routing requests from the Internet, access control, and application monitoring.

Allowing application servers to be accessed directly from the Internet increases the system's exposure. The network components should therefore be separated, and direct access to important resources such as Amazon EC2 and Amazon RDS should be restricted.

Once deployed on AWS, the system also needs a way to track its status and resource usage so that operational issues can be detected.

#### Proposed Solution

This workshop proposes deploying TechMart on AWS with components organized by responsibility:

* **Next.js frontend**: provides the user interface and runs in a Docker container on Amazon EC2.
* **Spring Boot backend**: runs in a Docker container on Amazon EC2 and provides the REST API.
* **Nginx**: acts as a reverse proxy and routes requests to the appropriate frontend or backend service.
* **Amazon RDS for MySQL**: stores user, product, cart, order, and payment data.
* **Amazon S3**: stores product images.
* **Amazon VPC**: provides a private network environment for the system.
* **Public subnet**: hosts the Application Load Balancer and NAT Gateway.
* **Private subnet**: hosts Amazon EC2 and Amazon RDS.
* **Application Load Balancer**: receives and distributes requests from the Internet to EC2.
* **NAT Gateway**: provides outbound connectivity for resources in the private subnet.
* **AWS IAM**: manages access to AWS services through IAM roles.
* **Amazon ECR**: stores Docker images for the frontend and backend.
* **Docker**: packages the frontend and backend as containers.
* **Amazon CloudWatch**: monitors system metrics and supports alerts through CloudWatch Alarms.

The system supports two payment methods: **cash on delivery (COD)** and **bank transfer**. For bank transfers, customers enter a transaction reference, and an administrator can review and confirm the payment status.

#### Benefits

The solution makes the system accessible over the Internet while separating components according to their responsibilities and access requirements.

The **Application Load Balancer** is the Internet-facing entry point, while Amazon EC2 runs in a private subnet. The **NAT Gateway** allows EC2 to make outbound connections without assigning it a public IP address directly.

Docker standardizes the runtime environment for the frontend and backend. Amazon RDS provides a dedicated database environment, while Amazon S3 handles product-image storage.

**Amazon CloudWatch** helps monitor EC2 through metrics such as CPU, network, and instance status. CloudWatch Alarms can be configured to notify operators when metrics exceed defined thresholds, supporting operational monitoring.

---

### 3. Solution Architecture

TechMart runs in an **Amazon VPC** that contains public and private subnets.

The Application Load Balancer is the Internet-facing entry point for customers and administrators, using the **ALB DNS name**. It forwards requests to the application server in the private subnet.

A user's browser sends a request to the Application Load Balancer. The ALB receives it and forwards it to Amazon EC2 in the private subnet through a target group.

Amazon EC2 runs Docker containers for **Nginx, Next.js, and Spring Boot**. Nginx acts as a reverse proxy and routes requests to the appropriate frontend or backend service.

Amazon RDS runs in the private subnet and only accepts connections from EC2 through its security group. Amazon S3 stores product images. Amazon ECR stores Docker images that EC2 can pull during deployment.

During operation, **Amazon CloudWatch** monitors EC2 metrics. Metrics such as `CPUUtilization`, `NetworkIn`, `NetworkOut`, and `StatusCheckFailed` are used to track instance health. CloudWatch Alarms can be configured for important metrics to notify operators when the system exceeds defined thresholds.

<p align="center">
  <img src="/images/2-Proposal/AWSAWS.drawio.svg" width="900">
</p>

#### Component Design

* **Application Load Balancer**: receives HTTP requests from the Internet and forwards them to EC2 through a target group.
* **Frontend**: Next.js provides the shopping interface, product search, cart, checkout, and order management.
* **Backend**: Spring Boot provides the REST API and handles user authentication, product management, order creation, payments, and order-status updates.
* **Nginx**: acts as a reverse proxy, routing requests to Next.js and Spring Boot over the Docker internal network.
* **Docker**: packages the frontend and backend as Docker images and runs them as containers on EC2.
* **Database**: Amazon RDS for MySQL stores the system's business data.
* **Object storage**: Amazon S3 stores product images, keeping file storage separate from the application server.
* **Payments**: the backend handles COD and bank-transfer payments.
* **Administration**: the admin interface supports product, order, and payment-status management.
* **VPC**: provides a private network environment for AWS resources.
* **NAT Gateway**: provides outbound connectivity for EC2 in the private subnet.
* **IAM**: manages access to AWS services.
* **ECR**: stores Docker images for the frontend and backend.
* **CloudWatch**: monitors EC2 metrics and provides CloudWatch Alarms when configured thresholds are exceeded.

---

### 4. Technical Implementation

#### Implementation Phases

The project will be delivered in the following main phases:

**1. Analysis and design**: Analyze system requirements, identify core features, and design the AWS deployment architecture.

**2. Application development**: Build the frontend with Next.js and the backend with Spring Boot, implementing product, account, cart, checkout, payment, and order-management features.

**3. Database and storage**: Design the MySQL database, deploy it to Amazon RDS, and integrate Amazon S3 for product-image storage.

**4. Containerization**: Create Dockerfiles and Docker images for the frontend and backend, then test the application in containers.

**5. AWS network infrastructure**: Set up the Amazon VPC, public and private subnets, route tables, Internet Gateway, NAT Gateway, and security groups.

**6. Application Load Balancer deployment**: Configure the Application Load Balancer, listener, and target group, and connect the ALB to EC2 in the private subnet.

**7. Application deployment**: Deploy the frontend and backend Docker containers to Amazon EC2. Configure Nginx as a reverse proxy to route requests to the appropriate containers.

**8. AWS service integration**: Integrate Amazon S3 and Amazon ECR with the application.

**9. Security and access control**: Configure the IAM role for EC2 and security groups for the ALB, EC2, RDS, and related components.

**10. System monitoring**: Configure Amazon CloudWatch to track EC2 metrics and create CloudWatch Alarms for important metrics.

**11. Testing and completion**: Test the frontend, backend, database, S3, load balancer, outbound connectivity, CloudWatch, and the system's operation after deployment.

#### Technical Requirements

* **Frontend**: Next.js, TypeScript, HTML, CSS.
* **Backend**: Java, Spring Boot, Spring Data JPA, REST API.
* **Database**: MySQL, Amazon RDS for MySQL.
* **Storage**: Amazon S3.
* **Containers**: Docker, Amazon ECR.
* **Networking**: Amazon VPC, subnets, route tables, Internet Gateway, NAT Gateway, Application Load Balancer.
* **Security**: AWS IAM, IAM roles, security groups.
* **Monitoring**: Amazon CloudWatch, CloudWatch Metrics, CloudWatch Alarms.
* **Tools**: VS Code, Git, Maven, and a MySQL management tool.

---

# 5. Roadmap and Milestones

### Phase 1: Analysis and Design

* Analyze TechMart's requirements and features.
* Design the MySQL database.
* Design the AWS deployment architecture.
* Identify the AWS services to use.
* Design the public and private subnets.
* Define request flows between the user, ALB, EC2, and RDS.

### Phase 2: Backend Development

* Build the backend with Spring Boot.
* Create REST APIs for accounts, products, carts, and orders.
* Implement COD and bank-transfer payments.
* Connect to MySQL and implement data operations.

### Phase 3: Frontend Development

* Build the interface with Next.js.
* Implement login, product browsing, search, and cart features.
* Create checkout and order-management pages.
* Build the administration interface.

### Phase 4: Database and Storage Integration

* Deploy MySQL on Amazon RDS.
* Connect the backend to RDS.
* Integrate Amazon S3 for product-image storage.
* Verify access permissions and data upload and download operations.

### Phase 5: AWS Network Infrastructure

* Create the Amazon VPC.
* Create public and private subnets.
* Configure the Internet Gateway.
* Configure the NAT Gateway.
* Set up route tables.
* Configure security groups.
* Verify connectivity between subnets.

### Phase 6: Docker and Application Deployment

* Create Dockerfiles for the frontend and backend.
* Build and test the Docker images.
* Push the Docker images to Amazon ECR.
* Create an Amazon EC2 instance in the private subnet.
* Pull the images from ECR.
* Deploy the frontend and backend with Docker.
* Configure Nginx as a reverse proxy.

### Phase 7: Application Load Balancer

* Create an Application Load Balancer in the public subnet.
* Configure the listener and target group.
* Register the EC2 instance running Nginx as a target.
* Verify the health check and confirm that the target is healthy.
* Obtain the ALB DNS name provided by AWS.
* Verify end-to-end access through the ALB DNS name.

### Phase 8: Monitoring with Amazon CloudWatch

* Open Amazon CloudWatch and select the **AWS/EC2** namespace.
* Select the TechMart EC2 instance to monitor.
* Track important metrics such as `CPUUtilization`, `NetworkIn`, `NetworkOut`, and `StatusCheckFailed`.
* Configure a CloudWatch Alarm for the `CPUUtilization` metric.
* Set a threshold appropriate for the workshop environment.
* Configure the alarm period and evaluation conditions.
* Configure an SNS topic if notifications are needed when the alarm enters the **In alarm** state.
* Verify the alarm state and confirm that CloudWatch is receiving EC2 data.

### Phase 9: Testing and Completion

* Test frontend and backend features.
* Verify the connection between the ALB and EC2.
* Verify the connection between EC2 and RDS.
* Verify EC2 connectivity to S3 and ECR.
* Verify the NAT Gateway and outbound connections.
* Verify IAM permissions.
* Check Docker container status.
* Check EC2 metrics in CloudWatch.
* Check CloudWatch Alarm status.
* Complete the system and deployment documentation.

---

# 6. Budget Estimate

### Estimated Infrastructure Costs

| AWS service | Configuration and usage assumptions | Estimated cost per month |
| --- | --- | ---: |
| **Amazon EC2** | 1 × `t3.micro`, running 720 hours/month | **~$9.50** |
| **Amazon RDS for MySQL** | 1 × `db.t3.micro`, Single-AZ, 720 hours/month | **~$20.88** |
| **RDS storage** | 20 GB General Purpose Storage | **~$2.76** |
| **Amazon S3** | 10 GB Standard Storage plus GET/PUT requests | **~$0.30** |
| **Amazon ECR** | Approximately 2–3 GB of Docker images | **~$0.30** |
| **Application Load Balancer** | 1 ALB plus basic LCU usage | **~$18.00** |
| **NAT Gateway** | Hourly charge plus estimated data processing | **~$32.85** |
| **Amazon CloudWatch** | EC2 metrics and alarms within the workshop scope | **Depends on usage** |
| **ESTIMATED TOTAL** | Running continuously, 24/7 for 30 days | **~$86.51 plus any CloudWatch usage** |

### Cost Controls

* **AWS Budgets**: Configure alerts for desired spending thresholds.
* **Amazon EC2**: Choose an appropriate instance size and stop or terminate the instance when it is no longer needed.
* **Amazon RDS**: Choose a configuration suitable for the workshop and stop or delete resources when it is complete.
* **NAT Gateway**: Monitor its uptime and the amount of data processed.
* **Application Load Balancer**: Track usage and delete the ALB when it is no longer needed.
* **Amazon S3**: Control product-image storage usage.
* **Amazon ECR**: Delete outdated Docker images that are no longer used.
* **Amazon CloudWatch**: Monitor usage and configured components to avoid unnecessary monitoring resources.
* **Post-workshop cleanup**: Stop or delete AWS resources that are no longer needed.

---

# 7. Risk Assessment

### Risk Matrix

* **EC2 instance unavailable**: High impact, medium likelihood.
* **Application Load Balancer unable to forward requests**: High impact, medium likelihood.
* **Unable to connect to RDS**: High impact, medium likelihood.
* **NAT Gateway unavailable**: Medium-to-high impact, medium likelihood.
* **Product-image upload to S3 fails**: Medium impact, low likelihood.
* **Incorrect security-group configuration**: High impact, medium likelihood.
* **Insufficient IAM role permissions**: Medium impact, medium likelihood.
* **Docker container unavailable**: High impact, medium likelihood.
* **CloudWatch Alarm misconfigured**: Medium impact, low likelihood.
* **AWS costs exceed the estimate**: Medium impact, medium likelihood.

### Mitigation Strategies

* Check the EC2 instance status.
* Check the Application Load Balancer target status and health checks.
* Check connectivity between EC2 and RDS, especially security groups and connection settings.
* Check route tables when EC2 cannot establish outbound connections.
* Check the NAT Gateway status when EC2 cannot access external services.
* Check IAM permissions when EC2 accesses S3 and ECR.
* Check EC2 metrics in CloudWatch.
* Check CloudWatch Alarm thresholds and status.
* Use AWS Budgets to monitor costs and receive alerts.
* Back up database data when necessary.

### Contingency Plan

* Restart or redeploy Docker containers on EC2.
* Check and update the target group or security group if the ALB cannot connect to EC2.
* Check and update the route table or NAT Gateway if EC2 cannot establish outbound connections.
* Restore the database from an RDS backup when necessary.
* Check the IAM role if EC2 cannot access AWS services.
* Check CloudWatch metrics and alarms if monitoring data is missing or alerts are not working.
* Use a local environment to test the backend if the AWS environment is unavailable.

---

# 8. Expected Outcomes

### Technical Improvements

The e-commerce system will be deployed on AWS with a Next.js frontend and Spring Boot backend packaged in Docker, connected to a MySQL database on Amazon RDS, with product images stored in Amazon S3.

The architecture uses an **Application Load Balancer (ALB)** to receive Internet requests through its **ALB DNS name**, while Amazon EC2 runs in a private subnet. A **NAT Gateway** provides outbound connectivity for EC2.

Access to AWS services is granted through an **IAM role**, and Docker images are stored in **Amazon ECR**.

**Amazon CloudWatch** monitors EC2 through metrics and CloudWatch Alarms. These metrics provide information about resource usage and instance status, helping operators track the system during operation.

### Deployment Outcomes

* The Next.js frontend and Spring Boot backend run in Docker on Amazon EC2.
* Docker images are stored in Amazon ECR.
* MySQL runs on Amazon RDS.
* Product images are stored in Amazon S3.
* The Application Load Balancer receives and distributes requests to EC2.
* The NAT Gateway provides outbound connectivity for EC2 in the private subnet.
* An IAM role grants EC2 access to AWS services.
* Resources are deployed in an Amazon VPC.
* Security groups control connections between the ALB, EC2, and RDS.
* Amazon CloudWatch is configured to monitor EC2 metrics.
* CloudWatch Alarms notify operators when important metrics exceed configured thresholds.

### System Features

* Customers can register and sign in.
* Customers can browse and search for products.
* Customers can add products to the cart.
* Customers can place orders.
* Customers can pay by COD.
* Customers can pay by bank transfer and enter a transaction reference.
* Customers can track order statuses.
* Administrators can view and process orders.
* Administrators can confirm bank-transfer payments.
* Administrators can add, edit, and delete products.
* Product images are stored in Amazon S3.

### Long-Term Value

This workshop provides a model for deploying a full-stack e-commerce application on AWS. It demonstrates how **VPC, public and private subnets, Application Load Balancer, NAT Gateway, EC2, RDS, S3, ECR, IAM, and CloudWatch** work together in a complete system.

Docker standardizes the application runtime, while separating public and private subnets helps organize the network infrastructure. The Application Load Balancer receives requests from the Internet, EC2 runs the application, RDS stores data, S3 stores images, and CloudWatch supports infrastructure monitoring.
