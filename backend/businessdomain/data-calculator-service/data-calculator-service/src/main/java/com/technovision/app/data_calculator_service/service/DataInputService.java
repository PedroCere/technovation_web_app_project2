package com.technovision.app.data_calculator_service.service;

import com.technovision.app.data_calculator_service.dto.EnergyDataRequest;
import com.technovision.app.data_calculator_service.dto.MaterialsDataRequest;
import com.technovision.app.data_calculator_service.dto.TransportDataRequest;
import com.technovision.app.data_calculator_service.dto.UnifiedDataEntryRequest;

public interface DataInputService {

    void saveEnergyData(EnergyDataRequest request);
    void saveTransportData(TransportDataRequest request);
    void saveMaterialsData(MaterialsDataRequest request);

    void saveUnifiedEntry(UnifiedDataEntryRequest request);

}
