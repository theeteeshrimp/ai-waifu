export interface Message {
  id: string;
  sender: 'user' | 'mimi';
  text: string;
  timestamp: number;
}
