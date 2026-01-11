package com.kowal.backend.customer.dto.response;

import lombok.Data;

@Data
public class DayExerciseResponse {
    private Long id;
    private Long exerciseId;
    private String exerciseName;
    private Integer sets;
    private Integer reps;
    private Double weight;
    private Integer rir;
}