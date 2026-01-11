package com.kowal.backend.customer.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddRoutineRequest {
    @NotBlank(message = "Name is required")
    private String name;
    @NotNull(message = "Scope is required")
    private Integer scope;
    @NotBlank(message = "Units are required")
    private String units;
    @NotBlank(message = "Icon is required")
    private String icon;
    @NotBlank(message = "Frequency is required")
    private String frequency;
    @NotBlank(message = "Color is required")
    private String color;
    @NotNull(message = "DashboardPriority is required")
    private Integer dashboardPriority;
}
