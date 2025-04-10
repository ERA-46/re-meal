package com.remeal.remeal_backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.remeal.remeal_backend.model.FoodRequest;
import com.remeal.remeal_backend.model.User;
import com.remeal.remeal_backend.repository.FoodRequestRepository;
import com.remeal.remeal_backend.repository.UserRepository;

@Service
public class FoodRequestService {
    @Autowired
    private FoodRequestRepository foodRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public List<FoodRequest>getAllFoodRequests(){
        return foodRequestRepository.findAll();
    }

    public FoodRequest createFoodRequest(FoodRequest foodRequest, Long reqsterId) {
        Optional<User> requester = userRepository.findById(reqsterId);
        if (!requester.isPresent()) {
            throw new RuntimeException("Requester not found");
        }
    
        Long userId = requester.get().getId();
        LocalDate today = LocalDate.now();
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int currentWeek = today.get(weekFields.weekOfWeekBasedYear());
        int currentYear = today.getYear();
    
        long todayCount = foodRequestRepository.countByRequesterIdAndDate(userId, today);
        long weekCount = foodRequestRepository.countByRequesterIdAndWeek(userId, currentWeek, currentYear);
    
        if (todayCount >= 2) {
            throw new RuntimeException("Daily request limit (2) reached.");
        }
    
        if (weekCount >= 5) {
            throw new RuntimeException("Weekly request limit (5) reached.");
        }
    
        foodRequest.setRequester(requester.get());
        foodRequest.setTimestamp(LocalDateTime.now()); // Set time of request
        return foodRequestRepository.save(foodRequest);
    }
    

    public FoodRequest updateFoodRequest(Long id, FoodRequest updateFoodRequest){
    
        Optional<FoodRequest> existingFoodRequest = foodRequestRepository.findById(id);

        if(!existingFoodRequest.isPresent()){
            throw new RuntimeException("Food Request not found");
        }

        FoodRequest foodRequest = existingFoodRequest.get();
        foodRequest.setQuantity(updateFoodRequest.getQuantity());

        if(updateFoodRequest.getRequester() != null){
            Optional<User> requester = userRepository.findById(updateFoodRequest.getRequester().getId());
            if(!requester.isPresent()){
                throw new RuntimeException("Requester not found");
            } 
            foodRequest.setRequester(requester.get());
        }
        return foodRequestRepository.save(foodRequest);
    }

    public void deleteFoodRequest(Long id){
        Optional<FoodRequest> foodRequest = foodRequestRepository.findById(id);
        if(!foodRequest.isPresent()){
            throw new RuntimeException("Food Request not found");
        }
        foodRequestRepository.deleteById(id);
    }



}
