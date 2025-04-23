package com.technovision.app.prediction_service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PredictionResponse {

    private String prediction;

    private double fiability;
}
