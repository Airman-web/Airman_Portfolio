'use client'

import { useState, useEffect } from 'react'

// These are the navigation links
// We store them in an array so we can loop through them
// instead of writing each one manually
const NAV_LINKS = [
  { label: 'ABOUT',      href: '#about'      },
  { label: 'PROJECTS',   href: '#projects'   },
  { label: 'SKILLS',     href: '#skills'     },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'BLOG',       href: '#blog'       },
  { label: 'CONTACT',    href: '#contact'    },
]

export default function Navbar() {
  // scrolled = true when user scrolls past 60px
  // this controls whether the background appears
  const [scrolled, setScrolled] = useState(false)

  // menuOpen = true when hamburger is clicked on mobile
  const [menuOpen, setMenuOpen] = useState(false)

  // useEffect runs code AFTER the component loads in the browser
  // here we're listening for the user's scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll)

    // cleanup: remove the listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: '0 60px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // background only appears after scrolling
        background: scrolled ? 'rgba(5, 5, 16, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 245, 255, 0.08)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >

      {/* ── Logo ───────────────────────────────── */}
      <a href="#" style={{ textDecoration: 'none' }}>
        <span style={{
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 800,
          fontSize: '1.1rem',
          letterSpacing: '3px',
          color: 'var(--neon-cyan)',
          textShadow: '0 0 12px var(--neon-cyan)',
        }}>
          &lt;AE/&gt;
        </span>
      </a>

      {/* ── Desktop Nav Links ───────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '36px',
      }}
        className="desktop-nav"
      >
        {/* Loop through NAV_LINKS and render each one */}
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '3px',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.3s, text-shadow 0.3s',
            }}
            onMouseEnter={e => {
              e.target.style.color = 'var(--neon-cyan)'
              e.target.style.textShadow = '0 0 10px var(--neon-cyan)'
            }}
            onMouseLeave={e => {
              e.target.style.color = 'var(--text-muted)'
              e.target.style.textShadow = 'none'
            }}
          >
            {link.label}
          </a>
        ))}

        {/* Résumé button */}
        <a
          href="/resume.pdf"
          className="cyber-btn"
          style={{ padding: '8px 22px', fontSize: '0.6rem' }}
          download
        >
          RÉSUMÉ
        </a>
      </div>

      {/* ── Mobile Hamburger Button ─────────────── */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="mobile-menu-btn"
        style={{
          display: 'none',          // hidden on desktop, shown via CSS below
          flexDirection: 'column',
          gap: '5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
        }}
        aria-label="Toggle menu"
      >
        {/* Three lines that animate into an X when open */}
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '24px',
              height: '1px',
              background: 'var(--neon-cyan)',
              boxShadow: '0 0 4px var(--neon-cyan)',
              transition: 'transform 0.3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                : i === 1 ? 'scaleX(0)'
                : 'rotate(-45deg) translate(4px, -4px)'
                : 'none',
            }}
          />
        ))}
      </button>

      {/* ── Mobile Dropdown Menu ────────────────── */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '72px', left: 0, right: 0,
          background: 'rgba(5, 5, 16, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 245, 255, 0.1)',
          padding: '28px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                letterSpacing: '4px',
                color: 'var(--text-muted)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* ── Responsive styles ───────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav    { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          nav { padding: 0 24px !important; }
        }
      `}</style>

    </nav>
  )
}
