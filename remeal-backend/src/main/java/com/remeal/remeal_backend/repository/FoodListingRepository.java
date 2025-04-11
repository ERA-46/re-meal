package com.remeal.remeal_backend.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.remeal.remeal_backend.model.FoodListing;
import com.remeal.remeal_backend.model.User;

public interface FoodListingRepository extends JpaRepository<FoodListing, Long> {

    List<FoodListing> findBySupplier(User supplier);

    @Query("SELECT new map(fl.supplier.name as supplier, SUM(fl.quantity) as totalQuantity) " +
           "FROM FoodListing fl GROUP BY fl.supplier.name")
    List<Map<String, Object>> getSupplierStats();
}
