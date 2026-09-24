package com.ecommerce.repository;

import com.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByPhone(String phone);

    Optional<User> findByEmailIgnoreCaseOrPhone(String email, String phone);
}