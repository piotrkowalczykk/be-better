package com.kowal.backend.exception.customer;

import org.springframework.http.HttpStatus;

public class ExerciseNotFoundException extends CustomException {
  public ExerciseNotFoundException(Long exerciseId) {
    super("Exercise not found with ID " + exerciseId, HttpStatus.NOT_FOUND);
  }
}
