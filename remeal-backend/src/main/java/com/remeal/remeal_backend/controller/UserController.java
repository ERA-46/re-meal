package com.remeal.remeal_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.remeal.remeal_backend.model.User;
import com.remeal.remeal_backend.service.UserService;
import java.util.Map;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "http://localhost:3000") // frontend access
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User newUser = userService.registerUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        Map<String, Object> result = userService.loginUser(user.getEmail(), user.getPassword());
        return ResponseEntity.ok(result);
    }

}
