package com.technovision.app.data_calculator_service.repository;

import com.technovision.app.data_calculator_service.model.TransportData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TransportDataRepository extends JpaRepository<TransportData, UUID> {
    List<TransportData> findByUserId(UUID userId);

}
