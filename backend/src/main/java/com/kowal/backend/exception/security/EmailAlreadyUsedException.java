package com.kowal.backend.exception.security;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class EmailAlreadyUsedException extends RuntimeException {

    private final HttpStatus status;

    public EmailAlreadyUsedException(String message){
        super(message);
        this.status = HttpStatus.CONFLICT;
    }
}
