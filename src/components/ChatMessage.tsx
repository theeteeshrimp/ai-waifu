'use client';

import { Message } from '@/types/waifu';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-pink-500 text-white rounded-br-md'
            : 'bg-white border-2 border-pink-200 text-gray-700 rounded-bl-md shadow-sm'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <span className={`text-xs mt-1 block ${isUser ? 'text-pink-100' : 'text-gray-400'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
