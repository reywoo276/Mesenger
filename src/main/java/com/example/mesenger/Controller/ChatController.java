package com.example.mesenger.Controller;


import com.example.mesenger.DTO.SendMessageRequest;
import com.example.mesenger.Model.ChatMessage;
import com.example.mesenger.Model.User;
import com.example.mesenger.Repo.ChatMessageRepository;
import com.example.mesenger.Repo.UserRepository;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody @Valid SendMessageRequest request
    ) {
        User sender = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        User recipient = userRepository.findById(request.getRecipientId())
                .orElseThrow(() -> new RuntimeException("Recipient not found"));

        ChatMessage message = ChatMessage.builder()
                .sender(sender)
                .recipient(recipient)
                .content(request.getContent())
                .timestamp(LocalDateTime.now())
                .build();

        chatMessageRepository.save(message);

        return ResponseEntity.ok("Message sent successfully");
    }

    @GetMapping("/conversation/{userId}")
    public ResponseEntity<List<ChatMessage>> getConversation(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long userId
    ) {
        User currentUser = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<ChatMessage> conversation = chatMessageRepository
                .findConversation(currentUser.getId(), userId);

        return ResponseEntity.ok(conversation);
    }
}
