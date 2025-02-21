package com.remeal.remeal_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.remeal.remeal_backend.model.FoodListing;
import com.remeal.remeal_backend.model.User;


public interface FoodListingRepository extends JpaRepository<FoodListing, Long> {
    List<FoodListing> findBySupplier(User supplier);
}
