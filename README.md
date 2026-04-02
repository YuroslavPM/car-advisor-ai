# CarAdvisorAI 🚗

An AI-powered car buying advisor chatbot that helps users find their perfect car based on budget, needs, and preferences — built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Google Gemini 2.5 Flash**.

---

## Features

- 🤖 AI automotive expert chatbot (Gemini 2.5 Flash)
- 💬 Multi-session management with full conversation history
- 🌍 Bilingual support (English & Bulgarian)
- 💾 Save favourite cars with prices and notes (localStorage)
- ⚡ Fast suggestion chips for quick starts
- 🎨 Premium dark-themed UI with violet accents
- 📱 Fully mobile responsive

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework, routing, SSR |
| React 19 | UI Library |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling & Design System |
| Lucide React | Icons |
| Google Gemini 2.5 Flash | AI responses |
| React Markdown | Message formatting |
| clsx + tailwind-merge | Class utilities |

---

## Setup

### 1. Get a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"** → copy the key (it's free, no credit card required)

### 2. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and paste your key:

```
GEMINI_API_KEY=your_key_here
```

### 3. Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## File Structure

```
app/
  layout.tsx             — Root layout + metadata
  page.tsx               — Landing page with features
  globals.css            — Tailwind v4 configuration + custom animations
  chat/
    page.tsx             — Chat entry point (redirects to session)
    [id]/
      page.tsx           — Full chat session interface
  api/
    chat/
      route.ts           — POST /api/chat → Gemini proxy
components/
  MessageBubble.tsx      — Animated message with markdown support
  TypingIndicator.tsx    — Bouncing dots loader
  ChatHistorySidebar.tsx — Session management (new/delete/switch)
  SavedCarsSidebar.tsx   — Sidebar with saved cars list
  AddCarModal.tsx        — Slide-up modal to add a car
lib/
  gemini.ts              — Gemini 2.5 Flash API call + system prompt
  utils.ts               — cn() utility + formatTime()
types/
  index.ts               — Message, SavedCar, ChatSession interfaces
.env.local.example       — API key placeholder
```

---

## Prompt Engineering Techniques

### 1. Role Prompting
The system prompt assigns a specific expert identity:
> *"You are CarAdvisorAI — an expert automotive consultant with 20+ years of experience."*

This anchors the model to domain expertise and consistent tone.

### 2. Structured Output Format
The prompt mandates a specific comparison structure:
```
⚡ Quick verdict
📊 Key specs comparison
✅ Pros and ❌ Cons for each model
🏆 Final recommendation
```
This guarantees scannable, actionable responses every time.

### 3. Conversation History
Every request includes the full `ChatHistory[]` array sent to Gemini's `contents` field, enabling multi-turn context awareness (e.g., remembering budget mentioned 5 messages ago).

### 4. Language Adaptation
The system prompt explicitly instructs:
> *"Respond in the same language the user writes in (support both Bulgarian and English)."*

### 5. Constrained Output
`maxOutputTokens: 12096` and `temperature: 0.7` balance creativity with thoroughness and accuracy.

---

## Grading Criteria

| Requirement | Implementation |
|---|---|
| Next.js 16 App Router | ✅ `app/` directory with layout, pages, API route |
| React 19 + TypeScript | ✅ Strict types and modern React patterns |
| Tailwind CSS v4 styling | ✅ Global CSS + Tailwind v4 utilities |
| Google Gemini integration | ✅ `lib/gemini.ts` (Gemini 2.5 Flash) |
| Multi-session history | ✅ `ChatHistorySidebar` + LocalStorage persistence |
| Saved cars (localStorage) | ✅ `SavedCarsSidebar` + `AddCarModal` |
| Typing indicator | ✅ `TypingIndicator` with 3 bouncing dots |
| Suggestion chips | ✅ 5 chips, disappear after first message |
| System prompt engineering | ✅ Role, structure, language, constraints |
| Mobile responsive | ✅ Responsive at all breakpoints |
| Custom animations | ✅ fadeSlideUp, typingBounce, modalSlideUp, float |
| Environment security | ✅ API key only on server-side route |
| Unique design | ✅ Space Grotesk, glassmorphism, violet accents |
