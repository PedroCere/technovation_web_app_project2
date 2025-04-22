package com.technovision.app.data_calculator_service.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "materials_data")
@Data
public class MaterialsData {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;
    private LocalDate date;

    @Column(name = "material_type")
    private String materialType;

    @Column(name = "quantity_kg")
    private Double quantityKg;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "emission_factor_per_kg")
    private Double emissionFactorPerKg;
}
