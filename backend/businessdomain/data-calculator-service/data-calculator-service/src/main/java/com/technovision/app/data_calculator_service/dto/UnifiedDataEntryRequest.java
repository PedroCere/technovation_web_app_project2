package com.technovision.app.data_calculator_service.dto;

import java.util.UUID;

public class UnifiedDataEntryRequest {

    public UUID userId;
    public EnergyDataRequest energy;
    public TransportDataRequest transport;
    public MaterialsDataRequest materials;
}
