package com.kowal.backend.security.dto.request;

import lombok.Data;

@Data
public class ValidateEmailRequest {
    private String email;
    private String code;
}
