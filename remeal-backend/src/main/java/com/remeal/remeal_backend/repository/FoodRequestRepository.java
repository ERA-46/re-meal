package com.remeal.remeal_backend.repository;

import com.remeal.remeal_backend.model.FoodRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRequestRepository extends JpaRepository<FoodRequest, Long> {
}
