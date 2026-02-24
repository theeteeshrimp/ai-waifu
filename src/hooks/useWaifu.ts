'use client';

import { useState, useEffect, useCallback } from 'react';
import { Message } from '@/types/waifu';

const WAIFU_NAME = 'Mimi';

export function useWaifu() {
  const [affection, setAffection] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedAffection = localStorage.getItem('waifu-affection');
    const savedMessages = localStorage.getItem('waifu-messages');
    
    if (savedAffection) setAffection(parseInt(savedAffection, 10));
    if (savedMessages) setMessages(JSON.parse(savedMessages));
    
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('waifu-affection', affection.toString());
      localStorage.setItem('waifu-messages', JSON.stringify(messages));
    }
  }, [affection, messages, isLoaded]);

  const getAffectionTitle = useCallback((level: number): string => {
    if (level >= 100) return '💖 Soul Partner';
    if (level >= 50) return '💕 Best Friends';
    if (level >= 25) return '🌸 Good Friends';
    if (level >= 10) return '✨ Getting Closer';
    return '🌸 Acquaintance';
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, affection }),
      });

      const data = await response.json();

      const mimiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'mimi',
        text: data.response || "Ehehe~ I'm not sure what to say... 💕",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, mimiMessage]);
      
      // Increase affection slightly with each message
      setAffection((prev) => Math.min(100, prev + 1));
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'mimi',
        text: "Oh no! Something went wrong... 😢 Please check if Ollama is running!",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [affection]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('waifu-messages');
  }, []);

  const resetAffection = useCallback(() => {
    setAffection(0);
    localStorage.removeItem('waifu-affection');
  }, []);

  return {
    affection,
    messages,
    isLoaded,
    isTyping,
    getAffectionTitle,
    sendMessage,
    clearHistory,
    resetAffection,
    WAIFU_NAME,
  };
}
