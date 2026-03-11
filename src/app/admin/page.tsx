'use client';

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🪔</span>
              <span className="text-xl font-serif">如法阁 - 管理后台</span>
            </Link>
            <button onClick={handleLogout} className="text-stone-600 hover:text-amber-700">
              退出登录
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-serif mb-8">管理后台</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/products" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md">
            <div className="text-4xl mb-4">📦</div>
            <h2 className="text-lg font-medium mb-2">商品管理</h2>
            <p className="text-stone-500 text-sm">添加、编辑、删除商品</p>
          </Link>

          <Link href="/admin/orders" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-lg font-medium mb-2">订单管理</h2>
            <p className="text-stone-500 text-sm">查看和处理订单</p>
          </Link>

          <Link href="/admin/categories" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md">
            <div className="text-4xl mb-4">🏷️</div>
            <h2 className="text-lg font-medium mb-2">分类管理</h2>
            <p className="text-stone-500 text-sm">管理商品分类</p>
          </Link>

          <Link href="/admin/users" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md">
            <div className="text-4xl mb-4">👥</div>
            <h2 className="text-lg font-medium mb-2">用户管理</h2>
            <p className="text-stone-500 text-sm">查看和管理用户</p>
          </Link>

          <Link href="/admin/stats" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-lg font-medium mb-2">数据统计</h2>
            <p className="text-stone-500 text-sm">销售数据和报表</p>
          </Link>

          <Link href="/admin/articles" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-lg font-medium mb-2">文章管理</h2>
            <p className="text-stone-500 text-sm">禅意百科文章管理</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
