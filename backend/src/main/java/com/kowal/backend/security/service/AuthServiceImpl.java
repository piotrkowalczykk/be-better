package com.kowal.backend.security.service;

import com.kowal.backend.security.dto.request.*;
import com.kowal.backend.security.dto.response.*;
import com.kowal.backend.security.exception.EmailAlreadyUsedException;
import com.kowal.backend.security.exception.EmailSendingException;
import com.kowal.backend.security.mapper.AuthUserMapper;
import com.kowal.backend.security.model.AuthUser;
import com.kowal.backend.security.model.Role;
import com.kowal.backend.security.repository.AuthUserRepository;
import com.kowal.backend.security.repository.RoleRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class AuthServiceImpl implements AuthService {

    private final int DURATION_IN_MINUTES = 2;

    private AuthenticationManager authenticationManager;
    private AuthUserRepository authUserRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthUserMapper authUserMapper;
    private JWTService jwtService;
    private EmailService emailService;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, AuthUserRepository authUserRepository, EmailService emailService,
                          RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthUserMapper authUserMapper, JWTService jwtService){
        this.authenticationManager = authenticationManager;
        this.authUserRepository = authUserRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authUserMapper =  authUserMapper;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    @Override
    public RegisterResponse register(RegisterRequest registerRequest){
        if(authUserRepository.existsByEmail(registerRequest.getEmail())){
            throw new EmailAlreadyUsedException("Email is already in use");
        }

        Role role = roleRepository.findByName("USER")
                .orElseThrow(() -> new IllegalStateException("Default role USER not found"));
        String emailCode = generateEmailCode();
        String hashedEmailCode = passwordEncoder.encode(emailCode);

        AuthUser user = authUserMapper.mapRegisterRequestToAuthUser(registerRequest, role, passwordEncoder, hashedEmailCode, DURATION_IN_MINUTES);
        authUserRepository.save(user);

        String subject = "Email Verification";
        String content = String.format("Enter this code to verify your email: %s. The code will expire in %s minutes.", emailCode, DURATION_IN_MINUTES);

        try {
            emailService.sendEmail(user.getEmail(), subject, content);
        } catch (MessagingException e){
            throw new EmailSendingException("Error sending verification email");
        }

        return authUserMapper.mapAuthUserToRegisterResponse(user);
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), loginRequest.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtService.generateToken(authentication);
        return new LoginResponse(token);
    }

    @Override
    public ValidateEmailResponse validateEmail(ValidateEmailRequest validateEmailRequest) {
        AuthUser user = authUserRepository.findByEmail(validateEmailRequest.getEmail()).
                orElseThrow(() -> new IllegalArgumentException("User not found"));

        boolean isCodeValid = passwordEncoder.matches(validateEmailRequest.getCode(), user.getEmailVerificationCode());
        boolean isCodeExpired = user.getEmailVerificationCodeExpiryDate().isBefore(LocalDateTime.now());

        if(!isCodeValid)
            return new ValidateEmailResponse("Invalid verification code");

        if(isCodeExpired)
            return new ValidateEmailResponse("Verification code has expired");

        user.setEmailVerificationCode(null);
        user.setEmailVerificationCodeExpiryDate(null);
        user.setEmailVerified(true);
        authUserRepository.save(user);

        return new ValidateEmailResponse("Email successfully verified");
    }

    @Override
    public ResendVerificationCodeResponse resendEmailVerificationCode(ResendVerificationCodeRequest resendVerificationCodeRequest) {
        AuthUser user = authUserRepository.findByEmail(resendVerificationCodeRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if(user.isEmailVerified())
            return new ResendVerificationCodeResponse("Email is already verified");

        String emailCode = generateEmailCode();
        String hashedEmailCode = passwordEncoder.encode(emailCode);

        user.setEmailVerificationCodeExpiryDate(LocalDateTime.now().plusMinutes(DURATION_IN_MINUTES));
        user.setEmailVerificationCode(hashedEmailCode);
        authUserRepository.save(user);

        String subject = "Email Verification";
        String content = String.format("Enter this code to verify your email: %s. The code will expire in %s minutes.", emailCode, DURATION_IN_MINUTES);

        try {
            emailService.sendEmail(user.getEmail(), subject, content);
        } catch (MessagingException e){
            throw new EmailSendingException("Error sending verification email");
        }

        return new ResendVerificationCodeResponse("Verification code sent successfully");
    }

    @Override
    public ResetPasswordResponse resetPassword(ResetPasswordRequest resetPasswordRequest) {
        AuthUser user = authUserRepository.findByEmail(resetPasswordRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        boolean isCodeValid = passwordEncoder.matches(resetPasswordRequest.getCode(), user.getPasswordResetCode());
        boolean isCodeExpired = user.getPasswordResetCodeExpiryDate().isBefore(LocalDateTime.now());

        if(!isCodeValid)
            return new ResetPasswordResponse("Invalid reset password code");

        if(isCodeExpired)
            return new ResetPasswordResponse("Reset password code has expired");

        user.setPasswordResetCode(null);
        user.setPasswordResetCodeExpiryDate(null);
        user.setPassword(passwordEncoder.encode(resetPasswordRequest.getNewPassword()));
        authUserRepository.save(user);

        return new ResetPasswordResponse("Password reset successfully");
    }

    @Override
    public SendResetPasswordCodeResponse sendResetPasswordCode(SendResetPasswordCodeRequest sendResetPasswordCodeRequest) {
        AuthUser user = authUserRepository.findByEmail(sendResetPasswordCodeRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String resetCode = generateEmailCode();
        String hashedResetCode = passwordEncoder.encode(resetCode);

        user.setPasswordResetCodeExpiryDate(LocalDateTime.now().plusMinutes(DURATION_IN_MINUTES));
        user.setPasswordResetCode(hashedResetCode);
        authUserRepository.save(user);

        String subject = "Reset Password";
        String content = String.format("Enter this code to reset your password: %s. The code will expire in %s minutes.", resetCode, DURATION_IN_MINUTES);

        try {
            emailService.sendEmail(user.getEmail(), subject, content);
        } catch (MessagingException e){
            throw new EmailSendingException("Error sending reset password email");
        }

        return new SendResetPasswordCodeResponse("Reset password code sent successfully");
    }

    @Override
    public String generateEmailCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder();
        for(int i = 0; i < 6; i++){
            code.append(random.nextInt(10));
        }
        return code.toString();
    }
}
