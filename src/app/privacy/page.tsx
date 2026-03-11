'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PrivacyPage() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <div className="min-h-screen bg-[#F8F4EE]">
      <main className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="text-amber-700 hover:underline mb-8 inline-block">
          ← {isZh ? '返回首页' : 'Back to Home'}
        </Link>

        <h1 className="text-3xl font-serif mb-8" style={{ color: '#2C2A27' }}>
          {isZh ? '隐私政策' : 'Privacy Policy'}
        </h1>

        <div className="prose prose-stone max-w-none space-y-6" style={{ color: '#4A4540' }}>
          <p>
            {isZh
              ? '如法阁高度重视保护用户个人隐私。本隐私政策说明了我们如何收集、使用、存储和保护您的个人信息。'
              : 'Rufage highly values the protection of user privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '一、信息收集' : '1. Information Collection'}
          </h2>
          <p>
            {isZh
              ? '我们收集的信息包括：账户信息（邮箱、用户名）、收货地址、订单信息、浏览记录等。您在注册账户、下单、浏览页面时即授权我们收集相关信息。'
              : 'The information we collect includes: account information (email, username), shipping addresses, order information, browsing history, etc. By registering an account, placing orders, or browsing pages, you authorize us to collect relevant information.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '二、信息使用' : '2. Information Use'}
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{isZh ? '处理订单并完成配送' : 'Processing orders and completing delivery'}</li>
            <li>{isZh ? '提供客户服务和支持' : 'Providing customer service and support'}</li>
            <li>{isZh ? '发送订单更新和物流通知' : 'Sending order updates and logistics notifications'}</li>
            <li>{isZh ? '改进网站功能和服务' : 'Improving website features and services'}</li>
          </ul>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '三、信息保护' : '3. Information Protection'}
          </h2>
          <p>
            {isZh
              ? '我们采用行业标准的安全措施保护您的个人信息，包括SSL加密存储、防火墙、安全访问控制等。您的敏感信息将受到严格保护。'
              : 'We employ industry-standard security measures to protect your personal information, including SSL encrypted storage, firewalls, secure access controls, etc. Your sensitive information is strictly protected.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '四、信息共享' : '4. Information Sharing'}
          </h2>
          <p>
            {isZh
              ? '我们不会出售您的个人信息。在以下情况下，我们可能共享必要信息：配送合作伙伴（用于送货）、法律要求（合规目的）。'
              : 'We do not sell your personal information. In the following circumstances, we may share necessary information: delivery partners (for shipping), legal requirements (compliance purposes).'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '五、您的权利' : '5. Your Rights'}
          </h2>
          <p>
            {isZh
              ? '您有权访问、更正、删除您的个人信息。如需操作，请联系我们的客服。'
              : 'You have the right to access, correct, and delete your personal information. Please contact our customer service for operations.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '六、联系我们' : '6. Contact Us'}
          </h2>
          <p>
            {isZh
              ? '如有隐私相关问题，请联系：contact@rufage.com'
              : 'For privacy-related questions, please contact: contact@rufage.com'}
          </p>

          <p className="text-sm mt-8" style={{ color: '#8A8178' }}>
            {isZh
              ? `最后更新时间：2026年3月`
              : `Last updated: March 2026`}
          </p>
        </div>
      </main>
    </div>
  )
}
