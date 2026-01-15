package com.kowal.backend.customer.dto.response;

import lombok.Data;

import java.util.Set;

@Data
public class RoutineResponse {
    private Long Id;
    private String name;
    private Integer value;
    private Integer scope;
    private String units;
    private String icon;
    private Set<Integer> frequency;
    private String color;
    private Integer dashboardPriority;
}
