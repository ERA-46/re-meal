package com.remeal.remeal_backend.service;

import java.util.List;
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

    public FoodRequest createFoodRequest(FoodRequest foodRequest, Long reqsterId){
        Optional<User> requester = userRepository.findById(reqsterId);
        if(!requester.isPresent()){
            throw new RuntimeException("Requester not found");
        }
        foodRequest.setRequester(requester.get());
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
