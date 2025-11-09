package com.kowal.backend.security.controller;

import com.kowal.backend.security.dto.request.*;
import com.kowal.backend.security.dto.response.*;
import com.kowal.backend.security.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody @Valid RegisterRequest registerRequest){
        RegisterResponse response = authService.register(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest loginRequest){
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/validate-email")
    public ResponseEntity<ValidateEmailResponse> validateEmail(@RequestBody @Valid ValidateEmailRequest validateEmailRequest){
        ValidateEmailResponse response = authService.validateEmail(validateEmailRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/resend-email-verification-code")
    public ResponseEntity<ResendVerificationCodeResponse> resendEmailVerificationCode(@RequestBody @Valid ResendVerificationCodeRequest resendVerificationCodeRequest){
        ResendVerificationCodeResponse response = authService.resendEmailVerificationCode(resendVerificationCodeRequest.getEmail());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ResetPasswordResponse> resetPassword(@RequestBody @Valid ResetPasswordRequest resetPasswordRequest){
        ResetPasswordResponse response = authService.resetPassword(resetPasswordRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/send-reset-password-code")
    public ResponseEntity<SendResetPasswordCodeResponse> resetPassword(@RequestBody @Valid SendResetPasswordCodeRequest sendResetPasswordCodeRequest){
        SendResetPasswordCodeResponse response = authService.sendResetPasswordCode(sendResetPasswordCodeRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
