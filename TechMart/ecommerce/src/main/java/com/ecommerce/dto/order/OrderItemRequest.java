package com.ecommerce.dto.order;

import java.math.BigDecimal;

public record OrderItemRequest(String productId, String name, BigDecimal price, String image, int quantity, BigDecimal subtotal) {
}