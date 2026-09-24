# 🌿 Health Companion — Production AI Health Web Application

A clean, minimal, modern, and medically cautious AI Health Companion built based on the user's reference design.

![Health Companion](https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80)

---

## 🌟 Highlights & Key Features

- **Exact Reference UI Matching**:
  - Twin organic leaves logo and center cross badge.
  - Heading: *"How are you feeling?"* & Subtitle: *"Tell me what you're experiencing. I'm here to help."*
  - Floating chat card with file attachment, photo upload, speech microphone, and send button.
  - 4 quick-start suggestion cards:
    1. *I have a fever and headache*
    2. *Tell me about this medicine*
    3. *Explain my lab report*
    4. *Tips for better sleep*
  - Clean sidebar with **Chat**, **Health Library**, **My Health**, and **Settings**.
  - Subtle bottom security badge: *"Your data is private and secure"*.

- **Medically Cautious AI System**:
  - Never diagnoses or claims to be a doctor.
  - Never prescribes pharmaceuticals or gives unsafe dosage advice.
  - Proactively triggers **Urgent Care / Emergency Warnings** for red flags (e.g. chest pain, difficulty breathing, stroke symptoms).
  - Prompts thoughtful clinical follow-up questions (duration, temperature, onset, other symptoms).
  - Includes transparent medical disclaimers on every interaction.

- **Multimodal Document & Lab Analysis**:
  - Accepts lab reports, prescriptions, and medical images (PDF, JPG, PNG).
  - Extracts and analyzes documents using Gemini's multimodal capabilities in plain, patient-friendly language.

- **Health Profile & Non-invasive Personalization**:
  - "My Health" page with age, blood group, allergies, existing conditions, medications, and emergency contacts.
  - Incorporated contextually into conversational answers without forcing sensitive disclosure.

- **Informative Health Library & Medicine Monographs**:
  - Structured monographs for common medications (Paracetamol, Ibuprofen, Cetirizine, Amoxicillin).
  - Direct 1-click consultation with AI about any article or medicine.

- **Settings & Privacy**:
  - Light mode (#FAFAF8) and Dark mode (#131514).
  - Chat history management and complete data erasure controls.

---

## 🛠 Tech Stack

- **Frontend**:
  - React 19 + TypeScript
  - Tailwind CSS
  - Lucide React Icons
  - React Markdown + Remark GFM
  - Web Speech API integration
  - Vite build tool & dev proxy

- **Backend**:
  - Spring Boot 3.4.3
  - Java 21 / 25
  - Spring Data JPA
  - PostgreSQL Driver + H2 fallback
  - Gemini REST API integration
  - RestTemplate + Jackson

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (v22+ installed)
- **Java**: JDK 21+ (Java 25 LTS installed)
- **Maven**: 3.9+ (Maven 3.9.16 installed)
- **PostgreSQL**: (Optional for production, running service detected)

---

### 2. Running the Backend (Spring Boot)

From the project root:

```bash
cd backend
mvn spring-boot:run
```

The backend server starts on `http://localhost:8080`.

#### Running with PostgreSQL
1. Ensure your PostgreSQL database `healthcompanion` exists:
   ```sql
   CREATE DATABASE healthcompanion;
   ```
2. Run the provided schema script:
   ```bash
   psql -U postgres -d healthcompanion -f schema.sql
   ```
3. Run with the PostgreSQL profile:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=postgres
   ```

---

### 3. Running the Frontend (React + Vite)

From the project root:

```bash
cd frontend
npm install
npm run dev
```

Visit the app in your browser at:
👉 **`http://localhost:5173`**

---

## 📋 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & system status |
| `POST` | `/api/chat` | Send symptom inquiry with profile context & attachments |
| `GET` | `/api/conversations` | Retrieve all past conversations |
| `GET` | `/api/conversations/{id}/messages` | Get message history for a conversation |
| `DELETE` | `/api/conversations/{id}` | Delete a conversation and associated messages |
| `POST` | `/api/documents/upload` | Upload PDF/image lab report or prescription |

---

## 🛡 Security & Medical Safety Safeguards

1. **Gemini API Key Isolation**: The API key is stored strictly on the backend and is never exposed to the client.
2. **Sanitized AI Prompts**: Every prompt is guarded by a comprehensive clinical system prompt that halts diagnostic assumptions.
3. **Emergency Care Red Flags**: Symptoms like crushing chest pain or acute dyspnea trigger immediate emergency recommendations.
4. **Data Isolation**: Health data can be cleared with a single button in Settings.
