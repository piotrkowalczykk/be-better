package com.kowal.backend.customer.mapper;

import com.kowal.backend.customer.dto.response.ExerciseResponse;
import com.kowal.backend.customer.model.Exercise;
import org.springframework.stereotype.Component;

@Component
public class ExerciseMapper {
    public ExerciseResponse mapExerciseToExerciseResponse(Exercise exercise) {
        ExerciseResponse response = new ExerciseResponse();
        response.setId(exercise.getId());
        response.setName(exercise.getName());
        response.setMuscleGroup(exercise.getMuscleGroup());
        response.setImage(exercise.getImage());
        response.setEquipment(exercise.getEquipment());
        return response;
    }
}
