package com.technovision.app.prediction_service.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.technovision.app.prediction_service.client.DataCalculatorClient;
import com.technovision.app.prediction_service.client.OpenRouterClient;
import com.technovision.app.prediction_service.client.OpenRouterRequest;
import com.technovision.app.prediction_service.client.OpenRouterResponse;
import com.technovision.app.prediction_service.dto.EmissionSummaryDTO;
import com.technovision.app.prediction_service.dto.PredictionJsonResponse;
import com.technovision.app.prediction_service.dto.PredictionRequest;
import com.technovision.app.prediction_service.dto.PredictionResponse;
import com.technovision.app.prediction_service.model.Prediction;
import com.technovision.app.prediction_service.repository.PredictionRepository;
import com.technovision.app.prediction_service.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PredictionServiceImpl implements PredictionService {

    private final OpenRouterClient openRouterClient;
    private final PredictionRepository predictionRepository;
    private final DataCalculatorClient dataCalculatorClient;

    private final ObjectMapper objectMapper;

    @Override
    public PredictionResponse predict(PredictionRequest request) {

        EmissionSummaryDTO summary = dataCalculatorClient.getEmissionSummary(request.getUserId());
        String prompt = """
        Given the following user context:
        
        Energy consumption analysis:
        Total emissions: %.2f kg
        Breakdown (JSON): %s
        Calculated on: %s
        
        User input: "%s"
        
        Please generate a prediction about future energy consumption behavior.
        
        IMPORTANT:
        Only reply with a valid JSON object like:
        {
          "prediction": "...",
          "fiability": "..."
        }
        Fiability have to say between 0 and 1.
        Use dot (.) as a decimal separator.
        """.formatted(
                        summary.getTotalEmissionsKg(),
                        summary.getBreakdownJson(),
                        summary.getCalculatedDate(),
                        request.getPrompt()
                );

        // 🔗 Create the OpenRouter-style request
        OpenRouterRequest openRouterRequest = OpenRouterRequest.builder()
                .model("mistralai/mistral-7b-instruct")
                .messages(List.of(
                        OpenRouterRequest.Message.builder()
                                .role("user")
                                .content(prompt)
                                .build()
                ))
                .build();

        String rawResponse = openRouterClient.getPrediction(openRouterRequest);
        OpenRouterResponse response;
        try {
            response = objectMapper.readValue(rawResponse, OpenRouterResponse.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse AI response: " + e.getMessage(), e);
        }

        if (response.getChoices() == null || response.getChoices().isEmpty()) {
            throw new RuntimeException("Empty or invalid response from the AI.");
        }

        String rawContent = response.getChoices().get(0).getMessage().getContent();

        PredictionJsonResponse parsed;
        double parsedFiability;

        try {
            parsed = objectMapper.readValue(rawContent, PredictionJsonResponse.class);
            parsedFiability = Double.parseDouble(parsed.getFiability().replace(",", "."));
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response: " + rawContent, e);
        }

        // 💾 Save to the database
        Prediction prediction = Prediction.builder()
                .prediction(parsed.getPrediction())
                .fiability(parsedFiability)
                .userId(request.getUserId())
                .createdAt(LocalDateTime.now())
                .build();

        predictionRepository.save(prediction);

        // 📦 Return the response DTO
        return PredictionResponse.builder()
                .prediction(parsed.getPrediction())
                .fiability(parsedFiability)
                .build();
    }

    @Override
    public List<Prediction> findByUserId(UUID userId) {
        return predictionRepository.findByUserId(userId);
    }

    @Override
    public List<Prediction> getAllPredictions() {
        return predictionRepository.findAll();
    }

    @Override
    public void deletePrediction(UUID id) {
        predictionRepository.deleteById(id);
    }
}
