package com.kowal.backend.customer.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddExerciseToDayRequest {

    @NotNull(message = "Exercise ID is required")
    private Long exerciseId;
    @NotNull(message = "Sets are required")
    @Min(value = 1, message = "Must perform at least 1 set")
    private Integer sets;
    @NotNull(message = "Reps are required")
    @Min(value = 1, message = "Must perform at least 1 rep")
    private Integer reps;
    @NotNull(message = "Weight is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Weight cannot be negative")
    private Double weight;
    @NotNull(message = "RIR (Reps in Reserve) is required")
    @Min(value = 0, message = "RIR cannot be negative")
    private Integer rir;
}
