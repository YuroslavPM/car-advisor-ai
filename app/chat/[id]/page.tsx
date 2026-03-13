'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Send, Car, PanelRight, ChevronLeft,
  Sparkles, History,
} from 'lucide-react';
import MessageBubble from '@/components/MessageBubble';
import TypingIndicator from '@/components/TypingIndicator';
import SavedCarsSidebar from '@/components/SavedCarsSidebar';
import AddCarModal from '@/components/AddCarModal';
import ChatHistorySidebar from '@/components/ChatHistorySidebar';
import { Message, SavedCar, ChatHistory, ChatSession } from '@/types';

const SUGGESTIONS = [
  'Recommend a car under €15,000',
  'Compare VW Golf vs Toyota Corolla',
  'Best family car under €20,000',
  'Electric or hybrid — which is better?',
  'Most reliable cars for daily use',
];

const SESSIONS_KEY = 'caradvisor_sessions';
const CARS_KEY     = 'caradvisor_saved_cars';

// ── Storage helpers ───────────────────────────────────────────────
function loadSessions(): ChatSession[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(SESSIONS_KEY) || '[]'); }
  catch { return []; }
}
function saveSessions(s: ChatSession[]) {
  try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(s)); }
  catch { /* ignore */ }
}
function loadCars(): SavedCar[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(CARS_KEY) || '[]'); }
  catch { return []; }
}
function saveCars(c: SavedCar[]) {
  try { localStorage.setItem(CARS_KEY, JSON.stringify(c)); }
  catch { /* ignore */ }
}
function makeTitle(text: string) {
  return text.length > 46 ? text.slice(0, 43) + '…' : text;
}

