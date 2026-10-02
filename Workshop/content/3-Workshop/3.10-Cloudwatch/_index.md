---
title: "Monitoring systems with Amazon CloudWatch"

date: 2026-01-01

weight: 10

chapter: false

pre: " <b> 3.10. </b> "

---

Amazon CloudWatch is used to monitor the TechMart system running on Amazon EC2. In this workshop, CloudWatch is configured to track EC2 metrics, create a monitoring dashboard, and set up an alarm combined with Amazon SNS to send email notifications.

The EC2 instance used for the TechMart system is:

| Property | Value |
| -------- | ----- |
| Instance Name | `TechMart-App-Server` |
| Instance ID | `i-064490182f202c711` |
| AWS Region | `ap-southeast-1` |

---

## 1. Monitoring EC2 Metrics

CloudWatch automatically collects many metrics from Amazon EC2. In this workshop, the following metrics are selected for monitoring:

| Metric | Description |
| ------ | ----------- |
| `CPUUtilization` | CPU utilization rate of the EC2 instance |
| `NetworkIn` | Amount of data received by the EC2 instance |
| `NetworkOut` | Amount of data sent from the EC2 instance |
| `StatusCheckFailed` | Indicates whether the EC2 instance has failed any status checks |

### Step 1: Open CloudWatch

1. Sign in to the AWS Management Console.

2. Open the CloudWatch service.

3. In the navigation bar, select Classic metrics.

<p align="center">
  <img src="/images/3-Workshop/3.10/1.png" width="1400">
</p>

### Step 2: Monitor CPU

In the Browse section, find the `CPUUtilization` metric for the TechMart EC2 server `TechMart-App-Server`.

The chart shows the CPU usage of the EC2 instance over time.

This metric helps evaluate the processing resource usage of the server while the TechMart application is running.

If CPU utilization remains high for a long period, you should check the processes or Docker containers running on the EC2 instance.

### Step 3: Monitor Network Traffic

Select these two metrics:

`
NetworkIn`
`
NetworkOut`

Where:

* **NetworkIn**: the amount of data received by the EC2 instance.
* **NetworkOut**: the amount of data sent from the EC2 instance.

These metrics help monitor the system's network activity while users access the TechMart application.

### Step 4: Monitor EC2 Status

Select the metric:

`
StatusCheckFailed`

This metric is used to monitor the status check results of the EC2 instance.

Under normal operation, the EC2 instance should not continuously show status check failures. If a failure occurs, check the EC2 instance and related resources.

<p align="center">
  <img src="/images/3-Workshop/3.10/2.png" width="1400">
</p>

---

## 2. Create a CloudWatch Dashboard

A CloudWatch dashboard is used to display important metrics on a single interface. This makes it easier to monitor the EC2 instance of the TechMart system.

### Step 1: Create a Dashboard

1. Open CloudWatch.

2. Select Dashboards in the navigation bar.

3. Select Create dashboard.

4. Set the dashboard name:

   `
   TechMart-EC2-Monitoring
   `

<p align="center">
  <img src="/images/3-Workshop/3.10/3.png" width="1400">
</p>

5. Select Create dashboard.

### Step 2: Add CPU Utilization

1. Select Add widget.

2. Select CloudWatch.

3. Select Metrics.

4. Select Metrics Console.

5. Select the Line chart type.

6. Select Next.

<p align="center">
  <img src="/images/3-Workshop/3.10/4.png" width="1400">
</p>

7. Select EC2.

8. Select the metric for `TechMart-App-Server`:

   `
   CPUUtilization
   `

   <p align="center">
   <img src="/images/3-Workshop/3.10/5.png" width="1400">
   </p>

9. Select Create widget.

The widget will display the CPU usage of the EC2 instance over time.

### Step 3: Add Network Metrics

Add two widgets for:

`NetworkIn`, `NetworkOut`

For each metric:

Follow the same steps used to add the CPUUtilization metric.

### Step 4: Add Status Check

Add one widget for the metric:

`
StatusCheckFailed
`

This widget helps monitor the health status of the EC2 instance directly on the dashboard.

The completed dashboard includes:

