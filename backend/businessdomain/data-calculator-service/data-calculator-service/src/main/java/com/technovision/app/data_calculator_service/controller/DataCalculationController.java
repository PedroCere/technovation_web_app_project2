package com.technovision.app.data_calculator_service.controller;

import com.technovision.app.data_calculator_service.dto.*;
import com.technovision.app.data_calculator_service.model.EmissionResult;
import com.technovision.app.data_calculator_service.service.DataCalculationService;
import com.technovision.app.data_calculator_service.service.DataInputService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/data")
@RequiredArgsConstructor
public class DataCalculationController {

    private final DataInputService dataInputService;
    private final DataCalculationService calculationService;


    @PostMapping("/entry")
    public ResponseEntity<UnifiedEntryResponse> addUnifiedEntry(@RequestBody @Valid UnifiedDataEntryRequest request) {
        dataInputService.saveUnifiedEntry(request);
        return ResponseEntity.ok(new UnifiedEntryResponse("Datos unificados registrados correctamente."));
    }


    //Cálculo total de emisiones
    @GetMapping("/emissions/calculate")
    public ResponseEntity<EmissionCalculationResponse> calculateEmissions(@RequestParam UUID userId) {
        EmissionCalculationResponse response = calculationService.calculateEmissions(userId);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/all-emissions-by-userId")
    public ResponseEntity<List<EmissionResult>> getAllEmissionsById(@RequestParam UUID userId){
        List<EmissionResult> emissionResults = calculationService.getAllCalculateEmissionsById(userId);
        return ResponseEntity.ok(emissionResults);
    }

}



//    // Ingreso de energía
//    @PostMapping("/energy")
//    public ResponseEntity<String> addEnergyData(@RequestBody @Valid EnergyDataRequest request) {
//        dataInputService.saveEnergyData(request);
//        return ResponseEntity.ok("Energía registrada correctamente.");
//    }
//
//    // Ingreso de transporte
//    @PostMapping("/transport")
//    public ResponseEntity<String> addTransportData(@RequestBody @Valid TransportDataRequest request) {
//        dataInputService.saveTransportData(request);
//        return ResponseEntity.ok("Transporte registrado correctamente.");
//    }
//
//    // Ingreso de materiales
//    @PostMapping("/materials")
//    public ResponseEntity<String> addMaterialsData(@RequestBody @Valid MaterialsDataRequest request) {
//        dataInputService.saveMaterialsData(request);
//        return ResponseEntity.ok("Material registrado correctamente.");
//    }
