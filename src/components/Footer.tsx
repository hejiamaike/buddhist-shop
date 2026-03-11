import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#12100d] border-t border-amber-500/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 主要内容区 */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* 关于我们 */}
          <div>
            <h3 className="text-amber-400/80 font-serif mb-4">关于我们</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-amber-500/60 hover:text-amber-400 transition-colors">发心缘起</Link></li>
              <li><Link href="/story" className="text-amber-500/60 hover:text-amber-400 transition-colors">如法故事</Link></li>
              <li><Link href="/intro" className="text-amber-500/60 hover:text-amber-400 transition-colors">引磬入门</Link></li>
            </ul>
          </div>

          {/* 客户服务 */}
          <div>
            <h3 className="text-amber-400/80 font-serif mb-4">客户服务</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/support#shipping" className="text-amber-500/60 hover:text-amber-400 transition-colors">配送说明</Link></li>
              <li><Link href="/support#returns" className="text-amber-500/60 hover:text-amber-400 transition-colors">退换货政策</Link></li>
              <li><Link href="/support#warranty" className="text-amber-500/60 hover:text-amber-400 transition-colors">品质保证</Link></li>
              <li><Link href="/support#faq" className="text-amber-500/60 hover:text-amber-400 transition-colors">常见问题</Link></li>
            </ul>
          </div>

          {/* 法律政策 */}
          <div>
            <h3 className="text-amber-400/80 font-serif mb-4">法律政策</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terms" className="text-amber-500/60 hover:text-amber-400 transition-colors">用户协议</Link></li>
              <li><Link href="/privacy" className="text-amber-500/60 hover:text-amber-400 transition-colors">隐私政策</Link></li>
              <li><Link href="/history" className="text-amber-500/60 hover:text-amber-400 transition-colors">交易记录</Link></li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-amber-400/80 font-serif mb-4">联系方式</h3>
            <ul className="space-y-3 text-sm text-amber-500/60">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:service@rufage.cn" className="hover:text-amber-400 transition-colors">service@rufage.cn</a>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <span>微信：rufage2019</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>工作日 9:00-18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 微信客服区 */}
        <div className="bg-[#1a1815]/50 rounded-xl p-6 mb-8 border border-amber-500/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-4xl">🪔</span>
              </div>
              <p className="text-amber-500/60 text-sm">扫码添加客服</p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-amber-400 font-serif mb-2">在线客服</h4>
              <p className="text-amber-500/60 text-sm mb-2">工作日 9:00-18:00</p>
              <p className="text-amber-500/50 text-xs">添加请注明"如法阁"</p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-amber-400 font-serif mb-2">售后服务</h4>
              <p className="text-amber-500/60 text-sm mb-2">7天无理由退换</p>
              <p className="text-amber-500/50 text-xs">正品保障 · 顺丰包邮</p>
            </div>
          </div>
        </div>

        {/* 支付方式 */}
        <div className="border-t border-amber-500/10 pt-6 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-amber-500/40">
            <span className="text-sm">💳 支持微信支付</span>
            <span className="text-sm">💵 支持支付宝</span>
            <span className="text-sm">🏦 银行转账</span>
            <span className="text-sm">📦 顺丰速运</span>
          </div>
        </div>

        {/* 版权 */}
        <div className="text-center text-amber-500/30 text-sm">
          <p>© 2026 如法阁 Rufage. All rights reserved.</p>
          <p className="mt-1 text-xs">每一件藏品，皆是一次结缘</p>
        </div>
      </div>
    </footer>
  )
}
