package com.kowal.backend.customer.dto.request;

import com.kowal.backend.customer.model.Equipment;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AddExerciseRequest {
    private String name;
    private String muscleGroup;
    private MultipartFile image;
    private Equipment equipment;
}
