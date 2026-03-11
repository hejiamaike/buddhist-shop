'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useOrders } from '@/hooks/useOrders'

function OrderContent() {
  const { orders, loading } = useOrders()
  const searchParams = useSearchParams()
  const statusFilter = searchParams.get('status')

  const statusMap: Record<string, { text: string; color: string }> = {
    pending: { text: '待付款', color: 'yellow' },
    paid: { text: '已付款', color: 'blue' },
    processing: { text: '处理中', color: 'purple' },
    shipped: { text: '已发货', color: 'indigo' },
    delivered: { text: '已送达', color: 'green' },
    received: { text: '已送达', color: 'green' },
    cancelled: { text: '已取消', color: 'gray' },
    refund: { text: '退款中', color: 'red' }
  }

  // 根据 status 参数过滤订单
  const filteredOrders = statusFilter
    ? orders.filter(order => order.status === statusFilter)
    : orders

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        加载中...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1
          className="text-3xl font-serif mb-12"
          style={{
            color: '#2C2A27',
            fontWeight: 600,
            letterSpacing: '4px'
          }}
        >
          结缘记录
        </h1>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-stone-500 mb-4">暂无结缘记录</p>
            <Link href="/products" className="inline-block px-6 py-3 bg-amber-700 text-white rounded-lg">
              寻觅藏品
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.slice().reverse().map(order => {
              const status = statusMap[order.status] || statusMap.pending
              return (
                <div key={order.id} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-sm text-stone-500">订单号: {order.order_number}</span>
                      <p className="font-medium">{order.shipping_name} · {order.shipping_phone}</p>
                      <p className="text-sm text-stone-500">{order.shipping_address}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm bg-${status.color}-100 text-${status.color}-700`}>
                      {status.text}
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    {order.items?.map((item: any, i: number) => (
                      <p key={i} className="text-sm">
                        {item.product_name} x{item.quantity}
                      </p>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4 flex justify-between font-bold">
                    <span>合计</span>
                    <span className="text-amber-700">¥{order.total_amount}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0d0c0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>
    }>
      <OrderContent />
    </Suspense>
  )
}
