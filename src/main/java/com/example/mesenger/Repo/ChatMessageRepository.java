package com.example.mesenger.Repo;

import com.example.mesenger.Model.ChatMessage;
import com.example.mesenger.Model.MessageStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {

    long countBySenderIdAndRecipientIdAndStatus(String senderId, String recipientId, MessageStatus status);

    List<ChatMessage> findByChatId(String chatId);

    @Modifying
    @Transactional
    @Query("UPDATE ChatMessage c SET c.status = :status WHERE c.senderId = :senderId AND c.recipientId = :recipientId")
    void updateMessageStatus(String senderId, String recipientId, MessageStatus status);
}

