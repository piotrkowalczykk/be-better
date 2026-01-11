package com.kowal.backend.customer.dto.response;

import lombok.Data;

@Data
public class ExerciseResponse {
    private Long id;
    private String name;
    private String muscleGroup;
    private String image;
}
