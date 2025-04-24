package com.technovision.app.prediction_service.dto;

import lombok.Data;

@Data
public class PredictionJsonResponse {

    private String prediction;
    private String fiability;
}
