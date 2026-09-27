---
title: "Internship Report"
date: 2026-09-27
weight: 1
chapter: false
---

# FCAJ Workforce Bootcamp 2026 Internship Report

### Student Information

&emsp; **Full Name:** Hoang Van Toi

&emsp; **Phone Number:** 0355452305

&emsp; **Email:** toih1204@gmail.com

&emsp; **University:** Hanoi University of Civil Engineering

&emsp; **Major:** Information Technology

&emsp; **Class:** 67CNCS

&emsp; **Internship Company:** Amazon Web Services Vietnam Company Limited

&emsp; **Program:** Workforce Bootcamp - First Cloud AI Journey (FCAJ)

&emsp; **Internship Period:** From August 1, 2026 to September 30, 2026

<p align="center">
	<img src="/images/avatar.jpg" width="400" alt="Avatar">
</p>

---

### Project Report Summary

This internship report summarizes the process of building, packaging, and deploying the **TechMart e-commerce platform** on AWS cloud infrastructure.

Backend Service: Built with Java 21 and Spring Boot 3, using Spring Data JPA for data interaction. The system provides RESTful APIs that handle all core business logic: product catalog management, user account authentication/authorization, shopping cart, order creation workflow, and system administration.

Frontend Web App: Developed with Next.js, React, TypeScript, and Tailwind CSS. It provides an intuitive user interface, product filtering across the Apple device ecosystem (MacBook, iPhone, iPad, AirPods, and Apple Watch), buyer-side shopping cart state management, COD/bank transfer payment flows, order progress visualization, and an Admin Dashboard.

Container Packaging & Distribution:
	* The Frontend, Backend, and Nginx Reverse Proxy are packaged as Docker Images and run with Docker Compose.
	* The Docker Images are managed, stored, and distributed through Amazon ECR.
	* The Nginx Container acts as the request entry point and handles routing (Reverse Proxy): it directs interface requests to the Frontend Container and API requests to the Backend Container.

Network & Server Infrastructure (AWS VPC & EC2): The system runs in an Amazon VPC network environment, clearly separated into a Public Subnet (containing the Application Load Balancer and NAT Gateway) and a Private Subnet (containing the Backend/Frontend applications on Amazon EC2).

Database & Storage: Amazon RDS (MySQL / MariaDB) is used in the Private Subnet, and Amazon S3 is used to store and distribute product image assets.

Security & Operations Monitoring: AWS IAM is applied for permission control, AWS Secrets Manager is used to manage environment variables, and Amazon CloudWatch collects logs and monitors system metrics in real time.

---

### Report Contents

1. [Worklog (12-Week Work Journal)](1-Worklog/)

2. [Proposal (Project Proposal)](2-Proposal/)

3. [Workshop (System Deployment Guide on AWS)](3-Workshop/)

4. [Self-Evaluation](4-Self-evaluation/)

5. [Sharing and Contributions](5-Feedback/)
