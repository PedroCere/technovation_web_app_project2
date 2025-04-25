package com.technovision.app.prediction_service.controller;

import com.technovision.app.prediction_service.dto.PredictionRequest;
import com.technovision.app.prediction_service.dto.PredictionResponse;
import com.technovision.app.prediction_service.model.Prediction;
import com.technovision.app.prediction_service.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping
    public ResponseEntity<PredictionResponse> predict(@RequestBody PredictionRequest request) {
        PredictionResponse response = predictionService.predict(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all-predictions")
    public ResponseEntity<List<Prediction>> getAllPredictions(){
        List<Prediction> predictions = predictionService.getAllPredictions();

        return ResponseEntity.ok(predictions);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Prediction>> getUserPredictions(@PathVariable UUID userId) {
        List<Prediction> predictions = predictionService.findByUserId(userId);
        return ResponseEntity.ok(predictions);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrediction(@PathVariable UUID id) {
        predictionService.deletePrediction(id);
        return ResponseEntity.noContent().build();
    }
}
