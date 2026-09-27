---
title : "Configure an IAM Role for the EC2 Server"
date : 2026-01-01
weight : 5
chapter : false
pre : "  3.5  "
---

#### Step 1: Create the IAM Role (TechMart-EC2-Role)

1. Access the **AWS Management Console**.
2. Search for and select the **IAM** service.
3. In the left navigation menu, select **Roles**.
4. Click **Create role**.
5. Under **Select trusted entity**:
	 - **Trusted entity type:** Select **AWS service**.
	 - **Use case:** Select **EC2**.

<p align="center">
  <img src="/images/3-Workshop/3.5/create_role.png" width="1100">
</p>

6. Click **Next**.

---

#### Step 2: Attach AWS Managed Policies

On the **Add permissions** screen, search for and select the following four AWS Managed Policies:

`AmazonSSMManagedInstanceCore`

**Purpose:** Allows the EC2 agent to connect to AWS Systems Manager and enables remote administration through SSM Session Manager without opening SSH port 22.

`AmazonS3ReadOnlyAccess`

**Purpose:** Allows the EC2 server to read and download the database backup file (`ecommerce.sql`) and static files from the Amazon S3 Bucket.

`AmazonEC2ContainerRegistryFullAccess`

**Purpose:** Grants full access to Amazon ECR (Elastic Container Registry).

Click **Next** after selecting all four policies.

---

#### Step 3: Name the Role and Complete Creation

- **Role name:** Enter `TechMart-EC2-Role`.
- **Description:** Enter `IAM Role cho EC2 truy cap SSM, S3 va CloudWatch`.

Verify that all four policies are listed in the **Permissions summary**.

<p align="center">
	<img src="/images/3-Workshop/3.5/1.png" width="1900">
</p>

Click **Create role**.

#### Step 5: Create an inline policy that allows the Backend to write files to S3

1. Access the **AWS Management Console**.
2. Search for and select the **IAM** service.
3. In the left navigation menu, select **Roles**.
4. Select **TechMart-EC2-Role**.
5. Click **Add permissions**.
6. Select **Inline policy**.
7. Under **Policy editor**, select **JSON**.

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "TechMartProductImages",
			"Effect": "Allow",
			"Action": [
				"s3:PutObject",
				"s3:GetObject",
				"s3:DeleteObject"
			],
			"Resource": "arn:aws:s3:::techmart-product-images-1204/*"
		},
		{
			"Sid": "ListTechMartProductImages",
			"Effect": "Allow",
			"Action": "s3:ListBucket",
			"Resource": "arn:aws:s3:::techmart-product-images-1204"
		}
	]
}
```

<p align="center">
  <img src="/images/3-Workshop/3.5/policy.png" width="1100">
</p>

8. Enter `Allow_Write_S3` as the policy name.
9. Click **Create policy**.