package com.remeal.remeal_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.remeal.remeal_backend.model.Delivery;
import com.remeal.remeal_backend.service.DeliveryService;

@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    @GetMapping("/available")
    public List<Delivery> getAvailableDeliveries() {
        return deliveryService.getAvailableDeliveries();
    }

    @PostMapping("/accept/{deliveryId}")
    public Delivery acceptDelivery(@PathVariable Long deliveryId, @RequestParam Long deliveryPersonId) {
        return deliveryService.acceptDelivery(deliveryId, deliveryPersonId);
    }

    @GetMapping("/my-deliveries/{deliveryPersonId}")
    public List<Delivery> getMyDeliveries(@PathVariable Long deliveryPersonId) {
        return deliveryService.getDeliveriesByDeliveryPersonId(deliveryPersonId);
    }

    @PostMapping("/complete/{deliveryId}")
    public Delivery completeDelivery(@PathVariable Long deliveryId) {
        return deliveryService.completeDelivery(deliveryId);
    }

}
