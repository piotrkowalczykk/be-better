package com.kowal.backend.security.dto.request;

import lombok.Data;

@Data
public class SendResetPasswordCodeRequest {
    private String email;
}
