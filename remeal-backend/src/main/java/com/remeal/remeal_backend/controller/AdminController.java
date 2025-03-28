package com.remeal.remeal_backend.controller;

import com.remeal.remeal_backend.model.User;
import com.remeal.remeal_backend.model.FoodListing;
import com.remeal.remeal_backend.service.UserService;
import com.remeal.remeal_backend.service.FoodListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private FoodListingService foodListingService;

    // View all registered users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Delete a user by ID
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    // View all food listings
    @GetMapping("/food-listings")
    public List<FoodListing> getAllFoodListing() {
        return foodListingService.getAllFoodListing();
    }

    // Delete a food listing by ID
    @DeleteMapping("/food-listings/{id}")
    public void deleteFoodListing(@PathVariable Long id) {
        foodListingService.deleteFoodListing(id);
    }
}
