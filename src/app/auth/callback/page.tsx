'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function AuthCallback() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!loading) {
      if (user) {
        // 用户已登录，跳转到 profile
        router.push('/profile')
      } else {
        // 登录失败，跳转到登录页
        setError('登录失败，请重试')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🪔</div>
          <h1 className="text-2xl text-amber-400 font-serif mb-2">登录中...</h1>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">😢</div>
          <h1 className="text-2xl text-red-400 font-serif mb-2">{error}</h1>
        </div>
      </div>
    )
  }

  return null
}
