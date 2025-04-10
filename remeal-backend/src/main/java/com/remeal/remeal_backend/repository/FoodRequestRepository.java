package com.remeal.remeal_backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.remeal.remeal_backend.model.FoodRequest;
import com.remeal.remeal_backend.model.User;

public interface FoodRequestRepository extends JpaRepository<FoodRequest, Long> {
    List<FoodRequest> findByRequester(User requester);

    @Query("SELECT COUNT(fr) FROM FoodRequest fr WHERE fr.requester.id = :userId AND DATE(fr.timestamp) = :date")
    long countByRequesterIdAndDate(@Param("userId") Long userId, @Param("date") LocalDate date);

    @Query("SELECT COUNT(fr) FROM FoodRequest fr WHERE fr.requester.id = :userId AND FUNCTION('week', fr.timestamp) = :week AND FUNCTION('year', fr.timestamp) = :year")
    long countByRequesterIdAndWeek(@Param("userId") Long userId, @Param("week") int week, @Param("year") int year);

    List<FoodRequest> findByRequesterId(Long requesterId);


}
