import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-4">🪔</div>
        <h1 className="text-4xl font-serif mb-4">404</h1>
        <p className="text-stone-500 mb-8">抱歉，您访问的页面不存在</p>
        <Link href="/" className="inline-block px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800">
          返回首页
        </Link>
      </div>
    </div>
  )
}
