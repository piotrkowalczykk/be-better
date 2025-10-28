package com.kowal.backend.security.service;

import com.kowal.backend.security.dto.request.LoginRequest;
import com.kowal.backend.security.dto.request.RegisterRequest;
import com.kowal.backend.security.dto.request.ResendVerificationCodeRequest;
import com.kowal.backend.security.dto.request.ValidateEmailRequest;
import com.kowal.backend.security.dto.response.LoginResponse;
import com.kowal.backend.security.dto.response.RegisterResponse;
import com.kowal.backend.security.dto.response.ResendVerificationCodeResponse;
import com.kowal.backend.security.dto.response.ValidateEmailResponse;

public interface AuthService {
    public RegisterResponse register(RegisterRequest registerRequest);
    public LoginResponse login(LoginRequest loginRequest);
    public ValidateEmailResponse validateEmail(ValidateEmailRequest validateEmailRequest);
    public String generateEmailCode();
    public ResendVerificationCodeResponse resendEmailVerificationCode(ResendVerificationCodeRequest resendVerificationCodeRequest);
}
