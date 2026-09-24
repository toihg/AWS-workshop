package com.ecommerce.controller;

import com.ecommerce.dto.auth.AdminLoginRequest;
import com.ecommerce.dto.auth.AdminLoginResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final PasswordEncoder passwordEncoder;
    private final String username;
    private final String passwordHash;

    public AdminController(
            PasswordEncoder passwordEncoder,
            @Value("${app.admin.username:ADMIN}") String username,
            @Value("${app.admin.password:toihoang}") String password
    ) {
        this.passwordEncoder = passwordEncoder;
        this.username = username;
        this.passwordHash = passwordEncoder.encode(password);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public AdminLoginResponse login(@Valid @RequestBody AdminLoginRequest request) {
        if (!username.equals(request.username()) || !passwordEncoder.matches(request.password(), passwordHash)) {
            throw new ResponseStatusException(UNAUTHORIZED, "Tài khoản hoặc mật khẩu admin không đúng");
        }
        return new AdminLoginResponse(username, "ADMIN");
    }
}