package com.kowal.backend.security.service;

import com.kowal.backend.security.dto.request.*;
import com.kowal.backend.security.dto.response.*;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    public RegisterResponse register(RegisterRequest registerRequest);
    public LoginResponse login(LoginRequest loginRequest);
    public ResponseEntity<ValidateEmailResponse> validateEmail(ValidateEmailRequest validateEmailRequest);
    public String generateEmailCode();
    public ResendVerificationCodeResponse resendEmailVerificationCode(String email);
    public ResponseEntity<ResetPasswordResponse> resetPassword(ResetPasswordRequest resetPasswordRequest);
    public SendResetPasswordCodeResponse sendResetPasswordCode(SendResetPasswordCodeRequest sendResetPasswordCodeRequest);
}
