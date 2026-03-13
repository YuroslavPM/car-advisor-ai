'use client';

import Link from 'next/link';
import { Zap, BarChart2, TrendingDown, Bookmark, ArrowRight, Car, Star } from 'lucide-react';

const features = [
  {
    icon: <Zap size={22} />,
    title: 'Personalized Recommendations',
    desc: 'Tell us your budget and needs — get hand-picked models that actually fit your life.',
  },
  {
    icon: <BarChart2 size={22} />,
    title: 'Model Comparison',
    desc: 'Side-by-side specs, pros & cons, and a clear winner for your specific situation.',
  },
  {
    icon: <TrendingDown size={22} />,
    title: 'Price Guidance',
    desc: 'Fair-market prices in EUR, ownership costs, and fuel efficiency at a glance.',
  },
  {
    icon: <Bookmark size={22} />,
    title: 'Save Your Favourites',
    desc: 'Bookmark interesting models with notes that persist across sessions.',
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen" style={{ position: 'relative', zIndex: 1 }}>

      {/* ── Navbar ───────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(253,246,236,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(30,58,95,0.08)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #d97706, #b45309)' }}
          >
            <Car size={18} color="white" />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: '#1e3a5f', fontFamily: 'Playfair Display, serif' }}>
            CarAdvisor<span style={{ color: '#d97706' }}>AI</span>
          </span>
        </div>
        <Link
          href="/chat"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #d97706, #b45309)', color: '#fff' }}
        >
          Start Chat
          <ArrowRight size={14} />
        </Link>
      </nav>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative px-6 pt-16 pb-24 text-center overflow-hidden">
        {/* Decorative blobs */}
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #d97706, transparent)' }}
        />
        <div
          className="absolute -bottom-10 -right-10 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #1e3a5f, transparent)' }}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex justify-center mb-6">
            <span className="hero-badge">
              <Star size={13} fill="currentColor" />
              Powered by Google Gemini 1.5 Flash
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6"
            style={{ color: '#1e3a5f', fontFamily: 'Playfair Display, serif' }}
          >
            Find Your{' '}
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #d97706, #b45309)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Perfect Car
            </span>
            <br />
            with AI Guidance
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#4a6285' }}
          >
            Describe your budget, lifestyle, and preferences — our AI automotive
            expert delivers tailored car recommendations, honest price breakdowns,
            and head-to-head comparisons in seconds.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/chat"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all hover:opacity-90 active:scale-97 shadow-lg hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #d97706, #b45309)',
                color: '#fff',
                boxShadow: '0 8px 24px rgba(217,119,6,0.35)',
              }}
            >
              Start Chat — It&apos;s Free
              <ArrowRight size={18} />
            </Link>
            <span className="text-sm" style={{ color: '#94a3b8' }}>
              No account needed
            </span>
          </div>

          {/* Floating car icon */}
          <div className="flex justify-center mt-14">
            <div
              className="float-anim w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #1e3a5f, #162d4a)',
                boxShadow: '0 20px 60px rgba(30,58,95,0.3)',
              }}
            >
              <Car size={44} color="#f59e0b" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────────────── */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: '#1e3a5f', fontFamily: 'Playfair Display, serif' }}
          >
            Everything You Need to Buy Smart
          </h2>
          <p className="text-base" style={{ color: '#64748b' }}>
            Powered by AI, guided by 20+ years of automotive expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div key={i} className="glass-card p-6 flex flex-col gap-3 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(217,119,6,0.15), rgba(180,83,9,0.1))',
                  color: '#d97706',
                }}
              >
                {f.icon}
              </div>
              <h3
                className="font-bold text-base leading-snug"
                style={{ color: '#1e3a5f', fontFamily: 'Playfair Display, serif' }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#4a6285' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────── */}
      <section className="px-6 pb-24 max-w-3xl mx-auto text-center">
        <div
          className="rounded-3xl p-10 shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #1e3a5f, #162d4a)',
            boxShadow: '0 20px 60px rgba(30,58,95,0.25)',
          }}
        >
          <h2
            className="text-3xl font-bold mb-3 text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to find your dream car?
          </h2>
          <p className="text-sm mb-7" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Join thousands of buyers who made smarter decisions with AI guidance.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #d97706, #b45309)',
              color: '#fff',
              boxShadow: '0 8px 20px rgba(217,119,6,0.4)',
            }}
          >
            Talk to CarAdvisorAI
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer
        className="text-center py-8 px-6 text-sm border-t"
        style={{
          color: '#94a3b8',
          borderColor: 'rgba(30,58,95,0.1)',
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Car size={15} style={{ color: '#d97706' }} />
          <span style={{ color: '#1e3a5f', fontWeight: 600, fontFamily: 'Playfair Display, serif' }}>
            CarAdvisorAI
          </span>
        </div>
        <p>AI-powered automotive advice · Built with Next.js &amp; Google Gemini</p>
      </footer>
    </div>
  );
}
