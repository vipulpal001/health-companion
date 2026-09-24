package com.healthcompanion.dto;

public class ChatResponse {
    private String conversationId;
    private String message;
    private String timestamp;
    private boolean isWarning;

    public ChatResponse() {}

    public ChatResponse(String conversationId, String message, String timestamp, boolean isWarning) {
        this.conversationId = conversationId;
        this.message = message;
        this.timestamp = timestamp;
        this.isWarning = isWarning;
    }

    public static ChatResponseBuilder builder() {
        return new ChatResponseBuilder();
    }

    public static class ChatResponseBuilder {
        private String conversationId;
        private String message;
        private String timestamp;
        private boolean isWarning;

        public ChatResponseBuilder conversationId(String conversationId) { this.conversationId = conversationId; return this; }
        public ChatResponseBuilder message(String message) { this.message = message; return this; }
        public ChatResponseBuilder timestamp(String timestamp) { this.timestamp = timestamp; return this; }
        public ChatResponseBuilder isWarning(boolean isWarning) { this.isWarning = isWarning; return this; }
        public ChatResponse build() {
            return new ChatResponse(conversationId, message, timestamp, isWarning);
        }
    }

    public String getConversationId() { return conversationId; }
    public void setConversationId(String conversationId) { this.conversationId = conversationId; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
    public boolean isWarning() { return isWarning; }
    public void setWarning(boolean warning) { isWarning = warning; }
}
