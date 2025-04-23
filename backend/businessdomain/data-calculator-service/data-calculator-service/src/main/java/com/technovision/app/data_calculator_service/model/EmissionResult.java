package com.technovision.app.data_calculator_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "emission_result")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
