package com.kowal.backend.exception.customer;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class NotRoutineOwnerException extends RuntimeException {

    private HttpStatus status;

    public NotRoutineOwnerException(String message) {
        super(message);
        this.status = HttpStatus.FORBIDDEN;
    }
}
