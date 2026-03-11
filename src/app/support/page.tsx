'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const menuItems = [
  { id: 'shopping-guide', label: '购物指南', labelEn: 'Shopping Guide' },
  { id: 'shipping', label: '配送说明', labelEn: 'Shipping' },
  { id: 'returns', label: '退换政策', labelEn: 'Returns & Refunds' },
  { id: 'faq', label: '常见问题', labelEn: 'FAQ' },
  { id: 'contact', label: '联系客服', labelEn: 'Contact Us' },
]

const faqItems = [
  {
    question: '如何确认订单已经成功提交？',
    answer: '订单提交成功后，系统会自动发送一封确认邮件至您的邮箱，同时页面会显示订单编号。您也可以在"我的订单"中查看订单状态。'
  },
  {
    question: '支持哪些支付方式？',
    answer: '我们支持微信支付、支付宝、银行转账等多种支付方式。所有支付均通过安全加密通道完成，保障您的资金安全。'
  },
  {
    question: '法物的保养需要注意什么？',
    answer: '不同材质的法物保养方式各异：木质法物应避免暴晒和潮湿；金属法物定期用软布擦拭；沉香类应避免接触化学物品。具体保养指南可在产品详情页查看。'
  },
  {
    question: '是否可以定制法物？',
    answer: '部分法物支持个性化定制服务，包括刻字、尺寸调整等。请联系客服了解详情定制流程和工期。'
  },
  {
    question: '结缘后是否可以退货？',
    answer: '我们提供七天无理由退换服务（定制商品除外）。请确保商品保持原状、包装完整。详情请参阅退换政策页面。'
  }
]

const contentData: Record<string, { title: string; titleEn: string; content: string }> = {
  'shopping-guide': {
    title: '购物指南',
    titleEn: 'Shopping Guide',
    content: `
      <p class="mb-6">欢迎来到如法阁结缘，请您仔细阅读以下购物流程：</p>
      <h4 class="text-lg font-medium mb-3 mt-8">一、浏览与选择</h4>
      <p class="mb-4">您可以通过分类导航、搜索功能或禅意空间场景推荐来浏览藏品。每一件法物都配有详细的介绍与说明。</p>
      <h4 class="text-lg font-medium mb-3 mt-8">二、了解详情</h4>
      <p class="mb-4">点击进入产品详情页，了解法物的材质、工艺、规格以及背后的文化故事。如有疑问，可随时联系客服。</p>
      <h4 class="text-lg font-medium mb-3 mt-8">三、加入行囊</h4>
      <p class="mb-4">确定结缘后，点击"恭请结缘"将法物加入随喜行囊。您可以继续选购其他藏品，或直接前往结算。</p>
      <h4 class="text-lg font-medium mb-3 mt-8">四、确认订单</h4>
      <p class="mb-4">填写收货地址，选择支付方式，确认订单信息。支付成功后，我们将为您安排发货。</p>
      <h4 class="text-lg font-medium mb-3 mt-8">五、收货与确认</h4>
      <p class="mb-4">收到法物后，请仔细检查包装与产品。如有任何问题，请在七天内联系客服处理。</p>
    `
  },
  'shipping': {
    title: '配送说明',
    titleEn: 'Shipping',
    content: `
      <p class="mb-6">我们致力于将每一件法物安全、庄严地送达您手中。</p>
      <h4 class="text-lg font-medium mb-3 mt-8">一、配送方式</h4>
      <p class="mb-4">默认采用顺丰速运，确保法物在运输过程中得到妥善保护。对于易碎或贵重物品，我们会采用特殊包装并购买全额保价。</p>
      <h4 class="text-lg font-medium mb-3 mt-8">二、配送时间</h4>
      <p class="mb-4">正常情况下，订单确认后1-3个工作日内发货。定制商品会根据工艺复杂度标注具体工期，请您耐心等待。</p>
      <h4 class="text-lg font-medium mb-3 mt-8">三、包装说明</h4>
      <p class="mb-4">所有法物均采用精美包装，兼顾美观与安全。外层使用防震材料，内衬柔软织物，确保法物在运输途中不受损伤。</p>
      <h4 class="text-lg font-medium mb-3 mt-8">四、签收须知</h4>
      <p class="mb-4">请在签收前仔细检查包装是否完好。如发现外包装严重破损，建议当场拒收并立即联系客服。</p>
    `
  },
  'returns': {
    title: '退换政策',
    titleEn: 'Returns & Refunds',
    content: `
      <p class="mb-6">我们理解每一件法物与您都是有缘相遇，但仍为您提供完善的退换服务。</p>
      <h4 class="text-lg font-medium mb-3 mt-8">一、七天无理由退换</h4>
      <p class="mb-4">自收到商品之日起七天内，在商品保持全新未使用状态、包装完整的前提下，您可以申请无理由退换货。</p>
      <h4 class="text-lg font-medium mb-3 mt-8">二、定制商品</h4>
      <p class="mb-4">个性化定制商品（如刻字、特殊规格等）因具有专属性，暂不支持退换。请在定制前仔细确认需求。</p>
      <h4 class="text-lg font-medium mb-3 mt-8">三、质量问题</h4>
      <p class="mb-4">若收到商品存在质量问题，请第一时间拍照联系客服，我们将免费为您更换或退款，并承担往返运费。</p>
      <h4 class="text-lg font-medium mb-3 mt-8">四、退换流程</h4>
      <p class="mb-4">1. 联系客服说明情况<br/>2. 客服确认后寄回商品<br/>3. 收到商品后1-3个工作日内完成退款或换货</p>
    `
  },
  'faq': {
    title: '常见问题',
    titleEn: 'FAQ',
    content: '' // Will render FAQ accordion separately
  },
  'contact': {
    title: '联系客服',
    titleEn: 'Contact Us',
    content: `
      <p class="mb-6">如遇任何疑问，欢迎随时与我们结缘。我们愿以真诚与善意，解答您的每一个问题。</p>
      <div class="bg-[#F8F4EE] rounded-lg p-6 mb-6">
        <h4 class="text-lg font-medium mb-4">工作时间</h4>
        <p class="mb-2">周一至周五：9:00 - 18:00</p>
        <p class="mb-2">周六日及节假日：10:00 - 16:00</p>
        <p class="text-sm text-[#8A8178] mt-4">阁主将尽一切可能于24小时内回复您</p>
      </div>
      <h4 class="text-lg font-medium mb-3 mt-8">联系方式</h4>
      <p class="mb-2">📧 邮箱：contact@rufage.com</p>
      <p class="mb-2">💬 微信：如法阁（ID: rufage）</p>
      <p class="mb-4">📍 地址：上海市静安区（详细地址请联系客服）</p>
      <div class="border-t border-[#2C2A27]/10 pt-6 mt-8">
        <p class="italic text-[#6B635A]">"诸法因缘生，诸法因缘灭"——愿与每一位访客结下善缘。</p>
      </div>
    `
  }
}

