'use client';

import { useState, useEffect } from 'react';
import { useWaifu } from '@/hooks/useWaifu';
import { ChatMessage } from '@/components/ChatMessage';
import { AffectionBar } from '@/components/AffectionBar';
import { StatusPanel } from '@/components/StatusPanel';

export default function Home() {
  const {
    state,
    messages,
    isLoaded,
    getAffectionTitle,
    sendMessage,
    getEncouragement,
    getGreeting,
    clearHistory,
    resetAffection,
    WAIFU_NAME,
  } = useWaifu();

  const [input, setInput] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  // Send greeting on first load
  useEffect(() => {
    if (isLoaded && !hasGreeted && messages.length === 0) {
      const greeting = getGreeting();
      setTimeout(() => {
        sendMessage('__GREETING__');
      }, 500);
      setHasGreeted(true);
    }
  }, [isLoaded, hasGreeted, messages.length, getGreeting, sendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

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

    if (input.toLowerCase() === 'encourage') {
      const encouragement = getEncouragement();
      sendMessage('__ENCOURAGE__');
      setTimeout(() => {
        const mimiMessage = {
          id: Date.now().toString(),
          sender: 'mimi' as const,
          text: `✨ ${WAIFU_NAME}: ${encouragement}`,
          timestamp: Date.now(),
        };
        // This is a workaround - in real implementation we'd modify the hook
        alert(encouragement);
      }, 100);
      setInput('');
      return;
    }

    sendMessage(input);
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
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            💖 AI Waifu 💖
          </h1>
          <p className="text-pink-500">Your adorable terminal companion</p>
        </div>

        {/* Affection Bar */}
        <AffectionBar 
          affection={state.affection} 
          title={getAffectionTitle(state.affection)} 
        />

        {/* Status Panel */}
        {showStatus && (
          <StatusPanel 
            state={state} 
            title={getAffectionTitle(state.affection)}
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
              </div>
            ) : (
              messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-pink-200 bg-pink-50/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message... (try: status, encourage, clear, reset)"
                className="flex-1 px-4 py-3 rounded-full border-2 border-pink-300 focus:border-pink-500 focus:outline-none bg-white text-gray-700 placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                💕
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-6 text-center text-sm text-pink-600/70">
          <p>💡 Try saying: hello, coding, tired, thank you, or cute things!</p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-pink-400">
          <p>Made with 💕 by Kimi-Claw 🦐</p>
        </div>
      </div>
    </main>
  );
}
