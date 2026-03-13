export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SavedCar {
  id: string;
  name: string;
  price: string;
  notes?: string;
  addedAt: Date;
}

export interface ChatHistory {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface ChatSession {
  id: string;
  title: string;          // auto-generated from first user message
  messages: Message[];
  history: ChatHistory[]; // Gemini-format history for API
  createdAt: string;      // ISO string for JSON serialization
  updatedAt: string;
}
