package com.kowal.backend.security.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SendResetPasswordCodeResponse {
    private String message;
}
