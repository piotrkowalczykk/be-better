package com.kowal.backend.customer.service;

import com.kowal.backend.customer.dto.request.AddRoutineRequest;
import com.kowal.backend.customer.dto.request.UpdateRoutineRequest;
import com.kowal.backend.customer.dto.response.RoutineResponse;

import java.util.List;

public interface CustomerService {
    RoutineResponse addRoutine(AddRoutineRequest addRoutineRequest, String userEmail);
    RoutineResponse getRoutineById(Long routineId, String userEmail);
    List<RoutineResponse> getAllRoutines(String userEmail);
    RoutineResponse updateRoutine(Long routineId, UpdateRoutineRequest updateRoutineRequest, String userEmail);
    RoutineResponse deleteRoutine(Long routineId, String userEmail);
}
