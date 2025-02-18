package com.remeal.remeal_backend.repository;

import com.remeal.remeal_backend.model.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
}
