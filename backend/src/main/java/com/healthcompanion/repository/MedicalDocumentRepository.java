package com.healthcompanion.repository;

import com.healthcompanion.entity.MedicalDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalDocumentRepository extends JpaRepository<MedicalDocument, String> {
    List<MedicalDocument> findAllByOrderByUploadedAtDesc();
}
