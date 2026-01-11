package com.kowal.backend.exception.customer;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class RoutineNotFoundException extends CustomException {
    public RoutineNotFoundException(Long routineId) {
        super("Routine not found with ID " + routineId, HttpStatus.NOT_FOUND);
    }
}

