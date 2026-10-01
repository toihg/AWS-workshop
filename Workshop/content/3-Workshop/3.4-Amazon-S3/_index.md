---
title : "Configure Amazon S3"
date : 2026-01-01
weight : 4
chapter : false
pre : " <b> 3.4. </b> "
---

### Goal

**Amazon S3** is used to store product images for the TechMart system. Instead of storing images directly in the database or on the EC2 server, the application uploads images to S3 and stores the image URLs in MySQL on Amazon RDS.

---

#### 1. Access Amazon S3

1. Sign in to the **AWS Management Console**.

2. Search for the **S3** service.

3. Select **S3** from the list of services.

4. Click **Create bucket** to create a new bucket.

---

#### 2. Configure the Bucket

In the bucket creation interface, configure the following information:

| Property | Value |
|------------|---------|
| Bucket name | `techmart-product-images-1204` |
| AWS Region | Asia Pacific (Singapore) ap-southeast-1 |
| Object Ownership | ACLs disabled |
| Block Public Access | Keep the default option |
| Bucket Versioning | Disable |
| Default Encryption | Enable |
| Encryption type | SSE-S3 |

<p align="center">
  <img src="/images/3-Workshop/3.4/1.png" width="1900">
</p

Select ***Create bucket***.

#### 3. Create a Folder for Image Storage

After the bucket has been created successfully:

1. Open the `techmart-product-images-1204` bucket.

2. Select **Create folder**.

3. Name the folder:

```text
products
```

<p align="center">
  <img src="/images/3-Workshop/3.4/2.png" width="1900">
</p

4. Select **Create folder**.

#### 4. Upload Product Images to Amazon S3

To upload images to S3:

1. Open the `techmart-product-images-1204` bucket.
2. Open the `products` folder.
3. Select **Upload**.
4. Select **Add files** or **Add folder**.
5. Select the product images from the following folder:

	 `public/images/`

6. Review the list of files to upload.
7. Select **Upload** to start uploading the images to S3.

After the upload is complete, the `products` folder will contain the product images.

<p align="center">
  <img src="/images/3-Workshop/3.4/image.png" width="1100">
</p>

#### Create a Folder for the SQL Script File

1. Open the `techmart-product-images-1204` bucket.

2. Select **Create folder**.

3. Name the folder:

```text
database_script
```

4. Select **Create folder**.

5. Upload the script file to the folder in the same way as uploading product images.