// ── Page ──────────────────────────────────────────────────────────
export default function ChatSessionPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;

  const [sessions,    setSessions]    = useState<ChatSession[]>([]);
  const [messages,    setMessages]    = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [input,       setInput]       = useState('');
  const [isTyping,    setIsTyping]    = useState(false);
  const [showChips,   setShowChips]   = useState(true);
  const [showSaved,   setShowSaved]   = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showModal,   setShowModal]   = useState(false);
  const [savedCars,   setSavedCars]   = useState<SavedCar[]>([]);
  const [ready,       setReady]       = useState(false);

  const bottomRef   = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Bootstrap: load session from localStorage ─────────────────
  useEffect(() => {
    const all = loadSessions();
    setSessions(all);
    setSavedCars(loadCars());

    const found = all.find(s => s.id === sessionId);
    if (found) {
      setMessages(found.messages);
      setChatHistory(found.history);
      setShowChips(found.messages.length === 0);
    }
    // If not found: session is brand-new — keep in state only, don't write to storage yet.
    // It will be persisted when the first message is sent.
    setReady(true);
  }, [sessionId]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  // ── Persist session ───────────────────────────────────────────
  const persistSession = useCallback(
    (msgs: Message[], hist: ChatHistory[], firstText?: string) => {
      setSessions(prev => {
        const exists = prev.some(s => s.id === sessionId);
        const sessionData: ChatSession = exists
          ? prev.find(s => s.id === sessionId)!
          : {
              id: sessionId,
              title: 'New conversation',
              messages: [],
              history: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
        const updated = exists
          ? prev.map(s => s.id !== sessionId ? s : {
              ...sessionData,
              title: firstText ? makeTitle(firstText) : sessionData.title,
              messages: msgs,
              history: hist,
              updatedAt: new Date().toISOString(),
            })
          : [{
              ...sessionData,
              title: firstText ? makeTitle(firstText) : sessionData.title,
              messages: msgs,
              history: hist,
              updatedAt: new Date().toISOString(),
            }, ...prev];
        saveSessions(updated);
        return updated;
      });
    },
    [sessionId]
  );

  // ── Navigate to a session (updates URL) ───────────────────────
  const goToSession = useCallback((session: ChatSession) => {
    router.push(`/chat/${session.id}`);
  }, [router]);

  // ── New chat ──────────────────────────────────────────────────
  const handleNewChat = useCallback(() => {
    const newId = crypto.randomUUID();
    const fresh: ChatSession = {
      id: newId,
      title: 'New conversation',
      messages: [],
      history: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSessions(prev => {
      const updated = [fresh, ...prev];
      saveSessions(updated);
      return updated;
    });
    router.push(`/chat/${newId}`);
  }, [router]);

  // ── Delete session ────────────────────────────────────────────
  const handleDelete = useCallback((id: string) => {
    setSessions(prev => {
      const updated = prev.filter(s => s.id !== id);
      saveSessions(updated);

      if (id === sessionId) {
        // Navigate to another session or create new
        const next = updated.find(s => s.id !== id);
        if (next) {
          router.push(`/chat/${next.id}`);
        } else {
          router.push('/chat');
        }
      }
      return updated;
    });
  }, [sessionId, router]);

  // ── Send message ──────────────────────────────────────────────
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const isFirst = showChips;
    if (isFirst) setShowChips(false);

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
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

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };
      const finalMessages = [...nextMessages, aiMsg];
      const finalHistory: ChatHistory[] = [
        ...chatHistory,
        { role: 'user',  parts: [{ text: trimmed }] },
        { role: 'model', parts: [{ text: data.response }] },
      ];
      setMessages(finalMessages);
      setChatHistory(finalHistory);
      persistSession(finalMessages, finalHistory, isFirst ? trimmed : undefined);

    } catch (err: unknown) {
      const errMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: err instanceof Error ? `⚠️ ${err.message}` : '⚠️ Something went wrong.',
        timestamp: new Date(),
      };
      const finalMessages = [...nextMessages, errMsg];
      setMessages(finalMessages);
      persistSession(finalMessages, chatHistory);
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, showChips, messages, chatHistory, persistSession]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  // ── Saved cars ────────────────────────────────────────────────
  const addCar = (name: string, price: string, notes: string) => {
    const updated = [...savedCars, { id: crypto.randomUUID(), name, price, notes, addedAt: new Date() }];
    setSavedCars(updated); saveCars(updated);
  };
  const removeCar = (id: string) => {
    const updated = savedCars.filter(c => c.id !== id);
    setSavedCars(updated); saveCars(updated);
  };

  const activeSession = sessions.find(s => s.id === sessionId);

  if (!ready) return null;

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ zIndex: 1, position: 'relative' }}>

      {/* ── Topbar ──────────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-4 py-3 z-30"
        style={{
          background: 'rgba(10,15,30,0.9)',
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
            <span className="font-bold text-base hidden sm:block" style={{ color: '#f1f5f9', fontFamily: 'Space Grotesk, sans-serif' }}>
              CarAdvisor<span style={{ color: '#7c6af7' }}>AI</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHistory(v => !v)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              border: `1px solid ${showHistory ? 'rgba(124,106,247,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: showHistory ? '#a89cf8' : '#475569',
              background: showHistory ? 'rgba(124,106,247,0.08)' : 'transparent',
            }}
          >
            <History size={12} />
            <span className="hidden sm:block">History</span>
            {sessions.filter(s => s.messages.length > 0).length > 0 && (
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(124,106,247,0.2)', color: '#a89cf8' }}>
                {sessions.filter(s => s.messages.length > 0).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setShowSaved(v => !v)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              border: `1px solid ${showSaved ? 'rgba(124,106,247,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: showSaved ? '#a89cf8' : '#475569',
              background: showSaved ? 'rgba(124,106,247,0.08)' : 'transparent',
            }}
          >
            <PanelRight size={12} />
            <span className="hidden sm:block">Saved</span>
            {savedCars.length > 0 && (
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(124,106,247,0.2)', color: '#a89cf8' }}>
                {savedCars.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: History sidebar — overlay on mobile, inline on desktop */}
        {showHistory && (
          <>
            {/* Mobile backdrop */}
            <div
              className="fixed inset-0 z-40 sm:hidden"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setShowHistory(false)}
            />
            {/* Sidebar — fixed on mobile, inline on desktop */}
            <div
              className="fixed sm:relative inset-y-0 left-0 z-50 sm:z-auto flex-shrink-0"
              style={{ top: 0 }}
            >
              <ChatHistorySidebar
                sessions={sessions}
                activeSessionId={sessionId}
                onSelect={(s) => { goToSession(s); setShowHistory(false); }}
                onNew={() => { handleNewChat(); setShowHistory(false); }}
                onDelete={handleDelete}
              />
            </div>
          </>
        )}

        {/* Centre: Chat */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* Session label bar */}
          <div
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
          >
            <span className="text-xs font-mono select-all" style={{ color: '#334155' }}>
              #{sessionId.split('-')[0]}
            </span>
            <span className="text-xs truncate max-w-xs" style={{ color: '#334155' }}>
              {activeSession?.title || 'New conversation'}
            </span>
          </div>

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
                  <h2 className="text-2xl font-bold mb-1.5" style={{ color: '#f1f5f9', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Ask me anything about cars
                  </h2>
                  <p className="text-sm" style={{ color: '#475569' }}>
                    Your AI automotive expert with 20+ years of experience.
                  </p>
                </div>
              </div>
            )}

            {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Chips */}
          {showChips && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map(s => (
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
              className="flex gap-2 items-end rounded-2xl px-4 py-2"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
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

        {/* Right: Saved cars */}
        {showSaved && (
          <aside
            className="flex-shrink-0 p-3"
            style={{ width: '260px', borderLeft: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,15,30,0.5)' }}
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
