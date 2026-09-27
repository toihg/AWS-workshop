---
title : "Network Infrastructure Deployment"
date : 2026-01-01
weight : 2
chapter : false
pre : " <b> 3.2 </b> "
---

### Goal

In this section, we will build the private network infrastructure for the TechMart system on AWS using Amazon VPC. The system is designed in layers with a Public Subnet and a Private Subnet:

* Public Subnet: Contains the Application Load Balancer (ALB) to receive traffic from the Internet and the NAT Gateway to provide outbound connectivity.

* Private Subnet: Contains Amazon EC2 servers (running Docker with Nginx, Next.js, and Spring Boot) and the Amazon RDS MySQL database to ensure that critical resources cannot be accessed directly from the Internet.

The network architecture uses an Internet Gateway, NAT Gateway, Elastic IP, Route Tables, and Security Groups to control network traffic paths and access permissions between components.

---

### Practice Content

1. [3.2.1. Create an Amazon VPC](3-Workshop/3.2-Network-configuration/3.2.1-vpc/)
2. [3.2.2. Create an Internet Gateway](3-Workshop/3.2-Network-configuration/3.2.2-internet-gateway/)
3. [3.2.3. Create a Public Subnet and Private Subnet](3-Workshop/3.2-Network-configuration/3.2.3-subnet/)
4. [3.2.4. Create a NAT Gateway and Elastic IP](3-Workshop/3.2-Network-configuration/3.2.4-nat-elastic/)
5. [3.2.5. Configure Security Groups for ALB, EC2, RDS, and VPC Endpoints](3-Workshop/3.2-Network-configuration/3.2.5-security-group/)

---

### Expected Result

After completing this section:

* A dedicated VPC has been created for the TechMart system.
* The Public Subnet and Private Subnet have been created and configured.
* The Internet Gateway has been configured for the VPC.
* The NAT Gateway has been configured for the VPC.
* The Security Group for the ALB has been configured.
* The Security Group for EC2 has been configured.
* The Security Group for RDS has been configured.
* The Security Group for VPC Endpoints has been configured.
* RDS in the Private Subnet cannot be accessed directly from the Internet.
* EC2 in the Private Subnet cannot be accessed directly from the Internet.
* EC2 can connect to RDS through port 3306.
* Traffic between EC2 and RDS is controlled by Security Groups.