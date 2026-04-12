import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: 'AgriSure — Crop Insurance',
  description: 'Decentralized parametric crop insurance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main style={{ paddingBottom: '72px' }}>
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  )
}