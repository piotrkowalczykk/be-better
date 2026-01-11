package com.kowal.backend.customer.repository;

import com.kowal.backend.customer.model.DayExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DayExerciseRepository extends JpaRepository<DayExercise, Long> {
    List<DayExercise> findByDayId(Long dayId);
}
