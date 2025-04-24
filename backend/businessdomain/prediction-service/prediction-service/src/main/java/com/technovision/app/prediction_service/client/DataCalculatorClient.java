package com.technovision.app.prediction_service.client;

import com.technovision.app.prediction_service.dto.EmissionSummaryDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

@FeignClient(name = "data-calculator", url = "${data.calculator.url}")
public interface DataCalculatorClient {

    @GetMapping("/api/data/emissions/calculate")
    EmissionSummaryDTO getEmissionSummary(@RequestParam UUID userId);
}
