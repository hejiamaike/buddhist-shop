'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/contexts/LanguageContext'
import { Package, ShoppingBag, Heart, Eye, LogOut, User, MapPin, Settings, MessageCircle, CreditCard, Bell, Shield } from 'lucide-react'

// Mock order counts for demo
const ORDER_STATUS_COUNTS = {
  pending: 2,
  shipped: 1,
  received: 3,
  review: 2
}

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth()
  const { language, t } = useLanguage()
  const isZh = language === 'zh'
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    setMounted(true)

    // 根据时段显示问候语
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 9) {
      setGreeting(isZh ? '晨光初照，欢迎归来' : 'Good morning, welcome back')
    } else if (hour >= 9 && hour < 12) {
      setGreeting(isZh ? '光阴静好，藏品候您' : 'Good time, treasures await')
    } else if (hour >= 12 && hour < 14) {
      setGreeting(isZh ? '午安禅静，随喜功德' : 'Afternoon peace, merit accrues')
    } else if (hour >= 14 && hour < 18) {
      setGreeting(isZh ? '下午吉祥，静心选物' : 'Afternoon blessings, choose mindfully')
    } else if (hour >= 18 && hour < 22) {
      setGreeting(isZh ? '暮色降临，灯火可亲' : 'Evening falls, warmth awaits')
    } else {
      setGreeting(isZh ? '夜深安住，好梦常随' : 'Deep night, pleasant dreams')
    }
  }, [isZh])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-amber-400">{isZh ? '加载中...' : 'Loading...'}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d0c0a]">
      <main className="max-w-4xl mx-auto px-4 py-8 pt-20">
        {user ? (
          <>
            {/* 用户信息卡片 */}
            <div className="bg-gradient-to-b from-[#1a1815] to-[#12100d] rounded-xl p-6 mb-6 border border-amber-500/10">
              <div className="flex items-center gap-4">
                {/* 金色圆环头像 - 圆相设计 */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent border border-amber-500/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600/20 to-amber-800/10 flex items-center justify-center">
                      <span className="text-xl font-serif text-amber-400/80" style={{ fontFamily: 'Noto Serif SC, Songti SC, serif' }}>
                        〇
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-serif text-gray-100">
                    {user.email?.split('@')[0]}
                  </h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  <p className="text-amber-400/60 text-xs mt-1 font-serif">{greeting}</p>
                </div>

                {/* 账号设置快捷入口 */}
                <Link href="/settings" className="p-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 transition-colors">
                  <Settings size={20} className="text-amber-400/70" />
                </Link>
              </div>
            </div>

            {/* 订单状态快捷入口 */}
            <div className="bg-[#1a1815] rounded-xl p-4 mb-6 border border-amber-500/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-100 font-serif">{isZh ? '我的订单' : 'My Orders'}</h3>
                <Link href="/order" className="text-amber-400/70 text-sm hover:text-amber-400 transition-colors">
                  {isZh ? '查看全部' : 'View All'} →
                </Link>
              </div>
              <div className="flex justify-between">
                {/* 待付款 */}
                <Link href="/order?status=pending" className="flex flex-col items-center gap-2 group">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                      <CreditCard size={22} className="text-amber-400/80" />
                    </div>
                    {ORDER_STATUS_COUNTS.pending > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {ORDER_STATUS_COUNTS.pending}
                      </span>
                    )}
                  </div>
                  <span className="text-gray-400 text-xs">{isZh ? '待付款' : 'Pending'}</span>
                </Link>

                {/* 待发货 */}
                <Link href="/order?status=paid" className="flex flex-col items-center gap-2 group">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                      <Package size={22} className="text-amber-400/80" />
                    </div>
                    {ORDER_STATUS_COUNTS.shipped > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                        {ORDER_STATUS_COUNTS.shipped}
                      </span>
                    )}
                  </div>
                  <span className="text-gray-400 text-xs">{isZh ? '待发货' : 'To Ship'}</span>
                </Link>

                {/* 待收货 */}
                <Link href="/order?status=shipped" className="flex flex-col items-center gap-2 group">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                      <ShoppingBag size={22} className="text-amber-400/80" />
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">{isZh ? '待收货' : 'To Receive'}</span>
                </Link>

                {/* 待评价 */}
                <Link href="/order?status=received" className="flex flex-col items-center gap-2 group">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                      <Heart size={22} className="text-amber-400/80" />
                    </div>
                    {ORDER_STATUS_COUNTS.review > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                        {ORDER_STATUS_COUNTS.review}
                      </span>
                    )}
                  </div>
                  <span className="text-gray-400 text-xs">{isZh ? '待评价' : 'To Review'}</span>
                </Link>

                {/* 退换/售后 */}
                <Link href="/order?status=refund" className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <Shield size={22} className="text-amber-400/80" />
                  </div>
                  <span className="text-gray-400 text-xs">{isZh ? '售后' : 'Returns'}</span>
                </Link>
              </div>
            </div>

            {/* 功能菜单 - 3x2 网格布局 */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {/* 收缘地址 - 替换原来的缘起清单 */}
              <Link href="/address" className="group bg-[#1a1815] hover:bg-[#222018] rounded-xl p-4 border border-amber-500/10 hover:border-amber-500/30 transition-all">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <MapPin size={20} className="text-amber-400/80" />
                  </div>
                  <div>
                    <h3 className="text-gray-100 font-serif text-sm">{isZh ? '收缘地址' : 'Addresses'}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">{isZh ? '管理收货地址' : 'Shipping addresses'}</p>
                  </div>
                </div>
              </Link>

              {/* 心有所属 - 收藏 */}
              <Link href="/favorites" className="group bg-[#1a1815] hover:bg-[#222018] rounded-xl p-4 border border-amber-500/10 hover:border-amber-500/30 transition-all">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Heart size={20} className="text-amber-400/80" />
                  </div>
                  <div>
                    <h3 className="text-gray-100 font-serif text-sm">{isZh ? '心有所属' : 'Favorites'}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">{isZh ? '收藏的藏品' : 'Saved items'}</p>
                  </div>
                </div>
              </Link>

              {/* 结缘足迹 */}
              <Link href="/history" className="group bg-[#1a1815] hover:bg-[#222018] rounded-xl p-4 border border-amber-500/10 hover:border-amber-500/30 transition-all">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Eye size={20} className="text-amber-400/80" />
                  </div>
                  <div>
                    <h3 className="text-gray-100 font-serif text-sm">{isZh ? '结缘足迹' : 'History'}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">{isZh ? '浏览记录' : 'Browsing history'}</p>
                  </div>
                </div>
              </Link>

              {/* 客户服务 */}
              <Link href="/support" className="group bg-[#1a1815] hover:bg-[#222018] rounded-xl p-4 border border-amber-500/10 hover:border-amber-500/30 transition-all">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <MessageCircle size={20} className="text-amber-400/80" />
                  </div>
                  <div>
                    <h3 className="text-gray-100 font-serif text-sm">{isZh ? '客户服务' : 'Support'}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">{isZh ? '帮助与售后' : 'Help & service'}</p>
                  </div>
                </div>
              </Link>

              {/* 消息通知 */}
              <Link href="/notifications" className="group bg-[#1a1815] hover:bg-[#222018] rounded-xl p-4 border border-amber-500/10 hover:border-amber-500/30 transition-all">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Bell size={20} className="text-amber-400/80" />
                  </div>
                  <div>
                    <h3 className="text-gray-100 font-serif text-sm">{isZh ? '消息通知' : 'Messages'}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">{isZh ? '订单动态' : 'Order updates'}</p>
                  </div>
                </div>
              </Link>

              {/* 账号设置 */}
              <Link href="/settings" className="group bg-[#1a1815] hover:bg-[#222018] rounded-xl p-4 border border-amber-500/10 hover:border-amber-500/30 transition-all">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Shield size={20} className="text-amber-400/80" />
                  </div>
                  <div>
                    <h3 className="text-gray-100 font-serif text-sm">{isZh ? '账号设置' : 'Account'}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">{isZh ? '安全与隐私' : 'Security'}</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* 退出登录 */}
            <button
              onClick={handleSignOut}
              className="w-full py-3.5 border border-amber-500/20 rounded-xl text-gray-400 hover:text-amber-400 hover:border-amber-500/40 transition-all font-serif flex items-center justify-center gap-2"
            >
              <LogOut size={18} strokeWidth={1.5} />
              {isZh ? '暂别如法' : 'Sign Out'}
            </button>
          </>
        ) : (
          /* 未登录状态 */
          <div className="bg-[#1a1815] rounded-xl p-10 border border-amber-500/10 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 border-2 border-amber-500/30 flex items-center justify-center">
              <User size={32} strokeWidth={1.5} className="text-amber-400" />
            </div>
            <h2 className="text-xl font-serif text-gray-100 mb-2">{isZh ? '静候有缘人' : 'Welcome'}</h2>
            <p className="text-gray-500 mb-6 text-sm">{isZh ? '登录后可查看结缘记录、管理藏品' : 'Sign in to view orders and manage treasures'}</p>
            <div className="flex gap-3 justify-center">
              <Link href="/login" className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition text-sm">
                {isZh ? '登录' : 'Sign In'}
              </Link>
              <Link href="/register" className="px-6 py-2.5 border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 rounded-lg transition text-sm">
                {isZh ? '注册' : 'Register'}
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-500/10 py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 text-xs">
          <p>© 2026 {isZh ? '如法阁 · 传承千年智慧' : 'Rufage · Heritage of Wisdom'}</p>
        </div>
      </footer>
    </div>
  )
}
