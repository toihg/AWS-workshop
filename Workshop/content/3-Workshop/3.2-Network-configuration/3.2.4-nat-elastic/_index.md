---
title : "Configure NAT Gateway and Elastic IP"
date : 2026-01-01
weight : 4
chapter : false
pre : " <b> 3.2.4 </b> "
---

After configuring the Internet Gateway, we will create a **NAT Gateway** to allow resources in the **Private Subnet** to establish outbound connections to the Internet.

In the TechMart architecture:

- The NAT Gateway is placed in the **Public Subnet**.
- The NAT Gateway uses an **Elastic IP** to communicate with the Internet.
- The Private Subnet uses the NAT Gateway to establish outbound connections.
- Connections from the Internet cannot be initiated directly to resources in the Private Subnet through the NAT Gateway.

---

#### Step 1: Access Elastic IPs

In the **AWS Console**, navigate to:

**VPC → Elastic IPs**

Select:

**Allocate Elastic IP address**

---

#### Step 2: Allocate an Elastic IP

In the **Network Border Group** section, keep the default value appropriate for the Region being used.

Under **Public IPv4 address pool**, select:

**Amazon's pool of IPv4 addresses**

<p align="center">
  <img src="/images/3-Workshop/3.2/allocate_elastic.png/" width="1900">
</p>

Then select:

**Allocate**

---

#### Step 3: Access NAT Gateways

In the **VPC Console**, navigate to:

**NAT Gateways → Create NAT gateway**

---

#### Step 4: Configure the NAT Gateway

Under **Availability mode**, select:

**Zonal**

Enter the following information:

| Property | Value |
|---|---|
| Name | `TechMart-NAT-Gateway` |
| Subnet | `TechMart-Public-Subnet` |
| Connectivity type | Public |
| Elastic IP allocation ID | Select the Elastic IP created earlier |

<p align="center">
  <img src="/images/3-Workshop/3.2/create_nat.png/" width="1900">
</p>

Then select:

**Create NAT gateway**

Wait until the **State** changes to **Available** before proceeding to the next step.

---

#### Step 6: Configure the Route Table for the Private Subnet

In the **VPC Console**, select:

**Route Tables → TechMart-Private-RT**

Select:

**Routes → Edit routes → Add route**

Add the route:

| Destination | Target |
|---|---|
| 10.0.0.0/16 | Local |
| 0.0.0.0/0 | NAT Gateway |

For the Target, select:

**TechMart-NAT-Gateway**

<p align="center">
  <img src="/images/3-Workshop/3.2/edit_routetable_private.png/" width="1900">
</p>

Then select:

**Save changes**
