'use client'

import { useState, useEffect, useRef } from 'react'

// Your real projects — update links when ready
const PROJECTS = [
  {
    id: 1,
    title: 'Kora Health',
    desc: 'A mobile-first physiotherapy telerehabilitation platform connecting patients with therapists. Features treatment plan creation, progress tracking with charts, and persistent patient/therapist dashboards.',
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Recharts'],
    type: 'FULLSTACK',
    year: '2025',
    github: 'https://github.com/Airman-web',
    live: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Flight Hub',
    desc: 'A real-time flight tracking web app with live aircraft positions, route visualization, and flight data. Born from a deep passion for aviation.',
    tech: ['React', 'Flight APIs', 'Leaflet.js', 'Node.js'],
    type: 'FULLSTACK',
    year: '2024',
    github: 'https://github.com/Airman-web',
    live: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'RFantazia Bakery',
    desc: 'A bakery venture serving ALU students with chicken pies, meat pies and sausage rolls — with an online ordering system and delivery integration with Engline logistics.',
    tech: ['Next.js', 'Payments', 'Logistics API'],
    type: 'OTHER',
    year: '2024',
    github: 'https://github.com/Airman-web',
    live: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'AI Health Platform',
    desc: 'Research-stage AI platform combining wearable data, lab results, and vitals to enable earlier detection of serious diseases in underserved regions like Rwanda.',
    tech: ['Python', 'TensorFlow', 'Wearables API', 'PostgreSQL'],
    type: 'BACKEND',
    year: '2025',
    github: 'https://github.com/Airman-web',
    live: null,
    featured: false,
  },
]

// Filter buttons at the top
const FILTERS = ['ALL', 'FULLSTACK', 'BACKEND', 'OTHER']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  // Same IntersectionObserver pattern as About section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Filter the projects array based on active filter
  // If 'ALL' is selected, show everything
  // Otherwise only show projects where type matches
  const filtered = activeFilter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.type === activeFilter)

  return (
    <section id="projects" ref={sectionRef}>
      <div className="section-wrap">

        {/* ── Header ──────────────────────────────────────── */}
        <div style={{
          marginBottom: '60px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }}>
          <p className="section-tag" style={{ marginBottom: '12px' }}>
            02 / PROJECTS
          </p>

          {/* Title + filter buttons on same row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <h2 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}>
              Things I've{' '}
              <span
                className="glow-pink"
                style={{ color: 'var(--neon-pink)' }}
              >
                Built
              </span>
            </h2>

            {/* Filter buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.62rem',
                    letterSpacing: '2px',
                    padding: '8px 16px',
                    // Active filter gets filled, inactive is outline
                    background: activeFilter === f
                      ? 'var(--neon-cyan)'
                      : 'transparent',
                    border: '1px solid',
                    borderColor: activeFilter === f
                      ? 'var(--neon-cyan)'
                      : 'var(--border-dim)',
                    color: activeFilter === f
                      ? 'var(--cyber-black)'
                      : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Project cards grid ──────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              // Each card animates in slightly after the previous
              delay={i * 100}
              visible={visible}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

// ── ProjectCard is its own component ──────────────────────
// We separate it because it has its own hover state
// Keeping it clean and readable
function ProjectCard({ project, delay, visible }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="cyber-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '32px',
        // Staggered fade-in: each card uses delay prop
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        position: 'relative',
      }}
    >

      {/* Featured badge */}
      {project.featured && (
        <div style={{
          position: 'absolute',
          top: '20px', right: '20px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.55rem',
          letterSpacing: '2px',
          color: 'var(--neon-cyan)',
          border: '1px solid rgba(0,245,255,0.3)',
          padding: '3px 8px',
        }}>
          FEATURED
        </div>
      )}

      {/* Type + year */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '3px',
          color: 'var(--neon-pink)',
          opacity: 0.8,
        }}>
          {project.type}
        </span>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          color: 'var(--text-muted)',
        }}>
          {project.year}
        </span>
      </div>

      {/* Title — glows cyan on hover */}
      <h3 style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '1.1rem',
        fontWeight: 600,
        letterSpacing: '1px',
        color: hovered ? 'var(--neon-cyan)' : 'var(--text-primary)',
        marginBottom: '14px',
        transition: 'color 0.3s ease',
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.82rem',
        lineHeight: 1.75,
        color: 'var(--text-muted)',
        marginBottom: '24px',
      }}>
        {project.desc}
      </p>

      {/* Tech stack tags */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '28px',
      }}>
        {project.tech.map((t) => (
          <span key={t} style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.62rem',
            letterSpacing: '1px',
            padding: '4px 10px',
            background: 'rgba(0,245,255,0.05)',
            border: '1px solid rgba(0,245,255,0.15)',
            color: 'var(--neon-cyan)',
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{
        display: 'flex',
        gap: '20px',
        borderTop: '1px solid var(--border-dim)',
        paddingTop: '20px',
      }}>
        
          href={project.github}
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '2px',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--neon-cyan)'}
          onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
        >
          ↗ GITHUB
        </a>

        {/* Only render live link if project has one */}
        {project.live && (
          
            href={project.live}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '2px',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--neon-pink)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >
            ↗ LIVE DEMO
          </a>
        )}
      </div>

    </div>
  )
}
