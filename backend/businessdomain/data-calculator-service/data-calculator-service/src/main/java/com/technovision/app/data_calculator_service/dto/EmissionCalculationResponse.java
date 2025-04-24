package com.technovision.app.data_calculator_service.dto;

import java.util.Map;
import java.util.UUID;

public class EmissionCalculationResponse {

    public UUID userId;
    public Double totalEmissionKg;
    public Map<String, Double> breakdown;

}
