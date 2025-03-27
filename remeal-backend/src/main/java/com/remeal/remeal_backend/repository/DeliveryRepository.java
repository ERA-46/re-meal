package com.remeal.remeal_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.remeal.remeal_backend.model.Delivery;
import com.remeal.remeal_backend.model.User;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> findByDeliveryPerson(User user);
    List<Delivery> findByDeliveryPersonIsNull();
}
