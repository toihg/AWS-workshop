---
title : "Creating an EC2 Instance and Importing Data into RDS via SSM"
date : 2026-01-01
weight : 6
chapter : false
pre : " 3.6 "
---

## Part 1: Creating an EC2 Instance and Assigning an IAM Role

1. Access the **EC2 Console**.
2. Select **Instances**.
3. Click **Launch instances**.

    * Name and tags: enter `TechMart-App-Server`

    * Application and OS Images: **Amazon Linux 2023 AMI**

    * Instance type: Select `t3.micro` or `t3.small`.

<p align="center">
  <img src="/images/3-Workshop/3.6/1.png" width="1900">
</p>

* Key pair (login):
    * Select **Create new key pair**
    * Enter the key pair name `techmart_keypair`
    * Key pair type: Select **RSA**
    * Private key file format: Select **.pem**
    * Click **Create key pair** and download it.

<p align="center">
  <img src="/images/3-Workshop/3.6/2.png" width="1900">
</p>

4. In **Network settings**, click **Edit** and configure:

    - **VPC:** Select `TechMart-VPC`.
    - **Subnet:** Select `TechMart-Private-Subnet-A` (`10.0.2.0/24`).
    - **Auto-assign public IP:** Select **Disable**.
    - **Firewall (Security Groups):** Select **Select existing security group** → select `TechMart-EC2-SG`.

    <p align="center">
      <img src="/images/3-Workshop/3.6/3.png" width="1900">
    </p>

5. Review the configuration and select **Launch instance**

6. Assign an IAM Role

    * Click **Action**, find **Security**, and select **Modify IAM Role**

    * Under **IAM role**, select **TechMart-EC2-Role**

      <p align="center">
        <img src="/images/3-Workshop/3.6/add_role.png" width="1900">
      </p>

    * Select **Update IAM role**

---

## Part 2: Connecting to EC2 via SSM Session Manager


### 1. Enable DNS Settings

Access the **AWS Management Console** -> Select the **VPC** service

In the left menu, select **Your VPCs**

Select **TechMart-VPC**

Click **Actions** -> select **Edit VPC settings**

Under **DNS settings**, select both options:
* Enable DNS resolution 
* Enable DNS hostnames 

<p align="center">
  <img src="/images/3-Workshop/3.6/dns.png" width="1300">
</p>

Click **Save changes**.

### 3. Create the 3 VPC Endpoints in sequence:

Access **VPC Console** -> **Endpoints**

Click **Create endpoint**

  * Name tag: Set the corresponding name for each endpoint
    * `TechMart-VPCE-SSM`,
    * `TechMart-VPCE-SSMM`,
    * `TechMart-VPCE-EC2M`,

* Service category: Select **AWS services**.
* Services: Search for and select the services according to the list:

    * Endpoint 1: `com.amazonaws.ap-southeast-1.ssm`

    * Endpoint 2: `com.amazonaws.ap-southeast-1.ssmmessages`
    
    * Endpoint 3: `com.amazonaws.ap-southeast-1.ec2messages`

* VPC: Select **TechMart-VPC**
* Subnets: Select **TechMart-Private-Subnet** and **TechMart-Private-SubnetB**
* IP address type: Keep the default IPv4.
* Security groups: Select **TechMart-VPCEndpoint-SG**
* Policy: Select **Full Access**

<p align="center">
  <img src="/images/3-Workshop/3.6/endpoint1.png" width="1300">
</p>

<p align="center">
  <img src="/images/3-Workshop/3.6/endpoint2.png" width="1300">
</p>

<p align="center">
  <img src="/images/3-Workshop/3.6/endpoint3.png" width="1300">
</p>

Click **Create endpoint**.

### 4. Connect to EC2 via SSM

* Enter `Systems Manager` in the search bar
* Select **Session Manager** from the left menu
* Click **Start session**

Select the target instance:
* Select **TechMart-App-Server**

<p align="center">
  <img src="/images/3-Workshop/3.6/4.png" width="1300">
</p>

Click **Start session**

<p align="center">
  <img src="/images/3-Workshop/3.6/connect.png" width="1300">
</p>

---

## Part 3: Importing Data into RDS via SSM

Run the following commands in sequence directly in the SSM Terminal interface.

#### Step 1: Switch to the working directory and install the MySQL Client

```bash
# Switch the entire session to ec2-user
sudo su - ec2-user
```
```bash
# Install the MariaDB/MySQL Client on Amazon Linux 2023
sudo dnf install -y mariadb105
```

#### Step 2: Download the `ecommerce.sql` file from the S3 Bucket to EC2

```bash
aws s3 cp s3://techmart-product-images-1204/database_script/ecommerce.sql ./ecommerce.sql
```
```bash
# Check whether the file was downloaded successfully
ls -lh ecommerce.sql
```

<p align="center">
  <img src="/images/3-Workshop/3.6/5.png" width="1300">
</p>

### Step 3: Import Data into Amazon RDS MySQL

Replace the values in the command below:

```bash
# Import the SQL file directly into the RDS database
mysql -h techmart-db.chei8cka8fg4.ap-southeast-1.rds.amazonaws.com -u admin -p < ecommerce.sql
```

The system will prompt you to enter the RDS password. Paste the password and press **Enter**.

### Step 4: Check the Database After a Successful Import

```bash
# Log in to RDS MySQL
mysql -h techmart-db.chei8cka8fg4.ap-southeast-1.rds.amazonaws.com -u admin -p

# Run SQL commands to check whether the data tables have been imported
SHOW DATABASES;
USE ecommerce;
SHOW TABLES;
EXIT;
```

<p align="center">
  <img src="/images/3-Workshop/3.6/6.png" width="1300">
</p>
