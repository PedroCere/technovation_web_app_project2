package com.technovision.app.data_calculator_service.service;

import com.technovision.app.data_calculator_service.client.Co2SignalClient;
import com.technovision.app.data_calculator_service.client.Co2SignalResponse;
import com.technovision.app.data_calculator_service.dto.EmissionCalculationResponse;
import com.technovision.app.data_calculator_service.model.EnergyData;
import com.technovision.app.data_calculator_service.model.MaterialsData;
import com.technovision.app.data_calculator_service.model.TransportData;
import com.technovision.app.data_calculator_service.repository.EmissionResultRepository;
import com.technovision.app.data_calculator_service.repository.EnergyDataRepository;
import com.technovision.app.data_calculator_service.repository.MaterialsDataRepository;
import com.technovision.app.data_calculator_service.repository.TransportDataRepository;
import com.technovision.app.data_calculator_service.service.impl.DataCalculationServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DataCalculationServiceTest {

    @Mock
    private EnergyDataRepository energyRepo;

    @Mock
    private TransportDataRepository transportRepo;

    @Mock
    private MaterialsDataRepository materialsRepo;

    @Mock
    EmissionResultRepository emissionResultRepository;

    @InjectMocks
    private DataCalculationServiceImpl service;

    @Value("${api.co2signal.token}")
    private String token;

    @Mock
    private Co2SignalClient co2SignalClient;

    @Test
    void testCalculateEmissions() {
        UUID userId = UUID.fromString("123e4567-e89b-12d3-a456-426614174345");


        Co2SignalResponse mockResponse = new Co2SignalResponse();
        mockResponse.setCarbonIntensity(250.0);

        when(co2SignalClient.getCarbonIntensity("AR",token)).thenReturn(mockResponse);

        when(energyRepo.findByUserId(userId)).thenReturn(List.of(
                EnergyData.builder().userId(userId).electricityKwh(100.00).build()
        ));

        when(transportRepo.findByUserId(userId)).thenReturn(List.of(
                TransportData.builder().userId(userId).distanceKm(50.00).emissionFactorPerKm(0.3).build()
        ));

        when(materialsRepo.findByUserId(userId)).thenReturn(List.of(
                MaterialsData.builder().userId(userId).quantityKg(20.00).emissionFactorPerKg(0.1).build()
        ));

        EmissionCalculationResponse response = service.calculateEmissions(userId);

        assertNotNull(response);
        assertEquals(userId, response.getUserId());
        assertTrue(response.getTotalEmissionKg() > 0);
    }

}
