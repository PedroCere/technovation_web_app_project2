package com.technovision.app.data_calculator_service.dto;


import java.util.UUID;

public class EnergyDataRequest {
    public UUID userId;
    public Double electricityKwh;
    public String source;

    public EnergyDataRequest(UUID userId, Double electricityKwh, String source) {
        this.userId = userId;
        this.electricityKwh = electricityKwh;
        this.source = source;
    }
}