export default function SupportPage() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const [activeSection, setActiveSection] = useState('shopping-guide')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // 从 URL hash 读取初始 section
  useEffect(() => {
    const hash = window.location.hash.slice(1) // 移除 # 号
    if (hash && contentData[hash]) {
      setActiveSection(hash)
    }
  }, [])

  const currentContent = contentData[activeSection]

  return (
    <div className="min-h-screen bg-[#F8F4EE]">
      {/* Hero */}
      <section
        className="py-16 md:py-20"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(180, 140, 80, 0.1) 0%, transparent 50%),
            linear-gradient(180deg, #F8F4EE 0%, #EDE8DF 100%)
          `
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h1
            className="text-3xl md:text-4xl font-serif mb-2"
            style={{ color: '#2C2A27', fontWeight: 600, letterSpacing: '0.1em' }}
          >
            {isZh ? '服务与支持' : 'Support'}
          </h1>
          <p style={{ color: '#8A8178' }}>
            {isZh ? '购物指南 · 配送说明 · 退换政策 · 常见问题' : 'Shopping Guide · Shipping · Returns · FAQ'}
          </p>
        </div>
      </section>

      {/* Main Content - Sidebar Layout */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <nav className="sticky top-24">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-[#2C2A27] text-white shadow-md'
                          : 'text-[#6B635A] hover:bg-[#2C2A27]/5 hover:text-[#2C2A27]'
                      }`}
                      style={{
                        fontWeight: activeSection === item.id ? 500 : 400,
                        letterSpacing: '0.05em'
                      }}
                    >
                      {isZh ? item.label : item.labelEn}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Right Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-[#2C2A27]/5">
              <h2
                className="text-2xl font-serif mb-6 pb-4 border-b border-[#2C2A27]/10"
                style={{ color: '#2C2A27', fontWeight: 600 }}
              >
                {isZh ? currentContent.title : currentContent.titleEn}
              </h2>

              {activeSection === 'faq' ? (
                <div className="space-y-3">
                  {faqItems.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-[#2C2A27]/10 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F8F4EE] transition-colors"
                      >
                        <span
                          className="font-medium"
                          style={{ color: '#2C2A27' }}
                        >
                          {faq.question}
                        </span>
                        <span
                          className={`text-xl transition-transform duration-200 ${
                            openFaq === index ? 'rotate-45' : ''
                          }`}
                          style={{ color: '#B8956E' }}
                        >
                          +
                        </span>
                      </button>
                      {openFaq === index && (
                        <div
                          className="px-4 pb-4 pt-0 text-[#6B635A]"
                          style={{ lineHeight: '1.8' }}
                        >
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="prose-content"
                  style={{ color: '#4A4540', lineHeight: '1.8', fontSize: '1rem' }}
                  dangerouslySetInnerHTML={{ __html: currentContent.content }}
                />
              )}
            </div>

            {/* Back to Home */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#8A8178] hover:text-[#2C2A27] transition-colors"
              >
                <span>←</span>
                <span>{isZh ? '返回首页' : 'Back to Home'}</span>
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-[#2C2A27]/5">
        <p className="text-sm" style={{ color: '#8A8178' }}>
          © 2026 如法阁 · 传承千年智慧
        </p>
      </footer>
    </div>
  )
}
