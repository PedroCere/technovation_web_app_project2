package com.technovision.app.prediction_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmissionSummaryDTO {
    private double totalEmissionsKg;
    private String breakdownJson;
    private String calculatedDate;
}
