package com.ecommerce.dto.order;

import com.ecommerce.entity.Order;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(String id, Instant createdAt, CustomerResponse customer, String paymentMethod,
                            List<OrderItemRequest> items, BigDecimal subtotal, BigDecimal shippingFee,
                            BigDecimal total, String status, String paymentStatus, String bankTransferLast4) {

    public record CustomerResponse(String fullName, String email, String phone, String address, String note) {}

    public static OrderResponse from(Order order, ObjectMapper mapper) {
        try {
            return new OrderResponse(
                    order.getId(), order.getCreatedAt(),
                    new CustomerResponse(order.getCustomerFullName(), order.getCustomerEmail(), order.getCustomerPhone(), order.getCustomerAddress(), order.getCustomerNote()),
                    order.getPaymentMethod(), mapper.readValue(order.getItemsJson(), mapper.getTypeFactory().constructCollectionType(List.class, OrderItemRequest.class)),
                    order.getSubtotal(), order.getShippingFee(), order.getTotal(), order.getStatus(), order.getPaymentStatus(), order.getBankTransferLast4()
            );
        } catch (JacksonException exception) {
            throw new IllegalStateException("Không thể đọc dữ liệu sản phẩm trong đơn hàng", exception);
        }
    }
}