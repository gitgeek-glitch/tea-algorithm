import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TEA',
  description: 'Tiny Encryption Algorithm Implementation and Demonstration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1e2530] text-white min-h-screen`}>
        <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <Header />
        <main className="container mx-auto px-4 py-8 relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}