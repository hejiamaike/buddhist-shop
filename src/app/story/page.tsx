'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function StoryIndexPage() {
  const { language } = useLanguage()

  const stories = [
    {
      slug: 'rufa-chess',
      title: '如法棋缘起',
      titleEn: 'The Origin of Rufa Oracle Chess',
      desc: '源自密宗传承的智慧游戏',
      descEn: 'Wisdom game from esoteric Buddhist tradition',
    }
  ]

  return (
    <div className="min-h-screen py-16" style={{ background: '#0a0a0f' }}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-serif text-center text-[#F5F2ED] mb-4">
          {language === 'zh' ? '产品故事' : 'Product Stories'}
        </h1>
        <p className="text-center text-[#9A948E] mb-12">
          {language === 'zh' ? '每一件法物背后的故事' : 'The story behind each sacred item'}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {stories.map(story => (
            <Link
              key={story.slug}
              href={`/story/${story.slug}`}
              className="block p-8 rounded-xl"
              style={{ background: 'rgba(37, 35, 46, 0.6)', border: '1px solid rgba(212, 165, 116, 0.15)' }}
            >
              <h2 className="text-xl font-serif text-[#F5F2ED] mb-3">
                {language === 'zh' ? story.title : story.titleEn}
              </h2>
              <p className="text-[#9A948E]">
                {language === 'zh' ? story.desc : story.descEn}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
