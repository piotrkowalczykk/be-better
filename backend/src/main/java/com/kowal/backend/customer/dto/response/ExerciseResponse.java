package com.kowal.backend.customer.dto.response;

import com.kowal.backend.customer.model.Equipment;
import lombok.Data;

@Data
public class ExerciseResponse {
    private Long id;
    private String name;
    private String muscleGroup;
    private String image;
    private Equipment equipment;
}
