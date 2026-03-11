'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { useProducts, Product } from '@/hooks/useProducts'
import { useMemo } from 'react'

// 场景数据
const SPACES = {
  study: {
    name: '书房禅修',
    name_en: 'Study Sanctuary',
    subtitle: '一方静处，安放心念',
    subtitle_en: 'A quiet place for the mind',
    description: '适合日常阅读、抄经、静坐的小型清修空间。无需复杂布置，重在心安与持之以恒。',
    description_en: 'A compact space for daily reading, sutra copying, and meditation. No elaborate setup needed—the key is a peaceful mind and consistent practice.',
    categories: [
      { name: '坐具', name_en: 'Seat', items: ['putuan'] },
      { name: '计数法物', name_en: 'Counter', items: ['xingyue-beads'] },
      { name: '香事', name_en: 'Incense', items: ['chenxiang-incense', 'lianhua-lamp'] },
      { name: '文房', name_en: 'Study', items: ['jingang-copy-set', 'xijing-scroll'] }
    ],
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1600&q=80'
  },
  home: {
    name: '居家供奉',
    name_en: 'Home Shrine',
    subtitle: '一隅庄严，心香供奉',
    subtitle_en: 'A sacred corner for devotion',
    description: '在居家空间中辟出一方清净之地供奉佛像。无需殿堂规格，只需真诚与敬意。',
    description_en: 'Carve out a sacred space in your home for Buddha statues. No temple required—just sincerity and reverence.',
    categories: [
      { name: '佛像', name_en: 'Buddha', items: ['sakyamuni-buddha', 'wenshu-buddha'] },
      { name: '供灯', name_en: 'Lamp', items: ['lianhua-lamp'] },
      { name: '供水', name_en: 'Water', items: ['jingshui-cup', 'shuijing-wan'] },
      { name: '香炉', name_en: 'Censer', items: ['lotus-censer'] }
    ],
    image: 'https://images.unsplash.com/photo-1599707367072-cd6cf66a80a2?w=1600&q=80'
  },
  practice: {
    name: '共修结缘',
    name_en: 'Group Practice',
    subtitle: '以法会友，共种福田',
    subtitle_en: 'Practice together, grow together',
    description: '与志同道合的佛友共修之法器。音声和合，功德倍增。',
    description_en: 'Ritual implements for group practice with fellow Dharma companions. Harmonious sounds multiply merits.',
    categories: [
      { name: '法器', name_en: 'Ritual', items: ['rufa-chess', 'jingang-bell', 'yinzi'] },
      { name: '音声', name_en: 'Sound', items: ['songbo', 'zhuanjinglun'] },
      { name: '计数', name_en: 'Counter', items: ['fengyan-bodhi'] }
    ],
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1600&q=80'
  }
}

