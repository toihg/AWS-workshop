package com.ecommerce.service;

import com.ecommerce.dto.auth.RegisterRequest;
import com.ecommerce.dto.auth.UserResponse;
import com.ecommerce.entity.User;
import com.ecommerce.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        String phone = request.phone().trim();

        if (userRepository.existsByEmailIgnoreCase(email) || userRepository.existsByPhone(phone)) {
            throw new ResponseStatusException(CONFLICT, "Email hoặc số điện thoại này đã được đăng ký");
        }

        User user = new User(
                request.fullName().trim(),
                email,
                phone,
                passwordEncoder.encode(request.password())
        );

        return UserResponse.from(userRepository.save(user));
    }

    public UserResponse login(String identifier, String password) {
        String normalizedIdentifier = identifier.trim().toLowerCase();
        User user = userRepository.findByEmailIgnoreCaseOrPhone(normalizedIdentifier, identifier.trim())
                .filter(candidate -> passwordEncoder.matches(password, candidate.getPasswordHash()))
                .orElseThrow(() -> new ResponseStatusException(
                        UNAUTHORIZED,
                        "Email/số điện thoại hoặc mật khẩu không đúng"
                ));

        return UserResponse.from(user);
    }
}