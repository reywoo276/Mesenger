package com.example.mesenger.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nickname;

    // Додай ще один конструктор без параметрів, якщо раптом Thymeleaf вимагає його
    public User() {}
}
