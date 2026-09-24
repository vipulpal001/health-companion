package com.healthcompanion.controller;

import com.healthcompanion.entity.MedicalDocument;
import com.healthcompanion.repository.MedicalDocumentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final MedicalDocumentRepository documentRepository;

    public DocumentController(MedicalDocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Uploaded file is empty"));
        }

        try {
            String fileName = file.getOriginalFilename();
            String contentType = file.getContentType();
            long sizeBytes = file.getSize();
            String formattedSize = String.format("%.1f KB", sizeBytes / 1024.0);

            byte[] bytes = file.getBytes();
            String base64 = Base64.getEncoder().encodeToString(bytes);

            MedicalDocument doc = MedicalDocument.builder()
                    .fileName(fileName != null ? fileName : "unnamed_document")
                    .fileType(contentType)
                    .fileSize(formattedSize)
                    .extractedSummary("Uploaded for conversational clinical context.")
                    .build();

            MedicalDocument saved = documentRepository.save(doc);

            return ResponseEntity.ok(Map.of(
                    "id", saved.getId(),
                    "name", saved.getFileName(),
                    "type", saved.getFileType(),
                    "size", saved.getFileSize(),
                    "extractedSummary", "Document processed securely for AI review.",
                    "base64Data", "data:" + contentType + ";base64," + base64
            ));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to process document file"));
        }
    }
}
