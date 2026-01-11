package com.kowal.backend.customer.mapper;

import com.kowal.backend.customer.dto.request.AddExerciseToDayRequest;
import com.kowal.backend.customer.model.Day;
import com.kowal.backend.customer.model.DayExercise;
import com.kowal.backend.customer.model.Exercise;
import com.kowal.backend.customer.repository.ExerciseRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DayExerciseMapper {

    public List<DayExercise> mapToListOfDayExercises(List<AddExerciseToDayRequest> dtoDe, Day day, ExerciseRepository exerciseRepository) {
        return dtoDe.stream().map(dto -> {
            Exercise exercise = exerciseRepository.findById(dto.getExerciseId())
                    .orElseThrow(() -> new RuntimeException("Exercise not found"));

            DayExercise de = new DayExercise();
            de.setDay(day);
            de.setExercise(exercise);
            de.setSets(dto.getSets());
            de.setReps(dto.getReps());
            de.setWeight(dto.getWeight());
            de.setRir(dto.getRir());

            return de;
        }).toList();
    }
}
