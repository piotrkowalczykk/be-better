package com.kowal.backend.customer.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AddExerciseRequest {
    private String name;
    private String muscleGroup;
    private MultipartFile image;
}
