package com.kowal.backend.exception.customer;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class RoutineNotFoundException extends RuntimeException {

    private HttpStatus status;

    public RoutineNotFoundException(String message) {
        super(message);
        this.status = HttpStatus.NOT_FOUND;
    }
}
