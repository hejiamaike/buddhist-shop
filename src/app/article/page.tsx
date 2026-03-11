'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ArticleIndexPage() {
  const { language } = useLanguage()

  const articles = [
    {
      id: 'beads-mala',
      title: '如何挑选合适的佛珠',
      titleEn: 'How to Choose the Right Mala',
      desc: '挑选佛珠的注意事项与保养方法',
      descEn: 'Tips for choosing and caring for your mala',
    },
    {
      id: 'zitan-guide',
      title: '小叶紫檀鉴别指南',
      titleEn: 'Rosewood Identification Guide',
      desc: '从材质、纹理、包浆等方面全面解析',
      descEn: 'Complete analysis of rosewood identification',
    },
    {
      id: 'buddha-statue-worship',
      title: '佛像供奉的仪轨与讲究',
      titleEn: 'Buddha Statue Veneration',
      desc: '佛像供奉的位置、方向、高度都有严格讲究',
      descEn: 'Proper placement and worship rituals',
    },
    {
      id: 'incense-guide',
      title: '线香的使用之道',
      titleEn: 'The Art of Incense',
      desc: '沉香线香的正确使用方法和品香礼仪',
      descEn: 'Correct usage and ceremony',
    },
    {
      id: 'zen-meditation',
      title: '打坐禅修入门',
      titleEn: 'Beginner Meditation Guide',
      desc: '初学者如何开始打坐禅修',
      descEn: 'How to start meditation for beginners',
    },
    {
      id: 'heart-sutra-study',
      title: '心经智慧解读',
      titleEn: 'Heart Sutra Wisdom',
      desc: '深入理解心经的般若智慧',
      descEn: 'Understanding the wisdom of Heart Sutra',
    }
  ]

  return (
    <div className="min-h-screen py-16" style={{ background: '#0a0a0f' }}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-serif text-center text-[#F5F2ED] mb-4">
          {language === 'zh' ? '佛学文章' : 'Buddhist Articles'}
        </h1>
        <p className="text-center text-[#9A948E] mb-12">
          {language === 'zh' ? '佛学智慧与文化分享' : 'Wisdom and cultural sharing'}
        </p>

        <div className="space-y-6">
          {articles.map(article => (
            <Link
              key={article.id}
              href={`/article/${article.id}`}
              className="block p-8 rounded-xl"
              style={{ background: 'rgba(37, 35, 46, 0.6)', border: '1px solid rgba(212, 165, 116, 0.15)' }}
            >
              <h2 className="text-xl font-serif text-[#F5F2ED] mb-3">
                {language === 'zh' ? article.title : article.titleEn}
              </h2>
              <p className="text-[#9A948E]">
                {language === 'zh' ? article.desc : article.descEn}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
