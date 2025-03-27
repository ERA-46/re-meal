package com.remeal.remeal_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.remeal.remeal_backend.model.User;
import com.remeal.remeal_backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {

        Optional <User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        user.setPassword(user.getPassword());

        return userRepository.save(user);    
    }

    public User loginUser(String email, String password) {

        Optional <User> user = userRepository.findByEmail(email);
        if(user.isPresent() && user.get().getPassword().equals(password)){
            return user.get();
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
