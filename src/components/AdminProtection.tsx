'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function AdminProtection({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // 登录页不需要保护，直接通过
    if (pathname === '/admin/login') {
      setLoading(false)
      setIsAuthorized(true)
      return
    }

    checkAdmin()
  }, [pathname])

  const checkAdmin = async () => {
    try {
      const res = await fetch('/api/admin/verify', {
        credentials: 'include'
      })

      if (res.ok) {
        const data = await res.json()
        if (data.isAdmin) {
          setIsAuthorized(true)
        } else {
          router.push('/admin/login')
        }
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Admin verify error:', error)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="text-stone-500">验证中...</div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
