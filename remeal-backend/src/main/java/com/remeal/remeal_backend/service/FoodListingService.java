package com.remeal.remeal_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.remeal.remeal_backend.model.FoodListing;
import com.remeal.remeal_backend.model.User;
import com.remeal.remeal_backend.repository.FoodListingRepository;
import com.remeal.remeal_backend.repository.UserRepository;

@Service
public class FoodListingService {

    @Autowired
    private FoodListingRepository foodListingRepository;

    @Autowired
    private UserRepository userRepository;

    public List<FoodListing> getAllFoodListing() {
        return foodListingRepository.findAll();
    }

    public FoodListing createFoodListing(FoodListing foodListing, Long supplierId) {
        User supplier = userRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        foodListing.setSupplier(supplier);
        return foodListingRepository.save(foodListing);
    }

    public FoodListing updateFoodListing(Long id, FoodListing updateFoodListing) {
        FoodListing foodListing = foodListingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food Listing not found"));

        foodListing.setStoreName(updateFoodListing.getStoreName());
        foodListing.setStoreAddress(updateFoodListing.getStoreAddress());
        foodListing.setFoodType(updateFoodListing.getFoodType());
        foodListing.setQuantity(updateFoodListing.getQuantity());
        foodListing.setPreparedTime(updateFoodListing.getPreparedTime());
        foodListing.setExpireTime(updateFoodListing.getExpireTime());

        if (updateFoodListing.getSupplier() != null) {
            User supplier = userRepository.findById(updateFoodListing.getSupplier().getId())
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            foodListing.setSupplier(supplier);
        }

        return foodListingRepository.save(foodListing);
    }

    public void deleteFoodListing(Long id) {
        FoodListing foodListing = foodListingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food Listing not found"));
        foodListingRepository.deleteById(id);
    }
}
