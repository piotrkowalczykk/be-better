package com.kowal.backend.exception.security;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class EmailNotVerifiedException extends RuntimeException {

    private HttpStatus status;

    public EmailNotVerifiedException(String message) {
        super(message);
        this.status = HttpStatus.FORBIDDEN;
    }
}
