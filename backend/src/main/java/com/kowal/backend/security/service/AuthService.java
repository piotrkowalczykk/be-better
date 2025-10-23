package com.kowal.backend.security.service;

import com.kowal.backend.security.dto.request.RegisterRequest;
import com.kowal.backend.security.dto.response.RegisterResponse;

public interface AuthService {
    public RegisterResponse register(RegisterRequest registerRequest);
}
