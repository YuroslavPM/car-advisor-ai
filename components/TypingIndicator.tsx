'use client';

import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="message-bubble flex gap-3 flex-row">
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md border border-amber-400/30"
        style={{ backgroundColor: '#1e3a5f' }}
      >
        <Bot size={18} style={{ color: '#f59e0b' }} />
      </div>

      {/* Dots */}
      <div
        className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm border"
        style={{
          background: 'rgba(255,255,255,0.7)',
          borderColor: 'rgba(30,58,95,0.15)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span className="typing-dot" />
        <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
        <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
      </div>
    </div>
  );
}
