'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

// 模拟文章数据（实际项目中可从 Supabase 或 CMS 获取）
const articles = [
  {
    id: 'zitan-guide',
    title: '小叶紫檀鉴别指南',
    excerpt: '从纹理、颜色、气味三个维度，详细讲解如何辨别正宗印度小叶紫檀与冒牌货',
    category: '材质鉴别',
    date: '2026-01-15',
    readTime: '8 分钟阅读'
  },
  {
    id: 'buddha-statue-worship',
    title: '佛像供奉的仪轨与讲究',
    excerpt: '供奉佛像的位置、方向、高度都有严格讲究，一文详解佛像供奉的正确方法',
    category: '供奉仪轨',
    date: '2026-01-08',
    readTime: '6 分钟阅读'
  },
  {
    id: 'incense-guide',
    title: '线香的使用之道',
    excerpt: '从香具选择到香品配制，探讨线香在禅修与日常生活中的正确使用方法',
    category: '香道文化',
    date: '2025-12-28',
    readTime: '5 分钟阅读'
  },
  {
    id: 'beads-mala',
    title: '佛珠手串的盘玩与养护',
    excerpt: '不同材质的佛珠有不同的盘玩方法，正确养护可让法物更加温润有光泽',
    category: '文玩养护',
    date: '2025-12-20',
    readTime: '7 分钟阅读'
  },
  {
    id: 'zen-meditation',
    title: '禅修入门：如何开始打坐',
    excerpt: '为零基础爱好者讲解打坐的基本姿势、呼吸方法与注意事项',
    category: '禅修指导',
    date: '2025-12-15',
    readTime: '10 分钟阅读'
  },
  {
    id: 'heart-sutra-study',
    title: '《心经》研读：般若智慧的精髓',
    excerpt: '逐句解读《心经》经文，探讨般若波罗蜜多的深奥哲理',
    category: '经典解读',
    date: '2025-12-08',
    readTime: '12 分钟阅读'
  }
]

export default function CategoriesPage() {
  const { language, t } = useLanguage()
  const isZh = language === 'zh'

  return (
    <div className="min-h-screen bg-[#F8F4EE]">
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 30% 30%, rgba(180, 140, 80, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(120, 90, 50, 0.08) 0%, transparent 40%),
            linear-gradient(180deg, #F8F4EE 0%, #EDE8DF 100%)
          `
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-20 w-24 h-24 rounded-full bg-amber-600/5 blur-2xl" />
          <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-amber-800/3 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p
            className="text-sm tracking-[0.3em] mb-4"
            style={{ color: '#8A8178', letterSpacing: '0.3em' }}
          >
            {isZh ? 'ZEN KNOWLEDGE' : 'COLLECTION'}
          </p>
          <h1
            className="text-4xl md:text-5xl font-serif mb-6"
            style={{
              color: '#2C2A27',
              fontWeight: 600,
              letterSpacing: '0.1em'
            }}
          >
            禅意百科
          </h1>
          <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[#B8956E] to-transparent" />
          <p
            className="mt-6 text-lg"
            style={{ color: '#6B635A', lineHeight: '1.8' }}
          >
            {isZh
              ? '探索佛教文化智慧，开启禅意生活之美'
              : 'Explore Buddhist wisdom, discover the beauty of Zen lifestyle'}
          </p>
        </div>
      </section>

      {/* 文章列表 */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="space-y-8">
          {articles.map((article, index) => (
            <article
              key={article.id}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <Link href={`/article/${article.id}`}>
                <div className="p-6 md:p-8">
                  {/* 文章元信息 */}
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: '#F8F4EE',
                        color: '#B8956E'
                      }}
                    >
                      {article.category}
                    </span>
                    <span className="text-xs" style={{ color: '#8A8178' }}>
                      {article.readTime}
                    </span>
                  </div>

                  {/* 标题 */}
                  <h2
                    className="text-xl md:text-2xl font-serif mb-3 group-hover:text-amber-700 transition-colors"
                    style={{
                      color: '#2C2A27',
                      fontWeight: 600
                    }}
                  >
                    {article.title}
                  </h2>

                  {/* 摘要 */}
                  <p
                    className="mb-4"
                    style={{
                      color: '#6B635A',
                      lineHeight: '1.8'
                    }}
                  >
                    {article.excerpt}
                  </p>

                  {/* 底部链接 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#8A8178' }}>
                      {article.date}
                    </span>
                    <span
                      className="text-sm font-medium group-hover:translate-x-1 transition-transform"
                      style={{ color: '#B8956E' }}
                    >
                      {isZh ? '阅读全文 →' : 'Read More →'}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>

      {/* 底部CTA */}
      <section
        className="py-16 border-t border-[#2C2A27]/5"
        style={{ background: '#F2EBE3' }}
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h3
            className="text-xl font-serif mb-4"
            style={{
              color: '#2C2A27',
              fontWeight: 600
            }}
          >
            {isZh ? '开启禅意生活' : 'Begin Your Zen Journey'}
          </h3>
          <p
            className="mb-6"
            style={{ color: '#6B635A', lineHeight: '1.8' }}
          >
            {isZh
              ? '浏览我们的精选藏品，让每一件法物成为修行路上的庄严伴侣'
              : 'Browse our curated collection and find your sacred companion on the path of practice'}
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-[#2C2A27] text-white rounded-lg hover:bg-[#3D3A37] transition-colors"
            style={{ fontWeight: 500 }}
          >
            {isZh ? '浏览馆藏' : 'Browse Collection'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-[#2C2A27]/5">
        <p
          className="text-sm"
          style={{ color: '#8A8178' }}
        >
          © 2026 如法阁 · 传承千年智慧
        </p>
      </footer>
    </div>
  )
}
