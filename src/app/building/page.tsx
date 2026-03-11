'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function BuildingPage() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <div className="min-h-screen bg-[#F8F4EE] flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Lotus Icon - Elegant Line Drawing */}
        <div className="mb-12">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-40"
          >
            {/* Lotus petal - center */}
            <path
              d="M40 15 C40 15 35 25 35 35 C35 42 37.5 47 40 50 C42.5 47 45 42 45 35 C45 25 40 15 40 15Z"
              stroke="#B8956E"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Left petals */}
            <path
              d="M30 20 C30 20 20 28 22 38 C24 45 28 48 30 48 C28 45 26 38 25 32 C24 26 30 20 30 20Z"
              stroke="#B8956E"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M22 30 C22 30 10 38 14 48 C18 54 24 54 26 52 C22 48 18 42 18 36 C18 30 22 30 22 30Z"
              stroke="#B8956E"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Right petals */}
            <path
              d="M50 20 C50 20 60 28 58 38 C56 45 52 48 50 48 C52 45 54 38 55 32 C56 26 50 20 50 20Z"
              stroke="#B8956E"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M58 30 C58 30 70 38 66 48 C62 54 56 54 54 52 C58 48 62 42 62 36 C62 30 58 30 58 30Z"
              stroke="#B8956E"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Base/pond */}
            <path
              d="M15 55 Q40 65 65 55"
              stroke="#B8956E"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M20 60 Q40 68 60 60"
              stroke="#B8956E"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            {/* Water ripples */}
            <path
              d="M25 68 Q40 72 55 68"
              stroke="#B8956E"
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Message */}
        <h1
          className="text-2xl md:text-3xl font-serif text-center mb-4"
          style={{
            color: '#2C2A27',
            fontWeight: 400,
            letterSpacing: '0.15em'
          }}
        >
          {isZh ? '此境正在精心布置中' : 'This Space Is Being Prepared'}
        </h1>
        <p
          className="text-center mb-12"
          style={{
            color: '#8A8178',
            fontSize: '1rem',
            letterSpacing: '0.1em'
          }}
        >
          {isZh ? '静待与您结缘' : 'Awaiting Your Connection'}
        </p>

        {/* Decorative Line */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#B8956E] to-transparent mb-12" />

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 border border-[#2C2A27]/20 rounded-lg hover:bg-[#2C2A27]/5 transition-all duration-300"
          style={{ color: '#4A4540' }}
        >
          <span className="text-lg">←</span>
          <span style={{ letterSpacing: '0.1em' }}>
            {isZh ? '返回首页' : 'Return Home'}
          </span>
        </Link>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-[#2C2A27]/5">
        <p className="text-sm" style={{ color: '#8A8178' }}>
          © 2026 如法阁 · 传承千年智慧
        </p>
      </footer>
    </div>
  )
}
