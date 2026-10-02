---
title: "Workshop"
date: 2026-01-01
weight: 3
chapter: false
pre: " <b> 3. </b> "
---

# Deploying the TechMart E-Commerce System on AWS

#### Lab Overview

In this workshop, we will build and deploy the TechMart e-commerce system on AWS. The full-stack application uses Spring Boot for the backend, Next.js for the frontend, and Nginx as a reverse proxy.

The application is packaged with Docker and deployed on an Amazon EC2 instance. Amazon RDS for MySQL stores the application's data, Amazon S3 stores product images, and Amazon ECR stores Docker images.

The system runs in an Amazon VPC with public and private subnets. The Application Load Balancer (ALB) and NAT Gateway are placed in the public subnet, while Amazon EC2 and Amazon RDS run in the private subnet. An Elastic IP is assigned to the NAT Gateway so resources in the private subnet can access the Internet through the Internet Gateway.

The ALB accepts Internet traffic through its AWS-provided DNS name and forwards requests to the Nginx reverse proxy on the EC2 instance. Nginx then routes traffic internally to the Next.js frontend and Spring Boot backend.

AWS IAM roles are used to manage the application's access to AWS services.

Throughout the workshop, we will prepare the environment and source code; create the network infrastructure, including the VPC, subnets, route tables, Internet Gateway, NAT Gateway, and Elastic IP; set up Amazon RDS for MySQL and Amazon S3; configure IAM and Amazon ECR; package the application with Docker; deploy the backend and frontend to EC2; configure Nginx and the ALB; monitor the system using CloudWatch and test the complete system end to end.

Finally, we will remove the AWS resources created for the workshop to avoid unnecessary charges.

---

#### Technical Lab Structure

1. [3.1. Prepare the Environment](./3.1-prepare-environment/)
2. [3.2. Deploy the Network Infrastructure](./3.2-network-configuration/)
3. [3.3. Initialize and Configure Amazon RDS MySQL](./3.3-amazon-rds/)
4. [3.4. Configure Amazon S3](./3.4-amazon-s3/)
5. [3.5. Configure IAM Role for the EC2 Server](./3.5-aws-iam/)
6. [3.6. Initialize the EC2 Server and Import Data into RDS via SSM](./3.6-ec2/)
7. [3.7. Package the Application with Docker](./3.7-docker-build/)
8. [3.8. Deploy the Application to Amazon EC2](./3.8-deploy/)
9. [3.9. Configure the Application Load Balancer](./3.9-alb/)
10. [3.10. Monitor the System with Amazon CloudWatch](./3.10-cloudwatch/)
11. [3.11. Test the System](./3.11-test/)
12. [3.12. Clean Up AWS Resources](./3.12-clean/)