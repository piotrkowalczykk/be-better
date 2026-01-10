package com.kowal.backend.exception.security;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class RoleNotFoundException extends RuntimeException {

    private HttpStatus status;

    public RoleNotFoundException(String message) {
        super(message);
        this.status = HttpStatus.NOT_FOUND;
    }
}
