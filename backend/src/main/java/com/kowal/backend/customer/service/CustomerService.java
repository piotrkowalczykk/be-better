package com.kowal.backend.customer.service;

import com.kowal.backend.customer.dto.request.*;
import com.kowal.backend.customer.dto.response.DayExerciseResponse;
import com.kowal.backend.customer.dto.response.DayResponse;
import com.kowal.backend.customer.dto.response.ExerciseResponse;
import com.kowal.backend.customer.dto.response.RoutineResponse;
import jakarta.validation.Valid;

import java.util.List;

public interface CustomerService {
    RoutineResponse addRoutine(AddRoutineRequest addRoutineRequest, String userEmail);
    RoutineResponse getRoutineById(Long routineId, String userEmail);
    List<RoutineResponse> getAllRoutines(String userEmail);
    RoutineResponse updateRoutine(Long routineId, UpdateRoutineRequest updateRoutineRequest, String userEmail);
    RoutineResponse deleteRoutine(Long routineId, String userEmail);

    DayResponse addDay(@Valid AddDayRequest addDayRequest, String userEmail);
    List<DayResponse> getAllDays(String userEmail);
    DayResponse getDayById(Long dayId, String userEmail);
    DayResponse updateDay(Long dayId, UpdateDayRequest updateRoutineRequest, String userEmail);
    DayResponse deleteDay(Long dayId, String userEmail);

    ExerciseResponse addExercise(@Valid AddExerciseRequest addExerciseRequest, String userEmail);
    List<ExerciseResponse> getAllExercises(String userEmail);
    ExerciseResponse getExerciseById(Long exerciseId, String userEmail);
    ExerciseResponse updateExercise(Long dayId, UpdateExerciseRequest updateExerciseRequest, String userEmail);
    ExerciseResponse deleteExercise(Long exerciseId, String userEmail);

}
