package com.remeal.remeal_backend.repository;

import com.remeal.remeal_backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}
