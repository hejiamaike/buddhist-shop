'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-serif mb-4">出错了</h1>
          <p className="text-stone-500 mb-8">抱歉，页面发生了错误</p>
          <button onClick={reset} className="inline-block px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800">
            重试
          </button>
        </div>
      </body>
    </html>
  )
}
