---
title : "Create an Amazon VPC"
date : 2026-01-01
weight : 1
chapter : false
pre : " 3.2.1. "
---

In this step, we will create an **Amazon VPC (Virtual Private Cloud)** that serves as a separate private network on AWS for the TechMart system. This private network provides a secure isolated environment containing all system resources, such as the Application Load Balancer, EC2 application servers, and the RDS MySQL database.

---

#### Step 1: Access the Amazon VPC service

1. Sign in to the **AWS Management Console**.
2. In the search bar at the top, enter *VPC* and select the **VPC** service to access the **VPC Dashboard**.

<p align="center">
	<img src="/images/3-Workshop/3.2/search_vpc.png" width="1500">
</p>

---

#### Step 2: Configure the VPC settings

1. In the left navigation menu, select **Your VPCs**.
2. Click the **Create VPC** button in the upper-right corner.
3. Under **Resources to create**, select **VPC only**.
4. Enter the detailed configuration according to the following table:

| Property | Configuration value | Description |
| --- | --- | --- |
| **Name tag** | `techmart-vpc` | Identifier for the project's VPC |
| **IPv4 CIDR block** | `10.0.0.0/16` | Main network range providing up to 65,536 IP addresses |
| **IPv6 CIDR block** | *No IPv6 CIDR block* | Disables IPv6 support |
| **Tenancy** | *Default* | Uses AWS's default shared hardware |

---

#### Step 3: Confirm and create the VPC

1. Review the configured overview information:

	 - **Name:** `techmart-vpc`
	 - **IPv4 CIDR:** `10.0.0.0/16`
	 - **Tenancy:** `Default`

<p align="center">
	<img src="/images/3-Workshop/3.2/create_vpc.png" width="1500">
</p>

2. Click **Create VPC** to create the VPC.
3. The system will redirect to the VPC details page. Check that the **State** shows **Available**.

---

#### Expected Result

After this step, the main network infrastructure is ready to operate:

- **VPC ID / Name:** `techmart-vpc`
- **CIDR Block:** `10.0.0.0/16`