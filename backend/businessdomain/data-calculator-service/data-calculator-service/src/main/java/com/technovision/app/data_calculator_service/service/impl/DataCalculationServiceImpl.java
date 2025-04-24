package com.technovision.app.data_calculator_service.service.impl;

import com.google.gson.Gson;
import com.technovision.app.data_calculator_service.client.Co2SignalClient;
import com.technovision.app.data_calculator_service.client.Co2SignalResponse;
import com.technovision.app.data_calculator_service.dto.EmissionCalculationResponse;
import com.technovision.app.data_calculator_service.model.EmissionResult;
import com.technovision.app.data_calculator_service.model.EnergyData;
import com.technovision.app.data_calculator_service.model.MaterialsData;
import com.technovision.app.data_calculator_service.model.TransportData;
import com.technovision.app.data_calculator_service.repository.EmissionResultRepository;
import com.technovision.app.data_calculator_service.repository.EnergyDataRepository;
import com.technovision.app.data_calculator_service.repository.MaterialsDataRepository;
import com.technovision.app.data_calculator_service.repository.TransportDataRepository;
import com.technovision.app.data_calculator_service.service.DataCalculationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DataCalculationServiceImpl implements DataCalculationService {

    private final EnergyDataRepository energyRepo;
    private final TransportDataRepository transportRepo;
    private final MaterialsDataRepository materialsRepo;
    private final EmissionResultRepository resultRepo;
    private final Co2SignalClient co2Client;

    @Value("${api.co2signal.token}")
    private String token;

    @Override
    public EmissionCalculationResponse calculateEmissions(UUID userId) {
        // 1. Obtener los datos del usuario
        List<EnergyData> energyList = energyRepo.findByUserId(userId);
        List<TransportData> transportList = transportRepo.findByUserId(userId);
        List<MaterialsData> materialsList = materialsRepo.findByUserId(userId);

        // 2. Llamar a la API externa para obtener carbonIntensity de Argentina
        Co2SignalResponse apiResponse = co2Client.getCarbonIntensity("AR",token);

        double carbonIntensity = apiResponse.getCarbonIntensity(); // gCO₂eq/kWh
        double energyEmissionFactor = carbonIntensity / 1000.0; // convertimos a kgCO₂eq/kWh

        // 3. Calcular emisiones por tipo
        double energyEmissions = energyList.stream()
                .mapToDouble(e -> e.getElectricityKwh() * energyEmissionFactor)
                .sum();

        double transportEmissions = transportList.stream()
                .mapToDouble(t -> {
                    if (t.getEmissionFactorPerKm() == null) {
                        throw new IllegalArgumentException("Falta el factor de emisión para transporte.");
                    }
                    return t.getDistanceKm() * t.getEmissionFactorPerKm();
                })
                .sum();

        double materialEmissions = materialsList.stream()
                .mapToDouble(m -> {
                    if (m.getEmissionFactorPerKg() == null) {
                        throw new IllegalArgumentException("Falta el factor de emisión para materiales.");
                    }
                    return m.getQuantityKg() * m.getEmissionFactorPerKg();
                })
                .sum();

        // 4. Calcular total
        double total = energyEmissions + transportEmissions + materialEmissions;

        Map<String, Double> breakdown = Map.of(
                "energy", energyEmissions,
                "transport", transportEmissions,
                "materials", materialEmissions
        );

        // 5. Guardar resultado en DB
        EmissionResult result = new EmissionResult();
        result.setUserId(userId);
        result.setTotalEmissionKg(total);
        result.setBreakdownJson(new Gson().toJson(breakdown));
        result.setDateCalculated(LocalDate.now());
        resultRepo.save(result);

        // 6. Armar respuesta
        EmissionCalculationResponse response = new EmissionCalculationResponse();
        response.userId = userId;
        response.totalEmissionKg = total;
        response.breakdown = breakdown;

        return response;
    }
}
