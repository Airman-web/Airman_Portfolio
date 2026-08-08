'use client'

import { useState, useEffect } from 'react'

// These roles will cycle through the typewriter effect
const ROLES = [
  'Software Engineer',
  'Full-Stack Developer',
  'Health Tech Builder',
  'Open Source Enthusiast',
]

export default function Hero() {
  // Which role we're currently typing
  const [roleIndex, setRoleIndex] = useState(0)

  // The characters currently visible on screen
  const [typed, setTyped] = useState('')

  // Are we deleting or typing?
  const [isDeleting, setIsDeleting] = useState(false)

  // Prevent animation running on server (Next.js renders on server first)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // ── Typewriter logic ──────────────────────────────────
  useEffect(() => {
    if (!mounted) return

    const currentRole = ROLES[roleIndex]
    // Type slower, delete faster
    const delay = isDeleting ? 40 : 100

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Add one more character
        const next = currentRole.slice(0, typed.length + 1)
        setTyped(next)

        // If fully typed, wait 1.8s then start deleting
        if (next === currentRole) {
          setTimeout(() => setIsDeleting(true), 1800)
        }
      } else {
        // Remove one character
        const next = currentRole.slice(0, typed.length - 1)
        setTyped(next)

        // If fully deleted, move to next role
        if (next === '') {
          setIsDeleting(false)
          setRoleIndex((i) => (i + 1) % ROLES.length)
        }
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [typed, isDeleting, roleIndex, mounted])

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* ── Ambient glow blobs ─────────────────────────── */}
      {/* These are big blurry circles that give depth */}
      <div style={{
        position: 'absolute',
        top: '15%', right: '-5%',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,245,255,0.055) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '5%', left: '-5%',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,0,110,0.055) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* ── Status badge ───────────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '32px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.72rem',
        letterSpacing: '3px',
        color: 'var(--neon-green)',
      }}>
        {/* Pulsing green dot */}
        <span style={{
          display: 'inline-block',
          width: '8px', height: '8px',
          borderRadius: '50%',
          background: 'var(--neon-green)',
          boxShadow: '0 0 10px var(--neon-green)',
          animation: 'pulse-dot 2s infinite',
        }} />
        AVAILABLE_FOR_WORK
        <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>
          — OPEN TO OPPORTUNITIES
        </span>
      </div>

      {/* ── Greeting ────────────────────────────────────── */}
      <p style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.85rem',
        letterSpacing: '4px',
        color: 'rgba(0, 245, 255, 0.65)',
        marginBottom: '18px',
      }}>
        &gt;_ HELLO, WORLD
      </p>

      {/* ── Name with glitch effect ──────────────────────── */}
      {/*
        data-text must match the text inside the element exactly.
        The glitch effect in globals.css uses this attribute
        to create the cyan + pink ghost copies of the text.
      */}
      <h1
        className="glitch"
        data-text="Atigbi EMMANUEL AYOMIKUN"
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(2.4rem, 7vw, 6.5rem)',
          lineHeight: 1.0,
          letterSpacing: '-2px',
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
          marginBottom: '24px',
          userSelect: 'none',
        }}
      >
        Atigbi EMMANUEL AYOMIKUN
      </h1>

      {/* ── Typewriter role ──────────────────────────────── */}
      <div style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: 'clamp(0.9rem, 2.5vw, 1.6rem)',
        fontWeight: 500,
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minHeight: '2.2rem',
      }}>
        {/* Pink double slash — common in cyberpunk UI */}
        <span style={{ color: 'var(--neon-pink)', opacity: 0.8 }}>//</span>

        {/* The typed text */}
        <span
          className="glow-cyan"
          style={{ color: 'var(--neon-cyan)' }}
        >
          {typed}
        </span>

        {/* Blinking cursor bar */}
        <span style={{
          display: 'inline-block',
          width: '2px',
          height: '1.2em',
          background: 'var(--neon-cyan)',
          boxShadow: '0 0 8px var(--neon-cyan)',
          verticalAlign: 'middle',
          animation: 'blink 1s infinite',
        }} />
      </div>

      {/* ── Bio ─────────────────────────────────────────── */}
      <p style={{
        maxWidth: '520px',
        fontSize: '0.88rem',
        lineHeight: 1.9,
        color: 'var(--text-muted)',
        marginBottom: '52px',
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        I build products that sit at the intersection of health, technology,
        and real human impact. From physiotherapy platforms to flight tracking
        systems — I turn ideas into shipped software.
      </p>

      {/* ── CTA Buttons ─────────────────────────────────── */}
      <div style={{
        display: 'flex',
        gap: '18px',
        flexWrap: 'wrap',
        marginBottom: '80px',
      }}>
        <a href="#projects" className="cyber-btn">
          VIEW PROJECTS
        </a>
        <a href="#contact" className="cyber-btn cyber-btn-pink">
          GET IN TOUCH
        </a>
      </div>

      {/* ── Stats row ───────────────────────────────────── */}
      <div style={{
        display: 'flex',
        gap: '60px',
        flexWrap: 'wrap',
        borderTop: '1px solid var(--border-dim)',
        paddingTop: '40px',
      }}>
        {[
          { num: '3+', label: 'Years Exp'      },
          { num: '5+', label: 'Projects Shipped'},
          { num: '10+',label: 'Technologies'   },
          { num: '∞',  label: 'Curiosity'      },
        ].map((stat) => (
          <div key={stat.label}>
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 700,
              color: 'var(--neon-cyan)',
              textShadow: '0 0 20px var(--neon-cyan)',
              lineHeight: 1.1,
            }}>
              {stat.num}
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '3px',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginTop: '4px',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Scroll indicator ────────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: '40px', right: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.6rem',
        letterSpacing: '4px',
        color: 'var(--text-muted)',
      }}>
        SCROLL
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(180deg, var(--neon-cyan), transparent)',
          animation: 'float 2s infinite ease-in-out',
        }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          section#home { padding: 100px 24px 60px; }
        }
      `}</style>

    </section>
  )
}