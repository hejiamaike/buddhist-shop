import Link from 'next/link'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-serif mb-4">订单提交成功</h1>
        <p className="text-stone-500 mb-6">感谢您的购买，我们会尽快处理您的订单</p>
        <div className="flex gap-4 justify-center">
          <Link href="/order" className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800">
            查看订单
          </Link>
          <Link href="/products" className="px-6 py-3 border border-amber-700 text-amber-700 rounded-lg hover:bg-amber-50">
            继续购物
          </Link>
        </div>
      </div>
    </div>
  )
}
