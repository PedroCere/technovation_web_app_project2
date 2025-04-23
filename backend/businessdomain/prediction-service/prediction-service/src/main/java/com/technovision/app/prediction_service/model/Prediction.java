package com.technovision.app.prediction_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "predictions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prediction {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;

    private String prompt;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String prediction;

    private double fiability;

    @Column(name = "created_at")
    private LocalDateTime createdAt;



}
