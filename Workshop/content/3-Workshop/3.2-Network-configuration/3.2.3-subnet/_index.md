---
title : "Configure Public Subnet and Private Subnet"
date : 2026-01-01
weight : 3
chapter : false
pre : " <b> 3.2.3. </b> "
---

After creating the VPC, we will create two **Public Subnets** and two **Private Subnets** to separate TechMart system resources according to their access levels.

In this architecture:

- **Public Subnets** are used for components that need to receive connections from the Internet, such as the Application Load Balancer and NAT Gateway.
- **Private Subnets** are used for Amazon EC2 and Amazon RDS, limiting direct access from the Internet.
- Each Subnet is associated with a suitable **Route Table** to determine network traffic flow.

---

### Step 1: Create two Public Subnets

Go to:

**VPC Console > Subnets > Create subnet**

Select the VPC:

**TechMart-VPC**

Enter the following information:

| Property | Value |
|---|---|
| Subnet name | `TechMart-Public-Subnet-A` <br> `TechMart-Public-Subnet-B` |
| Availability Zone | `ap-southeast-1a` <br> `ap-southeast-1b` |
| IPv4 subnet CIDR block | `10.0.1.0/24` <br> `10.0.4.0/24` |

<p align="center">
	<img src="/images/3-Workshop/3.2/public_subnet_1.png" width="1500">
</p>

<p align="center">
	<img src="/images/3-Workshop/3.2/public_subnet_2.png" width="1500">
</p>

Then select **Create subnet**.

#### Enable auto-assign public IPv4 address

After creating the Public Subnet, select:

**Actions → Edit subnet settings**

Enable:

**Enable auto-assign public IPv4 address**

<p align="center">
	<img src="/images/3-Workshop/3.2/auto_public_subnet_1.png" width="1500">
</p>

<p align="center">
	<img src="/images/3-Workshop/3.2/auto_public_subnet_2.png" width="1500">
</p>

Then select **Save**.

The Public Subnets will be used for resources that require direct Internet connectivity through the **Internet Gateway**.

---

### Step 2: Create two Private Subnets

As with the Public Subnets, go to:

**VPC Console > Subnets > Create subnet**

Select the VPC:

**TechMart-VPC**

Enter the following information:

| Property | Value |
|---|---|
| Subnet name | `TechMart-Private-Subnet-A` <br> `TechMart-Private-Subnet_B` |
| Availability Zone | `ap-southeast-1a` <br> `ap-southeast-1b` |
| IPv4 subnet CIDR block | `10.0.2.0/24` <br> `10.0.3.0/24` |

Then select **Create subnet**.

**Do not enable auto-assign public IPv4 address for the Private Subnets.**

---

### Step 3: Create a Route Table for the Public Subnets

In the **VPC Console**, select:

**Route Tables → Create route table**

Enter:

| Property | Value |
|---|---|
| Name | `TechMart-Public-RT` |
| VPC | `TechMart-VPC` |

Then select **Create route table**.

Continue to:

**TechMart-Public-RT → Routes → Edit routes → Add route**

Configure:

| Destination | Target |
|---|---|
| `10.0.0.0/16` | Local |
| `0.0.0.0/0` | Internet Gateway |

Select **Save changes**.

Then go to:

**Subnet associations → Edit subnet associations**

Select the two subnets:

`TechMart-Public-Subnet-A`  
`TechMart-Public-Subnet-B`

Then select **Save associations**.

---

### Step 4: Create a Route Table for the Private Subnets

Continue by selecting:

**Route Tables → Create route table**

Enter:

| Property | Value |
|---|---|
| Name | `TechMart-Private-RT` |
| VPC | `TechMart-VPC` |

Then select **Create route table**.

Continue to:

**Subnet associations → Edit subnet associations**

Select the two subnets:

`TechMart-Private-Subnet-A`  
`TechMart-Private-Subnet-B`

Then select **Save associations**.