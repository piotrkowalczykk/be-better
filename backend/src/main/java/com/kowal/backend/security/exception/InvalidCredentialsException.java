package com.kowal.backend.security.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class InvalidCredentialsException extends RuntimeException {

    private HttpStatus status;

    public InvalidCredentialsException(String message) {
        super(message);
        this.status = HttpStatus.UNAUTHORIZED;
    }
}
