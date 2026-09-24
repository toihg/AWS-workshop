package com.ecommerce.dto.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public record CreateOrderRequest(
        String id,
        @NotBlank String fullName,
        @NotBlank String phone,
        String email,
        @NotBlank String address,
        String note,
        @NotBlank String paymentMethod,
        @NotNull BigDecimal subtotal,
        @NotNull BigDecimal shippingFee,
        @NotNull BigDecimal total,
        @NotEmpty List<@Valid OrderItemRequest> items
) {
}