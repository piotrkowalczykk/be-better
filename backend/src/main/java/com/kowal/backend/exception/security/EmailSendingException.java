package com.kowal.backend.exception.security;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class EmailSendingException extends RuntimeException{

    private HttpStatus status;

    public EmailSendingException(String message){
        super(message);
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
