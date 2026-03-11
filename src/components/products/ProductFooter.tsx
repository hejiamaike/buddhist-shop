'use client'

import Link from 'next/link'

interface ProductFooterProps {
  isZh: boolean
}

export function ProductFooter({ isZh }: ProductFooterProps) {
  return (
    <footer className="bg-[#12121a] border-t border-white/5 pt-16 pb-8">
      <div className="home-layout max-w-6xl mx-auto px-4">
        {/* 主要内容区 */}
        <div className="footer-main grid md:grid-cols-4 gap-8 mb-12">
          {/* 品牌 */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🪔</span>
              <span className="text-xl font-serif text-amber-200">如法阁</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              {isZh
                ? '传承千年佛教智慧，甄选高品质佛具珍品'
                : 'Inheriting thousand-year Buddhist wisdom, curating finest quality Buddhist artifacts'}
            </p>
          </div>

          {/* 链接 */}
          <div>
            <h4 className="text-amber-200 font-serif mb-4">
              {isZh ? '浏览' : 'Browse'}
            </h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-500 hover:text-amber-400 text-sm">{isZh ? '全部商品' : 'All Products'}</Link></li>
              <li><Link href="/categories" className="text-gray-500 hover:text-amber-400 text-sm">{isZh ? '商品分类' : 'Categories'}</Link></li>
              <li><Link href="/intro" className="text-gray-500 hover:text-amber-400 text-sm">{isZh ? '心经介绍' : 'Heart Sutra'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-amber-200 font-serif mb-4">
              {isZh ? '服务' : 'Service'}
            </h4>
            <ul className="space-y-2">
              <li><Link href="/order" className="text-gray-500 hover:text-amber-400 text-sm">{isZh ? '订单查询' : 'Order Status'}</Link></li>
              <li><Link href="/cart" className="text-gray-500 hover:text-amber-400 text-sm">{isZh ? '购物车' : 'Cart'}</Link></li>
              <li><Link href="/profile" className="text-gray-500 hover:text-amber-400 text-sm">{isZh ? '个人中心' : 'Profile'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-amber-200 font-serif mb-4">
              {isZh ? '关于我们' : 'About'}
            </h4>
            <ul className="space-y-2">
              <li><span className="text-gray-500 text-sm">{isZh ? '联系我们' : 'Contact'}</span></li>
              <li><span className="text-gray-500 text-sm">{isZh ? '服务条款' : 'Terms'}</span></li>
              <li><span className="text-gray-500 text-sm">{isZh ? '隐私政策' : 'Privacy'}</span></li>
            </ul>
          </div>
        </div>

        {/* 承诺条 - 底部居中 */}
        <div className="footer-promise">
          <span className="promise-icon">✦</span>
          <span className="promise-text">{isZh ? '香火传承 · 顺丰速运' : 'Sacred Heritage · Express'}</span>
          <span className="promise-divider">|</span>
          <span className="promise-text">{isZh ? '七天无理由' : '7-Day Returns'}</span>
          <span className="promise-divider">|</span>
          <span className="promise-text">{isZh ? '正品保障' : 'Authentic'}</span>
        </div>

        {/* 版权 */}
        <div className="footer-bottom">
          <p>© 2026 如法阁. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
