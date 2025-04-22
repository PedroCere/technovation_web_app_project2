package com.technovision.app.data_calculator_service.repository;

import com.technovision.app.data_calculator_service.model.EmissionResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EmissionResultRepository extends JpaRepository<EmissionResult, UUID> {

    Optional<EmissionResult> findTopByUserIdOrderByDateCalculatedDesc(UUID userId);

}
