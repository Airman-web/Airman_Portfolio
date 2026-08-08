import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Atigbi Emmanuel Ayomikun | Software Engineer',
  description: 'Software Engineer building health tech, aviation tools, and real products.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="scanlines">
        <Navbar />
        {children}
      </body>
    </html>
  )
}