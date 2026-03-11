'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCartContext } from '@/contexts/CartProvider'
import { useAuth } from '@/hooks/useAuth'
import { ShoppingBag, User, LogOut, Package, Search, BookOpen, Heart, Sparkles } from 'lucide-react'

export function Header() {
  const { t, language, setLanguage } = useLanguage()
  const { count } = useCartContext()
  const { user, signOut } = useAuth()
  const [accountOpen, setAccountOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [collectionOpen, setCollectionOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const collectionRef = useRef<HTMLDivElement>(null)

  // 产品详情页不显示品牌名称
  const isProductPage = pathname.startsWith('/product/')

  // 点击其他地方关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (collectionRef.current && !collectionRef.current.contains(event.target as Node)) {
        setCollectionOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 十六字导航配置
  const navLinks = [
    { href: '/products', label: t('馆藏分类', 'Collections') },
    { href: '/categories', label: t('禅意百科', 'Wisdom') },
    { href: '/about', label: t('发心缘起', 'Origins') },
  ]

  // 检查是否为当前页面
  const isActive = (href: string) => {
    if (href === '/products') {
      return pathname === '/products' || pathname?.startsWith('/products')
    }
    return pathname === href || pathname?.startsWith(href + '/')
  }

  // 获取导航链接样式
  const getNavLinkStyle = (href: string) => {
    const active = isActive(href)
    return {
      color: active ? '#B8965E' : '#2C2A27',
      fontWeight: active ? 500 : 400,
    }
  }

  // 购物车是否为空
  const cartEmpty = count === 0

  const handleSignOut = async () => {
    await signOut()
    setAccountOpen(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50" style={{ background: 'rgba(248, 244, 238, 0.98)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {/* 佛教法轮图标 */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B8965E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
              <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
              <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
              <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
            </svg>
            {!isProductPage && <span className="text-xl font-serif" style={{ color: '#2C2A27', fontWeight: 600, letterSpacing: '2px' }}>如法阁</span>}
          </Link>

          {/* 搜索框 - 全局显示 */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder={language === 'zh' ? '搜索藏品...' : 'Search collection...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 bg-white border border-[#2C2A27]/20 rounded-full text-sm focus:outline-none focus:border-amber-500/50"
                style={{ fontWeight: 400, color: '#111111', WebkitTextFillColor: '#111111' }}
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8178]" />
            </form>
          </div>

          <nav className="hidden md:flex items-center gap-10" style={{ letterSpacing: '1px' }}>
            {/* 馆藏分类 - 宝箱/藏品图标 */}
            <div className="relative" ref={collectionRef}>
              <button
                onClick={() => setCollectionOpen(!collectionOpen)}
                className="hover:text-amber-700 transition-colors flex items-center gap-1.5"
                style={getNavLinkStyle('/products')}
              >
                <Package size={14} strokeWidth={1.5} />
                {t('馆藏分类', 'Collections')}
                <span className="text-xs transition-transform duration-200" style={{ transform: collectionOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
              </button>
              <div
                className={`absolute top-full left-0 mt-2 py-2 bg-[#F8F4EE] border border-[#2C2A27]/10 rounded-lg transition-all duration-300 shadow-xl min-w-[180px] z-[9999] ${collectionOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                <Link href="/products" onClick={() => setCollectionOpen(false)} className="block px-4 py-2 text-sm hover:bg-[#2C2A27]/5" style={{ color: '#2C2A27' }}>{t('全部藏品', 'All Products')}</Link>
                <div className="border-t border-[#2C2A27]/10 my-1"></div>
                <Link href="/products?category=practice-tools" onClick={() => setCollectionOpen(false)} className="block px-4 py-2 text-sm hover:bg-[#2C2A27]/5" style={{ color: '#2C2A27' }}>
                  {t('修持法具', 'Ritual Tools')} <span className="text-xs text-[#8A8178] ml-1">{t('修行刚需', 'Essential')}</span>
                </Link>
                <Link href="/products?category=offerings" onClick={() => setCollectionOpen(false)} className="block px-4 py-2 text-sm hover:bg-[#2C2A27]/5" style={{ color: '#2C2A27' }}>
                  {t('供养庄严', 'Offerings')} <span className="text-xs text-[#8A8178] ml-1">{t('空间布局', 'Home')}</span>
                </Link>
                <Link href="/products?category=dharma-audio" onClick={() => setCollectionOpen(false)} className="block px-4 py-2 text-sm hover:bg-[#2C2A27]/5" style={{ color: '#2C2A27' }}>
                  {t('法音经典', 'Dharma Audio')} <span className="text-xs text-[#8A8178] ml-1">{t('文化传播', 'Culture')}</span>
                </Link>
                <Link href="/products?category=protective" onClick={() => setCollectionOpen(false)} className="block px-4 py-2 text-sm hover:bg-[#2C2A27]/5" style={{ color: '#2C2A27' }}>
                  {t('随身护佑', 'Protection')} <span className="text-xs text-[#8A8178] ml-1">{t('文创饰品', 'Jewelry')}</span>
                </Link>
                <Link href="/products?category=lifestyle" onClick={() => setCollectionOpen(false)} className="block px-4 py-2 text-sm hover:bg-[#2C2A27]/5" style={{ color: '#2C2A27' }}>
                  {t('禅意生活', 'Zen Lifestyle')} <span className="text-xs text-[#8A8178] ml-1">{t('健康跨界', 'Wellness')}</span>
                </Link>
              </div>
            </div>
            {/* 禅意百科 - 书本/智慧图标 */}
            <Link
              href="/categories"
              className="transition-colors relative flex items-center gap-1.5"
              style={getNavLinkStyle('/categories')}
            >
              <BookOpen size={14} strokeWidth={1.5} />
              {t('禅意百科', 'Wisdom')}
            </Link>
            {/* 发心缘起 - 心/种子图标 - 产品页不显示 */}
            {!isProductPage && (
              <Link
                href="/about"
                className="transition-colors relative flex items-center gap-1.5"
                style={getNavLinkStyle('/about')}
              >
                <Heart size={14} strokeWidth={1.5} />
                {t('发心缘起', 'Origins')}
              </Link>
            )}
            {/* 缘起清单 - 购物袋图标 */}
            <Link
              href="/cart"
              className="transition-colors relative flex items-center gap-1.5"
              style={getNavLinkStyle('/cart')}
            >
              <ShoppingBag size={14} strokeWidth={1.5} />
              {t('缘起清单', 'Cart')}
              {!cartEmpty && (
                <sup className="text-xs ml-0.5" style={{ color: '#B8965E' }}>{count}</sup>
              )}
            </Link>
          </nav>
          {/* 右侧功能区 */}
          <div className="flex items-center gap-3">
            {/* 移动端搜索按钮 */}
            <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden flex items-center justify-center w-8 h-8 hover:text-amber-700 transition-colors" style={{ color: '#2C2A27' }}>
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* 实用导航容器 - EN + 账户 */}
            <div className="flex items-center gap-4" style={{ paddingLeft: '16px', borderLeft: '1px solid rgba(44, 42, 39, 0.1)' }}>
              {/* 语言切换 */}
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="text-xs hover:text-amber-700 transition-colors"
                style={{ color: '#8A8178', letterSpacing: '1px' }}
              >
                EN
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 py-1 bg-[#F8F4EE] border border-[#2C2A27]/10 rounded shadow-lg min-w-[80px] z-[9999]">
                  <button
                    onClick={() => { setLanguage('zh'); setLangOpen(false) }}
                    className="block w-full px-3 py-1.5 text-xs text-[#2C2A27] hover:bg-stone-50 text-left"
                  >
                    中文
                  </button>
                  <button
                    onClick={() => { setLanguage('en'); setLangOpen(false) }}
                    className="block w-full px-3 py-1.5 text-xs text-[#2C2A27] hover:bg-stone-50 text-left"
                  >
                    English
                  </button>
                </div>
              )}

              {/* 账户下拉菜单 - 印章图标 */}
              <div className="relative">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center justify-center w-8 h-8 hover:text-amber-700 transition-colors"
                  style={{ color: '#8A8178' }}
                  title={user ? user.email?.split('@')[0] : (language === 'zh' ? '账户' : 'Account')}
                >
                  {/* 印章风格图标 - 圆形外框 */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="8" r="2" fill="currentColor" />
                    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                </button>

                {accountOpen && (
                  <div className="absolute right-0 mt-2 py-2 bg-[#F8F4EE] border border-[#2C2A27]/10 rounded-lg shadow-xl min-w-[180px] z-[9999]">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-stone-100">
                          <p className="text-sm text-stone-800 truncate">{user.email?.split('@')[0]}</p>
                          <p className="text-xs text-stone-400 truncate">{user.email}</p>
                        </div>
                        <Link href="/profile" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-[#2C2A27] hover:bg-stone-50">
                          <User size={14} strokeWidth={1.5} />
                          {t('个人中心', 'Profile')}
                        </Link>
                        <Link href="/order" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-[#2C2A27] hover:bg-stone-50">
                          <Package size={14} strokeWidth={1.5} />
                          {t('结缘记录', 'Orders')}
                        </Link>
                        <Link href="/cart" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-[#2C2A27] hover:bg-stone-50">
                          <ShoppingBag size={14} strokeWidth={1.5} />
                          {t('缘起清单', 'Cart')}
                        </Link>
                        <button onClick={handleSignOut} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#2C2A27] hover:bg-stone-50">
                          <LogOut size={14} strokeWidth={1.5} />
                          {t('暂别如法', 'Sign Out')}
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-[#2C2A27] hover:bg-stone-50">
                          {t('登录', 'Sign In')}
                        </Link>
                        <Link href="/register" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-[#2C2A27] hover:bg-stone-50">
                          {t('注册账户', 'Register')}
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 移动端搜索框 */}
        {searchOpen && (
          <div className="md:hidden mt-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder={language === 'zh' ? '搜索藏品...' : 'Search collection...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 bg-white border border-[#2C2A27]/20 rounded-full text-sm focus:outline-none focus:border-amber-500/50"
                style={{ fontWeight: 400, color: '#111111', WebkitTextFillColor: '#111111' }}
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8178]" />
            </form>
          </div>
        )}
      </div>

      {/* 点击其他区域关闭下拉菜单 */}
      {(accountOpen || langOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setAccountOpen(false); setLangOpen(false) }}
        />
      )}
    </header>
  )
}
