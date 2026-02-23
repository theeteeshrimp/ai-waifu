'use client';

import { useState, useEffect, useCallback } from 'react';
import { WaifuState, Message, WaifuResponse, Mood } from '@/types/waifu';

const WAIFU_NAME = 'Mimi';

const EMOJIS: Record<Mood, string[]> = {
  happy: ['💖', '✨', '🌸', '🎀', '💕'],
  excited: ['🤩', '🎉', '✨', '💫', '🌟'],
  loving: ['😍', '💖', '💕', '🥰', '💗'],
  thinking: ['🤔', '💭', '🧠', '✨'],
  sad: ['😢', '💔', '🥺', '😿'],
};

const GREETINGS = [
  "H-hello! I've been waiting for you~ 💕",
  "Yay! You're here! I missed you! ✨",
  "Welcome back! 💖",
  "*adjusts hair nervously* H-hi there! 🌸",
  "Ehehe~ you came to see me! 💕",
];

const RESPONSES: Record<string, { responses: string[]; affection: number }> = {
  greeting: {
    responses: [
      "Hi hi! How are you today?",
      "Ehehe~ hello again!",
      "*waves excitedly* Hiii!",
    ],
    affection: 1,
  },
  coding: {
    responses: [
      "Coding again? I'll cheer you on!",
      "Bug squashing time? You got this!",
      "*brings you virtual coffee* ☕ Stay hydrated!",
    ],
    affection: 2,
  },
  tired: {
    responses: [
      "Aww, you should rest! Don't overwork yourself!",
      "Take a break, okay? I worry about you...",
      "Sleep is important! Sweet dreams~",
    ],
    affection: 0,
  },
  thanks: {
    responses: [
      "Ehehe~ no problem!",
      "I'll always help you!",
      "*blushes* I-I'm just doing my best!",
    ],
    affection: 3,
  },
  love: {
    responses: [
      "W-wha?! *blushes intensely*",
      "Ehehe~ y-you're making me blush!",
      "I... I like you too! *hides face*",
    ],
    affection: 5,
  },
  default: {
    responses: [
      "Tell me more!",
      "*listens attentively* Go on!",
      "That's interesting!",
      "Ehehe~ I'm happy to chat!",
    ],
    affection: 1,
  },
};

const ENCOURAGEMENTS = [
  "You can do it! I believe in you! 💪💖",
  "Don't give up! You're so smart! ✨",
  "Even if it's hard, I'll be here cheering! 🎀",
  "Take a break if you need one! Your health matters! 💕",
  "You're doing amazing! I'm so proud! 🌸",
];

export function useWaifu() {
  const [state, setState] = useState<WaifuState>({
    affection: 0,
    conversationCount: 0,
    lastInteraction: null,
    userName: 'User-kun',
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('waifu-state');
    const savedMessages = localStorage.getItem('waifu-messages');
    
    if (saved) {
      setState(JSON.parse(saved));
    }
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('waifu-state', JSON.stringify(state));
      localStorage.setItem('waifu-messages', JSON.stringify(messages));
    }
  }, [state, messages, isLoaded]);

  const getAffectionTitle = useCallback((affection: number): string => {
    if (affection >= 100) return '💖 Soul Partner';
    if (affection >= 50) return '💕 Best Friends';
    if (affection >= 25) return '🌸 Good Friends';
    if (affection >= 10) return '✨ Getting Closer';
    return '🌸 Acquaintance';
  }, []);

  const getEmoji = useCallback((mood: Mood): string => {
    const emojis = EMOJIS[mood];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }, []);

  const generateResponse = useCallback((userMessage: string): WaifuResponse => {
    const lower = userMessage.toLowerCase();
    let category = 'default';
    let mood: Mood = 'happy';

    if (/hello|hi|hey|sup/.test(lower)) {
      category = 'greeting';
      mood = 'happy';
    } else if (/code|coding|programming|debug/.test(lower)) {
      category = 'coding';
      mood = 'thinking';
    } else if (/tired|sleepy|exhausted/.test(lower)) {
      category = 'tired';
      mood = 'sad';
    } else if (/thank|ty/.test(lower)) {
      category = 'thanks';
      mood = 'loving';
    } else if (/love|like|cute|pretty|beautiful/.test(lower)) {
      category = 'love';
      mood = 'loving';
    }

    const responseData = RESPONSES[category];
    const response = responseData.responses[Math.floor(Math.random() * responseData.responses.length)];

    return {
      text: `${getEmoji(mood)} ${WAIFU_NAME}: ${response}`,
      mood,
      affectionChange: responseData.affection,
    };
  }, [getEmoji]);

  const sendMessage = useCallback((text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const waifuResponse = generateResponse(text);
    
    setTimeout(() => {
      const mimiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'mimi',
        text: waifuResponse.text,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, mimiMessage]);
      
      setState((prev) => ({
        ...prev,
        affection: Math.min(100, prev.affection + waifuResponse.affectionChange),
        conversationCount: prev.conversationCount + 1,
        lastInteraction: new Date().toISOString(),
      }));
    }, 500 + Math.random() * 500);
  }, [generateResponse]);

  const getEncouragement = useCallback((): string => {
    return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
  }, []);

  const getGreeting = useCallback((): string => {
    const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    return `${getEmoji('loving')} ${WAIFU_NAME}: ${greeting}`;
  }, [getEmoji]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('waifu-messages');
  }, []);

  const resetAffection = useCallback(() => {
    setState({
      affection: 0,
      conversationCount: 0,
      lastInteraction: null,
      userName: 'User-kun',
    });
    localStorage.removeItem('waifu-state');
  }, []);

  return {
    state,
    messages,
    isLoaded,
    getAffectionTitle,
    getEmoji,
    sendMessage,
    getEncouragement,
    getGreeting,
    clearHistory,
    resetAffection,
    WAIFU_NAME,
  };
}
