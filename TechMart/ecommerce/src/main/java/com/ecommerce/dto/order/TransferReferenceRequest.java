package com.ecommerce.dto.order;

import jakarta.validation.constraints.Pattern;

public record TransferReferenceRequest(
        @Pattern(regexp = "\\d{4}", message = "Mã giao dịch phải gồm đúng 4 chữ số")
        String last4
) {
}