export interface WaifuState {
  affection: number;
  conversationCount: number;
  lastInteraction: string | null;
  userName: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'mimi';
  text: string;
  timestamp: number;
}

export type Mood = 'happy' | 'excited' | 'loving' | 'thinking' | 'sad';

export interface WaifuResponse {
  text: string;
  mood: Mood;
  affectionChange: number;
}
