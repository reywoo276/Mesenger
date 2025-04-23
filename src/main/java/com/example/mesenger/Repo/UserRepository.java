package com.example.mesenger.Repo;

import com.example.mesenger.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByNickname(String nickname); // Метод для перевірки наявності нікнейму
}
