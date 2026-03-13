'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Send, RotateCcw, Car, PanelRight, ChevronLeft, Sparkles } from 'lucide-react';
import MessageBubble from '@/components/MessageBubble';
import TypingIndicator from '@/components/TypingIndicator';
import SavedCarsSidebar from '@/components/SavedCarsSidebar';
import AddCarModal from '@/components/AddCarModal';
import { Message, SavedCar, ChatHistory } from '@/types';

const SUGGESTIONS = [
  'Recommend a car under €15,000',
  'Compare VW Golf vs Toyota Corolla',
  'Best family car under €20,000',
  'Electric or hybrid — which is better?',
  'Most reliable cars for daily use',
];

const STORAGE_KEY = 'caradvisor_saved_cars';

function loadSavedCars(): SavedCar[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistCars(cars: SavedCar[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  } catch {
    /* ignore */
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [savedCars, setSavedCars] = useState<SavedCar[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [showChips, setShowChips] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load saved cars from localStorage on mount
  useEffect(() => {
    setSavedCars(loadSavedCars());
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      // Hide chips after first message
      if (showChips) setShowChips(false);

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, history: chatHistory }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'API error');
        }

        const data = await res.json();
        const aiMsg: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMsg]);
        setChatHistory((prev) => [
          ...prev,
          { role: 'user', parts: [{ text: trimmed }] },
          { role: 'model', parts: [{ text: data.response }] },
        ]);
      } catch (err: unknown) {
        const errorMsg: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            err instanceof Error
              ? `⚠️ ${err.message}`
              : '⚠️ Something went wrong. Please try again.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping, chatHistory, showChips]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setChatHistory([]);
    setShowChips(true);
    setInput('');
  };

  const addCar = (name: string, price: string, notes: string) => {
    const newCar: SavedCar = {
      id: crypto.randomUUID(),
      name,
      price,
      notes,
      addedAt: new Date(),
    };
    const updated = [...savedCars, newCar];
    setSavedCars(updated);
    persistCars(updated);
  };

  const removeCar = (id: string) => {
    const updated = savedCars.filter((c) => c.id !== id);
    setSavedCars(updated);
    persistCars(updated);
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ position: 'relative', zIndex: 1 }}
    >
      {/* ── Topbar ──────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b z-30"
        style={{
          background: 'rgba(253,246,236,0.9)',
          backdropFilter: 'blur(16px)',
          borderColor: 'rgba(30,58,95,0.1)',
        }}
      >
        {/* Logo + back */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors hover:bg-navy/5"
            style={{ color: '#64748b' }}
          >
            <ChevronLeft size={14} />
            Home
          </Link>
          <div className="w-px h-4" style={{ background: 'rgba(30,58,95,0.2)' }} />
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #d97706, #b45309)' }}
            >
              <Car size={15} color="white" />
            </div>
            <span
              className="font-bold text-base hidden sm:block"
              style={{ color: '#1e3a5f', fontFamily: 'Playfair Display, serif' }}
            >
              CarAdvisor<span style={{ color: '#d97706' }}>AI</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleNewChat}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-all hover:bg-amber-50 active:scale-95"
            style={{ borderColor: 'rgba(30,58,95,0.2)', color: '#64748b' }}
          >
            <RotateCcw size={13} />
            <span className="hidden sm:block">New Chat</span>
          </button>
          <button
            onClick={() => setShowSidebar((v) => !v)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-all active:scale-95"
            style={{
              borderColor: showSidebar ? '#d97706' : 'rgba(30,58,95,0.2)',
              color: showSidebar ? '#d97706' : '#64748b',
              background: showSidebar ? 'rgba(217,119,6,0.08)' : 'transparent',
            }}
          >
            <PanelRight size={13} />
            <span className="hidden sm:block">Saved</span>
            {savedCars.length > 0 && (
              <span
                className="ml-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: 'rgba(217,119,6,0.15)', color: '#d97706' }}
              >
                {savedCars.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Chat column */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 custom-scrollbar">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center pb-8">
                <div
                  className="float-anim w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #1e3a5f, #162d4a)' }}
                >
                  <Car size={32} color="#f59e0b" />
                </div>
                <div>
                  <h2
                    className="text-2xl font-bold mb-1"
                    style={{ color: '#1e3a5f', fontFamily: 'Playfair Display, serif' }}
                  >
                    Ask me anything about cars
                  </h2>
                  <p className="text-sm" style={{ color: '#64748b' }}>
                    I&apos;m your AI automotive expert with 20+ years of experience.
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips */}
          {showChips && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="chip"
                >
                  <Sparkles size={12} style={{ color: '#d97706' }} />
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div
            className="flex-shrink-0 px-4 py-3 border-t"
            style={{
              background: 'rgba(253,246,236,0.85)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(30,58,95,0.1)',
            }}
          >
            <div
              className="flex gap-2 items-end rounded-2xl border px-4 py-2 transition-all"
              style={{
                background: 'rgba(255,255,255,0.8)',
                borderColor: 'rgba(30,58,95,0.2)',
              }}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask about your next car…"
                disabled={isTyping}
                className="flex-1 resize-none bg-transparent text-sm leading-relaxed py-1.5 disabled:opacity-50"
                style={{ color: '#1e293b', maxHeight: '160px', outline: 'none' }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #d97706, #b45309)' }}
                aria-label="Send message"
              >
                <Send size={16} color="white" />
              </button>
            </div>
            <p className="text-center text-xs mt-1.5" style={{ color: '#94a3b8' }}>
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>

        {/* ── Sidebar ──────────────────────────────────── */}
        {showSidebar && (
          <aside
            className="flex-shrink-0 w-72 border-l p-3"
            style={{
              background: 'rgba(253,246,236,0.7)',
              borderColor: 'rgba(30,58,95,0.1)',
            }}
          >
            <SavedCarsSidebar
              cars={savedCars}
              onRemove={removeCar}
              onAddClick={() => setShowModal(true)}
            />
          </aside>
        )}
      </div>

      {/* ── Modal ───────────────────────────────────────── */}
      {showModal && (
        <AddCarModal
          onSave={addCar}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
