package com.healthcompanion.service;

import com.healthcompanion.dto.ChatRequest;
import com.healthcompanion.dto.ChatResponse;
import com.healthcompanion.entity.Conversation;
import com.healthcompanion.entity.Message;
import com.healthcompanion.repository.ConversationRepository;
import com.healthcompanion.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ChatService {

    private final GeminiService geminiService;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    public ChatService(GeminiService geminiService,
                       ConversationRepository conversationRepository,
                       MessageRepository messageRepository) {
        this.geminiService = geminiService;
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
    }

    @Transactional
    public ChatResponse processChat(ChatRequest request) {
        String conversationId = request.getConversationId();

        // 1. Ensure conversation exists
        if (conversationId == null || conversationId.isBlank() || !conversationRepository.existsById(conversationId)) {
            String title = request.getMessage().length() > 40
                    ? request.getMessage().substring(0, 40) + "..."
                    : request.getMessage();
            Conversation newConv = Conversation.builder()
                    .title(title)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            Conversation saved = conversationRepository.save(newConv);
            conversationId = saved.getId();
        } else {
            // Update conversation updatedAt
            conversationRepository.findById(conversationId).ifPresent(c -> {
                c.setUpdatedAt(LocalDateTime.now());
                conversationRepository.save(c);
            });
        }

        // 2. Save User Message
        Message userMsg = Message.builder()
                .conversationId(conversationId)
                .sender(Message.SenderRole.USER)
                .content(request.getMessage())
                .createdAt(LocalDateTime.now())
                .build();
        messageRepository.save(userMsg);

        // 3. Call Gemini AI with system safety prompts & profile context
        String aiResponseText = geminiService.generateHealthAdvice(
                request.getMessage(),
                request.getHealthProfile(),
                request.getAttachment()
        );

        boolean isWarning = aiResponseText.contains("⚠️") || 
                           aiResponseText.toLowerCase().contains("urgent medical") ||
                           aiResponseText.toLowerCase().contains("emergency");

        // 4. Save AI Message
        Message aiMsg = Message.builder()
                .conversationId(conversationId)
                .sender(Message.SenderRole.AI)
                .content(aiResponseText)
                .createdAt(LocalDateTime.now())
                .build();
        messageRepository.save(aiMsg);

        return ChatResponse.builder()
                .conversationId(conversationId)
                .message(aiResponseText)
                .timestamp(LocalDateTime.now().format(DateTimeFormatter.ofPattern("hh:mm a")))
                .isWarning(isWarning)
                .build();
    }

    public List<Conversation> getAllConversations() {
        return conversationRepository.findAllByOrderByUpdatedAtDesc();
    }

    public List<Message> getMessagesForConversation(String conversationId) {
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
    }

    @Transactional
    public void deleteConversation(String conversationId) {
        messageRepository.deleteByConversationId(conversationId);
        conversationRepository.deleteById(conversationId);
    }
}
