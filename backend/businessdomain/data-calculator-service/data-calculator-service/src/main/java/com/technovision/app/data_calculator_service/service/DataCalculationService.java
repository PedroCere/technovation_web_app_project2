package com.technovision.app.data_calculator_service.service;

import com.technovision.app.data_calculator_service.dto.EmissionCalculationResponse;

import java.util.UUID;

public interface DataCalculationService {

    EmissionCalculationResponse calculateEmissions(UUID userId);
}
