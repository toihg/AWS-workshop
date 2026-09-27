---
title : "Create and Configure Amazon RDS MySQL"
date : 2026-01-01
weight : 3
chapter : false
pre : " <b> 3.3 </b> "
---

### Goal

After completing the network infrastructure configuration, the next step is to deploy **Amazon RDS for MySQL** to provide the database for the TechMart system.

Amazon RDS is deployed in **TechMart-VPC** and uses the **Private Subnets** through a DB Subnet Group.

---

### 1. Create a DB Subnet Group

#### Step 1: Access RDS

In the **AWS Management Console**, search for:

**RDS**

Then select:

**RDS → Subnet groups**

Select:

**Create DB subnet group**

---

#### Step 2: Configure the DB Subnet Group

In the **Subnet group details** section, enter:

| Property | Value |
|---|---|
| Name | `TechMart-DB-Subnet-Group` |
| Description | `DB Subnet Group for TechMart` |
| VPC | `TechMart-VPC` |

---

#### Step 3: Select the Availability Zones

Under **Availability Zones**, select:

```text
ap-southeast-1a
ap-southeast-1b
```

Then select the corresponding Private Subnets.

<p align="center">
  <img src="/images/3-Workshop/3.3/subnetgroup.png" width="1900">
</p>

After reviewing the configuration, select:

**Create**

---

### 2. Create an Amazon RDS MySQL Database

#### Step 1: Access the database creation page

Select:

**RDS → Databases → Create database**

Choose:

**Full configuration**

---

#### Step 2: Configure the Engine

Under **Engine options**, select:

**MySQL**

---

#### Step 3: Select the database creation method

Under **Choose a database creation method**, select:

**Full configuration**

<p align="center">
  <img src="/images/3-Workshop/3.3/1.png" width="1900">
</p>

---

#### Step 5: Configure Database Settings

In the **Settings** section, configure:

| Property | Value |
|---|---|
| DB instance identifier | `techmart-db` |
| Master username | `admin` |
| Master password | Set a password |
| Confirm password | Re-enter the password |

<p align="center">
  <img src="/images/3-Workshop/3.3/2.png" width="1900">
</p>

---

#### Step 8: Configure Connectivity

In the **Connectivity** section, select:

**Don't connect to an EC2 compute resource**

For **VPC**, select:

**TechMart-VPC**

For **DB subnet group**, select:

**techmart-db-subnet-group**

For **Public access**, select:

**No**

For **VPC security group**, select:

**Choose existing**

Then select:

**TechMart-RDS-SG**

<p align="center">
  <img src="/images/3-Workshop/3.3/3.png" width="1900">
</p>

---

#### Step 9: Configure Database Options

Under **Additional configuration → Database options**, configure:

| Property | Value |
|---|---|
| Initial database name | `ecommerce` |
| DB parameter group | `Default` |
| Option group | `Default` |

After RDS is created, the `ecommerce` database will be used by the Spring Boot Backend.

Select **Create database**.

---

#### Step 11: Get the RDS Endpoint

Select:

**RDS → Databases → techmart-db → Connectivity & security**

The following information is available:

- Endpoint
- Port
- VPC
- Availability Zone
- VPC Security Group

The endpoint has the following format:

```text
techmart-db.xxxxxxxxxxxx.ap-southeast-1.rds.amazonaws.com
```

Port:

```text
3306
```

This endpoint will be used in the Spring Boot Backend configuration during application deployment.
