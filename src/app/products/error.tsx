'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0d0c0a] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-serif text-gray-100 mb-4">出错了</h2>
        <p className="text-gray-400 mb-6">
          抱歉，系统发生了错误。请稍后重试。
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          重试
        </button>
      </div>
    </div>
  )
}
