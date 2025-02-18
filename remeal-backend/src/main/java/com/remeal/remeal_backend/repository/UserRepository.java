package com.remeal.remeal_backend.repository;

import com.remeal.remeal_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
