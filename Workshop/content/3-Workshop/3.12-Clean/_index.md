---
title: "Clean Up AWS Resources"
date: 2026-01-01
weight: 12
chapter: false
pre: " <b> 3.12. </b> "
---

After completing the deployment and testing of the TechMart system, the next step is to clean up AWS resources that are no longer needed. This is done to free up resources and reduce costs after the workshop ends.

## 1. Stop and Delete the EC2 Instance

The EC2 server is used to deploy the TechMart application. After the workshop, if the system no longer needs to be maintained, the EC2 instance can be terminated.

### Procedure

1. Go to the **AWS Management Console**.

2. Open the **EC2** service.

3. Select **Instances**.

4. Find the instance used by the system:

   ```text
   TechMart-App-Server
   ```

5. Check the Instance ID to make sure the correct host is selected.

6. Select **Instance state → Terminate instance**.

7. Confirm the action by selecting **Terminate**.

<p align="center">
    <img src="/images/3-Workshop/3.12/1.png" width="1400">
</p>

---

## 2. Delete the Application Load Balancer

The Application Load Balancer is used to distribute requests from users to the EC2 instance.

### Procedure

1. Open the **EC2** service.
2. Select **Load Balancers**.
3. Find the TechMart Load Balancer.
4. Select the Load Balancer.
5. Select **Actions → Delete load balancer**.
6. Confirm the deletion.

After deleting the Load Balancer, the system will no longer receive requests through the ALB address.

---

## 3. Delete the Target Group

The Target Group is used to connect the Application Load Balancer to the EC2 instance.

### Procedure

1. In the **EC2** service, select **Target Groups**.
2. Find the TechMart Target Group.
3. Select the Target Group.
4. Select **Actions → Delete**.
5. Enter `confirm` to confirm.
6. Select **Delete**.

<p align="center">
    <img src="/images/3-Workshop/3.12/2.png" width="1400">
</p>

The Target Group can be deleted after the Application Load Balancer is no longer in use.

---

## 4. Delete the NAT Gateway

The NAT Gateway allows resources in the Private Subnet to access the Internet when necessary. This resource should be checked carefully during cleanup because it may continue to incur charges while it remains active.

### Procedure

1. Open the **VPC** service.
2. Select **NAT Gateways**.
3. Find the NAT Gateway created for TechMart.
4. Select the NAT Gateway.
5. Select **Action**.
6. Choose **Delete NAT gateway**.
7. Enter `delete` to confirm.

<p align="center">
    <img src="/images/3-Workshop/3.12/3.png" width="1400">
</p>

8. Select **Delete**.

After deleting the NAT Gateway, check the Route Tables to ensure there are no routes pointing to the deleted NAT Gateway.

---

## 5. Release the Elastic IP

Elastic IP is used together with the NAT Gateway during system deployment.

### Procedure

1. Open the **EC2** service.
2. Select **Elastic IPs**.
3. Find the Elastic IP used for TechMart.
4. Select the Elastic IP.
5. Select **Actions → Release Elastic IP addresses**.
6. Select **Release** to confirm.

---

## 6. Delete Amazon RDS

Amazon RDS MySQL is used to store TechMart system data. If the database is no longer needed after the workshop, the RDS instance can be deleted.

### Procedure

1. Open the **Amazon RDS** service.
2. Select **Databases**.
3. Find the TechMart database instance.
4. Select the database instance.
5. Select **Actions → Delete**.
6. Enter `delete me` to confirm.
7. Check whether to create a backup before deletion.
8. Select **Delete**.

<p align="center">
    <img src="/images/3-Workshop/3.12/4.png" width="1400">
</p>

---

## 7. Delete the CloudWatch Alarm

During monitoring, CloudWatch Alarm is used to track important metrics such as CPU Utilization.

After the workshop, any alarms that are no longer needed can be deleted.

### Procedure

1. Open the **CloudWatch** service.
2. Select **Alarms**.
3. Find the TechMart alarm.
4. Select the alarm to delete.
5. Select **Action**.
6. Select **Delete**.
7. Confirm the action.

<p align="center">
    <img src="/images/3-Workshop/3.12/5.png" width="1400">
</p>

Deleting the alarm does not affect the EC2 instance or other application resources.

---

## 8. Delete the CloudWatch Dashboard

If a dashboard was created to monitor EC2 metrics, it can be deleted after the monitoring process is complete.

### Procedure

1. Open **CloudWatch**.
2. Select **Dashboards**.
3. Select the TechMart dashboard.
4. Select **Delete**.
5. Confirm the action.

<p align="center">
    <img src="/images/3-Workshop/3.12/6.png" width="1400">
</p>

---

## 9. Check Amazon S3

The Amazon S3 bucket is used to store TechMart product images.

If the bucket is no longer needed after the workshop, the data and the bucket can be deleted.

### Procedure

1. Open the **Amazon S3** service.
2. Select the TechMart bucket.
3. Select **Empty**.
4. Enter `permanently delete` to confirm.
5. Select **Empty**.

<p align="center">
    <img src="/images/3-Workshop/3.12/7.png" width="1400">
</p>

6. Return to the S3 console and select the TechMart bucket again.
7. Select **Delete**.
8. Enter the bucket name to confirm deletion.
9. Select **Delete bucket**.

---

## 10. Check Network Resources

After deleting the main resources, review the VPC and network components created for the TechMart system.

The resources to check include:

* VPC
* Public Subnet
* Private Subnet
* Internet Gateway
* NAT Gateway
* Route Table
* Security Groups
* VPC Endpoints

If the VPC is only used for the workshop and there are no remaining dependent resources, it can be deleted.

### Procedure

1. Open the **VPC** service.

2. Select **Your VPCs**.

3. Find the VPC:

   ```text
   TechMart-VPC
   ```

4. Check the resources currently using the VPC.

5. Delete dependent resources that are no longer needed.

6. Delete the Internet Gateway if it is no longer needed.

7. Delete unused Subnets and Route Tables.

8. Delete the VPC after all dependent resources have been removed.

---

## 11. Check Resources After Cleanup

After completing the cleanup process, review the AWS services again to ensure that unused resources have been removed.

| Service | Resources to check |
| ------- | ------------------ |
| EC2 | Instance, ALB, Target Group, Elastic IP |
| RDS | Database Instance |
| VPC | NAT Gateway, VPC, Subnet, Internet Gateway, VPC Endpoint |
| S3 | Bucket and data |
| CloudWatch | Alarm, Dashboard |
