package com.example.mesenger.Service;

import com.example.mesenger.Exceptions.ResourceNotFoundException;
import com.example.mesenger.Model.ChatMessage;
import com.example.mesenger.Model.MessageStatus;
import com.example.mesenger.Repo.ChatMessageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageService {
    @Autowired
    private ChatMessageRepository repository;

    @Autowired
    private ChatRoomService chatRoomService;

    public ChatMessage save(ChatMessage chatMessage) {
        chatMessage.setStatus(MessageStatus.RECEIVED);
        return repository.save(chatMessage);
    }

    public long countNewMessages(String senderId, String recipientId) {
        return repository.countBySenderIdAndRecipientIdAndStatus(
                senderId, recipientId, MessageStatus.RECEIVED);
    }

    public List<ChatMessage> findChatMessages(String senderId, String recipientId) {
        var chatId = chatRoomService.getChatId(senderId, recipientId, true);

        if (chatId.isEmpty()) {
            System.out.println("⚠️ Chat ID не найден для: " + senderId + " и " + recipientId);
            return List.of();
        }

        var messages = repository.findByChatId(chatId.get());

        if (!messages.isEmpty()) {
            updateStatuses(senderId, recipientId, MessageStatus.DELIVERED);
        }

        return messages;
    }

    public ChatMessage findById(String id) {
        return repository.findById(id)
                .map(chatMessage -> {
                    chatMessage.setStatus(MessageStatus.DELIVERED);
                    return repository.save(chatMessage);
                })
                .orElseThrow(() ->
                        new ResourceNotFoundException("can't find message (" + id + ")"));
    }

    @Transactional
    public void updateStatuses(String senderId, String recipientId, MessageStatus status) {
        repository.updateMessageStatus(senderId, recipientId, status);
    }
}
