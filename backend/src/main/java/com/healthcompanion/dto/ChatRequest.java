package com.healthcompanion.dto;

import jakarta.validation.constraints.NotBlank;

public class ChatRequest {

    @NotBlank(message = "Message content must not be blank")
    private String message;

    private String conversationId;

    private HealthProfileDTO healthProfile;

    private AttachmentDTO attachment;

    public ChatRequest() {}

    public ChatRequest(String message, String conversationId, HealthProfileDTO healthProfile, AttachmentDTO attachment) {
        this.message = message;
        this.conversationId = conversationId;
        this.healthProfile = healthProfile;
        this.attachment = attachment;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getConversationId() { return conversationId; }
    public void setConversationId(String conversationId) { this.conversationId = conversationId; }
    public HealthProfileDTO getHealthProfile() { return healthProfile; }
    public void setHealthProfile(HealthProfileDTO healthProfile) { this.healthProfile = healthProfile; }
    public AttachmentDTO getAttachment() { return attachment; }
    public void setAttachment(AttachmentDTO attachment) { this.attachment = attachment; }

    public static class AttachmentDTO {
        private String name;
        private String type;
        private String base64Data;

        public AttachmentDTO() {}

        public AttachmentDTO(String name, String type, String base64Data) {
            this.name = name;
            this.type = type;
            this.base64Data = base64Data;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public String getBase64Data() { return base64Data; }
        public void setBase64Data(String base64Data) { this.base64Data = base64Data; }
    }
}
