package com.remeal.remeal_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.remeal.remeal_backend.model.FoodRequest;
import com.remeal.remeal_backend.model.User;

public interface FoodRequestRepository extends JpaRepository<FoodRequest, Long> {
    List<FoodRequest> findByRequester(User requester);
}
