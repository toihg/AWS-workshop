---
title : "Configure Internet Gateway"
date : 2026-01-01
weight : 2
chapter : false
pre : " <b> 3.2.2 </b> "
---

After creating the VPC and dividing it into Subnets, we will create an **Internet Gateway (IGW)**. The Internet Gateway acts as a connection gateway, allowing resources in the Public Subnet to communicate with the external Internet.

---

#### Step 1: Create an Internet Gateway

In the ***VPC Console***, select:

***Internet Gateways → Create internet gateway***

In the **Name tag** field, enter:

```TechMart-IGW```

<p align="center">
  <img src="/images/3-Workshop/3.2/igw.png" width="1900">
</p>

Then select ***Create internet gateway.***.

#### Step 2: Attach the Internet Gateway to the VPC

Select ***TechMart-IGW***, then select:

***Actions → Attach to a VPC***

Under ***Available VPCs***, select:

`TechMart-VPC`

<p align="center">
  <img src="/images/3-Workshop/3.2/attach_vpc.png" width="1900">
</p>

Then select ***Attach internet gateway***.
