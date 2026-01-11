package com.kowal.backend.customer.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UpdateExerciseRequest {
    private String name;
    private String muscleGroup;
    private MultipartFile image;
}
