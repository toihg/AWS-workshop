---
title: "Workshop"
date: 2026-01-01
weight: 3
chapter: false
pre: " <b> 3. </b> "
---

# Deploying the TechMart E-Commerce System on AWS

#### Lab Overview

In this workshop, we will build and deploy the TechMart e-commerce system on the AWS platform. The system is developed using a Full-Stack architecture with Spring Boot as the Backend, Next.js as the Frontend, and Nginx serving as the Reverse Proxy.

The application is packaged with Docker and deployed on an Amazon EC2 server. Amazon RDS for MySQL is used to store transaction data, Amazon S3 is used to store product images, and Amazon ECR is used to store Docker Images.

The system is deployed within an Amazon VPC with Public Subnet and Private Subnet to ensure security. The Application Load Balancer and NAT Gateway are deployed in the Public Subnet, while Amazon EC2 and Amazon RDS are securely deployed in the Private Subnet. The NAT Gateway is assigned an Elastic IP to provide outbound connectivity from resources in the Private Subnet to the Internet through the Internet Gateway.

The Application Load Balancer (ALB) receives requests from the Internet through the ALB DNS Name (provided by AWS by default) and forwards requests to the Nginx Reverse Proxy on Amazon EC2 in the Private Subnet to route internal traffic to Next.js and Spring Boot.

AWS IAM is used to manage access to AWS services through IAM Roles.

During the implementation, we will prepare the environment and source code, build the network infrastructure with Amazon VPC (Public Subnet, Private Subnet, Route Table, Internet Gateway, NAT Gateway, Elastic IP), initialize Amazon RDS MySQL and Amazon S3, configure AWS IAM, set up Amazon ECR, package the application with Docker, deploy the Backend and Frontend to EC2, configure the Nginx Reverse Proxy and Application Load Balancer, and monitor and test the entire system End-to-End.

Finally, the AWS resources created during the workshop will be cleaned up to avoid unnecessary costs.

---

#### Technical Lab Structure

1. [3.1. Prepare the Environment](http://localhost:1313/Workshop/3-workshop/3.1-prepare-environment/)
2. [3.2. Deploy the Network Infrastructure](http://localhost:1313/Workshop/3-workshop/3.2-network-configuration/)
3. [3.3. Initialize and Configure Amazon RDS MySQL](http://localhost:1313/Workshop/3-workshop/3.3-amazon-rds/)
4. [3.4. Configure Amazon S3](http://localhost:1313/Workshop/3-workshop/3.4-amazon-s3/)
5. [3.5. Configure IAM Role for the EC2 Server](http://localhost:1313/Workshop/3-workshop/3.5-aws-iam/)
6. [3.6. Initialize the EC2 Server and Import Data into RDS via SSM](http://localhost:1313/Workshop/3-workshop/3.6-ec2/)
7. [3.7. Package the Application with Docker](http://localhost:1313/Workshop/3-workshop/3.7-docker-build)
8. [3.8. Deploy the Application to Amazon EC2](http://localhost:1313/Workshop/3-workshop/3.8-deploy/)
9. [3.9. Configure the Application Load Balancer](http://localhost:1313/Workshop/3-workshop/3.9-alb/)
10. [3.10. Clean Up AWS Resources](http://localhost:1313/Workshop/3-workshop/3.10-clean/)