package com.remeal.remeal_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.remeal.remeal_backend.model.FoodListing;
import com.remeal.remeal_backend.model.User;
import com.remeal.remeal_backend.repository.UserRepository;
import com.remeal.remeal_backend.service.FoodListingService;

@RestController
@RequestMapping("api/food-listing")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodListingController {

    @Autowired
    private FoodListingService foodListingService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public ResponseEntity<List<FoodListing>> getAllFoodListing(){
        List<FoodListing> list = foodListingService.getAllFoodListing();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/list-food")
    public ResponseEntity<FoodListing> createFoodListing(@RequestBody FoodListing foodListing){    
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();

        User currentUser = userRepository.findByEmail(name)
            .orElseThrow(() -> new RuntimeException("User not Logged in"));

        Long supplierId = currentUser.getId();
        
        FoodListing newFoodListing = foodListingService.createFoodListing(foodListing, supplierId);
        return ResponseEntity.ok(newFoodListing);
    }

    @PutMapping("/update-listing/{id}")
    public ResponseEntity<FoodListing> updateFoodListing(@PathVariable Long id, @RequestBody FoodListing updatedFoodListing){
        FoodListing foodListing = foodListingService.updateFoodListing(id, updatedFoodListing);        
        return ResponseEntity.ok(foodListing);
    }

    @DeleteMapping("/delete-listing/{id}")
    public ResponseEntity<Void> deleteFoodListing(@PathVariable Long id){
        foodListingService.deleteFoodListing(id);
        return ResponseEntity.noContent().build();
    }
}
