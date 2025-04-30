package com.example.mesenger.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class SendMessageRequest {
    @NotNull
    private Long recipientId;

    @NotBlank
    private String content;
}
