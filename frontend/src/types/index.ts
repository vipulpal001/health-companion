export type Role = 'USER' | 'AI';

export interface HealthProfile {
  name: string;
  age: number | '';
  gender: string;
  height: string;
  weight: string;
  bloodGroup: string;
  allergies: string;
  conditions: string;
  medications: string;
  emergencyContact: string;
}

export interface ChatMessage {
  id: string;
  conversationId?: string;
  sender: Role;
  content: string;
  timestamp: string;
  attachments?: {
    name: string;
    type: string;
    size?: string;
    url?: string;
  }[];
  isWarning?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messageCount?: number;
}

export interface MedicineInfo {
  name: string;
  commonUse: string;
  drugClass: string;
  sideEffects: string[];
  warnings: string[];
  whenToSeekHelp: string[];
}

export interface LibraryItem {
  id: string;
  title: string;
  category: 'Common Symptoms' | 'Medicines' | 'Nutrition' | 'Sleep' | 'Fitness' | 'Mental Wellness' | 'First Aid';
  summary: string;
  readTime: string;
  content: string;
  tags: string[];
}
