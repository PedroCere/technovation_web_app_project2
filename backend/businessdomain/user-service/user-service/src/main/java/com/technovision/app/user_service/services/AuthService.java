package com.technovision.app.user_service.services;

import com.technovision.app.user_service.dtos.AuthResponse;
import com.technovision.app.user_service.dtos.LoginRequest;
import com.technovision.app.user_service.dtos.RegisterRequest;
import com.technovision.app.user_service.model.User;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.technovision.app.user_service.respository.UserRepository;
import com.technovision.app.user_service.security.JwtTokenUtil;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthService(UserRepository repo, PasswordEncoder encoder, AuthenticationManager authManager, JwtTokenUtil jwtUtil) {
        this.userRepository = repo;
        this.passwordEncoder = encoder;
        this.authManager = authManager;
        this.jwtTokenUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.username);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));
        userRepository.save(user);
        String token = jwtTokenUtil.generateToken(user.getEmail());
        return new AuthResponse(token);
    }

    public AuthResponse login(LoginRequest request) {
        System.out.println("🔥 Trying login with: " + request.email);

        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email, request.password)
        );

        User user = userRepository.findByEmail(request.email)
                .orElseThrow(() -> new RuntimeException("❌ User not found"));

        String token = jwtTokenUtil.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}