```text
TechMart-EC2-Monitoring
│
├── CPUUtilization
├── NetworkIn
├── NetworkOut
└── StatusCheckFailed
```

### Step 5: Save the Dashboard

After adding all widgets, select Save.

The dashboard can be used as a centralized monitoring interface for the EC2 instance of the TechMart system.

<p align="center">
    <img src="/images/3-Workshop/3.10/6.png" width="1400">
</p>

---

## 3. Create a CloudWatch Alarm and SNS Notification

CloudWatch alarms are used to automatically detect when a metric exceeds the configured threshold.

In this workshop, the alarm is created for the metric:

```text
CPUUtilization
```

with the threshold:

```text
CPUUtilization > 80%
```

When the condition is met, CloudWatch changes the alarm state to `ALARM` and sends a notification through Amazon SNS.

### Step 1: Create an Alarm

1. Open CloudWatch.

2. Select Alarms.

3. Select Create alarm.

4. Select Select metric.

5. Select EC2.

6. Select Per-Instance Metrics.

7. Select the `CPUUtilization` metric for `TechMart-App-Server`.

8. Select Select metric.

### Step 2: Configure the Metric

Set the following parameters:

| Setting | Value |
| ------- | ----- |
| Statistic | `Average` |
| Period | `5 minutes` |
| Threshold type | `Static` |
| Condition | `Greater (>)` |
| Threshold | `80` |

The alarm condition is:

```text
CPUUtilization > 80%
```

in one data point over a 5-minute period.

<p align="center">
    <img src="/images/3-Workshop/3.10/7.png" width="1400">
</p>

Select Next.

### Step 3: Configure SNS Notification

At the Configure actions step:

1. Set the alarm state to:

   ```text
   In alarm
   ```

2. In the section Send a notification to the following SNS topic, choose:

   ```text
   Create new topic
   ```

3. Set the SNS topic name:

   ```text
   TechMart-CPU-Alert
   ```

4. Enter the email address to receive notifications.

5. Create the SNS topic.

AWS will send a subscription confirmation email to the address you entered.

<p align="center">
    <img src="/images/3-Workshop/3.10/8.png" width="1400">
</p>

Open the email and select Confirm subscription to verify it.

Select Next.

### Step 4: Configure Alarm Details

Set the alarm name:

```text
TechMart-EC2-High-CPU
```

You can also add a description:

```text
Alarm when TechMart-App-Server CPU utilization exceeds 80%.
```

Select Next.

### Step 5: Review and Create the Alarm

Review the configuration:

| Component | Value |
| --------- | ----- |
| Metric | `CPUUtilization` |
| Instance | `TechMart-App-Server` |
| Statistic | `Average` |
| Period | `5 minutes` |
| Condition | `CPUUtilization > 80%` |
| Action | SNS notification |
| Alarm name | `TechMart-EC2-High-CPU` |

After checking everything, select Create alarm.

### Step 6: Check Alarm Status

After creating the alarm, go to:

CloudWatch → Alarms → All alarms

The alarm can have one of three states:

| State | Meaning |
| ----- | ------- |
| `OK` | CPU is within the configured limit |
| `ALARM` | CPU has exceeded the configured threshold |
| `INSUFFICIENT_DATA` | CloudWatch does not have enough data to determine the status |

<p align="center">
    <img src="/images/3-Workshop/3.10/9.png" width="1400">
</p>

Under normal conditions, the alarm will be in the following state:

```text
OK
```

If CPU utilization exceeds 80% during the configured period, the alarm will change to:

```text
ALARM
```

and Amazon SNS will send a notification to the registered email address.

---

## Result

After completing the configuration, the TechMart system has a basic monitoring and alerting mechanism:

```text
EC2 Instance
TechMart-App-Server
        │
        ├── CPUUtilization
        ├── NetworkIn
        ├── NetworkOut
        └── StatusCheckFailed
                │
                ▼
       CloudWatch Dashboard
                │
                ▼
       CloudWatch Alarm
                │
        CPU > 80% condition
                │
                ▼
              SNS
                │
                ▼
        Email Notification
```

This configuration allows centralized monitoring of the EC2 instance while automatically sending notifications when CPU usage exceeds the configured threshold.
