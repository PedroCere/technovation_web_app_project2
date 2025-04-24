package com.technovision.app.data_calculator_service.repository;

import com.technovision.app.data_calculator_service.model.MaterialsData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MaterialsDataRepository extends JpaRepository<MaterialsData, UUID> {

    List<MaterialsData> findByUserId(UUID userId);

}
