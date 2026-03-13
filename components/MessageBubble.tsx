'use client';

import ReactMarkdown from 'react-markdown';
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
        className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5"
        style={
          isUser
            ? { background: 'linear-gradient(135deg, #7c6af7, #6457e8)' }
            : { background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.2)' }
        }
      >
        {isUser ? <User size={15} color="white" /> : <Bot size={15} color="#34d399" />}
      </div>

      {/* Bubble */}
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className="px-4 py-3 text-sm leading-relaxed"
          style={
            isUser
              ? {
                  background: 'linear-gradient(135deg, #7c6af7, #6457e8)',
                  color: '#fff',
                  borderRadius: '18px 4px 18px 18px',
                  whiteSpace: 'pre-wrap',
                }
              : {
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#e2e8f0',
                  borderRadius: '4px 18px 18px 18px',
                }
          }
        >
          {isUser ? (
            message.content
          ) : (
            <ReactMarkdown
              components={{
                // Headings
                h1: ({ children }) => (
                  <h1 className="text-base font-bold mb-2 mt-3 first:mt-0" style={{ color: '#f1f5f9', fontFamily: 'Space Grotesk, sans-serif' }}>{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-sm font-bold mb-2 mt-3 first:mt-0" style={{ color: '#f1f5f9', fontFamily: 'Space Grotesk, sans-serif' }}>{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-semibold mb-1.5 mt-3 first:mt-0" style={{ color: '#a89cf8', fontFamily: 'Space Grotesk, sans-serif' }}>{children}</h3>
                ),
                // Paragraphs
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
                ),
                // Bold
                strong: ({ children }) => (
                  <strong style={{ color: '#f1f5f9', fontWeight: 600 }}>{children}</strong>
                ),
                // Italic
                em: ({ children }) => (
                  <em style={{ color: '#94a3b8' }}>{children}</em>
                ),
                // Unordered lists
                ul: ({ children }) => (
                  <ul className="mb-2 mt-1 space-y-1 pl-0" style={{ listStyle: 'none' }}>{children}</ul>
                ),
                // Ordered lists
                ol: ({ children }) => (
                  <ol className="mb-2 mt-1 space-y-1 pl-0" style={{ listStyleType: 'decimal', paddingLeft: '1.2rem' }}>{children}</ol>
                ),
                // List items
                li: ({ children }) => (
                  <li className="flex gap-2 text-sm leading-relaxed">
                    <span style={{ color: '#7c6af7', flexShrink: 0, marginTop: '2px' }}>▸</span>
                    <span>{children}</span>
                  </li>
                ),
                // Horizontal rule
                hr: () => (
                  <hr className="my-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                ),
                // Inline code
                code: ({ children }) => (
                  <code
                    className="px-1.5 py-0.5 rounded text-xs font-mono"
                    style={{ background: 'rgba(124,106,247,0.15)', color: '#a89cf8' }}
                  >
                    {children}
                  </code>
                ),
                // Blockquote
                blockquote: ({ children }) => (
                  <blockquote
                    className="pl-3 my-2 italic text-sm"
                    style={{ borderLeft: '3px solid #7c6af7', color: '#94a3b8' }}
                  >
                    {children}
                  </blockquote>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        <span className="text-xs mt-1 px-1" style={{ color: '#334155' }}>
          {formatTime(new Date(message.timestamp))}
        </span>
      </div>
    </div>
  );
}
