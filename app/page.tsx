'use client';

import Link from 'next/link';
import { Zap, BarChart2, TrendingDown, Bookmark, ArrowRight, Car, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Zap size={20} />,
    title: 'Personalized Picks',
    desc: 'Budget, lifestyle, use case — get models matched precisely to you.',
    color: '#7c6af7',
  },
  {
    icon: <BarChart2 size={20} />,
    title: 'Side-by-Side Compare',
    desc: 'Specs, pros & cons, and a clear winner — every time.',
    color: '#34d399',
  },
  {
    icon: <TrendingDown size={20} />,
    title: 'Price Intelligence',
    desc: 'Real EUR prices, ownership costs, and fuel efficiency breakdowns.',
    color: '#f472b6',
  },
  {
    icon: <Bookmark size={20} />,
    title: 'Save & Track',
    desc: 'Bookmark favourites with notes that survive browser restarts.',
    color: '#fb923c',
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen" style={{ zIndex: 1 }}>

      {/* ── Navbar ─────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
        style={{
          background: 'rgba(10,15,30,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7c6af7, #6457e8)' }}
          >
            <Car size={17} color="white" />
          </div>
          <span className="font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f1f5f9' }}>
            CarAdvisor<span style={{ color: '#7c6af7' }}>AI</span>
          </span>
        </div>
        <Link href="/chat" className="btn-violet flex items-center gap-1.5 px-5 py-2 text-sm">
          Open Chat <ArrowRight size={14} />
        </Link>
      </nav>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative px-6 pt-24 pb-32 text-center overflow-hidden">
        {/* Glowing orbs */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #7c6af7, transparent 70%)' }}
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="flex justify-center mb-7">
            <span className="badge">
              <Sparkles size={11} />
              Powered by Gemini 2.5 Flash
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
            style={{ color: '#f1f5f9', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Your AI Car Expert,
            <br />
            <span className="grad-text">Always On Call</span>
          </h1>

          <p className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: '#94a3b8' }}>
            Describe your needs and budget — get tailored car recommendations,
            price breakdowns, and head-to-head comparisons in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              href="/chat"
              className="btn-violet flex items-center gap-2 px-8 py-4 text-base"
            >
              Start for Free <ArrowRight size={16} />
            </Link>
            <span className="text-sm" style={{ color: '#475569' }}>No sign-up needed</span>
          </div>

          {/* Floating icon */}
          <div className="flex justify-center mt-20">
            <div
              className="float-anim w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                border: '1px solid rgba(124,106,247,0.3)',
                boxShadow: '0 0 60px rgba(124,106,247,0.2), 0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              <Car size={44} color="#7c6af7" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section className="px-6 pb-28 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: '#f1f5f9', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Built for Smart Buyers
          </h2>
          <p style={{ color: '#64748b' }}>Everything you need to make the right call.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className="glass-card p-6 flex flex-col gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${f.color}18`, color: f.color }}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold text-sm" style={{ color: '#f1f5f9', fontFamily: 'Space Grotesk, sans-serif' }}>
                {f.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────── */}
      <section className="px-6 pb-28 max-w-2xl mx-auto text-center">
        <div
          className="rounded-2xl p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(124,106,247,0.15), rgba(52,211,153,0.05))',
            border: '1px solid rgba(124,106,247,0.25)',
          }}
        >
          <h2
            className="text-3xl font-bold mb-3"
            style={{ color: '#f1f5f9', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Find your perfect car today
          </h2>
          <p className="text-sm mb-7" style={{ color: '#64748b' }}>
            Free AI advice. No fluff. Just the right car for you.
          </p>
          <Link href="/chat" className="btn-violet inline-flex items-center gap-2 px-7 py-3 text-sm">
            Talk to CarAdvisorAI <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer
        className="text-center py-8 px-6 text-xs border-t"
        style={{ color: '#334155', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Car size={13} style={{ color: '#7c6af7' }} />
          <span style={{ color: '#7c6af7', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>CarAdvisorAI</span>
        </div>
        Built with Next.js &amp; Gemini 2.5 Flash
      </footer>
    </div>
  );
}
