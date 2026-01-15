package com.kowal.backend.customer.dto.request;

import lombok.Data;

@Data
public class UpdateRoutineRequest {
    private String name;
    private Integer value;
    private Integer scope;
    private String units;
    private String icon;
    private String frequency;
    private String color;
    private Integer dashboardPriority;
}
