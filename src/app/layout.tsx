
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NoteFlow',
  description: 'Note taking web app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Providers>
        <Navbar />
        <div className='container mx-auto px-4 lg:px-0 h-full pt-12'>
          {children}
        </div>
        </Providers>
      </body>
    </html>
  )
}
