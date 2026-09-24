package com.ecommerce.dto.product;

import java.math.BigDecimal;
import java.util.UUID;

public record ProductResponse(
        UUID id,
        String slug,
        String name,
        String brand,
        String category,
        BigDecimal price,
        String image,
        String description,
        Integer stock,
        BigDecimal rating
) {
}