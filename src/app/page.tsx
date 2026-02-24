'use client';

import { useState, useEffect } from 'react';
import { useWaifu } from '@/hooks/useWaifu';
import { ChatMessage } from '@/components/ChatMessage';
import { AffectionBar } from '@/components/AffectionBar';
import { StatusPanel } from '@/components/StatusPanel';

export default function Home() {
  const {
    affection,
    messages,
    isLoaded,
    isTyping,
    getAffectionTitle,
    sendMessage,
    clearHistory,
    resetAffection,
    WAIFU_NAME,
  } = useWaifu();

  const [input, setInput] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [ollamaStatus, setOllamaStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check Ollama status
  useEffect(() => {
    const checkOllama = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'ping', affection: 0 }),
        });
        setOllamaStatus(response.ok ? 'online' : 'offline');
      } catch {
        setOllamaStatus('offline');
      }
    };
    
    if (isLoaded) {
      checkOllama();
      const interval = setInterval(checkOllama, 30000); // Check every 30s
      return () => clearInterval(interval);
    }
  }, [isLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    if (input.toLowerCase() === 'status') {
      setShowStatus(true);
      setInput('');
      return;
    }

    if (input.toLowerCase() === 'clear') {
      clearHistory();
      setInput('');
      return;
    }

    if (input.toLowerCase() === 'reset') {
      resetAffection();
      setInput('');
      return;
    }

    await sendMessage(input);
    setInput('');
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-4xl animate-bounce">🌸</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            💖 AI Waifu 💖
          </h1>
          <p className="text-pink-500">Your local Ollama-powered companion</p>
          
          {/* Ollama Status */}
          <div className={`mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            ollamaStatus === 'online' 
              ? 'bg-green-100 text-green-700' 
              : ollamaStatus === 'offline'
              ? 'bg-red-100 text-red-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              ollamaStatus === 'online' ? 'bg-green-500' 
              : ollamaStatus === 'offline' ? 'bg-red-500' 
              : 'bg-yellow-500 animate-pulse'
            }`} />
            Ollama {ollamaStatus === 'checking' ? 'checking...' : ollamaStatus}
          </div>
        </div>

        {/* Affection Bar */}
        <AffectionBar 
          affection={affection} 
          title={getAffectionTitle(affection)} 
        />

        {/* Status Panel */}
        {showStatus && (
          <StatusPanel 
            affection={affection}
            messageCount={messages.length}
            title={getAffectionTitle(affection)}
            ollamaStatus={ollamaStatus}
            onClose={() => setShowStatus(false)}
          />
        )}

        {/* Chat Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border-2 border-pink-200">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <div className="text-6xl mb-4">🌸</div>
                <p>Say hello to start chatting with {WAIFU_NAME}!</p>
                <p className="text-sm mt-2">Make sure Ollama is running with llama3.2</p>
              </div>
            ) : (
              messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))
            )}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-pink-200 text-gray-400 px-4 py-3 rounded-2xl rounded-bl-md">
                  <span className="animate-pulse">Mimi is typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-pink-200 bg-pink-50/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message... (try: status, clear, reset)"
                disabled={isTyping}
                className="flex-1 px-4 py-3 rounded-full border-2 border-pink-300 focus:border-pink-500 focus:outline-none bg-white text-gray-700 placeholder-gray-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="px-6 py-3 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                💕
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-6 text-center text-sm text-pink-600/70">
          <p>💡 Running locally with Ollama + Llama 3.2 on your RTX 3070!</p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-pink-400">
          <p>Made with 💕 by Kimi-Claw 🦐</p>
        </div>
      </div>
    </main>
  );
}
