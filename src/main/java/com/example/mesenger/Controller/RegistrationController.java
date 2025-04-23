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
        model.addAttribute("user", new User()); // Створюємо новий об'єкт User для передачі в шаблон
        return "register"; // Перевір, чи цей шаблон знаходиться в правильній папці templates
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user, Model model) {
        if (userRepository.existsByNickname(user.getNickname())) {
            model.addAttribute("error", "Нікнейм вже використовується");
            return "register"; // Повертаємо назад на форму, якщо є помилка
        }
        userRepository.save(user); // Зберігаємо користувача в базі
        model.addAttribute("success", "Успішна реєстрація!"); // Додаємо повідомлення про успіх
        return "redirect:/chat"; // Перенаправлення після успіху
    }
}


