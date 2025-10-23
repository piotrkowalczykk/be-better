package com.kowal.backend.security.mapper;

import com.kowal.backend.security.dto.request.RegisterRequest;
import com.kowal.backend.security.dto.response.RegisterResponse;
import com.kowal.backend.security.model.AuthUser;
import com.kowal.backend.security.model.Role;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthUserMapper {

    public AuthUser mapRegisterRequestToAuthUser(RegisterRequest registerRequest, Role role, PasswordEncoder passwordEncoder){
           AuthUser user = new AuthUser();
           user.setEmail(registerRequest.getEmail());
           user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
           user.setRoles(Collections.singletonList(role));
           user.setUsername(registerRequest.getUsername());
           return user;
    }

    public RegisterResponse mapAuthUserToRegisterResponse(AuthUser user){
        return new RegisterResponse(
                user.getEmail(),
                user.getRoles().get(0).getName(),
                user.getUsername()
        );
    }

}
