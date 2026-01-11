package com.kowal.backend.exception.customer;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class NotRoutineOwnerException extends CustomException {
    public NotRoutineOwnerException(Long routineId) {
        super("User is not the owner of routine with ID:" + routineId, HttpStatus.NOT_FOUND);
    }
}


