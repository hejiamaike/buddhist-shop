'use client'

import { LanguageProvider } from '@/contexts/LanguageContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  )
}
