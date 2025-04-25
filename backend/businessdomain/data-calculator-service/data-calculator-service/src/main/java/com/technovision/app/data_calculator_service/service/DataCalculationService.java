package com.technovision.app.data_calculator_service.service;

import com.technovision.app.data_calculator_service.dto.EmissionCalculationResponse;
import com.technovision.app.data_calculator_service.model.EmissionResult;

import java.util.List;
import java.util.UUID;

public interface DataCalculationService {

    EmissionCalculationResponse calculateEmissions(UUID userId);

    List<EmissionResult> getAllCalculateEmissionsById(UUID userId);
}
