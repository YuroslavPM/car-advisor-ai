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
    <div className={`message-bubble flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
        style={
          isUser
            ? { background: 'linear-gradient(135deg, #7c6af7, #6457e8)' }
            : { background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.2)' }
        }
      >
        {isUser
          ? <User size={15} color="white" />
          : <Bot size={15} color="#34d399" />
        }
      </div>

      {/* Bubble */}
      <div className={`flex flex-col max-w-[76%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className="px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap"
          style={
            isUser
              ? {
                  background: 'linear-gradient(135deg, #7c6af7, #6457e8)',
                  color: '#fff',
                  borderRadius: '18px 4px 18px 18px',
                }
              : {
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#e2e8f0',
                  borderRadius: '4px 18px 18px 18px',
                }
          }
        >
          {message.content}
        </div>
        <span className="text-xs mt-1 px-1" style={{ color: '#334155' }}>
          {formatTime(new Date(message.timestamp))}
        </span>
      </div>
    </div>
  );
}