export default function SpacePage() {
  const params = useParams()
  const { language } = useLanguage()
  const { products } = useProducts()
  const isZh = language === 'zh'
  const spaceId = params.id as string

  const space = SPACES[spaceId as keyof typeof SPACES]

  // 从后备产品数据中获取商品
  const FALLBACK_PRODUCTS: Product[] = [
    { id: 'putuan', name: '蒲团坐垫', name_en: 'Meditation Cushion', slug: 'putuan', price: 268, original_price: 358, stock: 120, images: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80'], description: '天然黄麻 · 舒适支撑', category_id: 'practice-tools', subcategory: '修行辅助', material: '天然黄麻', use_case: '修行', tags: ['天然材料', '打坐必备'], status: 'active' },
    { id: 'xingyue-beads', name: '尼泊尔星月菩提', name_en: 'Bodhi Mala', slug: 'xingyue-beads', price: 368, original_price: 498, stock: 80, images: ['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80'], description: '原矿老料 · 手工正月', category_id: 'practice-tools', subcategory: '念珠手串', material: '星月菩提', use_case: '佩戴', tags: ['原矿老料', '手工正月'], status: 'active' },
    { id: 'chenxiang-incense', name: '天然沉香线香', name_en: 'Agarwood Incense', slug: 'chenxiang-incense', price: 168, original_price: 228, stock: 100, images: ['https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800&q=80'], description: '芽庄王者 · 清远悠长', category_id: 'offerings', subcategory: '香炉供具', material: '越南芽庄沉香', use_case: '居家', tags: ['天然纯品', '古法炮制'], status: 'active' },
    { id: 'lianhua-lamp', name: '琉璃莲花酥油灯', name_en: 'Lotus Butter Lamp', slug: 'lianhua-lamp', price: 458, original_price: 598, stock: 60, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80'], description: '古法琉璃 · 光影透亮', category_id: 'offerings', subcategory: '供灯净水', material: '古法琉璃', use_case: '供奉', tags: ['古法工艺', '供灯佳品'], status: 'active' },
    { id: 'jingang-copy-set', name: '金刚经手抄本套装', name_en: 'Diamond Sutra Set', slug: 'jingang-copy-set', price: 398, original_price: 528, stock: 45, images: ['https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?w=800&q=80'], description: '洒金宣纸 · 狼毫小楷', category_id: 'dharma-audio', subcategory: '经书法物', material: '泾县宣纸', use_case: '修行', tags: ['沉浸式抄经', '文房精品'], status: 'active' },
    { id: 'xijing-scroll', name: '心经书法卷轴', name_en: 'Heart Sutra Scroll', slug: 'xijing-scroll', price: 1280, original_price: 1680, stock: 30, images: ['https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?w=800&q=80'], description: '名家手书 · 锦绫装裱', category_id: 'dharma-audio', subcategory: '经书法物', material: '泾县熟宣', use_case: '修行', tags: ['名家手书', '锦绫装裱'], status: 'active' },
    { id: 'sakyamuni-buddha', name: '铜镀金释迦牟尼佛像', name_en: 'Gilded Sakyamuni Buddha', slug: 'sakyamuni-buddha', price: 3680, original_price: 4999, stock: 10, images: ['https://images.unsplash.com/photo-1599707367072-cd6cf66a80a2?w=800&q=80'], description: '法相庄严 · 失蜡精铸', category_id: 'offerings', subcategory: '佛像造像', material: '金铜造像', use_case: '供奉', tags: ['名家手工', '权威鉴定'], status: 'active' },
    { id: 'wenshu-buddha', name: '铜镀金文殊菩萨像', name_en: 'Gilded Manjushri Buddha', slug: 'wenshu-buddha', price: 4280, original_price: 5580, stock: 8, images: ['https://images.unsplash.com/photo-1599707367072-cd6cf66a80a2?w=800&q=80'], description: '智慧庄严 · 手持智慧剑', category_id: 'offerings', subcategory: '佛像造像', material: '金铜造像', use_case: '供奉', tags: ['智慧象征', '开光加持'], status: 'active' },
    { id: 'jingshui-cup', name: '白瓷描金净水杯', name_en: 'Gilded Water Cup', slug: 'jingshui-cup', price: 268, original_price: 368, stock: 120, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80'], description: '德化白瓷 · 手工描金', category_id: 'offerings', subcategory: '供灯净水', material: '德化白瓷', use_case: '供奉', tags: ['手工描金', '日供水具'], status: 'active' },
    { id: 'shuijing-wan', name: '水晶供碗套装', name_en: 'Crystal Offering Bowl Set', slug: 'shuijing-wan', price: 598, original_price: 798, stock: 35, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'], description: '天然水晶 · 七供一套', category_id: 'offerings', subcategory: '供灯净水', material: '天然水晶', use_case: '供奉', tags: ['天然水晶', '七供一套'], status: 'active' },
    { id: 'lotus-censer', name: '莲花纹铜香炉', name_en: 'Lotus Censers', slug: 'lotus-censer', price: 458, original_price: 598, stock: 25, images: ['https://images.unsplash.com/photo-1602523961358-9dfd4ea5a6d0?w=800&q=80'], description: '乾隆御制 · 莲瓣庄严', category_id: 'offerings', subcategory: '香炉供具', material: '精铜', use_case: '居家', tags: ['乾隆款识', '收藏价值'], status: 'active' },
    { id: 'rufa-chess', name: '如法棋', name_en: 'Rufa Oracle Chess', slug: 'rufa-chess', price: 2520, original_price: 3200, stock: 99, images: ['https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800&q=80'], description: '密宗传承 · 佛友共修', category_id: 'practice-tools', subcategory: '修行辅助', material: '木石良金', use_case: '共修', tags: ['密宗传承', '佛友共修'], status: 'active' },
    { id: 'jingang-bell', name: '纯铜金刚铃', name_en: 'Vajra Bell', slug: 'jingang-bell', price: 1280, original_price: 1680, stock: 25, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80'], description: '藏传法器 · 声音清脆', category_id: 'practice-tools', subcategory: '法器法音', material: '纯铜', use_case: '修行', tags: ['藏传经典', '手工锻造'], status: 'active' },
    { id: 'yinzi', name: '铜制引磬', name_en: 'Inverted Bell', slug: 'yinzi', price: 380, original_price: 480, stock: 55, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'], description: '精铜铸造 · 声音清亮', category_id: 'practice-tools', subcategory: '法器法音', material: '精铜', use_case: '修行', tags: ['传统法器', '法会必备'], status: 'active' },
    { id: 'songbo', name: '尼泊尔颂钵', name_en: 'Singing Bowl', slug: 'songbo', price: 680, original_price: 880, stock: 50, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80'], description: '手工锻打 · 音波悠长', category_id: 'dharma-audio', subcategory: '法音载体', material: '尼泊尔合金', use_case: '修行', tags: ['手工锻打', '空间净化'], status: 'active' },
    { id: 'zhuanjinglun', name: '太阳能转经轮', name_en: 'Solar Prayer Wheel', slug: 'zhuanjinglun', price: 1580, original_price: 1980, stock: 35, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80'], description: '光伏感应 · 藏经千万', category_id: 'dharma-audio', subcategory: '法音载体', material: '纯铜内胆', use_case: '供奉', tags: ['光伏感应', '藏传法物'], status: 'active' },
    { id: 'fengyan-bodhi', name: '凤眼菩提手串', name_en: 'Chenrezig Bodhi', slug: 'fengyan-bodhi', price: 688, original_price: 888, stock: 45, images: ['https://images.unsplash.com/photo-1590534247854-e97d5e3ed38e?w=800&q=80'], description: '尼泊尔凤眼 · 收藏级', category_id: 'practice-tools', subcategory: '念珠手串', material: '凤眼菩提', use_case: '佩戴', tags: ['尼泊尔原产', '收藏级'], status: 'active' }
  ]

  const displayProducts = useMemo(() => {
    return FALLBACK_PRODUCTS.map(p => ({
      ...p,
      name: isZh ? p.name : (p.name_en || p.name),
      description: isZh ? p.description : (p.name_en || p.description)
    }))
  }, [isZh])

  if (!space) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <p className="text-amber-400">空间不存在</p>
      </div>
    )
  }

  // 获取分类下的商品
  const getCategoryProducts = (items: string[]) => {
    return items.map(itemId => displayProducts.find(p => p.slug === itemId)).filter(Boolean) as Product[]
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* 顶部全宽图 */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={space.image} alt={space.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-16">
          <div className="home-layout">
            <h1 className="text-4xl md:text-5xl font-serif text-[#F5F2ED] mb-2">{isZh ? space.name : space.name_en}</h1>
            <p className="text-lg text-amber-400/80" style={{ letterSpacing: '0.1em' }}>{isZh ? space.subtitle : space.subtitle_en}</p>
          </div>
        </div>
      </div>

      <div className="home-layout py-12">
        {/* 场景说明 */}
        <div className="max-w-2xl mb-16">
          <p className="text-lg text-[#9A948E] leading-relaxed" style={{ letterSpacing: '0.02em' }}>
            {isZh ? space.description : space.description_en}
          </p>
        </div>

        {/* 如法配置清单 */}
        <section className="mb-16">
          <h2 className="text-xl font-serif text-[#E8E4DF] mb-8" style={{ letterSpacing: '0.1em' }}>
            {isZh ? '本空间推荐法物' : 'Recommended Items'}
          </h2>

          <div className="space-y-10">
            {space.categories.map((category, idx) => {
              const products = getCategoryProducts(category.items)
              if (products.length === 0) return null

              return (
                <div key={idx} className="border-b border-[#D4A574]/10 pb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-amber-400 font-serif">{category.name}</span>
                    <span className="text-[#6B6560]">/</span>
                    <span className="text-[#8A8178] text-sm">{category.name_en}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(product => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="group bg-[#141414] rounded-lg overflow-hidden border border-[#D4A574]/10 hover:border-[#D4A574]/30 transition-all"
                      >
                        <div className="aspect-[4/3] relative">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-[#E8E4DF] font-serif mb-1">{product.name}</h3>
                          <p className="text-sm text-[#8A8178] mb-2">{product.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400">¥{product.price}</span>
                            {product.original_price && (
                              <span className="text-[#6B6560] line-through text-sm">¥{product.original_price}</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 心理兜底 */}
        <div className="text-center py-12 border-t border-[#D4A574]/10">
          <p className="text-[#8A8178] italic" style={{ letterSpacing: '0.05em' }}>
            {isZh
              ? '法物只是助缘，真正的修行，在每日一坐、一念之间。'
              : 'Ritual objects are merely aids—the true practice lies in daily sitting and every moment of mindfulness.'}
          </p>
        </div>

        {/* 返回链接 */}
        <div className="text-center mt-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
            <span>←</span>
            <span>{isZh ? '返回馆藏' : 'Back to Collection'}</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
