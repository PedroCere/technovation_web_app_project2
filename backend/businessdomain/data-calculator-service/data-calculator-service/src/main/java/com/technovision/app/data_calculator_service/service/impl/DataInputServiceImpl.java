package com.technovision.app.data_calculator_service.service.impl;

import com.technovision.app.data_calculator_service.dto.EnergyDataRequest;
import com.technovision.app.data_calculator_service.dto.MaterialsDataRequest;
import com.technovision.app.data_calculator_service.dto.TransportDataRequest;
import com.technovision.app.data_calculator_service.dto.UnifiedDataEntryRequest;
import com.technovision.app.data_calculator_service.model.EnergyData;
import com.technovision.app.data_calculator_service.model.MaterialsData;
import com.technovision.app.data_calculator_service.model.TransportData;
import com.technovision.app.data_calculator_service.repository.EnergyDataRepository;
import com.technovision.app.data_calculator_service.repository.MaterialsDataRepository;
import com.technovision.app.data_calculator_service.repository.TransportDataRepository;
import com.technovision.app.data_calculator_service.service.DataInputService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DataInputServiceImpl implements DataInputService {

    private final EnergyDataRepository energyRepo;
    private final TransportDataRepository transportRepo;
    private final MaterialsDataRepository materialsRepo;


    @Override
    public void saveEnergyData(EnergyDataRequest request) {
        EnergyData data = new EnergyData();
        data.setUserId(request.userId);
        data.setElectricityKwh(request.electricityKwh);
        data.setSource(request.source);
        data.setDate(LocalDate.now());
        data.setCreatedAt(LocalDateTime.now());
        energyRepo.save(data);
    }
    @Override
    public void saveTransportData(TransportDataRequest request) {
        TransportData data = new TransportData();
        data.setUserId(request.userId);
        data.setTransportType(request.transportType);
        data.setDistanceKm(request.distanceKm);
        data.setFuelType(request.fuelType);
        data.setEmissionFactorPerKm(request.emissionFactorPerKm);
        data.setDate(LocalDate.now());
        data.setCreatedAt(LocalDateTime.now());
        transportRepo.save(data);
    }

    @Override
    public void saveMaterialsData(MaterialsDataRequest request) {
        MaterialsData data = new MaterialsData();
        data.setUserId(request.userId);
        data.setMaterialType(request.materialType);
        data.setQuantityKg(request.quantityKg);
        data.setEmissionFactorPerKg(request.emissionFactorPerKg);
        data.setDate(LocalDate.now());
        data.setCreatedAt(LocalDateTime.now());
        materialsRepo.save(data);
    }

    @Override
    public void saveUnifiedEntry(UnifiedDataEntryRequest request) {
        if (request.energy != null) {
            saveEnergyData(new EnergyDataRequest(
                    request.userId,
                    request.energy.electricityKwh,
                    request.energy.source
            ));
        }

        if (request.transport != null) {
            TransportDataRequest t = request.transport;
            t.userId = request.userId;
            saveTransportData(t);
        }

        if (request.materials != null) {
            MaterialsDataRequest m = request.materials;
            m.userId = request.userId;
            saveMaterialsData(m);
        }
    }
}
