package com.ecommerce.dto.product;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record ProductRequest(

        @NotBlank
        String slug,

        @NotBlank
        String name,

        String brand,

        String category,

        @NotNull
        @PositiveOrZero
        BigDecimal price,

        String image,

        String description,

        @NotNull
        @PositiveOrZero
        Integer stock,

        @DecimalMin("0.0")
        @DecimalMax("5.0")
        BigDecimal rating
) {
}