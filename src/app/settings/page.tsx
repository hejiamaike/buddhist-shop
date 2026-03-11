'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/hooks/useAuth'
import { Shield, User, Lock, Bell, Globe } from 'lucide-react'

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage()
  const { user, signOut } = useAuth()
  const router = useRouter()
  const isZh = language === 'zh'

  const showComingSoon = () => {
    alert(isZh ? '功能开发中...' : 'Coming soon...')
  }

  return (
    <div className="min-h-screen bg-[#0d0c0a]">
      <main className="max-w-2xl mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/profile" className="text-amber-400/70 hover:text-amber-400">
            ← {isZh ? '返回' : 'Back'}
          </Link>
          <h1 className="text-xl font-serif text-gray-100">
            {isZh ? '账号设置' : 'Account Settings'}
          </h1>
          <div className="w-16" />
        </div>

        {/* Account Info */}
        <div className="bg-[#1a1815] rounded-xl p-5 mb-6 border border-amber-500/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-500/30 flex items-center justify-center">
              <User size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-gray-100">{user?.email?.split('@')[0]}</p>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Settings Options */}
        <div className="space-y-3">
          {/* Language */}
          <button
            onClick={() => setLanguage(isZh ? 'en' : 'zh')}
            className="w-full bg-[#1a1815] rounded-xl p-4 border border-amber-500/10 flex items-center justify-between hover:border-amber-500/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-amber-400/70" />
              <span className="text-gray-100">{isZh ? '语言' : 'Language'}</span>
            </div>
            <span className="text-gray-400 text-sm">{isZh ? '中文' : 'English'}</span>
          </button>

          {/* Password */}
          <button
            onClick={showComingSoon}
            className="w-full bg-[#1a1815] rounded-xl p-4 border border-amber-500/10 flex items-center justify-between hover:border-amber-500/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-amber-400/70" />
              <span className="text-gray-100">{isZh ? '修改密码' : 'Change Password'}</span>
            </div>
            <span className="text-gray-500 text-sm">→</span>
          </button>

          {/* Notifications */}
          <button
            onClick={showComingSoon}
            className="w-full bg-[#1a1815] rounded-xl p-4 border border-amber-500/10 flex items-center justify-between hover:border-amber-500/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-amber-400/70" />
              <span className="text-gray-100">{isZh ? '消息通知' : 'Notifications'}</span>
            </div>
            <span className="text-gray-500 text-sm">→</span>
          </button>

          {/* Security */}
          <button
            onClick={showComingSoon}
            className="w-full bg-[#1a1815] rounded-xl p-4 border border-amber-500/10 flex items-center justify-between hover:border-amber-500/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-amber-400/70" />
              <span className="text-gray-100">{isZh ? '安全与隐私' : 'Security & Privacy'}</span>
            </div>
            <span className="text-gray-500 text-sm">→</span>
          </button>
        </div>

        {/* Sign Out */}
        <button
          onClick={signOut}
          className="w-full mt-8 py-3 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
        >
          {isZh ? '退出登录' : 'Sign Out'}
        </button>
      </main>
    </div>
  )
}
