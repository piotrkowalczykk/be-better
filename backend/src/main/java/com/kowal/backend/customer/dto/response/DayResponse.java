package com.kowal.backend.customer.dto.response;

import com.kowal.backend.customer.model.DayExercise;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class DayResponse {
    private Long id;
    private String Name;
    private String icon;
    private String Color;
    private String SecondaryColor;
    private String Description;
    private Set<Integer> frequency;
    private List<DayExercise> exercises;
}
