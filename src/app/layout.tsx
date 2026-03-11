import type { Metadata } from 'next'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/hooks/useAuth'
import { CartProvider } from '@/contexts/CartProvider'
import { Header } from '@/components/Header'
import { HeaderWrapper } from '@/components/HeaderWrapper'
import './globals.css'

export const metadata: Metadata = {
  title: '如法阁 | 佛教文化珍品',
  description: '精选佛教文化珍品，传承千年智慧',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <HeaderWrapper>
                <Header />
              </HeaderWrapper>
              {children}
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
