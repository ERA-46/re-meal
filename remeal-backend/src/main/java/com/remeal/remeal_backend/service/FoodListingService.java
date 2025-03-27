package com.remeal.remeal_backend.service;

import java.util.List;
import java.util.Optional;

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

    public List<FoodListing> getAllFoodListing(){
        return foodListingRepository.findAll();
    }
    
    public  FoodListing createFoodListing(FoodListing foodListing, Long supplierId) {
        Optional<User> supplier = userRepository.findById(supplierId);

        if(!supplier.isPresent()){
            throw new RuntimeException("Supplier not found");
        }
        foodListing.setSupplier(supplier.get());
        return foodListingRepository.save(foodListing);  
    }
    

    public FoodListing updateFoodListing(Long id, FoodListing updateFoodListing){        
        Optional<FoodListing> existingfoodListing = foodListingRepository.findById(id);

        if(!existingfoodListing.isPresent()){
            throw new RuntimeException("Food Listing not found");
        }

        FoodListing foodListing = existingfoodListing.get();

        foodListing.setStoreName(updateFoodListing.getStoreName());
        foodListing.setStoreAddress(updateFoodListing.getStoreAddress());
        foodListing.setFoodType(updateFoodListing.getFoodType());
        foodListing.setQuantity(updateFoodListing.getQuantity());
        foodListing.setPreparedTime(updateFoodListing.getPreparedTime());
        foodListing.setExpireTime(updateFoodListing.getExpireTime());

        if(updateFoodListing.getSupplier() != null){
            Optional<User> supplier = userRepository.findById(updateFoodListing.getSupplier().getId());
            if(!supplier.isPresent()){
                throw new RuntimeException("Supplier not found");
            }
            foodListing.setSupplier(supplier.get());
        }
        return foodListingRepository.save(foodListing); 
    }

    public void deleteFoodListing(Long id){
        Optional<FoodListing> foodListing = foodListingRepository.findById(id);
        if(!foodListing.isPresent()){
            throw new RuntimeException("Food Listing not found");
        }
        foodListingRepository.deleteById(id);
    }

    public List<FoodListing> getAllFoodListings() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
