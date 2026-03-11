'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

// 文章数据（与 categories 页面共享，实际项目中应从 Supabase 获取）
const articlesData: Record<string, {
  id: string
  title: string
  excerpt: string
  category: string
  categorySlug: string
  date: string
  readTime: string
  content: string
  relatedProducts: { id: string; name: string; price: number; image: string }[]
}> = {
  'zitan-guide': {
    id: 'zitan-guide',
    title: '小叶紫檀鉴别指南',
    excerpt: '从纹理、颜色、气味三个维度，详细讲解如何辨别正宗印度小叶紫檀与冒牌货',
    category: '材质鉴别',
    categorySlug: 'material',
    date: '2026-01-15',
    readTime: '8 分钟阅读',
    content: `
      <h2>引言</h2>
      <p>小叶紫檀（学名：Pterocarpus santalinus），又称檀香紫檀，是印度南部特有的一种珍贵木材。在中国传统文化中，小叶紫檀被视为「木中之王」，其质地坚硬、纹理细腻、色泽沉稳，历来是皇室贵族制作家具和文玩的首选材料。</p>

      <p>然而，市场上鱼龙混杂，各种假冒伪劣产品层出不穷。本文将从专业角度，帮助您掌握鉴别小叶紫檀的核心要点。</p>

      <h2>一、纹理鉴别</h2>
      <p>真正的小叶紫檀纹理独特，主要表现为：</p>
      <ul>
        <li><strong>牛毛纹</strong>：紫檀木的切面上会呈现细密弯曲的纹理，形似牛毛，这是紫檀最典型的特征之一。</li>
        <li><strong>金星</strong>：部分紫檀木料中会呈现出金黄色的矿物质沉积，俗称「金星」，是高品质紫檀的标志。</li>
        <li><strong>棕眼</strong>：木材表面的棕眼细小且不明显，质地越老的料子棕眼越少。</li>
      </ul>

      <blockquote>《本草纲目》载：「紫檀能止血、止痛、调节气血。」</blockquote>

      <h2>二、颜色鉴别</h2>
      <p>小叶紫檀的颜色变化富有层次：</p>
      <ul>
        <li><strong>新料</strong>：呈桔红色或鲜红色，随着把玩逐渐变深。</li>
        <li><strong>老料</strong>：呈深紫色或紫黑色，表面有光泽，如同覆有一层琥珀膜。</li>
        <li><strong>忌水</strong>：紫檀遇水后颜色会变浅，失去光泽，这是辨别真假的重要方法。</li>
      </ul>

      <h2>三、气味鉴别</h2>
      <p>小叶紫檀具有独特的淡香：</p>
      <p>用细砂纸轻轻打磨紫檀表面，会散发出一股淡淡的清香，类似寺庙中供香的气味。若无香味或味道刺鼻，则需警惕是否为假货。</p>

      <h2>结语</h2>
      <p>鉴别小叶紫檀需要多方面的知识积累，建议初学者先从正规渠道购买，找可信赖的商家，同时不断学习交流，方能练就一双「火眼金睛」。</p>

      <blockquote>「器物有魂」—— 一串好的紫檀手串，不仅是装饰，更是修行路上的庄严伴侣。</blockquote>
    `,
    relatedProducts: [
      { id: 'zitan-beads-1', name: '小叶紫檀手串·玻璃底', price: 1280, image: '' },
      { id: 'zitan-beads-2', name: '满金星紫檀手串', price: 2680, image: '' },
    ]
  },
  'buddha-statue-worship': {
    id: 'buddha-statue-worship',
    title: '佛像供奉的仪轨与讲究',
    excerpt: '供奉佛像的位置、方向、高度都有严格讲究，一文详解佛像供奉的正确方法',
    category: '供奉仪轨',
    categorySlug: 'worship',
    date: '2026-01-08',
    readTime: '6 分钟阅读',
    content: `
      <h2>佛像供奉的意义</h2>
      <p>供奉佛像不仅是佛教修行的重要仪式，更是表达对佛陀崇敬之心的方式。在家居环境中供奉佛像，可以起到镇宅安宁、增长福慧的作用。</p>

      <h2>供奉位置的选择</h2>
      <p>佛像应当供奉在家中清净、庄严的位置：</p>
      <ul>
        <li><strong>高度</strong>：佛像的眼睛应与供奉者平视或略高，表示恭敬。</li>
        <li><strong>背后</strong>：应有靠山，不可背后空虚。</li>
        <li><strong>光线</strong>：光线充足但避免强光直射。</li>
        <li><strong>清净</strong>：避免放置在厨房、卫生间等不净之处。</li>
      </ul>

      <blockquote>《金刚经》云：「若以色见我，以音声求我，是人行邪道，不能见如来。」</blockquote>

      <h2>供奉方向</h2>
      <p>不同佛像有不同的供奉方向：</p>
      <ul>
        <li><strong>释迦牟尼佛</strong>：宜坐东朝西，或坐北朝南。</li>
        <li><strong>阿弥陀佛</strong>：宜坐西朝东，表示迎接西方极乐世界。</li>
        <li><strong>观世音菩萨</strong>：宜坐北朝南，慈悲为怀，普度众生。</li>
      </ul>

      <h2>供养仪轨</h2>
      <p>日常供养包括：</p>
      <ul>
        <li><strong>供水</strong>：每日更换清水，代表清净之心。</li>
        <li><strong>供香</strong>：晨起一炷香，净化空气，恭敬礼佛。</li>
        <li><strong>供花</strong>：鲜花供佛，代表庄严之美。</li>
        <li><strong>供果</strong>：新鲜水果，代表圆满福报。</li>
      </ul>

      <h2>结语</h2>
      <p>供奉佛像，重在诚心。形式虽繁，但核心在于一颗恭敬、清净、慈悲的心。</p>
    `,
    relatedProducts: [
      { id: 'buddha-sakyamuni', name: '铜镀金释迦牟尼佛像', price: 5800, image: '' },
      { id: 'buddha-av', name: '铜鎏金观世音菩萨像', price: 4200, image: '' },
    ]
  },
  'incense-guide': {
    title: '线香的使用之道',
    excerpt: '从香具选择到香品配制，探讨线香在禅修与日常生活中的正确使用方法',
    category: '香道文化',
    categorySlug: 'incense',
    date: '2025-12-28',
    readTime: '5 分钟阅读',
    content: `
      <h2>香的文化渊源</h2>
      <p>香道是中国传统文化的重要组成部分，与茶道、花道并称为「三雅道」。自古以来，香就被用于祭祀、静修、医疗等各个方面。</p>

      <blockquote>「炉香赞」：炉香乍爇，法界蒙熏，诸佛海会悉遥闻。</blockquote>

      <h2>线香的分类</h2>
      <p>线香根据原料不同可分为：</p>
      <ul>
        <li><strong>沉香线香</strong>：香气清雅醇和，甜凉兼备，是香中极品。</li>
        <li><strong>檀香线香</strong>：香气浓郁庄重，分为印度檀香和澳洲檀香。</li>
        <li><strong>崖柏线香</strong>：清香淡雅，有安神定魂之效。</li>
        <li><strong>艾草线香</strong>：驱蚊避秽，适合日常使用。</li>
      </ul>

      <h2>香具的选择</h2>
      <p>线香需要配合合适的香具使用：</p>
      <ul>
        <li><strong>香炉</strong>：铜质或陶瓷香炉为佳，底部需平整。</li>
        <li><strong>香插</strong>：便于插入线香，有各种材质和造型。</li>
        <li><strong>香盒</strong>：用于存放线香，保持干燥。</li>
      </ul>

      <h2>使用场合</h2>
      <p>线香适用于多种场合：</p>
      <ul>
        <li><strong>禅修</strong>：一炷清香，助定心安神。</li>
        <li><strong>书斋</strong>：读书品香，雅事一桩。</li>
        <li><strong>卧室</strong>：选择淡雅的沉香，有助于睡眠。</li>
        <li><strong>待客</strong>：焚香迎客，礼仪之体现。</li>
      </ul>

      <h2>结语</h2>
      <p>香不在多，贵在清心。一炷好香，可以让浮躁的心安静下来，这便是香道的真谛。</p>
    `,
    relatedProducts: [
      { id: 'incense-1', name: '芽庄沉香线香', price: 380, image: '' },
      { id: 'incense-2', name: '印度老山檀香', price: 260, image: '' },
    ],
    id: 'incense-guide'
  },
  'beads-mala': {
    id: 'beads-mala',
    title: '佛珠手串的盘玩与养护',
    excerpt: '不同材质的佛珠有不同的盘玩方法，正确养护可让法物更加温润有光泽',
    category: '文玩养护',
    categorySlug: 'maintenance',
    date: '2025-12-20',
    readTime: '7 分钟阅读',
    content: `
      <h2>盘玩的意义</h2>
      <p>盘玩佛珠手串，不仅是一种文玩爱好，更是修行的方式之一。通过长期的把玩，手串会逐渐变色、包浆，呈现出温润的光泽，如同修行者的心性一般，经过磨砺而愈发圆满。</p>

      <h2>不同材质的盘玩方法</h2>
      <ul>
        <li><strong>小叶紫檀</strong>：前期需「戴手套」盘玩，待包浆形成后可净手盘玩。忌水、忌汗。</li>
        <li><strong>崖柏</strong>：适合「武盘」，即直接用手大力揉搓，使其快速包浆。</li>
        <li><strong>星月菩提</strong>：需「先挂瓷」，待表面形成瓷质包浆后再上手。</li>
        <li><strong>蜜蜡</strong>：怕高温、怕化学物质，只需偶尔用软布擦拭即可。</li>
      </ul>

      <blockquote>「一串菩提，一颗禅心」—— 盘的是珠子，磨的是心性。</blockquote>

      <h2>日常养护要点</h2>
      <ul>
        <li><strong>清洁</strong>：定期用软布擦拭，去除表面污垢。</li>
        <li><strong>存放</strong>：不佩戴时放置于阴凉干燥处，避免暴晒。</li>
        <li><strong>补水</strong>：部分木质手串需要定期「上油」保养。</li>
        <li><strong>防裂</strong>：温差大的季节注意防护，避免开裂。</li>
      </ul>

      <h2>结语</h2>
      <p>手串是修行路上的庄严伴侣，用心对待，它会陪伴您走过漫长的岁月，记录下每一次修行的心路历程。</p>
    `,
    relatedProducts: [
      { id: 'beads-1', name: '小叶紫檀手串', price: 1280, image: '' },
      { id: 'beads-2', name: '星月菩提手串', price: 680, image: '' },
    ]
  },
  'zen-meditation': {
    id: 'zen-meditation',
    title: '禅修入门：如何开始打坐',
    excerpt: '为零基础爱好者讲解打坐的基本姿势、呼吸方法与注意事项',
    category: '禅修指导',
    categorySlug: 'meditation',
    date: '2025-12-15',
    readTime: '10 分钟阅读',
    content: `
      <h2>为什么要打坐</h2>
      <p>打坐（又称坐禅、静坐）是佛教修行的基础方法，通过调身、调息、调心，达到身心合一、寂静安住的境界。现代科学研究也表明，打坐可以有效缓解压力、改善睡眠、提升专注力。</p>

      <blockquote>「行亦禅，坐亦禅，语默动静体安然」——《永嘉证道歌》</blockquote>

      <h2>基本姿势</h2>
      <ul>
        <li><strong>坐具</strong>：可使用蒲团、禅垫或椅子。初学者建议使用稍高的坐垫。</li>
        <li><strong>坐姿</strong>：双足跏趺坐（双盘）为最佳，单盘或散盘亦可。</li>
        <li><strong>手印</strong>：双手结定印，放在脐下。</li>
        <li><strong>脊背</strong>：保持脊背挺直，如松柏之正。</li>
        <li><strong>头部</strong>：微微收颌，舌尖轻抵上颚。</li>
        <li><strong>眼睛</strong>：双目微闭，或垂帘视鼻尖。</li>
      </ul>

      <h2>呼吸方法</h2>
      <p>呼吸是进入禅定的关键：</p>
      <ul>
        <li><strong>数息</strong>：数呼吸次数，从一数到十，循环往复。</li>
        <li><strong>随息</strong>：不去数数，只是静静观察呼吸的出入。</li>
        <li><strong>观息</strong>：观察呼吸的长短、冷暖、粗糙细腻。</li>
      </ul>

      <h2>注意事项</h2>
      <ul>
        <li><strong>时间</strong>：初期每次15-30分钟即可，逐渐延长。</li>
        <li><strong>环境</strong>：选择安静、通风、无干扰的场所。</li>
        <li><strong>时机</strong>：晨起或睡前均可，饭後半小时内不宜打坐。</li>
        <li><strong>心态</strong>：不要刻意追求「入定」，顺其自然。</li>
      </ul>

      <h2>结语</h2>
      <p>打坐是一种生活的艺术，它教会我们在忙碌中寻找宁静，在喧嚣中聆听内心的声音。愿每一位修行者都能在打坐中获得清凉与智慧。</p>
    `,
    relatedProducts: [
      { id: 'cushion-1', name: '天然棉纤维禅垫', price: 168, image: '' },
      { id: 'incense-3', name: '禅修专用线香套装', price: 298, image: '' },
    ]
  },
  'heart-sutra-study': {
    id: 'heart-sutra-study',
    title: '《心经》研读：般若智慧的精髓',
    excerpt: '逐句解读《心经》经文，探讨般若波罗蜜多的深奥哲理',
    category: '经典解读',
    categorySlug: 'classics',
    date: '2025-12-08',
    readTime: '12 分钟阅读',
    content: `
      <h2>《心经》简介</h2>
      <p>《般若波罗蜜多心经》，简称《心经》，是佛教大乘经典中最简短、精炼的一部。全经仅260字，却涵盖了般若学的核心要义，被誉为「经中之经」。</p>

      <blockquote>「色不异空，空不异色；色即是空，空即是色。」</blockquote>

      <h2>核心思想解读</h2>
      <ul>
        <li><strong>五蕴皆空</strong>：色、受、想、行、识这五种蕴集构成的人我、法我，本质都是空的。</li>
        <li><strong>般若智慧</strong>：超越分别思量的智慧，能够照见诸法实相。</li>
        <li><strong>波罗蜜多</strong>：意为「到彼岸」，即从迷惑的此岸到达觉悟的彼岸。</li>
        <li><strong>心无挂碍</strong>：心中没有执著和恐怖，便能远离颠倒梦想。</li>
      </ul>

      <h2>重要名相</h2>
      <ul>
        <li><strong>色</strong>：物质现象，包括地、水、火、风四大。</li>
        <li><strong>空</strong>：不是虚无，而是诸法的「空性」，缘起无自性。</li>
        <li><strong>般若</strong>：根本智，能断一切烦恼执着。</li>
        <li><strong>涅槃</h2>
        <p>：烦恼止息，智慧圆满的境界。</li>
      </ul>

      <h2>如何修习《心经》</h2>
      <ul>
        <li><strong>读诵</strong>：每日读诵一遍乃至多遍，体会经文的韵律与义理。</li>
        <li><strong>书写</strong>：抄写《心经》是很好的修行方法，可以静心、摄心。</li>
        <li><strong>思惟</strong>：深入理解每一句的含义，融入日常生活。</li>
        <li><strong>修行</strong>：将般若智慧运用于面对生活的种种境界。</li>
      </ul>

      <h2>结语</h2>
      <p>《心经》虽短，却如同智慧的明灯，照亮我们前行的道路。愿每位读者都能在研读《心经》中，获得般若智慧，照见五蕴皆空，度一切苦厄。</p>

      <blockquote>「揭谛揭谛，波罗揭谛，波罗僧揭谛，菩提萨婆诃。」</blockquote>
    `,
    relatedProducts: [
      { id: 'book-heart', name: '心经书法卷轴·名家手书', price: 880, image: '' },
      { id: 'book-sets', name: '心经+金刚经+楞严经套装', price: 368, image: '' },
    ]
  }
}

