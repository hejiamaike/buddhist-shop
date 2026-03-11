'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

// 模拟从后台获取的富文本内容（实际项目中可从 Supabase 或 CMS 获取）
const aboutContent = {
  zh: {
    hero: {
      title: '发心缘起',
      subtitle: 'A Spirit of Devotion'
    },
    sections: [
      {
        id: 'origin',
        title: '缘起',
        content: `<p>如法阁诞生于一个简单的发心——在喧嚣的都市中，为寻觅一片安宁的众生，守护千年佛教文化的庄严与美好。</p>
        <p>我们相信，每一件佛具、每一串念珠、每一尊佛像，都承载着修行者的愿力与工匠的心血。如法阁致力于将这些承载着智慧与慈悲的法物，传递给有缘之人。</p>
        <blockquote>「诸法因缘生，诸法因缘灭」——愿与每一位访客结下善缘，共同探索禅意生活的美学。</blockquote>`,
        image: null
      },
      {
        id: 'craft',
        title: '匠心',
        content: `<p>我们坚持「原材正宗、古法炮制」的选品理念。每一件藏品，均由经验丰富的匠人手工打造，延续千年传承的技艺。</p>
        <p>从选材到成品，我们严格把控每一个环节：</p>
        <ul>
          <li>小叶紫檀，只选印度迈索尔百年老料</li>
          <li>佛像铸造，沿用失蜡法古铜工艺</li>
          <li>天然沉香，采自越南芽庄原始森林</li>
          <li>如法棋具，遵循密宗传承仪轨</li>
        </ul>
        <blockquote>器物有魂，匠心所致——每一件法物，都是修行路上的庄严伴侣。</blockquote>`,
        image: null
      },
      {
        id: 'connection',
        title: '结缘',
        content: `<p>如法阁不仅是一个文化珍品商城，更是一个连接修行者的精神家园。</p>
        <p>我们相信，法物的流通即是智慧的传递。每一次结缘，都是一次殊胜的因缘聚合。</p>
        <p>如您有任何疑问，或需个性化定制，请随时与我们结缘。我们愿以真诚与善意，陪伴您的禅修之路。</p>
        <blockquote>「一切有为法，如梦幻泡影」——愿您在如法阁寻得的，不仅是一件法物，更是一颗宁静的心。</blockquote>`,
        image: null
      },
      {
        id: 'partnership',
        title: '合作共赢',
        content: `<p>如法阁欢迎与志同道合的机构和个人建立合作关系，共同传承与弘扬佛教文化。</p>
        <h4 class="text-lg font-medium mb-3 mt-8">合作方向</h4>
        <ul>
          <li>寺庙法物流通授权合作</li>
          <li>匠人工作室入驻</li>
          <li>文化机构联合策展</li>
          <li>修行道场物资供应</li>
        </ul>
        <h4 class="text-lg font-medium mb-3 mt-8">合作理念</h4>
        <p>我们坚持"以心传心、以物结缘"的合作原则，期待与每一位伙伴建立长期、稳定、互信的合作关系。</p>
        <blockquote>独行快，众行远——愿与您携手，共同书写佛教文化传承的新篇章。</blockquote>
        <div class="bg-[#F8F4EE] rounded-lg p-6 mt-8">
          <p class="mb-2">如有合作意向，请发送邮件至：</p>
          <p class="text-lg">contact@rufage.com</p>
          <p class="text-sm text-[#8A8178] mt-2">我们将在收到邮件后24小时内与您联系</p>
        </div>`,
        image: null
      }
    ],
    contact: {
      email: 'contact@rufage.com',
      wechat: '如法阁'
    }
  },
  en: {
    hero: {
      title: 'Origins',
      subtitle: 'A Spirit of Devotion'
    },
    sections: [
      {
        id: 'origin',
        title: 'Origins',
        content: `<p>Rufage was born from a simple aspiration — to preserve the sacred beauty of millennia-old Buddhist culture for those seeking tranquility in the bustling city.</p>
        <p>We believe that every ritual object, every mala bead, and every Buddha statue carries the devotion of practitioners and the craftsmanship of artisans. Rufage is dedicated to passing these wisdom-filled Dharma objects to those with whom we share a karmic connection.</p>
        <blockquote>"All things arise from causes and conditions; all things cease from causes and conditions." — May we form wholesome connections with every visitor, exploring together the aesthetics of a mindful life.</blockquote>`,
        image: null
      },
      {
        id: 'craft',
        title: 'Craftsmanship',
        content: `<p>We adhere to the principle of "authentic materials, traditional methods." Each treasure is handcrafted by experienced artisans, continuing the techniques passed down through millennia.</p>
        <p>From material selection to finished product, we rigorously control every step:</p>
        <ul>
          <li>Rosewood: Only select century-old materials from Mysore, India</li>
          <li>Buddha Statues: Using the ancient lost-wax bronze casting method</li>
          <li>Agarwood: Harvested from the primeval forests of Nha Trang, Vietnam</li>
          <li>Oracle Chess: Following Vajrayana transmission rituals</li>
        </ul>
        <blockquote>Objects have spirits, craftsmanship brings soul — every Dharma object is a sacred companion on your spiritual journey.</blockquote>`,
        image: null
      },
      {
        id: 'connection',
        title: 'Connection',
        content: `<p>Rufage is not just a cultural treasure marketplace, but a spiritual home connecting practitioners.</p>
        <p>We believe that the circulation of Dharma objects is the transmission of wisdom. Each connection is a blessed aggregation of conditions.</p>
        <p>If you have any questions or need personalized customization, please feel free to connect with us. We wish to accompany your meditation path with sincerity and kindness.</p>
        <blockquote>"All conditioned things are like dreams, illusions, bubbles, shadows" — May you find at Rufage, not just a Dharma object, but a tranquil heart.</blockquote>`,
        image: null
      },
      {
        id: 'partnership',
        title: 'Partnership',
        content: `<p>Rufage welcomes partnerships with like-minded organizations and individuals to jointly inherit and promote Buddhist culture.</p>
        <h4 class="text-lg font-medium mb-3 mt-8">Partnership Areas</h4>
        <ul>
          <li>Temple Dharma item circulation authorization</li>
          <li>Artisan studio residency</li>
          <li>Cultural institution joint exhibitions</li>
          <li>Practice center supplies</li>
        </ul>
        <h4 class="text-lg font-medium mb-3 mt-8">Partnership Philosophy</h4>
        <p>We adhere to the principle of "transmitting heart to heart, connecting through objects" — looking forward to establishing long-term, stable, and trustworthy partnerships with every partner.</p>
        <blockquote>Alone we go fast, together we go far — may we join hands to write a new chapter in Buddhist cultural heritage.</blockquote>
        <div class="bg-[#F8F4EE] rounded-lg p-6 mt-8">
          <p class="mb-2">For partnership inquiries, please email:</p>
          <p class="text-lg">contact@rufage.com</p>
          <p class="text-sm text-[#8A8178] mt-2">We will contact you within 24 hours</p>
        </div>`,
        image: null
      }
    ],
    contact: {
      email: 'contact@rufage.com',
      wechat: 'Rufage'
    }
  }
}

