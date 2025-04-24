package com.technovision.app.prediction_service.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PredictionRequest {
    private UUID userId;

    private String prompt;

}
