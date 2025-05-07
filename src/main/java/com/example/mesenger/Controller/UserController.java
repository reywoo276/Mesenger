package com.example.mesenger.Controller;

import com.example.mesenger.Model.User;
import com.example.mesenger.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/findByEmail")
    public ResponseEntity<?> findByEmail(@RequestParam String email) {
        User user = userService.getByEmail(email);
        if (user != null) {
            return ResponseEntity.ok().body(Map.of("userId", user.getId()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

}
