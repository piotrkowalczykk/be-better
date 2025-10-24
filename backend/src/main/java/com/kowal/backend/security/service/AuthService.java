package com.kowal.backend.security.service;

import com.kowal.backend.security.dto.request.LoginRequest;
import com.kowal.backend.security.dto.request.RegisterRequest;
import com.kowal.backend.security.dto.response.LoginResponse;
import com.kowal.backend.security.dto.response.RegisterResponse;

public interface AuthService {
    public RegisterResponse register(RegisterRequest registerRequest);
    public LoginResponse login(LoginRequest loginRequest);
}
