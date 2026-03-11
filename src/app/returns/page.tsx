'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ReturnsPage() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <div className="min-h-screen bg-[#F8F4EE]">
      <main className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="text-amber-700 hover:underline mb-8 inline-block">
          ← {isZh ? '返回首页' : 'Back to Home'}
        </Link>

        <h1 className="text-3xl font-serif mb-8" style={{ color: '#2C2A27' }}>
          {isZh ? '退换货政策' : 'Return & Exchange Policy'}
        </h1>

        <div className="prose prose-stone max-w-none space-y-6" style={{ color: '#4A4540' }}>
          <p>
            {isZh
              ? '如法阁致力于为每一位顾客提供优质的服务。关于退换货，请您仔细阅读以下政策。'
              : 'Rufage is committed to providing quality service to every customer. Please read the following policy regarding returns and exchanges carefully.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '一、七天无理由退货' : '1. 7-Day No-Reason Return'}
          </h2>
          <p>
            {isZh
              ? '我们提供七天无理由退货服务。自收到商品之日起7天内（以物流签收日期为准），商品保持全新未使用状态，您可以申请退货。'
              : 'We provide 7-day no-reason return service. Within 7 days of receiving the product (based on the logistics delivery date), if the product is in brand new unused condition, you may apply for a return.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '二、特殊商品说明' : '2. Special Product Notes'}
          </h2>
          <p>
            {isZh
              ? '以下特殊商品一经签收，非质量问题不予退换：已开光加持的法物、定制商品、易碎品（请当场验货）。如有质量问题，请及时联系客服。'
              : 'The following special products, once received, are not eligible for return or exchange unless there are quality issues: consecrated Dharma items, customized products, fragile items (please inspect upon delivery). If there are quality issues, please contact customer service promptly.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '三、退货流程' : '3. Return Process'}
          </h2>
          <ul className="list-decimal pl-6 space-y-2">
            <li>{isZh ? '联系客服提交退货申请' : 'Contact customer service to submit a return application'}</li>
            <li>{isZh ? '客服审核通过后，请于3个工作日内寄回商品' : 'After approval, please return the product within 3 working days'}</li>
            <li>{isZh ? '收到商品后，我们将在7个工作日内完成退款' : 'After receiving the product, we will complete the refund within 7 working days'}</li>
          </ul>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '四、退款说明' : '4. Refund Instructions'}
          </h2>
          <p>
            {isZh
              ? '退款将原路返回到您的支付账户。退货时请确保商品及包装完整。退款金额为您实际支付的金额（不含运费）。'
              : 'Refunds will be returned to your original payment account. Please ensure the product and packaging are intact when returning. The refund amount is the actual amount you paid (excluding shipping fees).'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '五、换货服务' : '5. Exchange Service'}
          </h2>
          <p>
            {isZh
              ? '商品存在质量问题或与描述不符时，我们提供免费换货服务。请在收到商品后48小时内联系客服，并提供相关图片证明。'
              : 'If there are quality issues or discrepancies with the description, we provide free exchange service. Please contact customer service within 48 hours of receiving the product and provide relevant photo evidence.'}
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4" style={{ color: '#2C2A27' }}>
            {isZh ? '六、联系我们' : '6. Contact Us'}
          </h2>
          <p>
            {isZh
              ? '如有任何疑问，请联系：如法阁客服'
              : 'For any questions, please contact: Rufage Customer Service'}
          </p>
          <p>
            {isZh ? '邮箱：contact@rufage.com' : 'Email: contact@rufage.com'}
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
