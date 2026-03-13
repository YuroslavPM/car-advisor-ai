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
