package com.remeal.remeal_backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.remeal.remeal_backend.model.User;
import com.remeal.remeal_backend.repository.UserRepository;
import com.remeal.remeal_backend.util.JwtUtil;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword())); 
        return userRepository.save(user);
    }

    public Map<String, Object> loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            User foundUser = user.get();

            System.out.println("Login attempt: " + email);
            System.out.println("DB password: " + foundUser.getPassword());
            System.out.println("Provided password: " + password);

            if (passwordEncoder.matches(password, foundUser.getPassword())) {
                String token = jwtUtil.generateToken(email, foundUser.getUserType().toString());

                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("user", foundUser);
                return response;
            }
        }

        throw new RuntimeException("Invalid email or password");
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
