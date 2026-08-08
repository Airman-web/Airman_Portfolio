'use client'

import { useEffect, useRef, useState } from 'react'

// Your personal facts — update these anytime
const FACTS = [
  { label: 'LOCATION',     value: 'Kigali, Rwanda'          },
  { label: 'EDUCATION',    value: 'ALU — Software Eng.'     },
  { label: 'EXPERIENCE',   value: '2+ Years'                },
  { label: 'AVAILABILITY', value: 'Open to Work'            },
  { label: 'FOCUS',        value: 'Health Tech & Aviation'  },
  { label: 'GITHUB',       value: '@Airman-web'             },
]

export default function About() {
  // ref lets us point at the actual DOM element
  // so we can watch when it scrolls into view
  const sectionRef = useRef(null)

  // visible = true once the section enters the viewport
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // IntersectionObserver watches an element and fires
    // a callback when it enters or exits the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          // Once visible, stop observing — no need to keep watching
          observer.disconnect()
        }
      },
      { threshold: 0.2 } // trigger when 20% of section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef}>
      <div
        className="section-wrap"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
        }}
      >

        {/* ── LEFT: Photo frame ──────────────────────────── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateX(-30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>

          {/* Outer frame with corner decorations */}
          <div style={{
            position: 'relative',
            display: 'inline-block',
            width: '100%',
            maxWidth: '420px',
          }}>

            {/* Corner decorations — top left, top right, bottom left, bottom right */}
            {/* Each corner is a small div with only 2 borders showing */}
            {[
              { top: '-2px',  left: '-2px',  borderTop: true,  borderLeft: true  },
              { top: '-2px',  right: '-2px', borderTop: true,  borderRight: true },
              { bottom: '-2px', left: '-2px', borderBottom: true, borderLeft: true },
              { bottom: '-2px', right: '-2px', borderBottom: true, borderRight: true },
            ].map((corner, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: '28px', height: '28px',
                zIndex: 2,
                ...corner,
                borderTop:    corner.borderTop    ? '2px solid var(--neon-cyan)' : 'none',
                borderLeft:   corner.borderLeft   ? '2px solid var(--neon-cyan)' : 'none',
                borderRight:  corner.borderRight  ? '2px solid var(--neon-cyan)' : 'none',
                borderBottom: corner.borderBottom ? '2px solid var(--neon-cyan)' : 'none',
              }} />
            ))}

            {/* Photo area */}
            {/* 
              Right now this is a placeholder.
              To add your real photo:
              1. Drop your image into the /public folder — name it photo.jpg
              2. Replace the placeholder div below with:
                 <img src="/photo.jpg" alt="Emmanuel" style={{ width:'100%', display:'block', objectFit:'cover' }} />
            */}
            <div style={{
              width: '100%',
              paddingBottom: '120%', // creates a tall rectangle shape
              background: 'linear-gradient(135deg, rgba(0,245,255,0.06) 0%, rgba(189,0,255,0.06) 100%)',
              border: '1px solid var(--border-dim)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Placeholder content */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                letterSpacing: '2px',
              }}>
                <div style={{
                  width: '80px', height: '80px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                }}>
                  👤
                </div>
                ADD YOUR PHOTO
              </div>

              {/* Moving scan line — purely decorative */}
              <div style={{
                position: 'absolute',
                left: 0, right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
                opacity: 0.3,
                animation: 'scanline 4s linear infinite',
              }} />
            </div>

            {/* Availability badge — bottom right of photo */}
            <div style={{
              position: 'absolute',
              bottom: '-18px', right: '-18px',
              background: 'var(--cyber-dark)',
              border: '1px solid var(--neon-green)',
              padding: '10px 16px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '2px',
              color: 'var(--neon-green)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 0 20px rgba(0,255,136,0.15)',
            }}>
              <span style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: 'var(--neon-green)',
                boxShadow: '0 0 8px var(--neon-green)',
                animation: 'pulse-dot 2s infinite',
              }} />
              AVAILABLE
            </div>
          </div>
        </div>

        {/* ── RIGHT: Bio content ─────────────────────────── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateX(30px)',
          transition: 'opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s',
        }}>

          <p className="section-tag" style={{ marginBottom: '12px' }}>
            01 / ABOUT
          </p>

          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '28px',
            color: 'var(--text-primary)',
          }}>
            Building the future,<br />
            <span
              className="glow-cyan"
              style={{ color: 'var(--neon-cyan)' }}
            >
              one commit at a time.
            </span>
          </h2>

          {/* Bio paragraphs */}
          <div style={{
            fontSize: '0.88rem',
            lineHeight: 1.9,
            color: 'var(--text-muted)',
            fontFamily: 'JetBrains Mono, monospace',
            marginBottom: '36px',
          }}>
            <p style={{ marginBottom: '16px' }}>
              I'm a software engineer and Year 2 student at African Leadership
              University in Kigali, Rwanda. I build real products — from
              Kora Health, a mobile-first physiotherapy platform, to Flight Hub,
              a real-time flight tracking app.
            </p>
            <p>
              I believe the best engineers don't just write code — they solve
              problems that matter. My focus is health tech and aviation, two
              industries where software can save lives.
            </p>
          </div>

          {/* Facts grid */}
          {/* 
            We use CSS grid here to make a 2-column table of facts.
            Each fact has a label (cyan, small) and a value (white).
          */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            border: '1px solid var(--border-dim)',
          }}>
            {FACTS.map((fact, i) => (
              <div
                key={fact.label}
                style={{
                  padding: '16px 20px',
                  // Add bottom border to all except last 2 items
                  borderBottom: i < FACTS.length - 2
                    ? '1px solid var(--border-dim)'
                    : 'none',
                  // Add right border to left column items
                  borderRight: i % 2 === 0
                    ? '1px solid var(--border-dim)'
                    : 'none',
                  background: i % 2 !== 0
                    ? 'rgba(0,245,255,0.015)'
                    : 'transparent',
                }}
              >
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.58rem',
                  letterSpacing: '3px',
                  color: 'var(--neon-cyan)',
                  marginBottom: '5px',
                }}>
                  {fact.label}
                </div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.82rem',
                  color: 'var(--text-primary)',
                }}>
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Scanline animation for the photo */}
      <style>{`
        @keyframes scanline {
          from { top: -5%; }
          to   { top: 105%; }
        }
        @media (max-width: 900px) {
          #about .section-wrap {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </section>
  )
}
