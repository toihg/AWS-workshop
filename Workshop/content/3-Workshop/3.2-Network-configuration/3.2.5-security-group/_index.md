---
title : "Configure Security Groups for ALB, EC2, RDS, and VPC Endpoints"
date : 2026-01-01
weight : 5
chapter : false
pre : " <b> 3.2.5. </b> "
---

After completing the VPC, Subnet, Internet Gateway, and NAT Gateway configuration, we will configure **Security Groups** to control traffic between the components of the TechMart system.

In this architecture, we use four Security Groups:

- **TechMart-ALB-SG**: controls connections to the Application Load Balancer.
- **TechMart-EC2-SG**: controls connections to Amazon EC2.
- **TechMart-RDS-SG**: controls connections to Amazon RDS MySQL.
- **TechMart-VPCEndpoint-SG**: controls HTTPS connections to VPC Endpoints.

---

#### Step 1: Access Security Groups

In the **AWS Console**, navigate to:

**VPC → Security Groups**

Select:

**Create security group**

---

#### Step 2: Create TechMart-ALB-SG

Enter the following information:

| Property | Value |
|----|----|
| Security group name | `TechMart-ALB-SG` |
| Description | `Security Group for TechMart ALB` |
| VPC | TechMart-VPC |

---

#### Step 3: Configure Inbound Rules for the ALB

Under **Inbound rules**, select:

**Add rule**

Configure:

| Type | Protocol | Port | Source |
|------|-------|-------|-------|
| HTTP | TCP | 80 | 0.0.0.0/0 |
| HTTPS | TCP | 443 | 0.0.0.0/0 |

---

#### Step 4: Configure Outbound Rules for the ALB

Keep the default configuration:

All traffic → 0.0.0.0/0

<p align="center">
  <img src="/images/3-Workshop/3.2/sg_alb.png/" width="1900">
</p>

Then select:

**Create security group**

---

#### Step 5: Create TechMart-EC2-SG

Select:

**Create security group**

Enter:

| Property | Value |
|---|---|
| Security group name | `TechMart-EC2-SG` |
| Description | `Security Group for TechMart EC2` |
| VPC | TechMart-VPC |

---

#### Step 6: Configure Inbound Rules for EC2

Configure:

| Type | Protocol | Port | Source |
|----|----|----|---|
| HTTP | TCP | 80 | TechMart-ALB-SG |

---

#### Step 7: Configure Outbound Rules for EC2

Keep the following configuration:

All traffic → 0.0.0.0/0

Then select:

**Create security group**

---

#### Step 8: Create TechMart-RDS-SG

Select:

**Create security group**

Enter:

| Property | Value |
|---|---|
| Security group name | `TechMart-RDS-SG` |
| Description | `Security Group for TechMart RDS` |
| VPC | TechMart-VPC |

---

#### Step 9: Configure Inbound Rules for RDS

Configure:

| Type | Protocol | Port | Source |
|---|---|---|---|
| MySQL/Aurora | TCP | 3306 | TechMart-EC2-SG |

---

#### Step 10: Configure Outbound Rules for RDS

You can keep the default configuration:

All traffic → 0.0.0.0/0

<p align="center">
  <img src="/images/3-Workshop/3.2/sg_rds.png" width="1900">
</p>

Then select:

**Create security group**

---

#### Step 11: Create TechMart-VPCEndpoint-SG

Select:

**Create security group**

Enter:

| Property | Value |
|---|---|
| Security group name | `TechMart-VPCEndpoint-SG` |
| Description | `Security Group for VPC Endpoints` |
| VPC | TechMart-VPC |

---

#### Step 12: Configure Inbound Rules for the VPC Endpoint

Configure:

| Type | Protocol | Port | Source |
|---|---|---|---|
| HTTPS | TCP | 443 | TechMart-EC2-SG |

---

#### Step 13: Configure Outbound Rules for the VPC Endpoint

You can keep the default configuration:

All traffic → 0.0.0.0/0

Then select:

**Create security group**
