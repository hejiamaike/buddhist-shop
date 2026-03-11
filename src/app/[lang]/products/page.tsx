'use client'

import { useState, useEffect, Suspense, useMemo, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { useProducts, Product } from '@/hooks/useProducts'

// 分类数据 - 从 Supabase 获取
const CATEGORIES = [
  { id: 'buddha', name: '佛像', name_en: 'Buddhas', slug: 'buddha' },
  { id: 'beads', name: '佛珠', name_en: 'Malas', slug: 'beads' },
  { id: 'incense', name: '香炉', name_en: 'Censers', slug: 'incense' },
  { id: 'books', name: '经书', name_en: 'Sutras', slug: 'books' },
  { id: 'practice', name: '法器', name_en: 'Rituals', slug: 'practice' },
]

// 后备产品数据（Supabase 不可用时使用）
const FALLBACK_PRODUCTS: Product[] = [
  { id: '1', name: '小叶紫檀手串', name_en: 'Sacred Rosewood Mala', slug: 'xiaoye-zitan', price: 899, original_price: 1299, stock: 50, images: ['https://images.unsplash.com/photo-1590534247854-e97d5e3ed38e?w=400'], description: '精选印度小叶紫檀，纹理细腻，油密度高', status: 'active' },
  { id: '2', name: '铜镀金释迦牟尼佛像', name_en: 'The Enlightened One: Shakyamuni Buddha', slug: 'sakyamuni-buddha', price: 3680, original_price: 4999, stock: 10, images: ['https://images.unsplash.com/photo-1599707367072-cd6cf66a80a2?w=400'], description: '精铜铸造，镀金工艺，庄严殊胜', status: 'active' },
  { id: '3', name: '天然沉香线香', name_en: 'Premium Agarwood Incense', slug: 'chenxiang-incense', price: 168, stock: 100, images: ['https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=400'], description: '天然越南芽庄沉香，清新淡雅', status: 'active' },
  { id: '4', name: '莲花纹铜香炉', name_en: 'Lotus Bronze Censer', slug: 'lotus-censer', price: 458, stock: 25, images: ['https://images.unsplash.com/photo-1602523961358-9dfd4ea5a6d0?w=400'], description: '精铜铸造，莲花纹理，仿古工艺', status: 'active' },
  { id: '5', name: '心经书法卷轴', name_en: 'Heart Sutra Calligraphy Scroll', slug: 'xingjing-scroll', price: 1280, original_price: 1680, stock: 30, images: ['https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?w=400'], description: '名家手书，宣纸影印，锦绫装裱', status: 'active' },
  { id: '6', name: '如法棋', name_en: 'Sacred Rufa Oracle Chess', slug: 'rufa-chess', price: 2520, original_price: 3200, stock: 99, images: ['https://images.unsplash.com/photo-1606103935946-6b5a3f1a7d0b?w=400'], description: '承载千年佛学精神体系，密宗投骰游戏', status: 'active' },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') || ''
  const { language, setLanguage } = useLanguage()
  const { products, loading, error, fetchProducts } = useProducts()

  // 设置语言
  useEffect(() => {
    const path = window.location.pathname
    if (path.startsWith('/en')) {
      setLanguage('en')
    } else {
      setLanguage('zh')
    }
  }, [setLanguage])

  // 从 Supabase 获取产品
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const isZh = language === 'zh'

  // 根据语言选择产品名称
  const displayProducts = useMemo(() => {
    if (products.length > 0) {
      return products.map((p: Product) => ({
        ...p,
        name: isZh ? p.name : (p.name_en || p.name),
        description: isZh ? p.description : (p.description_long_en || p.description)
      }))
    }
    return FALLBACK_PRODUCTS.map(p => ({
      ...p,
      name: isZh ? p.name : (p.name_en || p.name),
      description: isZh ? p.description : (p.name_en || p.description)
    }))
  }, [products, isZh])

  const categories = isZh
    ? CATEGORIES
    : CATEGORIES.map(c => ({ ...c, name: c.name_en }))

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  // 使用 ref 避免无限循环
  const prevDisplayRef = useRef<string>('')

  // 搜索建议
  const suggestions = isZh
    ? ['小叶紫檀', '沉香', '佛像', '心经', '如法棋']
    : ['Rosewood', 'Agarwood', 'Buddha', 'Heart Sutra', 'Rufa']

  // 筛选
  useEffect(() => {
    if (!displayProducts || displayProducts.length === 0) return

    // 避免无限循环
    const productsJson = JSON.stringify(displayProducts)
    if (prevDisplayRef.current === productsJson) return
    prevDisplayRef.current = productsJson

    let filtered = displayProducts
    if (selectedCategory) {
      // 按分类筛选
    }
    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.name_en && p.name_en.toLowerCase().includes(search.toLowerCase()))
      )
    }
    setFilteredProducts(filtered)
  }, [search, selectedCategory, displayProducts])

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="bg-[#12121a]/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🪔</span>
              <span className="text-xl font-serif text-amber-200">如法阁</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/products" className="text-amber-400">{isZh ? '全部商品' : 'All Products'}</Link>
              <Link href="/categories" className="text-gray-400 hover:text-amber-400">{isZh ? '分类' : 'Categories'}</Link>
            </nav>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLanguage(isZh ? 'en' : 'zh')}
                className="text-gray-400 hover:text-amber-400 text-sm"
              >
                {isZh ? 'EN' : '中文'}
              </button>
              <Link href="/cart" className="text-gray-400 hover:text-amber-400">🛒</Link>
              <Link href="/profile" className="text-gray-400 hover:text-amber-400">👤</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 搜索 */}
        <div className="search-enhanced mb-8">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isZh ? '搜索 Buddhist treasures...' : 'Search Buddhist treasures...'}
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-gray-200 placeholder-gray-500"
            />
          </div>
        </div>

        {/* 分类下拉 */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full text-sm transition ${!selectedCategory ? 'bg-amber-600 text-white' : 'bg-white/5 text-gray-400'}`}
          >
            {isZh ? '全部馆藏' : 'All'}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm transition ${selectedCategory === cat.slug ? 'bg-amber-600 text-white' : 'bg-white/5 text-gray-400'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-amber-400 text-lg">{isZh ? '加载中...' : 'Loading...'}</div>
          </div>
        )}

        {/* 错误状态 */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-400">{isZh ? '加载失败，请稍后重试' : 'Failed to load, please try again'}</div>
          </div>
        )}

        {/* 产品网格 */}
        {!loading && !error && (
          <div className="product-grid">
            {filteredProducts.map((product) => {
              // 处理图片数组
              const productImage = (Array.isArray(product.images) && product.images.length > 0)
                ? product.images[0]
                : (typeof product.images === 'string' ? product.images : 'https://images.unsplash.com/photo-1590534247854-e97d5e3ed38e?w=400')

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="product-card-enhanced group"
                >
                  <div className="image-container">
                    <img src={String(productImage)} alt={product.name} className="w-full h-full object-cover" />
                    {product.original_price && (
                      <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                        {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  <div className="card-content">
                    <h3 className="card-title font-serif">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-3">{product.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl text-amber-400 font-serif">¥{product.price}</span>
                      {product.original_price && (
                        <span className="text-sm text-gray-500 line-through">¥{product.original_price}</span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* 无产品 */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-500">{isZh ? '暂无产品' : 'No products found'}</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#12121a] border-t border-white/5 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
          <p>© 2026 如法阁. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-gray-400">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
