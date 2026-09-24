package com.healthcompanion.controller;

import com.healthcompanion.dto.ChatRequest;
import com.healthcompanion.dto.ChatResponse;
import com.healthcompanion.entity.Conversation;
import com.healthcompanion.entity.Message;
import com.healthcompanion.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "app", "Health Companion AI",
                "mode", "Production Cautious Health Assistant"
        ));
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        ChatResponse response = chatService.processChat(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<Conversation>> getConversations() {
        return ResponseEntity.ok(chatService.getAllConversations());
    }

    @GetMapping("/conversations/{id}/messages")
    public ResponseEntity<List<Message>> getConversationMessages(@PathVariable String id) {
        return ResponseEntity.ok(chatService.getMessagesForConversation(id));
    }

    @DeleteMapping("/conversations/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteConversation(@PathVariable String id) {
        chatService.deleteConversation(id);
        return ResponseEntity.ok(Map.of("deleted", true));
    }
}
