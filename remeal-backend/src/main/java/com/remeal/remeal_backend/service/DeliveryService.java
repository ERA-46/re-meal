package com.remeal.remeal_backend.service;

import com.remeal.remeal_backend.model.Delivery;
import com.remeal.remeal_backend.model.User;
import com.remeal.remeal_backend.model.RequestStatus;
import com.remeal.remeal_backend.repository.DeliveryRepository;
import com.remeal.remeal_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Delivery> getAvailableDeliveries() {
        return deliveryRepository.findByDeliveryPersonIsNull();
    }

    public Delivery acceptDelivery(Long deliveryId, Long deliveryPersonId) {
        Optional<Delivery> optionalDelivery = deliveryRepository.findById(deliveryId);
        Optional<User> optionalUser = userRepository.findById(deliveryPersonId);

        if (optionalDelivery.isPresent() && optionalUser.isPresent()) {
            Delivery delivery = optionalDelivery.get();
            delivery.setDeliveryPerson(optionalUser.get());
            delivery.setStatus(RequestStatus.IN_PROGRESS); // assuming this enum exists
            return deliveryRepository.save(delivery);
        } else {
            throw new RuntimeException("Delivery or User not found.");
        }
    }

    public List<Delivery> getDeliveriesByDeliveryPersonId(Long deliveryPersonId) {
        Optional<User> optionalUser = userRepository.findById(deliveryPersonId);
        if (optionalUser.isPresent()) {
            return deliveryRepository.findByDeliveryPerson(optionalUser.get());
        } else {
            throw new RuntimeException("User not found.");
        }
    }
}
