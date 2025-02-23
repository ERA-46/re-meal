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

import com.remeal.remeal_backend.model.FoodRequest;
import com.remeal.remeal_backend.model.User;
import com.remeal.remeal_backend.repository.UserRepository;
import com.remeal.remeal_backend.service.FoodRequestService;





@RestController
@RequestMapping("/api/food-requesting")
@CrossOrigin(origins="http://localhost:3000")
public class FoodRequestingController {

    @Autowired
    private FoodRequestService foodRequestService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public ResponseEntity<List<FoodRequest>> getAllFoodRequests(){
        List<FoodRequest> list = foodRequestService.getAllFoodRequests();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/request-food")
    public ResponseEntity<FoodRequest> createFoodRequest(@RequestBody FoodRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();

        User currentUser =  userRepository.findByEmail(name)
               .orElseThrow(() -> new RuntimeException("User not Logged in"));
        
        Long requesterId = currentUser.getId();

        FoodRequest newRequest = foodRequestService.createFoodRequest(request, requesterId);
        return ResponseEntity.ok(newRequest);
    }

    @PutMapping("/update-request/{id}")
    public ResponseEntity<FoodRequest> updateFoodRequest(@PathVariable Long id, @RequestBody FoodRequest updatedRequest){
        FoodRequest request = foodRequestService.updateFoodRequest(id, updatedRequest);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/delete-request/{id}")
    public ResponseEntity<Void> deleteFoodRequest(@PathVariable Long id){
        foodRequestService.deleteFoodRequest(id);
        return ResponseEntity.noContent().build();
    }
    


}
