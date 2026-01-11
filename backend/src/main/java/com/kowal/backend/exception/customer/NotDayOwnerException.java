package com.kowal.backend.exception.customer;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class NotDayOwnerException extends CustomException {
    public NotDayOwnerException(Long dayId) {
      super("User is not the owner of day with ID:" + dayId, HttpStatus.NOT_FOUND);
    }
}