export default function AboutPage() {
  const { language, t } = useLanguage()
  const isZh = language === 'zh'
  const content = isZh ? aboutContent.zh : aboutContent.en

  return (
    <div className="min-h-screen bg-[#F8F4EE]">
      {/* Hero Section - 氛围感头图 */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(180, 140, 80, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(120, 90, 50, 0.08) 0%, transparent 40%),
            linear-gradient(180deg, #F8F4EE 0%, #EDE8DF 100%)
          `
        }}
      >
        {/* 装饰元素 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-amber-600/5 blur-2xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-amber-800/3 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p
            className="text-sm tracking-[0.3em] mb-4"
            style={{ color: '#8A8178', letterSpacing: '0.3em' }}
          >
            {content.hero.subtitle}
          </p>
          <h1
            className="text-4xl md:text-5xl font-serif mb-6"
            style={{
              color: '#2C2A27',
              fontWeight: 600,
              letterSpacing: '0.1em'
            }}
          >
            {content.hero.title}
          </h1>
          <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[#B8956E] to-transparent" />
        </div>
      </section>

      {/* 主内容区 - 单栏大留白 */}
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {content.sections.map((section, index) => (
          <section
            key={section.id}
            className="mb-20 md:mb-28 last:mb-0"
          >
            {/* 章节标题 */}
            <div className="flex items-center gap-6 mb-10">
              <span
                className="text-2xl font-serif"
                style={{ color: '#B8956E' }}
              >
                0{index + 1}
              </span>
              <h2
                className="text-2xl font-serif"
                style={{
                  color: '#2C2A27',
                  fontWeight: 600,
                  letterSpacing: '0.15em'
                }}
              >
                {section.title}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#2C2A27]/10 to-transparent" />
            </div>

            {/* 富文本内容 - 禅意排版 */}
            <div
              className="prose-content"
              style={{
                color: '#4A4540',
                lineHeight: '2',
                fontSize: '1.0625rem'
              }}
              dangerouslySetInnerHTML={{
                __html: section.content
                  .replace(/<p>/g, '<p class="mb-6">')
                  .replace(/<blockquote>/g, '<blockquote class="my-8 pl-6 border-l-2 border-[#B8956E] italic">')
                  .replace(/<ul>/g, '<ul class="my-6 space-y-2 list-disc list-inside" style="color: #6B635A">')
                  .replace(/<li>/g, '<li class="ml-4">')
              }}
            />
          </section>
        ))}
      </main>

      {/* 底部结缘CTA */}
      <section
        className="py-16 md:py-24 border-t border-[#2C2A27]/5"
        style={{
          background: `
            radial-gradient(ellipse at 50% 100%, rgba(180, 140, 80, 0.08) 0%, transparent 60%),
            #F2EBE3
          `
        }}
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h3
            className="text-2xl font-serif mb-6"
            style={{
              color: '#2C2A27',
              fontWeight: 600,
              letterSpacing: '0.1em'
            }}
          >
            {isZh ? '与如法阁结缘' : 'Connect with Rufage'}
          </h3>
          <p
            className="mb-8"
            style={{ color: '#6B635A', lineHeight: '1.8' }}
          >
            {isZh ? '如需咨询或有特别因缘，请随时与我们联系' : 'For inquiries or special connections, please feel free to contact us'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${content.contact.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#2C2A27]/20 rounded-lg hover:bg-[#2C2A27]/5 transition-colors"
              style={{ color: '#2C2A27' }}
            >
              <span>{content.contact.email}</span>
            </a>
            <span
              className="text-sm"
              style={{ color: '#8A8178' }}
            >
              {isZh ? '微信：' : 'WeChat: '}{content.contact.wechat}
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-[#2C2A27]/5">
        <p
          className="text-sm"
          style={{ color: '#8A8178' }}
        >
          © 2026 {isZh ? '如法阁 · 传承千年智慧' : 'Rufage · Heritage of Wisdom'}
        </p>
      </footer>
    </div>
  )
}
