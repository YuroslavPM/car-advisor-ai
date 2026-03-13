'use client';

import { ChatSession } from '@/types';
import { MessageSquare, Plus, Trash2, Clock } from 'lucide-react';

interface ChatHistorySidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelect: (session: ChatSession) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function ChatHistorySidebar({
  sessions,
  activeSessionId,
  onSelect,
  onNew,
  onDelete,
}: ChatHistorySidebarProps) {
  // Sort newest first
  const sorted = [...sessions].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <aside
      className="flex flex-col h-full"
      style={{
        width: '240px',
        background: 'rgba(255,255,255,0.02)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 px-3 pt-3 pb-2"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <button
          onClick={onNew}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #7c6af7, #6457e8)',
            color: '#fff',
            fontFamily: 'Space Grotesk, sans-serif',
            boxShadow: '0 4px 12px rgba(124,106,247,0.3)',
          }}
        >
          <Plus size={13} />
          New Chat
        </button>
      </div>

      {/* Sessions list */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1 custom-scrollbar">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
            <MessageSquare size={22} style={{ color: '#334155' }} />
            <p className="text-xs" style={{ color: '#334155' }}>
              No chats yet.<br />Start a conversation!
            </p>
          </div>
        ) : (
          sorted.map((s) => {
            const isActive = s.id === activeSessionId;
            return (
              <div
                key={s.id}
                onClick={() => onSelect(s)}
                className="group relative flex flex-col gap-0.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                style={{
                  background: isActive
                    ? 'rgba(124,106,247,0.12)'
                    : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(124,106,247,0.25)' : 'transparent'}`,
                }}
              >
                {/* Delete btn */}
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(s.id); }}
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 rounded-md flex items-center justify-center hover:bg-red-500/20"
                  aria-label="Delete chat"
                >
                  <Trash2 size={11} color="#ef4444" />
                </button>

                <p
                  className="text-xs font-medium pr-5 truncate leading-snug"
                  style={{
                    color: isActive ? '#a89cf8' : '#94a3b8',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  {s.title}
                </p>
                <div className="flex items-center gap-1" style={{ color: '#334155' }}>
                  <Clock size={10} />
                  <span className="text-xs">{timeAgo(s.updatedAt)}</span>
                  <span className="text-xs ml-1">
                    · {Math.ceil(s.messages.length / 2)} msg{s.messages.length > 2 ? 's' : ''}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer count */}
      <div
        className="flex-shrink-0 px-3 py-2 text-xs"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: '#1e293b' }}
      >
        {sessions.length} conversation{sessions.length !== 1 ? 's' : ''}
      </div>
    </aside>
  );
}
