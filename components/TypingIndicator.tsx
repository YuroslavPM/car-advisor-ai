'use client';

import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="message-bubble flex gap-3 flex-row">
      <div
        className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.2)' }}
      >
        <Bot size={15} color="#34d399" />
      </div>
      <div
        className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '4px 18px 18px 18px',
        }}
      >
        <span className="typing-dot" />
        <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
        <span className="typing-dot" style={{ animationDelay: '0.30s' }} />
      </div>
    </div>
  );
}
