package com.kowal.backend.customer.mapper;

import com.kowal.backend.customer.dto.response.RoutineResponse;
import com.kowal.backend.customer.model.Routine;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class RoutineMapper {
    public RoutineResponse mapRoutineToRoutineResponse(Routine routine){
        RoutineResponse response = new RoutineResponse();
        response.setId(routine.getId());
        response.setName(routine.getName());
        response.setIcon(routine.getIcon());
        response.setColor(routine.getColor());
        response.setScope(routine.getScope());
        response.setUnits(routine.getUnits());
        response.setDashboardPriority(routine.getDashboardPriority());
        response.setFrequency(routine.getFrequency());
        response.setValue(routine.getValue());
        return response;
    }

    public Set<Integer> mapStringFrequencyToIntegerSet(String frequency){
        return Arrays.stream(frequency
                        .split(","))
                        .map(String::trim)
                        .map(Integer::parseInt)
                        .filter(day -> day >= 1 && day <= 7)
                        .collect(Collectors.toSet());
    }
}
