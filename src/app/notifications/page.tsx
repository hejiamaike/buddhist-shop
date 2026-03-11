'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Bell } from 'lucide-react'

export default function NotificationsPage() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <div className="min-h-screen bg-[#0d0c0a]">
      <main className="max-w-2xl mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/profile" className="text-amber-400/70 hover:text-amber-400">
            ← {isZh ? '返回' : 'Back'}
          </Link>
          <h1 className="text-xl font-serif text-gray-100">
            {isZh ? '消息通知' : 'Messages'}
          </h1>
          <div className="w-16" />
        </div>

        {/* Empty State */}
        <div className="bg-[#1a1815] rounded-xl p-12 border border-amber-500/10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Bell size={28} className="text-amber-400/60" />
          </div>
          <h2 className="text-lg font-serif text-gray-100 mb-2">
            {isZh ? '暂无消息' : 'No Messages'}
          </h2>
          <p className="text-gray-500 text-sm">
            {isZh ? '订单动态、优惠活动等消息将在这里显示' : 'Order updates and promotions will appear here'}
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
          <p className="text-amber-400/70 text-sm text-center">
            {isZh ? '消息通知功能正在完善中，敬请期待...' : 'Notifications feature coming soon...'}
          </p>
        </div>
      </main>
    </div>
  )
}
