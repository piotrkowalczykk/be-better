package com.kowal.backend.exception.customer;

import org.springframework.http.HttpStatus;

public class NotExerciseOwnerException extends CustomException {
  public NotExerciseOwnerException(Long exerciseId) {
    super("User is not the owner of exercise with ID:" + exerciseId, HttpStatus.NOT_FOUND);
  }
}
