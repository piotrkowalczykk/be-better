package com.kowal.backend.security.service;

import com.kowal.backend.security.dto.request.*;
import com.kowal.backend.security.dto.response.*;

public interface AuthService {
    public RegisterResponse register(RegisterRequest registerRequest);
    public LoginResponse login(LoginRequest loginRequest);
    public ValidateEmailResponse validateEmail(ValidateEmailRequest validateEmailRequest);
    public String generateEmailCode();
    public ResendVerificationCodeResponse resendEmailVerificationCode(String email);
    public ResetPasswordResponse resetPassword(ResetPasswordRequest resetPasswordRequest);
    public SendResetPasswordCodeResponse sendResetPasswordCode(SendResetPasswordCodeRequest sendResetPasswordCodeRequest);
}
