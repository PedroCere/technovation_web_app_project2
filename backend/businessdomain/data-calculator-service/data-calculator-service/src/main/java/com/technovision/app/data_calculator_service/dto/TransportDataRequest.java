package com.technovision.app.data_calculator_service.dto;

import java.util.UUID;

public class TransportDataRequest {

    public UUID userId;
    public String transportType;
    public Double distanceKm;
    public String fuelType;

    public Double emissionFactorPerKm;
}
