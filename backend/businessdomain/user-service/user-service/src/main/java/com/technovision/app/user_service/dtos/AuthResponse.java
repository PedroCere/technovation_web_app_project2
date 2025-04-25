package com.technovision.app.user_service.dtos;

public class AuthResponse {
    public String token;

    public AuthResponse(String token) {
        this.token = token;
    }
}
