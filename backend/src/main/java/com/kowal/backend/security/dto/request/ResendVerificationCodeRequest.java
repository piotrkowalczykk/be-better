package com.kowal.backend.security.dto.request;

import lombok.Data;

@Data
public class ResendVerificationCodeRequest {
    private String email;
}
