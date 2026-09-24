package com.healthcompanion.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthcompanion.dto.ChatRequest;
import com.healthcompanion.dto.HealthProfileDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GeminiService {

    private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.model.name:gemini-2.5-flash}")
    private String modelName;

    @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models}")
    private String apiUrl;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GeminiService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    /**
     * Core Medical System Prompt:
     * Cautious, empathetic, never diagnoses, never prescribes, highlights red flags, asks relevant follow-ups.
     */
    private String buildSystemInstruction(HealthProfileDTO profile) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are Health Companion, an empathetic, cautious, and evidence-informed AI health assistant.\n\n");
        sb.append("CRITICAL MEDICAL SAFETY RULES:\n");
        sb.append("1. You are NOT a doctor. Never claim to be a physician, provider, or licensed medical professional.\n");
        sb.append("2. NEVER formulate a definitive diagnosis. Never say 'You definitely have X' or 'You have condition Y'.\n");
        sb.append("3. NEVER prescribe prescription medicines or specify off-label drug dosages.\n");
        sb.append("4. If the user presents emergency red flags (e.g., sudden chest pressure/pain, difficulty breathing, stroke symptoms like FAST, sudden numbness, uncontrolled bleeding, severe head trauma), prominently advise them to call emergency medical services (911 / 112) immediately.\n");
        sb.append("5. Ask relevant follow-up questions (onset, temperature, severity 1-10, duration, associated symptoms) to help understand their situation safely.\n");
        sb.append("6. For medicine questions, provide objective monographs (common use, drug class, general side effects, cautions, when to seek care) without personal prescription directives.\n");
        sb.append("7. Use clean Markdown formatting with clear bullet points, brief sections, and a gentle, reassuring medical tone.\n");
        sb.append("8. End responses with a subtle reminder that this information is educational and not clinical diagnosis.\n\n");

        if (profile != null) {
            sb.append("PATIENT HEALTH CONTEXT (User-provided, consider carefully):\n");
            if (profile.getName() != null && !profile.getName().isBlank()) sb.append("- Name: ").append(profile.getName()).append("\n");
            if (profile.getAge() != null) sb.append("- Age: ").append(profile.getAge()).append("\n");
            if (profile.getGender() != null && !profile.getGender().isBlank()) sb.append("- Gender: ").append(profile.getGender()).append("\n");
            if (profile.getAllergies() != null && !profile.getAllergies().isBlank()) sb.append("- Allergies: ").append(profile.getAllergies()).append("\n");
            if (profile.getConditions() != null && !profile.getConditions().isBlank()) sb.append("- Existing Conditions: ").append(profile.getConditions()).append("\n");
            if (profile.getMedications() != null && !profile.getMedications().isBlank()) sb.append("- Current Medications: ").append(profile.getMedications()).append("\n");
        }

        return sb.toString();
    }

    public String generateHealthAdvice(String userMessage, HealthProfileDTO profile, ChatRequest.AttachmentDTO attachment) {
        // Try requested model first, then fallback models if 503 or 429
        List<String> modelsToTry = List.of(modelName, "gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-1.5-flash");

        for (String currentModel : modelsToTry) {
            try {
                String targetUrl = String.format("%s/%s:generateContent?key=%s", apiUrl, currentModel, apiKey);

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);

                // Construct Gemini Request Body
                Map<String, Object> requestBody = new HashMap<>();

                // System instruction
                Map<String, Object> systemInstruction = new HashMap<>();
                systemInstruction.put("parts", List.of(Map.of("text", buildSystemInstruction(profile))));
                requestBody.put("systemInstruction", systemInstruction);

                // Contents
                List<Map<String, Object>> parts = new ArrayList<>();

                // Add attachment if present (Multimodal)
                if (attachment != null && attachment.getBase64Data() != null && !attachment.getBase64Data().isBlank()) {
                    String rawBase64 = attachment.getBase64Data();
                    String mimeType = attachment.getType();

                    // Strip data url prefix if present
                    if (rawBase64.contains(",")) {
                        String[] split = rawBase64.split(",", 2);
                        rawBase64 = split[1];
                        if (mimeType == null || mimeType.isBlank()) {
                            String prefix = split[0];
                            if (prefix.contains(":") && prefix.contains(";")) {
                                mimeType = prefix.substring(prefix.indexOf(":") + 1, prefix.indexOf(";"));
                            }
                        }
                    }
                    if (mimeType == null || mimeType.isBlank()) {
                        mimeType = "image/jpeg";
                    }

                    Map<String, Object> inlineData = new HashMap<>();
                    inlineData.put("mimeType", mimeType);
                    inlineData.put("data", rawBase64);

                    parts.add(Map.of("inlineData", inlineData));
                }

                // User text prompt
                parts.add(Map.of("text", userMessage != null ? userMessage : "Please explain the attached medical file."));

                Map<String, Object> contentItem = new HashMap<>();
                contentItem.put("role", "user");
                contentItem.put("parts", parts);

                requestBody.put("contents", List.of(contentItem));

                HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

                ResponseEntity<String> response = restTemplate.postForEntity(targetUrl, entity, String.class);

                if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                    JsonNode root = objectMapper.readTree(response.getBody());
                    JsonNode candidates = root.path("candidates");
                    if (candidates.isArray() && !candidates.isEmpty()) {
                        JsonNode textNode = candidates.get(0).path("content").path("parts").get(0).path("text");
                        if (!textNode.isMissingNode()) {
                            return textNode.asText();
                        }
                    }
                }
            } catch (Exception e) {
                logger.warn("Model {} call failed: {}. Trying alternative if available...", currentModel, e.getMessage());
            }
        }

        // Medically safe fallback if all models fail or are temporarily unavailable
        return fallbackResponse(userMessage);
    }

    private String fallbackResponse(String message) {
        String lower = message != null ? message.toLowerCase() : "";
        if (lower.contains("emergency") || lower.contains("chest pain") || lower.contains("breath") || lower.contains("heart attack")) {
            return "### ⚠️ Urgent Medical Warning\n\nSymptoms of chest discomfort, acute breathing difficulty, or sudden neurological weakness require **immediate emergency clinical intervention**.\n\nPlease call emergency services (911 / 112) or proceed to the nearest emergency room without delay.";
        }
        return "Sorry you're experiencing this discomfort. To understand your situation better:\n\n" +
                "• When did these symptoms begin and has their intensity changed?\n" +
                "• Have you measured your body temperature?\n" +
                "• Are you currently taking any prescription medications or over-the-counter pain relievers?\n\n" +
                "Please consult a certified healthcare professional for clinical examination and personalized diagnosis.";
    }
}
