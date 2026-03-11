'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SpaceIndexPage() {
  const { language } = useLanguage()

  const spaces = [
    {
      id: 'study',
      title: '禅修空间',
      titleEn: 'Meditation Space',
      desc: '一方静处，安放心念',
      descEn: 'A quiet place to rest your mind',
    },
    {
      id: 'home',
      title: '居家佛堂',
      titleEn: 'Home Shrine',
      desc: '一隅庄严，心香供奉',
      descEn: 'A sacred corner for devotion',
    },
    {
      id: 'practice',
      title: '共修场所',
      titleEn: 'Group Practice',
      desc: '以法会友，共种福田',
      descEn: 'Practice together, grow together',
    }
  ]

  return (
    <div className="min-h-screen py-16" style={{ background: '#0a0a0f' }}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-serif text-center text-[#F5F2ED] mb-4">
          {language === 'zh' ? '禅意空间' : 'Zen Spaces'}
        </h1>
        <p className="text-center text-[#9A948E] mb-12">
          {language === 'zh' ? '为您营造宁静祥和的修行环境' : 'Creating a serene environment for your practice'}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {spaces.map(space => (
            <Link
              key={space.id}
              href={`/space/${space.id}`}
              className="block p-8 rounded-xl"
              style={{ background: 'rgba(37, 35, 46, 0.6)', border: '1px solid rgba(212, 165, 116, 0.15)' }}
            >
              <h2 className="text-xl font-serif text-[#F5F2ED] mb-3">
                {language === 'zh' ? space.title : space.titleEn}
              </h2>
              <p className="text-[#9A948E]">
                {language === 'zh' ? space.desc : space.descEn}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
