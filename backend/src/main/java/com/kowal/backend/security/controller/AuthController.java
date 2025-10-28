package com.kowal.backend.security.controller;

import com.kowal.backend.security.dto.request.LoginRequest;
import com.kowal.backend.security.dto.request.RegisterRequest;
import com.kowal.backend.security.dto.request.ResendVerificationCodeRequest;
import com.kowal.backend.security.dto.request.ValidateEmailRequest;
import com.kowal.backend.security.dto.response.LoginResponse;
import com.kowal.backend.security.dto.response.RegisterResponse;
import com.kowal.backend.security.dto.response.ResendVerificationCodeResponse;
import com.kowal.backend.security.dto.response.ValidateEmailResponse;
import com.kowal.backend.security.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest){
        RegisterResponse response = authService.register(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/validate-email")
    public ResponseEntity<ValidateEmailResponse> validateEmail(@RequestBody ValidateEmailRequest validateEmailRequest){
        ValidateEmailResponse response = authService.validateEmail(validateEmailRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/resend-email-verification-code")
    public ResponseEntity<ResendVerificationCodeResponse> resendEmailVerificationCode(@RequestBody ResendVerificationCodeRequest resendVerificationCodeRequest){
        ResendVerificationCodeResponse response = authService.resendEmailVerificationCode(resendVerificationCodeRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
