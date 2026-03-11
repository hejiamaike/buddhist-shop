'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 后台登录页不显示 Header
  if (mounted && pathname === '/admin/login') {
    return null
  }

  return <>{children}</>
}
