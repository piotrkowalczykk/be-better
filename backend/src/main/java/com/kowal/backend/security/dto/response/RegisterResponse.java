package com.kowal.backend.security.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterResponse {
    private String email;
    private String role;
    private String username;
}
