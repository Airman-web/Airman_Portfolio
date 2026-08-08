import Hero     from '@/components/Hero'
import About    from '@/components/About'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <main className="grid-bg">
      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Projects />
    </main>
  )
}