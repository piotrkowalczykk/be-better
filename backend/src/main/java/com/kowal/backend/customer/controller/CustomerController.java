package com.kowal.backend.customer.controller;

import com.kowal.backend.customer.dto.request.AddRoutineRequest;
import com.kowal.backend.customer.dto.request.UpdateRoutineRequest;
import com.kowal.backend.customer.dto.response.RoutineResponse;
import com.kowal.backend.customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService){
        this.customerService = customerService;
    }

    @PostMapping("/add-routine")
    public ResponseEntity<RoutineResponse> addRoutine(@RequestBody AddRoutineRequest addRoutineRequest,
                                                        @AuthenticationPrincipal UserDetails userDetails){
        String userEmail = userDetails.getUsername();
        RoutineResponse response = customerService.addRoutine(addRoutineRequest, userEmail);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/routines")
    public ResponseEntity<List<RoutineResponse>> getAllRoutines(@AuthenticationPrincipal UserDetails userDetails){
        String userEmail = userDetails.getUsername();
        List<RoutineResponse> routines = customerService.getAllRoutines(userEmail);
        return ResponseEntity.ok(routines);
    }

    @GetMapping("/routines/{id}")
    public ResponseEntity<RoutineResponse> getRoutineById(@PathVariable("id") Long routineId,
                                                            @AuthenticationPrincipal UserDetails userDetails){
        String userEmail = userDetails.getUsername();
        RoutineResponse routine = customerService.getRoutineById(routineId, userEmail);
        return ResponseEntity.ok(routine);
    }

    @PutMapping("/routines/{id}")
    public ResponseEntity<RoutineResponse> updateRoutine(@PathVariable("id") Long routineId,
                                                            @RequestBody UpdateRoutineRequest updateRoutineRequest,
                                                                @AuthenticationPrincipal UserDetails userDetails){
        String userEmail = userDetails.getUsername();
        RoutineResponse updatedRoutine = customerService.updateRoutine(routineId, updateRoutineRequest, userEmail);
        return ResponseEntity.ok(updatedRoutine);
    }

    @DeleteMapping("/routines/{id}")
    public ResponseEntity<RoutineResponse> deleteRoutine(@PathVariable("id") Long routineId,
                                                @AuthenticationPrincipal UserDetails userDetails){
        String userEmail = userDetails.getUsername();
        RoutineResponse deletedRoutine = customerService.deleteRoutine(routineId, userEmail);
        return ResponseEntity.ok(deletedRoutine);
    }
}
