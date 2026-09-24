package com.healthcompanion.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_documents")
public class MedicalDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "file_type")
    private String fileType;

    @Column(name = "file_size")
    private String fileSize;

    @Column(columnDefinition = "TEXT")
    private String extractedSummary;

    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;

    public MedicalDocument() {}

    public MedicalDocument(String id, String fileName, String fileType, String fileSize, String extractedSummary, LocalDateTime uploadedAt) {
        this.id = id;
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.extractedSummary = extractedSummary;
        this.uploadedAt = uploadedAt;
    }

    public static MedicalDocumentBuilder builder() {
        return new MedicalDocumentBuilder();
    }

    public static class MedicalDocumentBuilder {
        private String id;
        private String fileName;
        private String fileType;
        private String fileSize;
        private String extractedSummary;
        private LocalDateTime uploadedAt;

        public MedicalDocumentBuilder id(String id) { this.id = id; return this; }
        public MedicalDocumentBuilder fileName(String fileName) { this.fileName = fileName; return this; }
        public MedicalDocumentBuilder fileType(String fileType) { this.fileType = fileType; return this; }
        public MedicalDocumentBuilder fileSize(String fileSize) { this.fileSize = fileSize; return this; }
        public MedicalDocumentBuilder extractedSummary(String extractedSummary) { this.extractedSummary = extractedSummary; return this; }
        public MedicalDocumentBuilder uploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; return this; }
        public MedicalDocument build() {
            return new MedicalDocument(id, fileName, fileType, fileSize, extractedSummary, uploadedAt);
        }
    }

    @PrePersist
    protected void onCreate() {
        if (uploadedAt == null) {
            uploadedAt = LocalDateTime.now();
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }
    public String getFileSize() { return fileSize; }
    public void setFileSize(String fileSize) { this.fileSize = fileSize; }
    public String getExtractedSummary() { return extractedSummary; }
    public void setExtractedSummary(String extractedSummary) { this.extractedSummary = extractedSummary; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
}
