'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartContext } from '@/contexts/CartProvider'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CartPage() {
  const pathname = usePathname()
  const { language, t } = useLanguage()
  const isZh = language === 'zh'
  const { cart, loading, total, updateQuantity, removeItem } = useCartContext()

  // 路由切换时立即滚动到页面顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-[#F8F4EE]">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1
          className="text-3xl font-serif mb-12"
          style={{
            color: '#2C2A27',
            fontWeight: 600,
            letterSpacing: '4px'
          }}
        >
          {isZh ? '缘起清单' : 'Cart'}
        </h1>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span style={{ color: '#8A8178' }}>{isZh ? '加载中...' : 'Loading...'}</span>
          </div>
        ) : cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <p className="mb-4" style={{ color: '#6B635A' }}>{isZh ? '缘起清单' : 'Cart'}是空的</p>
            <Link href="/products" className="inline-block px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800">
              {isZh ? '寻觅藏品' : 'Browse Collection'}
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm divide-y" style={{ borderColor: '#E5E0D8' }}>
              {cart.map(item => (
                <div key={item.slug} className="p-5 flex gap-5 items-center">
                  {/* 商品图片 */}
                  <div
                    className="w-20 h-20 bg-stone-100 rounded flex-shrink-0 flex items-center justify-center text-2xl"
                    style={{ backgroundColor: '#F5F2ED' }}
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                    ) : (
                      '🪔'
                    )}
                  </div>

                  {/* 商品名称 - 视觉锚点 */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-medium"
                      style={{
                        color: '#2C2A27',
                        fontWeight: 500,
                        letterSpacing: '1px',
                        fontSize: '1rem'
                      }}
                    >
                      {item.name}
                    </h3>
                    {/* 价格 - 弱化处理 */}
                    <p
                      className="font-bold mt-1"
                      style={{ color: '#B8956E', fontSize: '0.9rem' }}
                    >
                      ¥{item.price}
                    </p>
                  </div>

                  {/* 数量控制 */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.slug, -1)}
                      className="w-8 h-8 rounded flex items-center justify-center transition-colors"
                      style={{ border: '1px solid #E5E0D8', color: '#6B635A' }}
                    >
                      -
                    </button>
                    <span
                      className="w-6 text-center"
                      style={{ color: '#2C2A27' }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.slug, 1)}
                      className="w-8 h-8 rounded flex items-center justify-center transition-colors"
                      style={{ border: '1px solid #E5E0D8', color: '#6B635A' }}
                    >
                      +
                    </button>
                  </div>

                  {/* 移出按钮 */}
                  <button
                    onClick={() => removeItem(item.slug)}
                    className="text-sm px-3 py-1 rounded transition-colors hover:bg-red-50"
                    style={{ color: '#8A8178' }}
                  >
                    {isZh ? '移出' : 'Remove'}
                  </button>
                </div>
              ))}
            </div>

            {/* 底部结算 */}
            <div className="bg-white rounded-lg shadow-sm p-5 mt-5" style={{ borderColor: '#E5E0D8' }}>
              <div className="flex justify-between items-center mb-5">
                <span
                  className="text-lg"
                  style={{ color: '#2C2A27', fontWeight: 500 }}
                >
                  {isZh ? '共修善缘:' : 'Total:'}
                </span>
                <span
                  className="text-xl font-bold"
                  style={{ color: '#B8956E' }}
                >
                  ¥{total}
                </span>
              </div>
              <Link
                href="/checkout"
                className="block w-full py-3 text-center rounded-lg transition-colors font-medium"
                style={{
                  backgroundColor: '#B8956E',
                  color: '#FFFFFF',
                  letterSpacing: '2px'
                }}
              >
                {isZh ? '确认结缘' : 'Checkout'}
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
