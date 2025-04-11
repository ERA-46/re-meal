package com.remeal.remeal_backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.remeal.remeal_backend.model.Delivery;
import com.remeal.remeal_backend.model.FoodListing;
import com.remeal.remeal_backend.model.FoodRequest;
import com.remeal.remeal_backend.model.RequestStatus;
import com.remeal.remeal_backend.model.User;
import com.remeal.remeal_backend.repository.DeliveryRepository;
import com.remeal.remeal_backend.repository.FoodListingRepository;
import com.remeal.remeal_backend.repository.FoodRequestRepository;
import com.remeal.remeal_backend.repository.UserRepository;

@Service
public class FoodRequestService {
    @Autowired
    private FoodRequestRepository foodRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public List<FoodRequest> getAllFoodRequests() {
        return foodRequestRepository.findAll();
    }

    public FoodRequest createFoodRequest(FoodRequest foodRequest, Long requesterId) {
        Optional<User> requester = userRepository.findById(requesterId);
        if (!requester.isPresent()) {
            throw new RuntimeException("Requester not found");
        }

        foodRequest.setRequester(requester.get());
        foodRequest.setRequestTime(LocalDateTime.now());
        foodRequest.setStatus(RequestStatus.PENDING);

        FoodRequest savedRequest = foodRequestRepository.save(foodRequest);

        // 自動配對 FoodListing 並產生 Delivery
        Optional<FoodListing> matchingFood = foodListingRepository.findAll().stream()
                .filter(f -> f.getFoodType().equalsIgnoreCase(foodRequest.getRequestedFoodType()))
                .filter(f -> f.getQuantity() >= foodRequest.getQuantity())
                .findFirst();

        if (matchingFood.isPresent()) {
            FoodListing matched = matchingFood.get();

            // 扣掉供應食物數量
            matched.setQuantity(matched.getQuantity() - foodRequest.getQuantity());
            foodListingRepository.save(matched);

            // 建立 delivery
            Delivery delivery = new Delivery();
            delivery.setRequester(requester.get());
            delivery.setTimeStamp(LocalDateTime.now());
            delivery.setStatus(RequestStatus.PENDING);
            deliveryRepository.save(delivery);

            // 也可以改成：更新 foodRequest 的狀態為 MATCHED
            savedRequest.setStatus(RequestStatus.ACCEPTED); // 可選
            foodRequestRepository.save(savedRequest);
        }

        return savedRequest;
    }

    public FoodRequest updateFoodRequest(Long id, FoodRequest updateFoodRequest) {

        Optional<FoodRequest> existingFoodRequest = foodRequestRepository.findById(id);

        if (!existingFoodRequest.isPresent()) {
            throw new RuntimeException("Food Request not found");
        }

        FoodRequest foodRequest = existingFoodRequest.get();
        foodRequest.setQuantity(updateFoodRequest.getQuantity());

        if (updateFoodRequest.getRequester() != null) {
            Optional<User> requester = userRepository.findById(updateFoodRequest.getRequester().getId());
            if (!requester.isPresent()) {
                throw new RuntimeException("Requester not found");
            }
            foodRequest.setRequester(requester.get());
        }
        return foodRequestRepository.save(foodRequest);
    }

    public void deleteFoodRequest(Long id) {
        Optional<FoodRequest> foodRequest = foodRequestRepository.findById(id);
        if (!foodRequest.isPresent()) {
            throw new RuntimeException("Food Request not found");
        }
        foodRequestRepository.deleteById(id);
    }

    @Autowired
    private FoodListingRepository foodListingRepository;

    @Autowired
    private DeliveryRepository deliveryRepository;

}
