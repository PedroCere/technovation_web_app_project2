package com.technovision.app.data_calculator_service.model;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
@Data
@Entity
@Table(name = "transport_data")
public class TransportData {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;
    private LocalDate date;
    @Column(name = "transport_type")
    private String transportType;

    @Column(name = "distance_km")
    private Double distanceKm;

    @Column(name = "fuel_type")
    private String fuelType;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "emission_factor_per_km")
    private Double emissionFactorPerKm;

}
