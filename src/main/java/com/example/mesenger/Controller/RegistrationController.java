package com.example.mesenger.Controller;

import com.example.mesenger.Model.User;
import com.example.mesenger.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class RegistrationController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        return "registration"; // назва шаблону: registration.html
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user, Model model) {
        if (userRepository.existsByNickname(user.getNickname())) {
            model.addAttribute("error", "Нікнейм вже використовується");
            model.addAttribute("user", user); // Щоб не втратити значення
            return "registration";
        }
        userRepository.save(user);
        model.addAttribute("success", "Успішна реєстрація!");
        model.addAttribute("user", new User()); // Очищена форма
        return "registration";
    }
}