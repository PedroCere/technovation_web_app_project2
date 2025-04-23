package com.technovision.app.prediction_service.service;

import com.technovision.app.prediction_service.dto.PredictionRequest;
import com.technovision.app.prediction_service.dto.PredictionResponse;
import com.technovision.app.prediction_service.model.Prediction;

import java.util.List;
import java.util.UUID;

public interface PredictionService {
    PredictionResponse predict(PredictionRequest request);

    List<Prediction> findByUserId(UUID userId);

    void deletePrediction(UUID id);


}
