'use client';

import { Message } from '@/types';
import { formatTime } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`message-bubble flex gap-3 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
          isUser
            ? 'bg-amber-500 text-white'
            : 'bg-navy-800 text-amber-400 border border-amber-400/30'
        }`}
        style={{
          backgroundColor: isUser ? '#d97706' : '#1e3a5f',
        }}
      >
        {isUser ? (
          <User size={18} />
        ) : (
          <Bot size={18} style={{ color: '#f59e0b' }} />
        )}
      </div>

      {/* Bubble */}
      <div className={`flex flex-col max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? 'rounded-tr-sm text-white'
              : 'rounded-tl-sm border'
          }`}
          style={
            isUser
              ? { background: 'linear-gradient(135deg, #d97706, #b45309)', color: '#fff' }
              : {
                  background: 'rgba(255,255,255,0.7)',
                  borderColor: 'rgba(30,58,95,0.15)',
                  color: '#1e293b',
                  backdropFilter: 'blur(8px)',
                }
          }
        >
          {message.content}
        </div>
        <span className="text-xs mt-1 opacity-50 px-1" style={{ color: '#64748b' }}>
          {formatTime(new Date(message.timestamp))}
        </span>
      </div>
    </div>
  );
}
