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
  } catch { return []; }
}

function persistCars(cars: SavedCar[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cars)); } catch { /* ignore */ }
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

  useEffect(() => { setSavedCars(loadSavedCars()); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    if (showChips) setShowChips(false);

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: chatHistory }),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'API error'); }
      const data = await res.json();
      const aiMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: data.response, timestamp: new Date() };
      setMessages((prev) => [...prev, aiMsg]);
      setChatHistory((prev) => [
        ...prev,
        { role: 'user', parts: [{ text: trimmed }] },
        { role: 'model', parts: [{ text: data.response }] },
      ]);
    } catch (err: unknown) {
      setMessages((prev) => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: err instanceof Error ? `⚠️ ${err.message}` : '⚠️ Something went wrong.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, chatHistory, showChips]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const handleNewChat = () => { setMessages([]); setChatHistory([]); setShowChips(true); setInput(''); };

  const addCar = (name: string, price: string, notes: string) => {
    const updated = [...savedCars, { id: crypto.randomUUID(), name, price, notes, addedAt: new Date() }];
    setSavedCars(updated); persistCars(updated);
  };

  const removeCar = (id: string) => {
    const updated = savedCars.filter((c) => c.id !== id);
    setSavedCars(updated); persistCars(updated);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ zIndex: 1, position: 'relative' }}>

      {/* ── Topbar ─────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-4 py-3 z-30"
        style={{
          background: 'rgba(10,15,30,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg transition-colors hover:bg-white/5"
            style={{ color: '#475569' }}
          >
            <ChevronLeft size={13} /> Home
          </Link>
          <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7c6af7, #6457e8)' }}
            >
              <Car size={14} color="white" />
            </div>
            <span
              className="font-bold text-base hidden sm:block"
              style={{ color: '#f1f5f9', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              CarAdvisor<span style={{ color: '#7c6af7' }}>AI</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNewChat}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#475569' }}
          >
            <RotateCcw size={12} />
            <span className="hidden sm:block">New Chat</span>
          </button>
          <button
            onClick={() => setShowSidebar((v) => !v)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              border: `1px solid ${showSidebar ? 'rgba(124,106,247,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: showSidebar ? '#a89cf8' : '#475569',
              background: showSidebar ? 'rgba(124,106,247,0.08)' : 'transparent',
            }}
          >
            <PanelRight size={12} />
            <span className="hidden sm:block">Saved</span>
            {savedCars.length > 0 && (
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded-md"
                style={{ background: 'rgba(124,106,247,0.2)', color: '#a89cf8' }}
              >
                {savedCars.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Chat column */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 custom-scrollbar">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-5 text-center pb-8">
                <div
                  className="float-anim w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'rgba(124,106,247,0.1)',
                    border: '1px solid rgba(124,106,247,0.2)',
                    boxShadow: '0 0 40px rgba(124,106,247,0.15)',
                  }}
                >
                  <Car size={30} color="#7c6af7" strokeWidth={1.5} />
                </div>
                <div>
                  <h2
                    className="text-2xl font-bold mb-1.5"
                    style={{ color: '#f1f5f9', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Ask me anything about cars
                  </h2>
                  <p className="text-sm" style={{ color: '#475569' }}>
                    Your AI automotive expert with 20+ years of experience.
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips */}
          {showChips && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => sendMessage(s)} className="chip">
                  <Sparkles size={11} style={{ color: '#7c6af7' }} />
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div
            className="flex-shrink-0 px-4 py-3"
            style={{
              background: 'rgba(10,15,30,0.8)',
              backdropFilter: 'blur(16px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              className="flex gap-2 items-end rounded-2xl px-4 py-2 transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
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
                className="flex-1 resize-none bg-transparent text-sm leading-relaxed py-1.5 disabled:opacity-40"
                style={{ color: '#e2e8f0', maxHeight: '140px', outline: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #7c6af7, #6457e8)' }}
                aria-label="Send"
              >
                <Send size={14} color="white" />
              </button>
            </div>
            <p className="text-center text-xs mt-1.5" style={{ color: '#1e293b' }}>
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <aside
            className="flex-shrink-0 w-68 p-3"
            style={{
              width: '272px',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(10,15,30,0.5)',
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

      {showModal && <AddCarModal onSave={addCar} onClose={() => setShowModal(false)} />}
    </div>
  );
}
