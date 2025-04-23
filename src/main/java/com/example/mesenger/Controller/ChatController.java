package com.example.mesenger.Controller;

import com.example.mesenger.Model.Chat;
import com.example.mesenger.Model.ChatMessage;
import com.example.mesenger.Repo.ChatMessageRepository;
import com.example.mesenger.Repo.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {

    @Autowired
    private ChatMessageRepository messageRepository;

    @Autowired
    private ChatRepository chatRepository;

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessage message) {
        if (message.getChat() == null || message.getChat().getId() == null) {
            Chat defaultChat = chatRepository.findById(1L).orElseThrow(); // або створити новий чат
            message.setChat(defaultChat);
        }
        return messageRepository.save(message);
    }

    @GetMapping("/chat")
    public String chatPage() {
        return "index";
    }
}
