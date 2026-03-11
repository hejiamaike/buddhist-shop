import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300 py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-medium mb-4">关于我们</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">公司介绍</Link></li>
            <li><Link href="/support" className="hover:text-white">联系我们</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-medium mb-4">客户服务</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/support#shipping" className="hover:text-white">配送说明</Link></li>
            <li><Link href="/returns" className="hover:text-white">退换货</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-medium mb-4">关注我们</h3>
          <div className="flex gap-4 text-xl">
            <span>📱</span><span>💬</span><span>📧</span>
          </div>
        </div>
        <div>
          <h3 className="text-white font-medium mb-4">联系方式</h3>
          <ul className="space-y-2 text-sm">
            <li>📧 service@buddhist-shop.com</li>
            <li>📱 +86 400-XXX-XXXX</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-stone-700 text-center text-sm">
        <p>© 2026 如法阁. All rights reserved.</p>
      </div>
    </footer>
  )
}
