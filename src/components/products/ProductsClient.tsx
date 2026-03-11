'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCategories, Category } from '@/hooks/useCategories'
import { useCartContext } from '@/contexts/CartProvider'
import { Product } from '@/hooks/useProducts'
import { Search } from 'lucide-react'

// 产品数据 props 类型（从 Server Component 传入）
interface ProductsClientProps {
  initialProducts: Product[]
  categories: Category[]
}

// 筛选选项
const FILTER_OPTIONS_ZH = {
  material: ['小叶紫檀', '金铜造像', '越南芽庄沉香', '精铜', '泾县熟宣', '木石良金'],
  use_case: ['供奉', '佩戴', '居家', '修行', '共修'],
  price_range: [
    { name: '随喜结缘', min: 0, max: 500 },
    { name: '入门精选', min: 500, max: 1000 },
    { name: '传世珍藏', min: 1000, max: 3000 },
    { name: '重器大作', min: 3000, max: 999999 }
  ]
}

const FILTER_OPTIONS_EN = {
  material: ['Rosewood', 'Gilded Bronze', 'Agarwood', 'Bronze', 'Rice Paper', 'Wood & Bronze'],
  use_case: ['Veneration', 'Wear', 'Home', 'Practice', 'Group'],
  price_range: [
    { name: 'Entry', min: 0, max: 500 },
    { name: 'Gifts', min: 500, max: 1000 },
    { name: 'Heritage', min: 1000, max: 3000 },
    { name: 'Master', min: 3000, max: 999999 }
  ]
}

