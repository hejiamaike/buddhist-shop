'use client'

import { useEffect, useState, useCallback } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

// 保存原始的 Link 组件
const OriginalLink = Link

export function NavigationLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    // 开始过渡 - 显示遮罩
    setIsTransitioning(true)

    // 清除旧内容
    setDisplayChildren(null)

    // 立即显示遮罩，下一帧显示新内容
    const timer = requestAnimationFrame(() => {
      setDisplayChildren(children)
      setIsTransitioning(false)
    })

    return () => cancelAnimationFrame(timer)
  }, [pathname, searchParams, children])

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 过渡遮罩 - 完全覆盖页面 */}
      {isTransitioning && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#F8F4EE',
            zIndex: 2147483647,
          }}
        />
      )}
      {displayChildren}
    </div>
  )
}
