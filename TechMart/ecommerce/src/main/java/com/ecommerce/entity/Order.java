package com.ecommerce.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    private String id;

    @Column(nullable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private String customerFullName;

    @Column(nullable = false)
    private String customerPhone;

    private String customerEmail;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String customerAddress;

    @Column(columnDefinition = "TEXT")
    private String customerNote;

    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = false)
    private BigDecimal subtotal;

    @Column(nullable = false)
    private BigDecimal shippingFee;

    @Column(nullable = false)
    private BigDecimal total;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String paymentStatus;

    private String bankTransferLast4;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String itemsJson;

    protected Order() {
    }

    public Order(String id, Instant createdAt, String customerFullName, String customerPhone, String customerEmail,
                 String customerAddress, String customerNote, String paymentMethod, BigDecimal subtotal,
                 BigDecimal shippingFee, BigDecimal total, String status, String paymentStatus,
                 String bankTransferLast4, String itemsJson) {
        this.id = id;
        this.createdAt = createdAt;
        this.customerFullName = customerFullName;
        this.customerPhone = customerPhone;
        this.customerEmail = customerEmail;
        this.customerAddress = customerAddress;
        this.customerNote = customerNote;
        this.paymentMethod = paymentMethod;
        this.subtotal = subtotal;
        this.shippingFee = shippingFee;
        this.total = total;
        this.status = status;
        this.paymentStatus = paymentStatus;
        this.bankTransferLast4 = bankTransferLast4;
        this.itemsJson = itemsJson;
    }

    public String getId() { return id; }
    public Instant getCreatedAt() { return createdAt; }
    public String getCustomerFullName() { return customerFullName; }
    public String getCustomerPhone() { return customerPhone; }
    public String getCustomerEmail() { return customerEmail; }
    public String getCustomerAddress() { return customerAddress; }
    public String getCustomerNote() { return customerNote; }
    public String getPaymentMethod() { return paymentMethod; }
    public BigDecimal getSubtotal() { return subtotal; }
    public BigDecimal getShippingFee() { return shippingFee; }
    public BigDecimal getTotal() { return total; }
    public String getStatus() { return status; }
    public String getPaymentStatus() { return paymentStatus; }
    public String getBankTransferLast4() { return bankTransferLast4; }
    public String getItemsJson() { return itemsJson; }

    public void setBankTransferLast4(String bankTransferLast4) { this.bankTransferLast4 = bankTransferLast4; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    public void setStatus(String status) { this.status = status; }
}