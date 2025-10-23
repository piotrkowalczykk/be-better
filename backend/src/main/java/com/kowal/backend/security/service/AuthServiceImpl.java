package com.kowal.backend.security.service;

import com.kowal.backend.security.dto.request.RegisterRequest;
import com.kowal.backend.security.dto.response.RegisterResponse;
import com.kowal.backend.security.exception.EmailAlreadyUsedException;
import com.kowal.backend.security.mapper.AuthUserMapper;
import com.kowal.backend.security.model.AuthUser;
import com.kowal.backend.security.model.Role;
import com.kowal.backend.security.repository.AuthUserRepository;
import com.kowal.backend.security.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthServiceImpl implements AuthService {

    private AuthenticationManager authenticationManager;
    private AuthUserRepository authUserRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthUserMapper authUserMapper;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, AuthUserRepository authUserRepository,
                          RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthUserMapper authUserMapper){
        this.authenticationManager = authenticationManager;
        this.authUserRepository = authUserRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authUserMapper =  authUserMapper;
    }

    @Override
    public RegisterResponse register(RegisterRequest registerRequest){
        if(authUserRepository.existsByEmail(registerRequest.getEmail())){
            throw new EmailAlreadyUsedException("Email is already in use");
        }

        Role role = roleRepository.findByName("USER")
                .orElseThrow(() -> new IllegalStateException("Default role USER not found"));

        AuthUser user = authUserMapper.mapRegisterRequestToAuthUser(registerRequest, role, passwordEncoder);
        authUserRepository.save(user);

        return authUserMapper.mapAuthUserToRegisterResponse(user);
    }
}
