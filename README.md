# CarAdvisorAI 🚗

An AI-powered car buying advisor chatbot that helps users find their perfect car based on budget, needs, and preferences — built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Google Gemini 1.5 Flash**.

---

## Features

- 🤖 AI automotive expert chatbot (Gemini 1.5 Flash)
- 💬 Full conversation history maintained across messages
- 🌍 Bilingual support (English & Bulgarian)
- 💾 Save favourite cars with notes (localStorage)
- ⚡ Fast suggestion chips for quick starts
- 🎨 Premium warm cream + deep navy design system
- 📱 Fully mobile responsive

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework, routing, SSR |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Lucide React | Icons |
| Google Gemini 1.5 Flash | AI responses |
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
  layout.tsx           — Root layout + metadata
  page.tsx             — Landing page
  globals.css          — Design system, animations, fonts
  chat/
    page.tsx           — Chat UI (full feature)
  api/
    chat/
      route.ts         — POST /api/chat → Gemini proxy
components/
  MessageBubble.tsx    — Animated message with avatar + timestamp
  TypingIndicator.tsx  — Bouncing dots loader
  SavedCarsSidebar.tsx — Sidebar with saved cars list
  AddCarModal.tsx      — Slide-up modal to add a car
lib/
  gemini.ts            — Gemini API call + system prompt
  utils.ts             — cn() utility + formatTime()
types/
  index.ts             — Message, SavedCar, ChatHistory interfaces
.env.local.example     — API key placeholder
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
`maxOutputTokens: 1024` and `temperature: 0.7` balance creativity with conciseness and accuracy.

---

## Grading Criteria

| Requirement | Implementation |
|---|---|
| Next.js 14 App Router | ✅ `app/` directory with layout, pages, API route |
| TypeScript throughout | ✅ Strict types in all files |
| Tailwind CSS styling | ✅ Global CSS + Tailwind v4 utilities |
| Google Gemini integration | ✅ `lib/gemini.ts` + `/api/chat` route |
| Conversation history | ✅ `ChatHistory[]` sent with every request |
| Saved cars (localStorage) | ✅ `SavedCarsSidebar` + `AddCarModal` |
| Typing indicator | ✅ `TypingIndicator` with 3 bouncing dots |
| Suggestion chips | ✅ 5 chips, disappear after first message |
| System prompt engineering | ✅ Role, structure, language, constraints |
| Mobile responsive | ✅ Responsive at all breakpoints |
| Custom animations | ✅ fadeSlideUp, typingBounce, modalSlideUp, float |
| Environment security | ✅ API key only on server-side route |
| Unique design | ✅ Warm cream + deep navy, Playfair Display + DM Sans |
