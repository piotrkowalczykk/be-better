package com.kowal.backend.security.dto.request;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String email;
    private String newPassword;
    private String code;
}
