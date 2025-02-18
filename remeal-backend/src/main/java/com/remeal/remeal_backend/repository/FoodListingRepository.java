package com.remeal.remeal_backend.repository;

import com.remeal.remeal_backend.model.FoodListing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodListingRepository extends JpaRepository<FoodListing, Long> {
}
