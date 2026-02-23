'use client';

interface AffectionBarProps {
  affection: number;
  title: string;
}

export function AffectionBar({ affection, title }: AffectionBarProps) {
  const percentage = (affection / 100) * 100;
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-lg border-2 border-pink-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-pink-600 font-semibold">Affection Level</span>
        <span className="text-pink-500 text-sm">{title}</span>
      </div>
      <div className="w-full bg-pink-100 rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-pink-400 to-purple-400 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-center mt-1 text-sm text-pink-500">
        {affection} / 100 💕
      </div>
    </div>
  );
}
