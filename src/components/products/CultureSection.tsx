'use client'

interface CultureSectionProps {
  isZh: boolean
}

export function CultureSection({ isZh }: CultureSectionProps) {
  const articles = isZh ? [
    {
      title: '紫檀与佛教的千年渊源',
      excerpt: '小叶紫檀自古以来就是佛教圣木，相传佛祖释迦牟尼曾在紫檀树下悟道...',
      category: '佛木文化'
    },
    {
      title: '沉香：香中之王',
      excerpt: '沉香位列"沉檀龙麝"四大名香之首，是自然界中极为罕见的珍稀香料...',
      category: '香道文化'
    },
    {
      title: '如法棋：密宗智慧游戏',
      excerpt: '如法棋承载着千年佛学精神体系，是修行者修心养性的殊胜法门...',
      category: '修行文化'
    }
  ] : [
    {
      title: 'Rosewood: A Buddhist Heritage',
      excerpt: 'Red sandalwood has been revered as sacred Buddhist timber since ancient times...',
      category: 'Wood Culture'
    },
    {
      title: 'Agarwood: King of Fragrances',
      excerpt: 'Agarwood stands as one of the rarest and most precious aromatic substances...',
      category: 'Incense Culture'
    },
    {
      title: 'Rufa: Esoteric Wisdom Game',
      excerpt: 'Rufa Chess carries a thousand-year Buddhist spiritual tradition...',
      category: 'Practice Culture'
    }
  ]

  return (
    <section className="py-16 bg-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-amber-200 mb-4">
            {isZh ? '禅意百科' : 'Wisdom Heritage'}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {isZh
              ? '探索佛教文化，了解每一件佛具背后的故事'
              : 'Explore Buddhist culture and discover the stories behind each sacred object'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-500/30 transition group"
            >
              <span className="text-xs text-amber-500 uppercase tracking-wider">
                {article.category}
              </span>
              <h3 className="text-lg font-serif text-amber-100 mt-2 mb-3 group-hover:text-amber-300 transition">
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {article.excerpt}
              </p>
              <button className="mt-4 text-amber-500 text-sm hover:text-amber-300 transition">
                {isZh ? '阅读全文 →' : 'Read more →'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