export default function ArticlePage() {
  const params = useParams()
  const { language, t } = useLanguage()
  const isZh = language === 'zh'

  const articleId = params.id as string
  const article = articlesData[articleId]

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4" style={{ color: '#2C2A27' }}>文章未找到</h1>
          <Link href="/categories" className="text-amber-700 hover:underline">
            返回禅意百科
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4EE]">
      {/* 面包屑导航 */}
      <div className="bg-white border-b border-[#2C2A27]/5">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm" style={{ color: '#8A8178' }}>
            <Link href="/" className="hover:text-amber-700 transition-colors">首页</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-amber-700 transition-colors">禅意百科</Link>
            <span>/</span>
            <span style={{ color: '#B8956E' }}>{article.category}</span>
          </nav>
        </div>
      </div>

      {/* 文章内容区 - 窄版沉浸式阅读 */}
      <main className="max-w-2xl mx-auto px-6 py-12 md:py-16">
        {/* 顶部元信息 */}
        <div className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-serif mb-6"
            style={{
              color: '#2C2A27',
              fontWeight: 600,
              lineHeight: '1.3'
            }}
          >
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm" style={{ color: '#8A8178' }}>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.category}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* 分割线 */}
        <div className="w-16 h-px mb-10" style={{ backgroundColor: '#B8956E' }} />

        {/* 正文 - 富文本排版 */}
        <article
          className="prose-article"
          dangerouslySetInnerHTML={{
            __html: article.content
              .replace(/<h2>/g, '<h2 class="text-xl md:text-2xl font-serif mt-12 mb-6" style="color: #2C2A27; font-weight: 600;">')
              .replace(/<ul>/g, '<ul class="my-6 space-y-3 list-disc list-inside" style="color: #4A4540;">')
              .replace(/<li>/g, '<li class="ml-4 mb-2" style="line-height: 1.8;">')
              .replace(/<p>/g, '<p class="mb-6" style="color: #4A4540; line-height: 2;">')
              .replace(/<blockquote>/g, '<blockquote class="my-8 pl-6 py-4 border-l-2 italic bg-[#F5F0E8] rounded-r-lg" style="border-color: #B8956E; color: #6B635A; line-height: 1.8;">')
          }}
        />

        {/* 分割线 */}
        <div className="w-full h-px my-12" style={{ backgroundColor: '#2C2A27/10' }} />

        {/* 底部作者信息 */}
        <div className="text-center mb-16">
          <p className="text-sm italic" style={{ color: '#8A8178' }}>
            「愿以此功德，普及于一切，我等与众生，皆共成佛道」
          </p>
        </div>
      </main>

      {/* 相关结缘模块 */}
      <section className="bg-white border-t border-[#2C2A27]/5">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <h2
            className="text-2xl font-serif text-center mb-4"
            style={{ color: '#2C2A27', fontWeight: 600 }}
          >
            相关结缘
          </h2>
          <p
            className="text-center mb-10"
            style={{ color: '#6B635A', lineHeight: '1.8' }}
          >
            {isZh
              ? '让这些庄严法物，陪伴您的修行之路'
              : 'Let these sacred objects accompany your spiritual journey'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {article.relatedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products?search=${encodeURIComponent(product.name)}`}
                className="group block bg-[#F8F4EE] rounded-lg p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  {/* 商品图 */}
                  <div
                    className="w-20 h-20 rounded-lg flex items-center justify-center text-3xl bg-white"
                    style={{ border: '1px solid #2C2A27/10' }}
                  >
                    🪔
                  </div>
                  {/* 商品信息 */}
                  <div className="flex-1">
                    <h3
                      className="font-medium mb-2 group-hover:text-amber-700 transition-colors"
                      style={{ color: '#2C2A27' }}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-lg font-bold"
                        style={{ color: '#B8956E' }}
                      >
                        ¥{product.price}
                      </span>
                      <span
                        className="text-sm font-medium group-hover:translate-x-1 transition-transform"
                        style={{ color: '#B8956E' }}
                      >
                        {isZh ? '查看详情 →' : 'View Details →'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 返回按钮 */}
      <div className="py-8 text-center">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 px-6 py-3 border border-[#2C2A27]/20 rounded-lg hover:bg-[#2C2A27]/5 transition-colors"
          style={{ color: '#2C2A27' }}
        >
          ← {isZh ? '返回禅意百科' : 'Back to Zen Knowledge'}
        </Link>
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
