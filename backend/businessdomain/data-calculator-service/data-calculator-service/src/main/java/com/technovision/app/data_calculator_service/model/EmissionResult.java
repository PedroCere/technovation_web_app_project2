package com.technovision.app.data_calculator_service.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;
@Data
@Entity
@Table(name = "emission_result")
public class EmissionResult {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "total_emission_kg")
    private Double totalEmissionKg;

    @Column(columnDefinition = "TEXT")
    private String breakdownJson;

    @Column(name = "date_calculated")
    private LocalDate dateCalculated;

}