// 后备产品数据（Supabase 不可用时使用）
const FALLBACK_PRODUCTS = [
  { id: '1', name: '小叶紫檀手串', name_en: 'Sacred Rosewood Mala', slug: 'xiaoye-zitan', price: 899, original_price: 1299, stock: 50, images: ['https://images.unsplash.com/photo-1590534247854-e97d5e3ed38e?w=400'], description: '精选印度小叶紫檀，纹理细腻，油密度高', status: 'active' },
  { id: '2', name: '铜镀金释迦牟尼佛像', name_en: 'The Enlightened One: Shakyamuni Buddha', slug: 'sakyamuni-buddha', price: 3680, original_price: 4999, stock: 10, images: ['https://images.unsplash.com/photo-1599707367072-cd6cf66a80a2?w=400'], description: '精铜铸造，镀金工艺，庄严殊胜', status: 'active' },
  { id: '3', name: '天然沉香线香', name_en: 'Premium Agarwood Incense', slug: 'chenxiang-incense', price: 168, stock: 100, images: ['https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=400'], description: '天然越南芽庄沉香，清新淡雅', status: 'active' },
  { id: '4', name: '莲花纹铜香炉', name_en: 'Lotus Bronze Censer', slug: 'lotus-censer', price: 458, stock: 25, images: ['https://images.unsplash.com/photo-1602523961358-9dfd4ea5a6d0?w=400'], description: '精铜铸造，莲花纹理，仿古工艺', status: 'active' },
  { id: '5', name: '心经书法卷轴', name_en: 'Heart Sutra Calligraphy Scroll', slug: 'xingjing-scroll', price: 1280, original_price: 1680, stock: 30, images: ['https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?w=400'], description: '名家手书，宣纸影印，锦绫装裱', status: 'active' },
  { id: '6', name: '如法棋', name_en: 'Sacred Rufa Oracle Chess', slug: 'rufa-chess', price: 2520, original_price: 3200, stock: 99, images: ['https://images.unsplash.com/photo-1606103935946-6b5a3f1a7d0b?w=400'], description: '承载千年佛学精神体系，密宗投骰游戏', status: 'active' },
  { id: '7', name: '宋锦丝绒拜垫', name_en: 'Songjin Velvet Cushion', slug: 'songbo', price: 680, stock: 45, images: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400'], description: '宋锦面料，丝绒内衬，柔软舒适', status: 'active' },
  { id: '8', name: '转经轮', name_en: 'Prayer Wheel', slug: 'zhuanjinglun', price: 1280, stock: 20, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=400'], description: '黄铜转经轮，手工錾刻，经文环绕', status: 'active' },
]

// 热门搜索
const HOT_SEARCHES_ZH = ['沉香', '佛像', '手串', '香炉', '心经']
const HOT_SEARCHES_EN = ['Incense', 'Buddha', 'Mala', 'Censer', 'Sutra']

// 场景
const SCENES_ZH = [
  { id: 'study', name: '书房禅修', description: '静心悟道，阅读抄经', subtitle: '一方静处，安放心念', products: ['putuan', 'xingyue-beads', 'chenxiang-incense', 'lianhua-lamp', 'jingang-copy-set', 'xijing-scroll'], image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80' },
  { id: 'home', name: '居家供奉', description: '庄严法相，祈福安康', subtitle: '一隅庄严，心香供奉', products: ['sakyamuni-buddha', 'wenshu-buddha', 'lianhua-lamp', 'jingshui-cup', 'shuijing-wan', 'lotus-censer'], image: 'https://images.unsplash.com/photo-1599707367072-cd6cf66a80a2?w=1200&q=80' },
  { id: 'practice', name: '共修结缘', description: '佛友聚会，增进智慧', subtitle: '以法会友，共种福田', products: ['rufa-chess', 'songbo', 'zhuanjinglun', 'jingang-bell', 'yinzi', 'fengyan-bodhi'], image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1200&q=80' }
]

const SCENES_EN = [
  { id: 'study', name: 'Study & Meditation', description: 'Quiet contemplation and sutra copying', subtitle: 'A peaceful space for the mind', products: ['putuan', 'xingyue-beads', 'chenxiang-incense', 'lianhua-lamp', 'jingang-copy-set', 'xijing-scroll'], image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80' },
  { id: 'home', name: 'Home Shrine', description: 'Sacred space for blessings', subtitle: 'A corner of holiness', products: ['sakyamuni-buddha', 'wenshu-buddha', 'lianhua-lamp', 'jingshui-cup', 'shuijing-wan', 'lotus-censer'], image: 'https://images.unsplash.com/photo-1599707367072-cd6cf66a80a2?w=1200&q=80' },
  { id: 'practice', name: 'Group Practice', description: 'Dharma friends gathering', subtitle: 'Sharing wisdom together', products: ['rufa-chess', 'songbo', 'zhuanjinglun', 'jingang-bell', 'yinzi', 'fengyan-bodhi'], image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1200&q=80' }
]

// 硬编码分类后备
const CATEGORIES_ZH = [
  { name: '修持法具', slug: 'practice-tools', desc: '修行刚需', fullDesc: '日常早晚课、诵经、打坐的必备法器，助您精进修行' },
  { name: '供养庄严', slug: 'offerings', desc: '空间布局', fullDesc: '佛堂布置与佛前供具，营造神圣清净的居家空间' },
  { name: '法音经典', slug: 'dharma-audio', desc: '文化传播', fullDesc: '经典法本与法音载体，让智慧音声常住身边' },
  { name: '随身护佑', slug: 'protective', desc: '文创饰品', fullDesc: '随身佩戴的护佑法物与文创首饰' },
  { name: '禅意生活', slug: 'lifestyle', desc: '健康跨界', fullDesc: '融合禅意美学与现代生活的身心调养之物' }
]

const CATEGORIES_EN = [
  { name: 'Practice Tools', slug: 'practice-tools', desc: 'Essential Implements', fullDesc: 'Essential implements for daily practice, meditation, and spiritual cultivation' },
  { name: 'Offerings', slug: 'offerings', desc: 'Sacred Space', fullDesc: 'Shrine setup and offering vessels to create a sacred home environment' },
  { name: 'Dharma Audio', slug: 'dharma-audio', desc: 'Cultural Heritage', fullDesc: 'Classic sutras and Dharma audio carriers to keep wisdom alive' },
  { name: 'Protective', slug: 'protective', desc: 'Creative Accessories', fullDesc: 'Protective amulets and creative accessories for daily wear' },
  { name: 'Zen Living', slug: 'lifestyle', desc: 'Wellness', fullDesc: 'Wellness products blending Zen aesthetics with modern living' }
]

// 子分类
const SUBCATEGORIES_ZH: Record<string, string[]> = {
  'practice-tools': ['念珠手串', '法器法音', '修行辅助'],
  'offerings': ['佛像造像', '供灯净水', '香炉供具'],
  'dharma-audio': ['经书法物', '法音载体', '抄经文具'],
  'protective': ['护身佩戴', '珠宝首饰', '符咒法物'],
  'lifestyle': ['茶道香具', '禅修服饰', '空间香氛']
}

const SUBCATEGORIES_EN: Record<string, string[]> = {
  'practice-tools': ['Malas', 'Ritual Implements', 'Practice Aids'],
  'offerings': ['Buddha Statues', 'Offering Lamps', 'Censers'],
  'dharma-audio': ['Sutras & Texts', 'Audio carriers', 'Copying Tools'],
  'protective': ['Amulets', 'Jewelry', 'Protective Charms'],
  'lifestyle': ['Tea Ceremony', 'Zen Robes', 'Space Fragrance']
}

function ProductsClientContent({ initialProducts, categories }: ProductsClientProps) {
  const { language } = useLanguage()
  const { addItem } = useCartContext()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const searchParam = searchParams.get('search') || ''

  const [searchQuery, setSearchQuery] = useState(searchParam)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)

  const isZh = language === 'zh'

  // 从 URL 参数初始化分类和搜索
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    } else {
      setSelectedCategory(null)
    }
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [categoryParam, searchParam])

  // 根据语言获取显示产品（优先使用数据库，备选后备数据）
  const displayProducts = useMemo(() => {
    const sourceProducts = (initialProducts && initialProducts.length > 0) ? initialProducts : FALLBACK_PRODUCTS
    return sourceProducts.map(p => ({
      ...p,
      name: isZh ? p.name : (p.name_en || p.name),
      description: isZh ? p.description : (p.name_en || p.description)
    }))
  }, [initialProducts, isZh])

  const FILTER_OPTIONS = isZh ? FILTER_OPTIONS_ZH : FILTER_OPTIONS_EN
  const HOT_SEARCHES = isZh ? HOT_SEARCHES_ZH : HOT_SEARCHES_EN
  const SCENES = isZh ? SCENES_ZH : SCENES_EN

  // 统一分类数据源：优先使用数据库
  const CATEGORIES = useMemo(() => {
    if (categories && categories.length > 0) {
      const topLevel = categories.filter(c => !c.parent_id)
      if (topLevel.length > 0) {
        return topLevel.map(c => ({
          name: isZh ? c.name : (c.name_en || c.name),
          slug: c.slug,
          desc: c.short_desc || '',
          fullDesc: c.full_desc || ''
        }))
      }
    }
    return isZh ? CATEGORIES_ZH : CATEGORIES_EN
  }, [categories, isZh])

  const SUBCATEGORIES = isZh ? SUBCATEGORIES_ZH : SUBCATEGORIES_EN
  const currentSubcategories = selectedCategory ? SUBCATEGORIES[selectedCategory] || [] : []

  // 筛选产品
  useEffect(() => {
    if (!displayProducts || displayProducts.length === 0) return

    let result = [...displayProducts]

    if (selectedCategory) {
      result = result.filter(p => p.category_id === selectedCategory || p.category_id === undefined)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        (p.name_en && p.name_en.toLowerCase().includes(query)) ||
        p.description?.toLowerCase().includes(query)
      )
    }
    if (selectedFilters.material?.length) {
      result = result.filter(p => p.material && selectedFilters.material.includes(p.material))
    }
    if (selectedFilters.use_case?.length) {
      result = result.filter(p => p.use_case && selectedFilters.use_case.includes(p.use_case))
    }
    if (selectedFilters.subcategory?.length) {
      result = result.filter(p => p.subcategory && selectedFilters.subcategory.includes(p.subcategory))
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    setFilteredProducts(result)
  }, [searchQuery, selectedFilters, priceRange, displayProducts, selectedCategory])

  useEffect(() => {
    const handleScroll = () => setIsHeaderScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleFilter = (type: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[type] || []
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter(v => v !== value) }
      }
      return { ...prev, [type]: [...current, value] }
    })
  }

  const handleHotSearch = (tag: string) => setSearchQuery(tag)
  const clearFilters = () => {
    setSelectedFilters({})
    setPriceRange([0, 10000])
    setSearchQuery('')
    setSelectedCategory(null)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <div className="home-layout">
        {/* 馆宝推荐 - 仅在非搜索、无分类时显示 */}
        {!selectedCategory && !searchQuery && (
        <section className="featured-section">
          <div className="featured-header">
            <h2 className="featured-main-title">{isZh ? '馆宝推荐' : 'Featured Treasure'}</h2>
            <p className="featured-subtitle">{isZh ? '一阁一宝 · 如法而藏' : 'One Treasure, One Heritage'}</p>
          </div>
          <div className="featured-tags">
            <span className="featured-tag">{isZh ? '法器' : 'Ritual'}</span>
            <span className="featured-tag">{isZh ? '密宗传承' : 'Vajrayana'}</span>
            <span className="featured-tag">{isZh ? '限量珍藏' : 'Limited'}</span>
          </div>
          <div className="featured-product">
            <div className="featured-content">
              <h2 className="featured-title">{isZh ? '如法棋' : 'Rufa Oracle Chess'}</h2>
              <p className="featured-description">
                {isZh
                  ? '在密宗传统中，修行不仅是个人之事，更是一场因缘相聚的共修之路。如法棋，源于密宗共修仪轨，以"行、止、观、照"为法，引导修行者在互动中体悟智慧，在秩序中安放心念。'
                  : 'In Vajrayana tradition, practice is not only personal—it is a collective journey of shared destiny. Rufa Oracle Chess, rooted in Vajrayana ritual, guides practitioners through "action, stillness, observation, and illumination."'}
              </p>
              <div className="featured-price">
                <span className="price-current">
                  <span className="price-label">{isZh ? '结缘价' : 'Blessing'} </span>¥2520
                </span>
                <span className="price-original">¥3200</span>
              </div>
              <div className="featured-actions">
                <Link href="/product/rufa-chess" className="btn-request">
                  {isZh ? '恭请结缘' : 'Request'}
                </Link>
                <Link href="/story/rufa-chess" className="btn-story">
                  {isZh ? '为何是此宝' : 'Why This Treasure'} →
                </Link>
              </div>
              <p className="featured-suitable">
                {isZh ? '适合：共修 · 研修 · 长期修行者' : 'For: Group Practice · Study · Long-term Practitioners'}
              </p>
            </div>
            <div className="featured-image">
              <img src="https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=1200&q=80" alt="Rufa Chess" />
            </div>
          </div>
        </section>
        )}

        {/* 分类页 - 显示分类专属头部 */}
        {selectedCategory && (
          <section className="category-header">
            <div className="category-breadcrumb">
              <Link href="/products" className="breadcrumb-link">{isZh ? '全部商品' : 'All Products'}</Link>
              <span className="breadcrumb-sep">›</span>
              <span className="breadcrumb-current">
                {CATEGORIES.find(c => c.slug === selectedCategory)?.name}
              </span>
            </div>
            <h1 className="category-title">
              {CATEGORIES.find(c => c.slug === selectedCategory)?.name}
            </h1>
            <p className="category-description">
              {CATEGORIES.find(c => c.slug === selectedCategory)?.fullDesc}
            </p>
          </section>
        )}

        {/* 分类页显示筛选 */}
        {selectedCategory && (
        <section className="capsule-filters">
          <div className="filter-capsules-wrap">
            {FILTER_OPTIONS.material.map(item => (
              <button key={item} className={`capsule ${selectedFilters.material?.includes(item) ? 'active' : ''}`} onClick={() => toggleFilter('material', item)}>{item}</button>
            ))}
          </div>
          <div className="filter-capsules-wrap">
            {currentSubcategories.map(item => (
              <button key={item} className={`capsule ${selectedFilters.subcategory?.includes(item) ? 'active' : ''}`} onClick={() => toggleFilter('subcategory', item)}>{item}</button>
            ))}
          </div>
          <div className="filter-capsules-wrap">
            {FILTER_OPTIONS.price_range.map(item => (
              <button key={item.name} className={`capsule ${priceRange[0] === item.min && priceRange[1] === item.max ? 'active' : ''}`} onClick={() => setPriceRange([item.min, item.max])}>{item.name}</button>
            ))}
          </div>
          {(Object.keys(selectedFilters).length > 0 || priceRange[0] > 0 || priceRange[1] < 10000) && (
            <button onClick={clearFilters} className="clear-btn">{isZh ? '清除' : 'Clear'}</button>
          )}
        </section>
        )}

        {/* 禅意空间 - 仅非搜索时显示 */}
        {!selectedCategory && !searchQuery && (
        <section className="scene-section">
          <div className="section-header">
            <h2>{isZh ? '禅意空间' : 'Zen Spaces'}</h2>
            <p className="section-subtitle">{isZh ? '从法物，到生活的安放方式' : 'From ritual objects to living spaces'}</p>
          </div>
          <div className="scene-grid">
            {SCENES.map(scene => (
              <Link key={scene.id} href={`/space/${scene.id}`} className="scene-card">
                <div className="scene-image">
                  <img src={scene.image} alt={scene.name} />
                  <div className="scene-overlay">
                    <h3>{scene.name}</h3>
                    <p>{scene.description}</p>
                    <span className="scene-link">{isZh ? '入室观瞧' : 'Explore'} →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        )}

        {/* 首页筛选区 - 仅非搜索时显示 */}
        {!selectedCategory && !searchQuery && (
        <section className="capsule-filters">
          <div className="filter-capsules-wrap">
            {FILTER_OPTIONS.material.map(item => (
              <button key={item} className={`capsule ${selectedFilters.material?.includes(item) ? 'active' : ''}`} onClick={() => toggleFilter('material', item)}>{item}</button>
            ))}
          </div>
          <div className="filter-capsules-wrap">
            {FILTER_OPTIONS.use_case.map(item => (
              <button key={item} className={`capsule ${selectedFilters.use_case?.includes(item) ? 'active' : ''}`} onClick={() => toggleFilter('use_case', item)}>{item}</button>
            ))}
          </div>
          <div className="filter-capsules-wrap">
            {FILTER_OPTIONS.price_range.map(item => (
              <button key={item.name} className={`capsule ${priceRange[0] === item.min && priceRange[1] === item.max ? 'active' : ''}`} onClick={() => setPriceRange([item.min, item.max])}>{item.name}</button>
            ))}
          </div>
          {(Object.keys(selectedFilters).length > 0 || priceRange[0] > 0 || priceRange[1] < 10000) && (
            <button onClick={clearFilters} className="clear-btn">{isZh ? '清除' : 'Clear'}</button>
          )}
        </section>
        )}

        <section className="product-section">
          <div className="product-grid">
            {filteredProducts.map((product, idx) => (
              <Link key={product.id} href={`/product/${product.slug}`} className="product-card">
                <div className="product-image">
                  <img src={String(product.images?.[0])} alt={product.name} />
                  {(product.slug === 'rufa-chess' || product.slug === 'songbo' || product.slug === 'zhuanjinglun') && (
                    <span className="product-badge">{isZh ? '缘起' : 'Blessed'}</span>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-subtitle">{product.description}</p>
                  <div className="product-tags">
                    {product.tags && Array.isArray(product.tags) && product.tags.map((tag: string) => <span key={tag} className="product-tag">{tag}</span>)}
                  </div>
                  <div className="product-price">
                    <span className="price-current">¥{product.price}</span>
                    {product.original_price && <span className="price-original">¥{product.original_price}</span>}
                  </div>
                  <button
                    className="btn-add-cart"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      addItem({
                        slug: product.slug,
                        name: product.name,
                        price: product.price,
                        image: Array.isArray(product.images) ? product.images[0] : product.images,
                        quantity: 1
                      })
                    }}
                  >
                    {isZh ? '结缘' : 'Blessing'}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0d0c0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>
    }>
      <ProductsClientContent initialProducts={initialProducts} categories={categories} />
    </Suspense>
  )
}
