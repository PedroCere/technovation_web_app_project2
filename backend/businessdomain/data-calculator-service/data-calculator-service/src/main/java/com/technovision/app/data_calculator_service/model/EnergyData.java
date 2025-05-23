package com.technovision.app.data_calculator_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "energy_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnergyData {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;
    private LocalDate date;

    @Column(name = "electricity_kwh")
    private Double electricityKwh;
    private String source;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
