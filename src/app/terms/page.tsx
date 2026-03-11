'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TermsPage() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <div className="min-h-screen bg-[#F8F4EE]">
      <main className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="text-amber-700 hover:underline mb-8 inline-block">
          ← {isZh ? '返回首页' : 'Back to Home'}
        </Link>

        <h1 className="text-3xl font-serif mb-8" style={{ color: '#2C2A27' }}>
          {isZh ? '用户服务条款' : 'Terms of Service'}
        </h1>

        <div className="prose prose-stone max-w-none space-y-6" style={{ color: '#4A4540' }}>
          <p>
            {isZh
              ? '欢迎使用如法阁服务！在使用我们的服务前，请仔细阅读以下服务条款。'
              : 'Welcome to Rufage! Please read the following Terms of Service carefully before using our services.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '一、服务条款的确认' : '1. Acceptance of Terms'}
          </h2>
          <p>
            {isZh
              ? '通过访问或使用如法阁网站，您确认您已阅读、理解并同意接受本服务条款的约束。如果您不同意本条款的任何部分，请勿使用我们的服务。'
              : 'By accessing or using the Rufage website, you confirm that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to any part of these terms, please do not use our services.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '二、账户注册与管理' : '2. Account Registration and Management'}
          </h2>
          <p>
            {isZh
              ? '您需要注册账户才能享受完整的服务。在注册时，请提供真实、准确、完整的信息。您有责任保护账户安全，对账户下的所有活动负责。'
              : 'You need to register an account to enjoy full services. When registering, please provide true, accurate, and complete information. You are responsible for maintaining account security and all activities under your account.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '三、订单与交易' : '3. Orders and Transactions'}
          </h2>
          <ul className="list-decimal pl-6 space-y-2">
            <li>{isZh ? '当您提交订单时，即表示您愿意购买相应的商品' : 'When you submit an order, you indicate willingness to purchase the corresponding product'}</li>
            <li>{isZh ? '我们保留拒绝或取消任何订单的权利' : 'We reserve the right to reject or cancel any order'}</li>
            <li>{isZh ? '商品价格以您下单时显示的价格为准' : 'Product prices are subject to the price displayed when you place your order'}</li>
          </ul>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '四、知识产权' : '4. Intellectual Property'}
          </h2>
          <p>
            {isZh
              ? '如法阁网站上的所有内容（包括但不限于文字、图片、标识、设计）均为如法阁的知识产权。未经授权，严禁复制、转载或使用。'
              : 'All content on the Rufage website (including but not limited to text, images, logos, designs) is the intellectual property of Rufage. Unauthorized reproduction, reprinting, or use is strictly prohibited.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '五、免责声明' : '5. Disclaimer'}
          </h2>
          <p>
            {isZh
              ? '我们尽力确保网站信息的准确性和时效性，但不保证其完全准确无误。对于因使用网站信息而导致的任何损失，我们不承担责任。'
              : 'We strive to ensure the accuracy and timeliness of website information, but do not guarantee it is completely accurate. We are not responsible for any losses arising from the use of website information.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '六、修改与终止' : '6. Modification and Termination'}
          </h2>
          <p>
            {isZh
              ? '我们保留随时修改服务条款的权利。条款修改后，如您继续使用服务，即表示接受修改后的条款。我们也可能随时终止服务。'
              : 'We reserve the right to modify these Terms of Service at any time. After modifications, if you continue to use the services, it means you accept the modified terms. We may also terminate services at any time.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '七、适用法律' : '7. Governing Law'}
          </h2>
          <p>
            {isZh
              ? '本服务条款适用中华人民共和国法律。因本条款产生的争议，应协商解决；协商不成的，向如法阁所在地人民法院提起诉讼。'
              : 'These Terms of Service are governed by the laws of the People\'s Republic of China. Disputes arising from these terms should be resolved through negotiation; if unsuccessful, shall be submitted to the people\'s court where Rufage is located.'}
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
