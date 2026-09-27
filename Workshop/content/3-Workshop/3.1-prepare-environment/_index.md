---
title : "Environment Preparation"
date : 2026-09-25
weight : 1
chapter : false
pre : " <b> 3.1. </b> "
---

### Goal

This section guides you through preparing the environment required to develop and deploy the TechMart system on Windows 11. The tools include Java, Maven, Node.js, Git, Visual Studio Code, and Docker.

In addition, an AWS account and a GitHub account are required to configure the infrastructure, build Docker Images, store Images in Amazon ECR, and deploy the application to Amazon EC2.

------------------------------------------------------------------------

## 1. Environment Requirements

The computer used in the workshop must meet the following requirements:

-   Operating system: Windows 11 64-bit, Linux, or MacOS.

-   RAM: at least 8GB, 16GB recommended.

-   Disk space: at least 20GB free.

-   Stable Internet connection.

-   Permission to install software and use Docker.

-   A web browser to access the AWS Management Console.

------------------------------------------------------------------------

## 2. Tools to Install

### 2.1. Java and Maven

The Backend is developed with Spring Boot, using Java and Maven.

After installing Java JDK, open **PowerShell** and check:

``` powershell
java --version
```

Check Maven:

``` powershell
mvn -version
```

If the commands above return version information, Java and Maven have been installed successfully.

<p align="center">
	<img src="/images/3-Workshop/3.1/java_maven-version.png" width="900">
</p>

### 2.2. Node.js and npm

The Frontend is developed with Next.js, using Node.js and npm.

Check the versions:

``` powershell
node -v
npm -v
```

If the commands above return version information, Node.js and npm are ready.

<p align="center">
	<img src="/images/3-Workshop/3.1/node_npm-version.png" width="900">
</p>

### 2.3. Git

Git is used to manage source code and connect to GitHub.

Check Git:

``` powershell
git --version
```

Configure Git information:

``` powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Check the configuration again:

``` powershell
git config --global --list
```

The **user.name** and **user.email** information will be used when creating commits.

<p align="center">
	<img src="/images/3-Workshop/3.1/git-version.png" width="900">
</p>

### 2.4. Visual Studio Code

Visual Studio Code is used as the development environment for the Frontend and Backend.

After installation, open Visual Studio Code to check the development environment and open the folder containing the TechMart source code.

<p align="center">
	<img src="/images/3-Workshop/3.1/vscode.png" width="900">
</p>

### 2.5. Docker Desktop

Docker is used to package the Next.js Frontend and Spring Boot Backend into Docker Images before deploying them to Amazon EC2.

After installing Docker Desktop, open PowerShell and check:

``` powershell
docker --version
```

Check Docker Compose:

``` powershell
docker compose version
```

If the commands above return version information, Docker has been installed successfully.

<p align="center">
	<img src="/images/3-Workshop/3.1/docker.png" width="900">
</p>

------------------------------------------------------------------------

## 3. Prepare an AWS Account

An AWS account is required to deploy the system.

The AWS services used in the workshop include:

-   Amazon VPC
-   Internet Gateway
-   NAT Gateway
-   Elastic IP
-   Application Load Balancer
-   Amazon EC2
-   Amazon RDS for MySQL
-   Amazon S3
-   Amazon ECR
-   Amazon Route 53
-   AWS IAM
-   AWS Secrets Manager
-   Amazon CloudWatch

The AWS account must have appropriate permissions to create and configure the resources above.

------------------------------------------------------------------------

## 4. Prepare the Source Code

The source code is stored in a GitHub repository. Clone the source code:

```powershell
git clone https://github.com/toihg/AWS-workshop.git
```

After cloning successfully, the source code will be downloaded to the computer.

<p align="center">
	<img src="/images/3-Workshop/3.1/clone_code.png" width="900">
</p>

------------------------------------------------------------------------

## 6. Test the Application

### 6.1. Test the Backend

Move into the Backend directory:

``` powershell
cd ecommerce
```

Build the project:

``` powershell
mvn clean package
```

Run the application:

``` powershell
mvn spring-boot:run
```

Spring Boot starts successfully.

<p align="center">
	<img src="/images/3-Workshop/3.1/backend_run.png" width="900">
</p>

### 6.2. Test the Frontend

Open a new PowerShell window and move into the Frontend directory:

``` powershell
cd frontend
```

Install the libraries:

``` powershell
npm install
```

Run the application:

``` powershell
npm run dev
```

The Frontend runs at the default address:

``` text
http://localhost:3000
```

Open the address in a browser to check the Frontend interface.

<p align="center">
	<img src="/images/3-Workshop/3.1/frontend_run.png" width="900">
</p>

------------------------------------------------------------------------

## 9. Result

After completing this section:

-   Java and Maven have been installed.

-   Node.js and npm are ready.

-   Git and GitHub have been configured.

-   Visual Studio Code has been installed.