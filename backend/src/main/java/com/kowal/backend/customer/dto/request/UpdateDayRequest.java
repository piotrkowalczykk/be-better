package com.kowal.backend.customer.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class UpdateDayRequest {
    private String Name;
    private String Color;
    private String SecondaryColor;
    private String Description;
    private String frequency;
    private String icon;
    private List<AddExerciseToDayRequest> exercises;
}
