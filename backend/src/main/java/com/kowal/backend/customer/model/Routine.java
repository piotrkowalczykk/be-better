package com.kowal.backend.customer.model;

import com.kowal.backend.security.model.AuthUser;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "routines")
@Data
@NoArgsConstructor
public class Routine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer scope;
    private String units;
    private String icon;
    private Set<Integer> frequency;
    private String color;
    private Integer dashboardPriority;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AuthUser authUser;
}
