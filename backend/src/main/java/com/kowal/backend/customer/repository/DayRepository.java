package com.kowal.backend.customer.repository;

import com.kowal.backend.customer.model.Day;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DayRepository extends JpaRepository<Day, Long> {
    public List<Day> findByAuthUserId(Long authUserId);
}
