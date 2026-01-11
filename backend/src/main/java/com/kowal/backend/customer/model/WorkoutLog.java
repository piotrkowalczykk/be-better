package com.kowal.backend.customer.model;

import com.kowal.backend.security.model.AuthUser;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "workout_logs")
public class WorkoutLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime createdAt;

    @ManyToOne
    private AuthUser authUser;

    @ManyToOne
    private Exercise exercise;

    private int finalSets;
    private int finalReps;
    private double finalWeight;
}