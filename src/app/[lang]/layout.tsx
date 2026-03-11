import type { Metadata } from 'next'
import { LanguageProvider } from '@/contexts/LanguageContext'
import '../globals.css'

export const metadata: Metadata = {
  title: '如法阁 | 佛教文化珍品',
  description: '精选佛教文化珍品，传承千年智慧',
  alternates: {
    languages: {
      'zh': '/zh/products',
      'en': '/en/products',
      'x-default': '/zh/products',
    },
  },
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <html lang={lang || 'zh'}>
      <head>
        <link rel="alternate" hrefLang="zh" href="/zh/products" />
        <link rel="alternate" hrefLang="en" href="/en/products" />
        <link rel="alternate" hrefLang="x-default" href="/zh/products" />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
