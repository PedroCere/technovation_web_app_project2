package com.technovision.app.data_calculator_service.dto;

import lombok.Data;

import java.util.Map;
import java.util.UUID;

@Data
public class EmissionCalculationResponse {

    public UUID userId;
    public Double totalEmissionKg;
    public Map<String, Double> breakdown;

}
