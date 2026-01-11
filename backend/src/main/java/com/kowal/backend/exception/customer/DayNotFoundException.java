package com.kowal.backend.exception.customer;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class DayNotFoundException extends CustomException {
    public DayNotFoundException(Long dayId) {
        super("Day not found with ID " + dayId, HttpStatus.NOT_FOUND);
    }
}