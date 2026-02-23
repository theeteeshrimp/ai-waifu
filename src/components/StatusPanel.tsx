'use client';

import { WaifuState } from '@/types/waifu';

interface StatusPanelProps {
  state: WaifuState;
  title: string;
  onClose: () => void;
}

export function StatusPanel({ state, title, onClose }: StatusPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-pink-300">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">✨</div>
          <h2 className="text-xl font-bold text-pink-600">Mimi's Status</h2>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-pink-50 rounded-xl">
            <span className="text-gray-600">Affection</span>
            <span className="text-pink-600 font-semibold">{state.affection}/100</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
            <span className="text-gray-600">Relationship</span>
            <span className="text-purple-600 font-semibold">{title}</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
            <span className="text-gray-600">Total Chats</span>
            <span className="text-blue-600 font-semibold">{state.conversationCount}</span>
          </div>
          
          {state.lastInteraction && (
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
              <span className="text-gray-600">Last Chat</span>
              <span className="text-green-600 text-sm">
                {new Date(state.lastInteraction).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold transition-colors"
        >
          Close 💕
        </button>
      </div>
    </div>
  );
}
