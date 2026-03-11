'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function StoryPage() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
      <div className="max-w-lg mx-4 text-center">
        <h1 className="text-2xl font-serif text-[#F5F2ED] mb-8">
          {isZh ? '为何是此宝' : 'Why This Treasure'}
        </h1>

        <div className="text-left text-[#9A948E] leading-relaxed space-y-6 mb-12">
          {isZh ? (
            <>
              <p>
                如法棋并非器物之新，而在于其承载的修行方式。
              </p>
              <p>
                它并不替代修行，而是为共修者建立秩序与节奏，
                让修行回归如法、如序、如常。
              </p>
              <p>
                在密宗传统中，修行不仅是个人之事，
                更是一场因缘相聚的共修之路。
              </p>
              <p className="text-[#B8965E] italic">
                —— 如法阁
              </p>
            </>
          ) : (
            <>
              <p>
                Rufa Oracle Chess is not merely a new object, but embodies a method of spiritual practice.
              </p>
              <p>
                It does not replace practice, but establishes order and rhythm for group practitioners,
                returning practice to its proper, orderly, and natural state.
              </p>
              <p>
                In the esoteric Buddhist tradition, practice is not just a personal matter,
                but a shared path of cultivation brought together by karmic conditions.
              </p>
              <p className="text-[#B8965E] italic">
                — Rufage
              </p>
            </>
          )}
        </div>

        <Link
          href="/product/rufa-chess"
          className="inline-block px-8 py-3 rounded-lg text-white font-medium"
          style={{ background: '#B8965E' }}
        >
          {isZh ? '恭请结缘' : 'Request Now'}
        </Link>

        <div className="mt-8">
          <Link href="/products" className="text-[#8A8178] hover:text-[#B8965E] text-sm">
            {isZh ? '← 返回馆藏' : '← Back to Collection'}
          </Link>
        </div>
      </div>
    </div>
  )
}
