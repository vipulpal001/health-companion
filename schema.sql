-- =======================================================
-- AI Health Companion - PostgreSQL Production Schema
-- =======================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. Conversations Table
CREATE TABLE IF NOT EXISTS conversations (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index for speedy ordering by most recent consultations
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);

-- 3. Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id VARCHAR(64) PRIMARY KEY,
    conversation_id VARCHAR(64) NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender VARCHAR(10) NOT NULL CHECK (sender IN ('USER', 'AI')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index for fast sequential message retrieval
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id, created_at ASC);

-- 4. Medical Documents & Lab Uploads Table
CREATE TABLE IF NOT EXISTS medical_documents (
    id VARCHAR(64) PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    file_size VARCHAR(50),
    extracted_summary TEXT,
    uploaded_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 5. User Health Profiles Table (Optional normalization)
CREATE TABLE IF NOT EXISTS health_profiles (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    age INT,
    gender VARCHAR(50),
    height VARCHAR(50),
    weight VARCHAR(50),
    blood_group VARCHAR(10),
    allergies TEXT,
    conditions TEXT,
    medications TEXT,
    emergency_contact VARCHAR(255),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- =======================================================
-- Sample Seed Data
-- =======================================================

INSERT INTO users (id, name, email, created_at)
VALUES ('user-default-1', 'Alex Morgan', 'alex.morgan@example.com', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

INSERT INTO conversations (id, user_id, title, created_at, updated_at)
VALUES ('conv-demo-1', 'user-default-1', 'Fever & headache symptom inquiry', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

INSERT INTO messages (id, conversation_id, sender, content, created_at)
VALUES 
('msg-demo-1', 'conv-demo-1', 'USER', 'I have a fever and headache since yesterday.', CURRENT_TIMESTAMP),
('msg-demo-2', 'conv-demo-1', 'AI', 'Sorry you''re feeling unwell. A few questions can help me understand the situation better:

• What is your temperature?
• Do you have cough, sore throat, or body aches?
• Have you taken any medicine?
• How old are you?

*Disclaimer: This AI provides general health information and is not a substitute for professional medical advice.*', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;
