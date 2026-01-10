package com.kowal.backend.customer.repository;

import com.kowal.backend.customer.model.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoutineRepository extends JpaRepository<Routine, Long> {
    public List<Routine> findByAuthUserId(Long authUserId);
}
