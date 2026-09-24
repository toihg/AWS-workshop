package com.ecommerce.dto.auth;

import com.ecommerce.entity.User;

import java.util.UUID;

public record UserResponse(UUID id, String fullName, String email, String phone) {

    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getFullName(), user.getEmail(), user.getPhone());
    }
}