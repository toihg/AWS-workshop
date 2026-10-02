---
title: "System Testing"
date: 2026-01-01
weight: 11
chapter: false
pre: " <b> 3.11. </b> "
---

After completing the deployment of the TechMart system on AWS, the main functions of the application are tested to confirm that the system is accessible and that both user-facing and admin-facing features work correctly according to the requirements.

## 1. Website Access Testing

### Objective

Check the ability to access the TechMart system through the website address after deployment on AWS.

### Procedure

1. Open a web browser.
2. Enter the TechMart website address: `http://techmart-alb-277409451.ap-southeast-1.elb.amazonaws.com/`.
3. Wait for the page to finish loading.
4. Check the homepage interface and main website components.

### Expected Result

* The website can be accessed successfully.
* The homepage is fully displayed.
* Interface components are not broken.
* Users can interact with website functions.

### Actual Result

The TechMart website is successfully accessible, and the homepage is displayed normally.

<p align="center">
    <img src="/images/3-Workshop/3.11/3.png" width="1400">
</p>

---

## 2. Account Registration Testing

### Objective

Check the function for creating a new user account and saving user information in the system.

### Procedure

1. Access the TechMart website.
2. Select the **Register** function.
3. Enter the required information, including:

   * Full name
   * Email
   * Phone number
   * Password
4. Select **Register**.

<p align="center">
    <img src="/images/3-Workshop/3.11/1.png" width="1400">
</p>

### Expected Result

* The system accepts the registration information.
* Valid information is saved in the database.
* The account is created successfully.
* The system redirects the user to the homepage after successful registration.

### Actual Result

Users can enter registration information and create an account successfully. After registration, the system redirects them to the homepage.

<p align="center">
    <img src="/images/3-Workshop/3.11/2.png" width="1400">
</p>

---

## 3. Login Testing

### Objective

Check user authentication using a registered account.

### Procedure

1. Access the TechMart website.
2. Select the **Login** function.
3. Enter the email or phone number and password of the registered account.
4. Select **Login**.

<p align="center">
    <img src="/images/3-Workshop/3.11/4.png" width="1400">
</p>

### Expected Result

* The system accepts the login information.
* The account information is validated correctly.
* Users can log in successfully when the information is valid.
* The system redirects the user to the homepage after login.

### Actual Result

The registered account can use either the email or phone number and password to log in successfully.

<p align="center">
    <img src="/images/3-Workshop/3.11/2.png" width="1400">
</p>

---

## 4. Order Placement Testing

### Objective

Check the ability to create an order from products added to the cart.

### Procedure

1. Add a product to the cart.
2. Open the shopping cart icon.
3. Check the product, quantity, and total order value.
4. Click continue to checkout.
5. Enter delivery information:

    * Recipient full name
    * Phone number
    * Email
    * Delivery address
6. Select a payment method.
    * For bank transfer, enter the last 4 digits of the transaction code and confirm the transfer.
7. Review the order information.
8. Confirm the order.

### Expected Result

* The system displays the products in the order correctly.
* Product quantity and price are calculated accurately.
* Delivery information is fully received.
* The order is created successfully.
* The system displays a confirmation message.
* Order information is saved in the system.

### Actual Result

Users can complete the order process. The system creates the order successfully and saves the order information in the database.

<p align="center">
    <img src="/images/3-Workshop/3.11/5.png" width="1400">
</p>

---

# 5. Admin Function Testing

## 5.1. Product Addition Testing

### Objective

Check the admin's ability to add a new product to the system.

### Procedure

1. Log in with an Admin account.
2. Go to the product management page.
3. Open the **Manage Products** section.
4. Enter product information:

   * Product name
   * Brand
   * Category
   * Product price
   * Inventory
   * Description
   * Rating
   * Product image
   * Description
5. Select **Add Product**.

<p align="center">
    <img src="/images/3-Workshop/3.11/6.png" width="1400">
</p>

6. Check the product list.

### Expected Result

* The system accepts the product information.
* The new product is created successfully.
* Product information is stored in the database.
* The product appears in the management list.
* The product can be displayed on the website.

### Actual Result

The admin can enter product information and add a new product successfully. The product is saved to the system and appears in the management list.

<p align="center">
    <img src="/images/3-Workshop/3.11/7.png" width="1400">
</p>

<p align="center">
    <img src="/images/3-Workshop/3.11/8.png" width="1400">
</p>

---

## 5.2. Product Deletion Testing

### Objective

Check the admin's ability to delete a product from the system.

### Procedure

1. Log in with an Admin account.
2. Go to the product management page.
3. Open the **Manage Products** section.
4. Enter the product to be deleted in the search box.

<p align="center">
    <img src="/images/3-Workshop/3.11/9.png" width="1400">
</p>

5. Select **Delete**.

### Expected Result

* The system requests confirmation before deletion.
* The product is deleted successfully after administrator confirmation.
* The product no longer appears in the management list.
* The product no longer appears in search results.

### Actual Result

The admin can select a product and perform the delete action. After confirmation, the product is removed from the system.

<p align="center">
    <img src="/images/3-Workshop/3.11/10.png" width="1400">
</p>

<p align="center">
    <img src="/images/3-Workshop/3.11/12.png" width="1400">
</p>

---

## 5.3. Bank Transfer Order Confirmation Testing

### Objective

Check the admin's ability to review and confirm orders paid by bank transfer.

### Procedure

1. Log in with an Admin account.
2. Go to the order management page.
3. Find an order just placed by a customer using bank transfer.
4. Check the transaction information in the banking app and compare it with the customer's information.
5. After confirming the payment is valid, select **Confirmed - Verify**.

<p align="center">
    <img src="/images/3-Workshop/3.11/13.png" width="1400">
</p>

6. Check the order status after confirmation.

### Expected Result

* The admin can view complete order information.
* The admin can check the bank transfer payment status.
* Payment is confirmed successfully.
* The payment status is updated in the system.
* The order status is updated accordingly.
* Order information is saved accurately in the database.

### Actual Result

The admin can review order information and confirm the bank transfer payment. After confirmation, the payment status and order status are updated successfully.

<p align="center">
    <img src="/images/3-Workshop/3.11/14.png" width="1400">
</p>

---

## 8. Summary of Test Results

| No. | Function | Expected Result | Result |
| ---: | -------- | -------------- | ------ |
| 1 | Access website | Website displays correctly and is interactive | Pass |
| 2 | Register account | New account is created successfully | Pass |
| 3 | Login | Authentication and login succeed | Pass |
| 4 | Search products | Relevant products are displayed by keyword | Pass |
| 5 | Add product to cart | Product is added and cart information updates correctly | Pass |
| 6 | Place order | The order is created and saved successfully | Pass |
| 7 | Admin add product | New product is created and displayed in the system | Pass |
| 8 | Admin delete product | Product is removed from the system | Pass |
| 9 | Admin confirm bank transfer order | Payment and order status are updated successfully | Pass |

## Conclusion

Through the testing process, the main functions of the TechMart system for both users and administrators work correctly according to the requirements.

For users, the system supports **website access, account registration, login, product search, adding products to the cart, and placing orders**.

For administrators, the system supports **adding products, deleting products, and confirming bank transfer orders**.

The test results show that the system can receive and process the main operations of users and administrators after deployment on AWS.
