package com.technovision.app.prediction_service.repository;

import com.technovision.app.prediction_service.model.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PredictionRepository extends JpaRepository<Prediction, UUID> {

    public List<Prediction> findByUserId(UUID userId);
}
