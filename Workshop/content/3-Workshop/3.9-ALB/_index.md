---

title: "Configure Application Load Balancer"

date: 2026-01-01

weight: 9

chapter: false

pre: " <b> 3.9. </b> "

---

After successfully deploying the TechMart system on Amazon EC2, the **Application Load Balancer (ALB)** is configured as the access point from the Internet to the application. The ALB receives HTTP requests from users and forwards the requests to EC2 through the Target Group.

Architecture after configuring the ALB:

```text
                         Internet
                             │
                             ▼
                  ┌────────────────────┐
                  │ Application Load   │
                  │     Balancer       │
                  │       :80          │
                  └─────────┬──────────┘
                            │
                            │ HTTP :80
                            ▼
                  ┌────────────────────┐
                  │       EC2          │
                  │                    │
                  │      Nginx :80     │
                  │         │          │
                  │    ┌────┴────┐     │
                  │    ▼         ▼     │
                  │ Frontend  Backend  │
                  │  :3000      :8080  │
                  └─────────┬──────────┘
                            │
                    ┌───────┴───────┐
                    ▼               ▼
                RDS MySQL          S3
```

### 1. Create a Target Group

The Target Group is used to identify the EC2 instances that receive requests from the Application Load Balancer.

Go to:

**AWS Management Console → EC2 → Target Groups → Create target group**

Configuration:
* Target type: Instances
* Target group name: `techmart-target-group`
* Protocol: HTTP
* Port: 80
* IP address type: IPv4
* VPC: VPC của hệ thống TechMart

<p align="center">
  <img src="/images/3-Workshop/3.8/1.png" width="1400">
</p>

Click **Next**

In the Target registration section, select **TechMart-App-Server**

<p align="center">
  <img src="/images/3-Workshop/3.8/2.png" width="1400">
</p>

Click **Next** rồi bấm **Create target group**

After registration, check the Target status.

A normally functioning Target will have the status:

```text
healthy
```

### 2. Create an Application Load Balancer

Go to:

**EC2 → Load Balancers → Create Load Balancer**

Under Load balancer type, select:

**Application Load Balancer**

Configuration:

|Load balancer name| `techmart-alb`|
|---|----|
|Scheme| Internet-facing|
|IP address type| IPv4|

<p align="center">
  <img src="/images/3-Workshop/3.8/3.png" width="1500">
</p>

### 3. Configure Network Mapping

Select:

* The VPC of the TechMart system.
* Availability Zones with suitable Subnets for the ALB to operate.

The ALB is placed in **Public Subnets** so that it can receive requests from the Internet.

### 5. Attach a Security Group to the ALB

In the Security Groups section, select **TechMart-ALB-SG**.

<p align="center">
  <img src="/images/3-Workshop/3.8/4.png" width="1000">
</p>

Click **Create load balancer**

### 10. Test the Application Load Balancer

After the Target has the **healthy** status, get the ALB DNS name at:

**EC2 → Load Balancers → techmart-alb**

`techmart-alb-277409451.ap-southeast-1.elb.amazonaws.com`
Open this address in a browser:

If the configuration is successful, the TechMart website is served through the Application Load Balancer.

<p align="center">
  <img src="/images/3-Workshop/3.8/5.png" width="1000">
</p>