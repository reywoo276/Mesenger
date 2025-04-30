package com.example.mesenger.Model;
import lombok.Data;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder // <----- добавь эту аннотацию!
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User sender;

    @ManyToOne
    private User recipient;

    private String content;

    private LocalDateTime timestamp;
}