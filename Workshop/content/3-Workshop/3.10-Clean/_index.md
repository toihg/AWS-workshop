---
title : "System Cleanup"
date : 2026-01-01
weight : 10
chapter : false
pre : " <b> 3.10. </b> "
---

## AWS System Cleanup

After completing the deployment and testing of the TechMart system on AWS, unnecessary resources are cleaned up to prevent unexpected costs and keep the AWS environment organized.

### 1. Terminate EC2 Instances

First, stop and terminate the EC2 instances used to deploy the application. Navigate to **AWS Management Console → EC2 → Instances**, select the instance that is no longer needed, and choose **Terminate instance**.

Terminating an EC2 instance releases the computing resources and stops the instance-related compute charges.

### 2. Clean Up EC2-Related Resources

After terminating the EC2 instance, check the related resources, including:

* Unused Elastic IP addresses.
* EBS volumes that are no longer attached to an instance.
* Unused AMIs and snapshots.
* Unused Security Groups.
* Unnecessary Key Pairs.

In particular, EBS volumes and Elastic IP addresses should be checked carefully because they may continue to generate charges even after an EC2 instance has been terminated.

### 3. Delete Amazon RDS

If the RDS database was created only for the workshop or testing environment, the database instance can be deleted after testing is completed.

Before deletion, any required data should be backed up. If the database will not be used again and no backup is required, the final snapshot option can be disabled to avoid additional storage costs.

Navigate to:

**AWS Management Console → RDS → Databases → Select the database → Actions → Delete**

### 4. Delete Amazon S3 Resources

Check the S3 buckets created during the deployment process. If a bucket is no longer required, delete all objects inside the bucket before deleting the bucket itself.

Navigate to:

**AWS Management Console → S3 → Bucket → Delete objects → Delete bucket**

Buckets containing important product images, application data, or other project files should only be deleted after confirming that the data is no longer required.

### 5. Clean Up VPC and Network Resources

Review the network resources created specifically for the system, including:

* VPC.
* Subnets.
* Internet Gateway.
* NAT Gateway.
* Route Tables.
* VPC Endpoints, if applicable.

If the VPC was created specifically for the workshop and is no longer required, these resources can be removed in the appropriate order.

Particular attention should be paid to the **NAT Gateway**, as it can incur charges even when there is little application traffic.

### 6. Review IAM Resources

Review the IAM Users, IAM Roles, and IAM Policies created for the workshop.

Accounts and permissions that are no longer required should be removed to reduce unnecessary access and simplify AWS resource management.

IAM Roles used by EC2 should only be deleted after the associated EC2 instances and services have been cleaned up.

### 7. Clean Up Amazon ECR

If Amazon ECR is used to store Docker images, review the repositories and images created during deployment.

Unused Docker images and repositories can be deleted to reduce storage usage and unnecessary costs.

### 8. Review CloudWatch Resources

Review the following CloudWatch resources:

* CloudWatch Log Groups.
* Log streams.
* Alarms.
* Dashboards.

For a testing environment, logs, alarms, and dashboards that are no longer required can be removed. Logs needed for the project report or system analysis should be retained before performing the cleanup.

### 9. Review AWS Costs

After completing the cleanup, access:

**AWS Billing and Cost Management → Bills / Cost Explorer**

to verify whether any AWS services are still generating charges.

The following services should be checked:

* Amazon EC2
* Amazon RDS
* Amazon S3
* Amazon ECR
* Amazon VPC
* Amazon CloudWatch

Reviewing the costs helps confirm that unnecessary resources have been successfully removed.

### 10. Result

After the cleanup process, unnecessary AWS resources are removed to minimize unexpected costs. Resources required for storing project results, source code, documentation, or other important project data are retained for future reference.

The cleanup process also helps maintain a clear and organized AWS environment, reduce unnecessary resources, and improve the overall security and manageability of the system.
