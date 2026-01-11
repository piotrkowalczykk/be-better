package com.kowal.backend.customer.dto.request;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class AddDayRequest {
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Color is required")
    private String color;
    @NotBlank(message = "SecondaryColor is required")
    private String secondaryColor;
    @NotBlank(message = "Description is required")
    private String description;
    @NotBlank(message = "Icon is required")
    private String icon;
    private String frequency;
    @NotNull(message = "Add at least one exercise")
    private List<AddExerciseToDayRequest> exercises;
}
