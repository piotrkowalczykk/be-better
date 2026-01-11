package com.kowal.backend.customer.mapper;

import com.kowal.backend.customer.dto.response.DayResponse;
import com.kowal.backend.customer.model.Day;
import org.springframework.stereotype.Component;

@Component
public class DayMapper {
    public DayResponse mapDayToDayResponse(Day day) {
        DayResponse response = new DayResponse();
        response.setId(day.getId());
        response.setName(day.getName());
        response.setColor(day.getColor());
        response.setSecondaryColor(day.getSecondaryColor());
        response.setDescription(day.getDescription());
        response.setFrequency(day.getFrequency());
        response.setIcon(day.getIcon());
        response.setExercises(day.getWorkoutExercises());
        return response;
    }
}
