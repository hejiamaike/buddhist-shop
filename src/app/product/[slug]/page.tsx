'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { useCartContext } from '@/contexts/CartProvider'
import { useProducts, Product } from '@/hooks/useProducts'
import { useLanguage } from '@/contexts/LanguageContext'

// 产品故事数据
const PRODUCT_STORIES: Record<string, { title: string; content: string; titleEn: string; contentEn: string }> = {
  'rufa-chess': {
    title: '如法棋缘起',
    content: `如法棋，源自密宗传承的智慧游戏。相传古时高僧以棋子象征六道轮回，以掷骰定行止，修行者每走一步，皆需随缘而定，不可强求。

此棋非博弈之戏，乃修心之法。通过如法棋，可以观照自心如何对境起念、如何执着、如何放下。一步一因果，一掷一轮回。

如法阁复刻古法，以紫檀为棋身，砗磲为棋子，配以精美棋盘，愿此法物助您悟得"诸行无常"之理。`,
    titleEn: 'The Origin of Rufa Oracle Chess',
    contentEn: `Rufa Oracle Chess originates from the esoteric Buddhist tradition of wisdom games. Legend has it that ancient monks used pieces to represent the six realms of samsara, determining moves through dice throws - practitioners must follow circumstances, never force.

This is not a game of competition, but a method of spiritual cultivation. Through Rufa Oracle Chess, one can observe how the mind reacts to circumstances, how it clings, and how it releases.`
  },
  'xiaoye-zitan': {
    title: '小叶紫檀传奇',
    content: `小叶紫檀，位列五大名木之首，素有"帝王之木"之称。其生长缓慢，非数百年不能成材，尤为珍贵。

《本草纲目》记之："紫檀能止血、止痛、调节气血。"佩戴紫檀手串，不仅庄严，更能宁心安神。

如法阁所选紫檀，皆为印度迈索尔百年老料，油密度高，纹理细腻，佩戴日久，自会包浆温润，价值愈增。`,
    titleEn: 'Legend of Sacred Rosewood',
    contentEn: 'Rosewood (Zitan), ranked first among the five precious woods, is known as "the wood of emperors". It grows extremely slowly, taking hundreds of years to mature, making it exceptionally rare.'
  },
  'sakyamuni-buddha': {
    title: '佛像庄严',
    content: `释迦牟尼佛，为娑婆世界之教主慈悲示现。此尊佛像采用失蜡法铸造，此法源自商周，可追溯至三千年前。

铜像表面镀金，金光庄严，代表佛陀圆满智慧与无尽慈悲。置于家中，可时时警醒己心，发菩提心，行菩萨道。

如法阁所请佛像，皆由资深匠人精心铸造，愿此殊胜法物与您结下善缘。`,
    titleEn: 'The Sacred Buddha',
    contentEn: 'Shakyamuni Buddha is the compassionate teacher of our world. This statue is cast using the lost-wax method, a technique dating back three thousand years to the Shang and Zhou dynasties.'
  },
  'chenxiang-incense': {
    title: '沉香法语',
    content: `沉香为"众香之王"，其形成需数十年乃至数百年。树木受伤后，分泌油脂包裹伤口，经年累月方能形成沉香。

越南芽庄为沉香顶级产区，所产沉香清甜雅致，韵味悠长。点燃一炷芽庄沉香，可助禅修静心，消除违缘。

如法阁所售沉香，皆为天然野生，绝无人工合成。愿此香能与您结缘，伴您修行。`,
    titleEn: 'The Word of Agarwood',
    contentEn: 'Agarwood (Chenxiang) is the "king of fragrances". Its formation takes decades to centuries. When the tree is wounded, it secretes resin to encapsulate the wound, which slowly transforms into agarwood over many years.'
  },
  'xingyue-beads': {
    title: '星月菩提记',
    content: `星月菩提，因其表面星点密布、月华环绕而得名。自古为修行者所珍，视之为智慧与慈悲之象征。

此珠非论新旧，唯重心念。盘玩日久，星点渐淡，月华愈明，犹若修行之心，日渐清明。

如法阁所售星月，皆为尼泊尔高密老料，手工正月，颗颗精选。愿此珠伴您精进修行，早开智慧。`,
    titleEn: 'The Story of Bodhi Mala',
    contentEn: 'Bodhi Mala, named for the star-like spots and moon-like glow on its surface, has been treasured by practitioners throughout history as a symbol of wisdom and compassion.'
  },
  'baiyu-bodhi': {
    title: '白玉菩提缘',
    content: `白玉菩提，产自新疆和田玉龙河畔，质地细腻温润，如羊脂般洁白。

《玉经》云："玉之美，温润而泽，仁也。"佩戴白玉菩提，即是佩戴一份仁德与吉祥。

此物不仅可作念珠使用，更是修身养性之上品。愿此白玉菩提与您结下善缘，护佑平安。`,
    titleEn: 'White Jade Bodhi Story',
    contentEn: 'White Jade Bodhi, produced from the Yulong River region in Xinjiang, features a delicate and warm texture as white as lamb fat.'
  },
  'fengyan-bodhi': {
    title: '凤眼菩提缘',
    content: `凤眼菩提，产自尼泊尔，为菩提中之上品。其形如凤目，故得名。

佛教视凤眼为慈悲之眼，佩戴者可获佛菩萨加持，消除无明，增长智慧。

如法阁精选尼泊尔原产凤眼，籽粒规整，密度极高，盘玩变色极佳，实为收藏与修行之上选。`,
    titleEn: 'Chenrezig Bodhi Story',
    contentEn: 'Chenrezig Bodhi, produced in Nepal, is considered the finest quality among Bodhi seeds. Its shape resembles the eye of a mythical phoenix.'
  },
  'jingang-bell': {
    title: '金刚铃法音',
    content: `金刚铃为藏传佛教重要法器，象征坚固智慧，能破除一切烦恼。

铃声清脆响亮，可唤醒迷途，震醒沉睡。修行者闻铃，应观想诸佛菩萨加持，消除业障。

如法阁所售金刚铃，皆为纯铜手工打造，音质清脆穿透，为法会共修之必备法器。`,
    titleEn: 'Vajra Bell Story',
    contentEn: 'The Vajra Bell is an important ritual instrument in Tibetan Buddhism, symbolizing unshakable wisdom that can shatter all ignorance.'
  },
  'putuan': {
    title: '蒲团禅坐',
    content: `蒲团者，打坐修行之具也。《道宣扬》曰："坐禅之法，需得蒲团之便。"

天然黄麻填充，硬度适中，支撑腰椎，使修行者久坐不累。蒲团虽小，却为修行之根基。

如法阁蒲团，选用天然黄麻，透气吸湿，助您禅坐安神，进入禅定之门。`,
    titleEn: 'Meditation Cushion Story',
    contentEn: 'The meditation cushion is an essential tool for seated practice. Filled with natural jute, it provides proper support for extended meditation sessions.'
  },
  'wenshu-buddha': {
    title: '文殊智慧光',
    content: `文殊菩萨，为佛教智慧之化身，右手持智慧剑，斩断一切烦恼；左手执莲花，代表智慧清净。

供奉文殊菩萨，可增长智慧，学业进步，考试顺利。对于学生、学者、修行者，皆有极大加持。

如法阁文殊菩萨像，采用失蜡法精铸，铜镀真金，法相庄严，愿智慧之光普照。`,
    titleEn: 'Manjushri Wisdom Light',
    contentEn: 'Manjushri Bodhisattva is the embodiment of wisdom in Buddhism, holding a wisdom sword in his right hand to cut through all afflictions.'
  },
  'yaoshi-buddha': {
    title: '药师琉璃光',
    content: `药师佛，又称琉璃光如来，为东方琉璃世界之主。其愿力广大，能除一切病苦，令众生健康长寿。

供奉药师佛，可祈愿身体健康，消灾延寿。如法阁药师佛像，庄严殊胜，愿为您带来健康与吉祥。`,
    titleEn: 'Bhaisajya Buddha Story',
    contentEn: 'The Bhaisajya Buddha, also known as the Medicine Master, is the main Buddha of the Eastern Pure Land of Lapis Lazuli.'
  },
  'lianhua-lamp': {
    title: '酥油灯明',
    content: `酥油灯为佛前供奉之重要法物。灯者，智慧之象征，能破黑暗，照亮众生前行之路。

《点灯功德经》云："燃灯供佛，所得功德，不可限量。"于佛前燃灯，可获光明，消除愚痴。

如法阁琉璃莲花酥油灯，采用古法琉璃烧制，光影透亮，为佛前供灯之上品。`,
    titleEn: 'Butter Lamp Story',
    contentEn: 'Butter lamps are important offerings before the Buddha. The lamp symbolizes wisdom, capable of dispelling darkness and illuminating the path for all beings.'
  },
  'songbo': {
    title: '颂钵天音',
    content: `颂钵，又称喜马拉雅颂钵，源自尼泊尔及西藏地区。其音声浑厚悠长，能净化空间，疗愈身心。

修行者以颂钵音声助阵，可快速进入静心状态。音波震动，可调和身心，净化脉轮。

如法阁颂钵，皆为尼泊尔满月颂钵，手工锻打，音波悠长，为静心疗愈之上品。`,
    titleEn: 'Singing Bowl Story',
    contentEn: 'Singing bowls, also known as Himalayan singing bowls, originate from Nepal and Tibet. Their rich, long-lasting sounds can purify spaces and heal body and mind.'
  },
  'gawu-box': {
    title: '嘎乌护身',
    content: `嘎乌盒，为藏传佛教随身护身法物。盒内可装藏甘露丸、高僧加持物、香灰等，贴身佩戴，得佛菩萨加持。

《嘎乌经》云："佩戴嘎乌，可避一切灾难，得诸佛护念。"

如法阁嘎乌盒，采用纯银精雕錾刻，内部可装藏物，为修行者随身护佑之上品。`,
    titleEn: 'Gau Box Story',
    contentEn: 'The Gau Box is a protective amulet in Tibetan Buddhism. Inside, one can place blessed pills, consecrated objects, or incense ash for close wearing.'
  },
  'guanyin-pendant': {
    title: '观音慈泪',
    content: `观世音菩萨，救苦救难之大慈大悲者。其形象慈悲庄严，佩戴于身，可获菩萨加持，化解一切苦难。

和田玉质地温润，色泽柔和，与观音菩萨慈悲之德相得益彰。如法阁观音吊坠，名家开脸，法相慈悲。`,
    titleEn: 'Guanyin Pendant Story',
    contentEn: 'Avalokiteshvara Bodhisattva is the Greatly Compassionate One who saves all from suffering. Wearing his image brings the blessing of the Bodhisattva.'
  },
  'karesansui-tea': {
    title: '侘寂茶道',
    content: `侘寂者，日本茶道之核心美学也。强调不完美之美，自然之美，简素之美。

此套茶具采用柴窑烧制，保留泥土粗粝质感，契合侘寂美学。茶汤入杯，映照禅心。

如法阁粗陶茶具，愿为您带来一份禅意，让品茶成为修行。`,
    titleEn: 'Zen Tea Set Story',
    contentEn: 'Wabi-sabi is the core aesthetic of Japanese tea ceremony, emphasizing the beauty of imperfection and natural simplicity.'
  },
  'jingang-copy-set': {
    title: '抄经功德',
    content: `抄经乃修行之妙法。《金刚经》云："书写此经，所得功德，不可思量。"

抄经可静心养性，积累功德。如法阁抄经套装，选用洒金宣纸，狼毫小楷毛笔，徽墨精制，为抄经之上品。

愿此抄经套装，助您开启智慧，积累功德。`,
    titleEn: 'Sutra Copying Story',
    contentEn: 'Copying sutras is a wonderful method of cultivation. The Diamond Sutra states that the merits derived from writing this sutra are immeasurable.'
  },
  'lengyan-set': {
    title: '楞严法华',
    content: `《楞严经》为禅宗必修之经典，揭示一切众生圆通妙门。此经文字优美，义理深奥，为修行者必读之作。

如法阁楞严经套装，繁体竖排，宣纸印刷，精美盒装。置于案头，随时翻阅，开启智慧之门。`,
    titleEn: 'Shurangama Sutra Story',
    contentEn: 'The Shurangama Sutra is an essential text for Zen practitioners, revealing the profound methods for spiritual awakening.'
  },
}

// 产品规格数据
const PRODUCT_SPECS: Record<string, { specs: Record<string, string>; specsEn: Record<string, string> }> = {
  'xiaoye-zitan': {
    specs: { '材质': '印度小叶紫檀', '规格': '20mm×12粒', '重量': '约35g', '产地': '印度迈索尔', '包浆': '已自然氧化' },
    specsEn: { 'Material': 'Indian Rosewood', 'Size': '20mm×12 beads', 'Weight': 'Approx. 35g', 'Origin': 'Mysore, India', 'Patina': 'Naturally oxidized' }
  },
  'xingyue-beads': {
    specs: { '材质': '星月菩提', '规格': '9mm×108粒', '重量': '约45g', '产地': '尼泊尔', '密度': '高密正月' },
    specsEn: { 'Material': 'Bodhi Seeds', 'Size': '9mm×108 beads', 'Weight': 'Approx. 45g', 'Origin': 'Nepal', 'Density': 'High density, aligned holes' }
  },
  'sakyamuni-buddha': {
    specs: { '材质': '精铜镀金', '规格': '高约30cm', '重量': '约2.5kg', '工艺': '失蜡法铸造', '镀金': '24K真金镀金' },
    specsEn: { 'Material': 'Bronze with Gold Plating', 'Size': 'Approx. 30cm height', 'Weight': 'Approx. 2.5kg', 'Technique': 'Lost-wax casting', 'Plating': '24K genuine gold' }
  },
  'chenxiang-incense': {
    specs: { '材质': '天然芽庄沉香', '规格': '约10cm×30支', '重量': '约25g', '产地': '越南芽庄', '香型': '清甜型' },
    specsEn: { 'Material': 'Natural Nha Trang Agarwood', 'Size': 'Approx. 10cm×30 sticks', 'Weight': 'Approx. 25g', 'Origin': 'Nha Trang, Vietnam', 'Scent': 'Sweet & fresh' }
  },
  'lotus-censer': {
    specs: { '材质': '精铜', '规格': '直径约18cm', '重量': '约1.2kg', '工艺': '失蜡法铸造', '纹饰': '莲花纹' },
    specsEn: { 'Material': 'Bronze', 'Size': 'Approx. 18cm diameter', 'Weight': 'Approx. 1.2kg', 'Technique': 'Lost-wax casting', 'Pattern': 'Lotus motif' }
  },
  'putuan': {
    specs: { '材质': '天然黄麻', '规格': '直径约50cm', '填充': '黄麻纤维', '产地': '中国', '功能': '打坐禅修' },
    specsEn: { 'Material': 'Natural Jute', 'Size': 'Approx. 50cm diameter', 'Filling': 'Jute fiber', 'Origin': 'China', 'Function': 'Meditation' }
  },
  'gawu-box': {
    specs: { '材质': '纯银999', '规格': '约5cm×4cm', '重量': '约25g', '工艺': '手工錾刻', '功能': '可装藏' },
    specsEn: { 'Material': 'Pure Silver 999', 'Size': 'Approx. 5cm×4cm', 'Weight': 'Approx. 25g', 'Technique': 'Hand-chiseled', 'Function': 'Can hold blessed objects' }
  },
  'songbo': {
    specs: { '材质': '尼泊尔合金', '规格': '直径约20cm', '重量': '约1.5kg', '产地': '尼泊尔', '工艺': '手工锻打' },
    specsEn: { 'Material': 'Nepalese Alloy', 'Size': 'Approx. 20cm diameter', 'Weight': 'Approx. 1.5kg', 'Origin': 'Nepal', 'Technique': 'Hand-forged' }
  },
  'rufa-chess': {
    specs: { '材质': '紫檀木+砗磲', '规格': '棋盘约40cm×40cm', '重量': '约3.5kg', '产地': '中国', '配件': '骰子2颗' },
    specsEn: { 'Material': 'Rosewood + Tridacna', 'Size': 'Board approx. 40cm×40cm', 'Weight': 'Approx. 3.5kg', 'Origin': 'China', 'Accessories': '2 dice included' }
  },
}

// 后备产品数据 - 完整产品列表
const FALLBACK_PRODUCTS: Record<string, Product> = {
  // 修持法具
  'xiaoye-zitan': { id: '1', name: '小叶紫檀手串', name_en: 'Rosewood Mala', slug: 'xiaoye-zitan', price: 899, original_price: 1299, stock: 50, images: ['https://images.unsplash.com/photo-1590534247854-e97d5e3ed38e?w=800&q=80'], description: '百年老料 · 玻璃底包浆', description_long: '精选印度小叶紫檀，纹理细腻，油密度高', category_id: 'practice-tools', subcategory: '念珠手串', material: '小叶紫檀', use_case: '佩戴', tags: ['原材正宗', '手工精作'], status: 'active' },
  'xingyue-beads': { id: '1b', name: '尼泊尔星月菩提', name_en: 'Bodhi Mala', slug: 'xingyue-beads', price: 368, original_price: 498, stock: 80, images: ['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80'], description: '原矿老料 · 手工正月', description_long: '尼泊尔高密星月菩提，原矿老料手工正月，适合长期盘玩', category_id: 'practice-tools', subcategory: '念珠手串', material: '星月菩提', use_case: '佩戴', tags: ['原矿老料', '手工正月'], status: 'active' },
  'baiyu-bodhi': { id: '1c', name: '白玉菩提手串', name_en: 'White Jade Bodhi', slug: 'baiyu-bodhi', price: 458, original_price: 598, stock: 65, images: ['https://images.unsplash.com/photo-1605081699338-a4808518ff36?w=800&q=80'], description: '羊脂白玉 · 温润细腻', description_long: '新疆羊脂白玉打磨，质地温润如脂，适合珍藏', category_id: 'practice-tools', subcategory: '念珠手串', material: '羊脂白玉', use_case: '佩戴', tags: ['羊脂白玉', '温润细腻'], status: 'active' },
  'fengyan-bodhi': { id: '1d', name: '凤眼菩提手串', name_en: 'Chenrezig Bodhi', slug: 'fengyan-bodhi', price: 688, original_price: 888, stock: 45, images: ['https://images.unsplash.com/photo-1590534247854-e97d5e3ed38e?w=800&q=80'], description: '尼泊尔凤眼 · 收藏级', description_long: '尼泊尔原产凤眼菩提，籽粒规整，盘玩变色佳', category_id: 'practice-tools', subcategory: '念珠手串', material: '凤眼菩提', use_case: '佩戴', tags: ['尼泊尔原产', '收藏级'], status: 'active' },
  'jingang-bell': { id: '1e', name: '纯铜金刚铃', name_en: 'Vajra Bell', slug: 'jingang-bell', price: 1280, original_price: 1680, stock: 25, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80'], description: '藏传法器 · 声音清脆', description_long: '纯铜手工打造，声音清脆穿透，用于破除烦恼', category_id: 'practice-tools', subcategory: '法器法音', material: '纯铜', use_case: '修行', tags: ['藏传经典', '手工锻造'], status: 'active' },
  'zitan-fish': { id: '1f', name: '紫檀木鱼', name_en: 'Wooden Fish', slug: 'zitan-fish', price: 580, original_price: 780, stock: 40, images: ['https://images.unsplash.com/photo-1602523961358-9dfd4ea5a6d0?w=800&q=80'], description: '居家自修 · 音色沉稳', description_long: '紫檀木纯手工掏空打磨，音色沉稳浑厚', category_id: 'practice-tools', subcategory: '法器法音', material: '紫檀木', use_case: '修行', tags: ['手工打造', '居家必备'], status: 'active' },
  'yinzi': { id: '1g', name: '铜制引磬', name_en: 'Inverted Bell', slug: 'yinzi', price: 380, original_price: 480, stock: 55, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'], description: '精铜铸造 · 声音清亮', description_long: '传统引磬造型，精铜铸造，用于引领法会节奏', category_id: 'practice-tools', subcategory: '法器法音', material: '精铜', use_case: '修行', tags: ['传统法器', '法会必备'], status: 'active' },
  'rufa-chess': { id: '1h', name: '如法棋', name_en: 'Rufa Oracle Chess', slug: 'rufa-chess', price: 2520, original_price: 3200, stock: 99, images: ['https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800&q=80'], description: '密宗传承 · 佛友共修', description_long: '承载千年佛学精神体系，密宗投骰游戏', category_id: 'practice-tools', subcategory: '修行辅助', material: '木石良金', use_case: '共修', tags: ['密宗传承', '佛友共修'], status: 'active' },
  'putuan': { id: '1i', name: '蒲团坐垫', name_en: 'Meditation Cushion', slug: 'putuan', price: 268, original_price: 358, stock: 120, images: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80'], description: '天然黄麻 · 舒适支撑', description_long: '天然黄麻填充，硬度适中，支撑腰椎，适合打坐', category_id: 'practice-tools', subcategory: '修行辅助', material: '天然黄麻', use_case: '修行', tags: ['天然材料', '打坐必备'], status: 'active' },
  // 供养庄严
  'sakyamuni-buddha': { id: '2', name: '铜镀金释迦牟尼佛像', name_en: 'Gilded Sakyamuni Buddha', slug: 'sakyamuni-buddha', price: 3680, original_price: 4999, stock: 10, images: ['https://images.unsplash.com/photo-1599707367072-cd6cf66a80a2?w=800&q=80'], description: '法相庄严 · 失蜡精铸', description_long: '精铜铸造，镀金工艺，庄严殊胜', category_id: 'offerings', subcategory: '佛像造像', material: '金铜造像', use_case: '供奉', tags: ['名家手工', '权威鉴定'], status: 'active' },
  'wenshu-buddha': { id: '2b', name: '铜镀金文殊菩萨像', name_en: 'Gilded Manjushri Buddha', slug: 'wenshu-buddha', price: 4280, original_price: 5580, stock: 8, images: ['https://images.unsplash.com/photo-1599707367072-cd6cf66a80a2?w=800&q=80'], description: '智慧庄严 · 手持智慧剑', description_long: '文殊菩萨铜镀金造像，手持智慧剑，象征般若智慧', category_id: 'offerings', subcategory: '佛像造像', material: '金铜造像', use_case: '供奉', tags: ['智慧象征', '开光加持'], status: 'active' },
  'yaoshi-buddha': { id: '2c', name: '铜镀金药师佛像', name_en: 'Gilded Bhaisajya Buddha', slug: 'yaoshi-buddha', price: 3980, original_price: 5180, stock: 12, images: ['https://images.unsplash.com/photo-1599707367072-cd6cf66a80a2?w=800&q=80'], description: '健康庄严 · 手持药罐', description_long: '药师佛铜镀金造像，手持药罐，祈求健康长寿', category_id: 'offerings', subcategory: '佛像造像', material: '金铜造像', use_case: '供奉', tags: ['健康祈福', '开光加持'], status: 'active' },
  'lianhua-lamp': { id: '2d', name: '琉璃莲花酥油灯', name_en: 'Lotus Butter Lamp', slug: 'lianhua-lamp', price: 458, original_price: 598, stock: 60, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80'], description: '古法琉璃 · 光影透亮', description_long: '古法琉璃烧制，光影透亮，用于佛前供灯', category_id: 'offerings', subcategory: '供灯净水', material: '古法琉璃', use_case: '供奉', tags: ['古法工艺', '供灯佳品'], status: 'active' },
  'jingshui-cup': { id: '2e', name: '白瓷描金净水杯', name_en: 'Gilded Water Cup', slug: 'jingshui-cup', price: 268, original_price: 368, stock: 120, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80'], description: '德化白瓷 · 手工描金', description_long: '德化白瓷配以手工描金梵文，用于每日供水', category_id: 'offerings', subcategory: '供灯净水', material: '德化白瓷', use_case: '供奉', tags: ['手工描金', '日供水具'], status: 'active' },
  'shuijing-wan': { id: '2f', name: '水晶供碗套装', name_en: 'Crystal Offering Bowl Set', slug: 'shuijing-wan', price: 598, original_price: 798, stock: 35, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'], description: '天然水晶 · 七供一套', description_long: '天然水晶七供碗套装，用于供水、供花、供香等', category_id: 'offerings', subcategory: '供灯净水', material: '天然水晶', use_case: '供奉', tags: ['天然水晶', '七供一套'], status: 'active' },
  'chenxiang-incense': { id: '3', name: '天然沉香线香', name_en: 'Agarwood Incense', slug: 'chenxiang-incense', price: 168, original_price: 228, stock: 100, images: ['https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800&q=80'], description: '芽庄王者 · 清远悠长', description_long: '天然越南芽庄沉香，清新淡雅', category_id: 'offerings', subcategory: '香炉供具', material: '越南芽庄沉香', use_case: '居家', tags: ['天然纯品', '古法炮制'], status: 'active' },
  'lotus-censer': { id: '3b', name: '莲花纹铜香炉', name_en: 'Lotus Censers', slug: 'lotus-censer', price: 458, original_price: 598, stock: 25, images: ['https://images.unsplash.com/photo-1602523961358-9dfd4ea5a6d0?w=800&q=80'], description: '乾隆御制 · 莲瓣庄严', description_long: '精铜铸造，莲花纹理，仿古工艺', category_id: 'offerings', subcategory: '香炉供具', material: '精铜', use_case: '居家', tags: ['乾隆款识', '收藏价值'], status: 'active' },
  'tiexian-censer': { id: '3c', name: '日本铁打出香炉', name_en: 'Japanese Tetsuchida Censer', slug: 'tiexian-censer', price: 1880, original_price: 2380, stock: 18, images: ['https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800&q=80'], description: '日本铁打 · 孤品一件', description_long: '日本传统铁打出工艺，纯手工锻打，自然锈斑', category_id: 'offerings', subcategory: '香炉供具', material: '日本铁', use_case: '居家', tags: ['日本工艺', '孤品收藏'], status: 'active' },
  'longxian-incense': { id: '3d', name: '龙涎香线香', name_en: 'Ambergris Incense', slug: 'longxian-incense', price: 1280, original_price: 1680, stock: 30, images: ['https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800&q=80'], description: '稀世珍品 · 甜香持久', description_long: '天然龙涎香，甜香醇厚，留香持久', category_id: 'offerings', subcategory: '香炉供具', material: '天然龙涎香', use_case: '居家', tags: ['稀世珍品', '甜香持久'], status: 'active' },
  // 法音经典
  'xingjing-scroll': { id: '5', name: '心经书法卷轴', name_en: 'Heart Sutra Scroll', slug: 'xingjing-scroll', price: 1280, original_price: 1680, stock: 30, images: ['https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?w=800&q=80'], description: '名家手书 · 锦绫装裱', description_long: '名家手书，宣纸影印，锦绫装裱', category_id: 'dharma-audio', subcategory: '经书法物', material: '泾县熟宣', use_case: '修行', tags: ['名家手书', '锦绫装裱'], status: 'active' },
  'jingang-copy-set': { id: '5b', name: '金刚经手抄本套装', name_en: 'Diamond Sutra Set', slug: 'jingang-copy-set', price: 398, original_price: 528, stock: 45, images: ['https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?w=800&q=80'], description: '洒金宣纸 · 狼毫小楷', description_long: '包含洒金熟宣抄经本、狼毫小楷毛笔与徽墨', category_id: 'dharma-audio', subcategory: '经书法物', material: '泾县宣纸', use_case: '修行', tags: ['沉浸式抄经', '文房精品'], status: 'active' },
  'lengyan-set': { id: '5c', name: '楞严经全文套装', name_en: 'Shurangama Sutra Set', slug: 'lengyan-set', price: 680, original_price: 880, stock: 40, images: ['https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?w=800&q=80'], description: '繁体竖排 · 宣纸印刷', description_long: '楞严经全文，繁体竖排，宣纸印刷，精美盒装', category_id: 'dharma-audio', subcategory: '经书法物', material: '宣纸', use_case: '修行', tags: ['繁体竖排', '珍藏版'], status: 'active' },
  'liuzu-tanjing': { id: '5d', name: '六祖坛经', name_en: 'Platform Sutra', slug: 'liuzu-tanjing', price: 168, original_price: 228, stock: 80, images: ['https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?w=800&q=80'], description: '禅宗经典 · 白话注释', description_long: '六祖坛经原文加白话注释，适合初学禅宗者', category_id: 'dharma-audio', subcategory: '经书法物', material: '印刷纸', use_case: '修行', tags: ['禅宗经典', '白话注释'], status: 'active' },
  'zhuanjinglun': { id: '5e', name: '太阳能转经轮', name_en: 'Solar Prayer Wheel', slug: 'zhuanjinglun', price: 1580, original_price: 1980, stock: 35, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80'], description: '光伏感应 · 藏经千万', description_long: '内置微型电机，光照即转，内藏六字真言', category_id: 'dharma-audio', subcategory: '法音载体', material: '纯铜内胆', use_case: '供奉', tags: ['光伏感应', '藏传法物'], status: 'active' },
  'songbo': { id: '5f', name: '尼泊尔颂钵', name_en: 'Singing Bowl', slug: 'songbo', price: 680, original_price: 880, stock: 50, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80'], description: '手工锻打 · 音波悠长', description_long: '尼泊尔满月颂钵，手工锻打，音波悠长用于静心疗愈', category_id: 'dharma-audio', subcategory: '法音载体', material: '尼泊尔合金', use_case: '修行', tags: ['手工锻打', '空间净化'], status: 'active' },
  'zhuanjingtong': { id: '5g', name: '藏式转经筒', name_en: 'Tibetan Prayer Wheel', slug: 'zhuanjingtong', price: 380, original_price: 480, stock: 65, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'], description: '手摇经筒 · 六字真言', description_long: '传统藏式转经筒，内部装有六字真言纸条', category_id: 'dharma-audio', subcategory: '法音载体', material: '铜制', use_case: '修行', tags: ['藏传法物', '手摇便携'], status: 'active' },
  'gongfo-bei': { id: '5h', name: '紫砂描金供佛杯', name_en: 'Buddhist Offering Cup', slug: 'gongfo-bei', price: 298, original_price: 398, stock: 55, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'], description: '宜兴紫砂 · 手工描金', description_long: '宜兴紫砂供佛杯，手工描金纹饰，用于供水', category_id: 'dharma-audio', subcategory: '抄经文具', material: '宜兴紫砂', use_case: '修行', tags: ['宜兴紫砂', '手工描金'], status: 'active' },
  // 随身护佑
  'gawu-box': { id: '6a', name: '纯银六字真言嘎乌盒', name_en: 'Silver Gau Box', slug: 'gawu-box', price: 1280, original_price: 1680, stock: 28, images: ['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80'], description: '精雕錾刻 · 可装藏物', description_long: '纯银精雕錾刻，内部可装藏甘露丸或高僧加持物', category_id: 'protective', subcategory: '护身佩戴', material: '纯银', use_case: '佩戴', tags: ['精雕錾刻', '可装藏物'], status: 'active' },
  'zhusha-card': { id: '6b', name: '朱砂无事牌', name_en: 'Cinnabar Peace Card', slug: 'zhusha-card', price: 368, original_price: 498, stock: 65, images: ['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80'], description: '高纯紫金砂 · 平安无事', description_long: '高纯度紫金砂压制，正面无饰寓意平安，背刻心经', category_id: 'protective', subcategory: '护身佩戴', material: '紫金砂', use_case: '佩戴', tags: ['高纯度', '开光加持'], status: 'active' },
  'guanyin-pendant': { id: '6c', name: '和田玉观音吊坠', name_en: 'Jade Guanyin Pendant', slug: 'guanyin-pendant', price: 2680, original_price: 3580, stock: 15, images: ['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80'], description: '温润玉质 · 名家开脸', description_long: '和田玉雕刻，名家开脸，法相慈悲', category_id: 'protective', subcategory: '珠宝首饰', material: '和田玉', use_case: '佩戴', tags: ['名家雕刻', '开光加持'], status: 'active' },
  'piqiu-pendant': { id: '6d', name: '和田玉貔貅吊坠', name_en: 'Jade Pixiu Pendant', slug: 'piqiu-pendant', price: 1880, original_price: 2480, stock: 25, images: ['https://images.unsplash.com/photo-1605081699338-a4808518ff36?w=800&q=80'], description: '招财进宝 · 只进不出', description_long: '和田玉貔貅，雕刻精细，寓意招财进宝', category_id: 'protective', subcategory: '珠宝首饰', material: '和田玉', use_case: '佩戴', tags: ['招财进宝', '只进不出'], status: 'active' },
  'pingankou': { id: '6e', name: '925纯银平安扣', name_en: 'Silver Peace Pendant', slug: 'pingankou', price: 458, original_price: 598, stock: 80, images: ['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80'], description: '999纯银 · 平安圆满', description_long: '999纯银平安扣，简约大方，寓意平安圆满', category_id: 'protective', subcategory: '护身佩戴', material: '999纯银', use_case: '佩戴', tags: ['999纯银', '平安圆满'], status: 'active' },
  'benmingfo': { id: '6f', name: '黑曜石本命佛', name_en: 'Obsidian Guardian', slug: 'benmingfo', price: 598, original_price: 798, stock: 45, images: ['https://images.unsplash.com/photo-1605081699338-a4808518ff36?w=800&q=80'], description: '冰种黑曜 · 守护神', description_long: '冰种黑曜石雕刻本命佛，守护佩戴者平安', category_id: 'protective', subcategory: '护身佩戴', material: '黑曜石', use_case: '佩戴', tags: ['冰种黑曜', '守护神'], status: 'active' },
  'hongmanao': { id: '6g', name: '红玛瑙手链', name_en: 'Red Agate Bracelet', slug: 'hongmanao', price: 328, original_price: 428, stock: 90, images: ['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80'], description: '天然红玛瑙 · 喜庆吉祥', description_long: '天然红玛瑙手链，色泽红润，寓意喜庆吉祥', category_id: 'protective', subcategory: '珠宝首饰', material: '红玛瑙', use_case: '佩戴', tags: ['天然红玛瑙', '喜庆吉祥'], status: 'active' },
  // 禅意生活
  'karesansui-tea': { id: '7a', name: '粗陶枯山水茶具', name_en: 'Zen Tea Set', slug: 'karesansui-tea', price: 680, original_price: 880, stock: 38, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80'], description: '柴窑烧制 · 侘寂美学', description_long: '柴窑烧制，保留泥土粗粝质感，契合侘寂美学', category_id: 'lifestyle', subcategory: '茶道香具', material: '粗陶', use_case: '居家', tags: ['柴窑烧制', '侘寂美学'], status: 'active' },
  'zhutie-hu': { id: '7b', name: '铸铁壶煮水壶', name_en: 'Cast Iron Kettle', slug: 'zhutie-hu', price: 880, original_price: 1080, stock: 28, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'], description: '日本铸铁 · 煮茶佳品', description_long: '日本传统铸铁壶，导热均匀，适合煮水泡茶', category_id: 'lifestyle', subcategory: '茶道香具', material: '日本铸铁', use_case: '居家', tags: ['日本铸铁', '煮茶佳品'], status: 'active' },
  'zhudao-liujunzi': { id: '7c', name: '竹制茶道六君子', name_en: 'Bamboo Tea Set', slug: 'zhudao-liujunzi', price: 268, original_price: 368, stock: 75, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'], description: '天然楠竹 · 茶道必备', description_long: '竹制茶道六君子套装，茶夹、茶匙、茶拨等', category_id: 'lifestyle', subcategory: '茶道香具', material: '楠竹', use_case: '居家', tags: ['天然楠竹', '茶道必备'], status: 'active' },
  'jushi-robe': { id: '7d', name: '纯棉麻居士服', name_en: 'Zen Robe', slug: 'jushi-robe', price: 298, original_price: 398, stock: 120, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80'], description: '植物染料 · 宽松剪裁', description_long: '天然植物染料，宽松剪裁，透气亲肤', category_id: 'lifestyle', subcategory: '禅修服饰', material: '纯棉麻', use_case: '居家', tags: ['植物染料', '透气亲肤'], status: 'active' },
  'chanxiu-fu': { id: '7e', name: '禅修服套装', name_en: 'Meditation Set', slug: 'chanxiu-fu', price: 458, original_price: 598, stock: 60, images: ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80'], description: '禅修专用 · 上衣裤子', description_long: '禅修专用服装套装，上衣+裤子，舒适宽松', category_id: 'lifestyle', subcategory: '禅修服饰', material: '纯棉', use_case: '居家', tags: ['禅修专用', '舒适宽松'], status: 'active' },
  'chenxiang-balm': { id: '7f', name: '古法沉香香膏', name_en: 'Agarwood Balm', slug: 'chenxiang-balm', price: 198, original_price: 268, stock: 200, images: ['https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800&q=80'], description: '便携涂抹 · 清净结界', description_long: '古法沉香精油香膏，便携式涂抹，提神醒脑', category_id: 'lifestyle', subcategory: '空间香氛', material: '沉香精油', use_case: '随身', tags: ['古法炮制', '便携使用'], status: 'active' },
  'xiangxian-lu': { id: '7g', name: '线香卧香炉', name_en: 'Incense Burner', slug: 'xiangxian-lu', price: 358, original_price: 458, stock: 55, images: ['https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800&q=80'], description: '陶瓷香炉 · 简约设计', description_long: '简约设计陶瓷香炉，适合线香卧香使用', category_id: 'lifestyle', subcategory: '空间香氛', material: '陶瓷', use_case: '居家', tags: ['简约设计', '线香专用'], status: 'active' },
  'wuhuo-xiangxun': { id: '7h', name: '无火香薰套装', name_en: 'Diffuser Set', slug: 'wuhuo-xiangxun', price: 288, original_price: 388, stock: 85, images: ['https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800&q=80'], description: '藤条散香 · 房间扩香', description_long: '无火香薰套装，藤条散香，适合房间扩香', category_id: 'lifestyle', subcategory: '空间香氛', material: '藤条香薰', use_case: '居家', tags: ['无火香薰', '房间扩香'], status: 'active' },
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { getProductBySlug } = useProducts()
  const { language } = useLanguage()
  // 直接使用fallback产品初始化状态，避免SSR问题
  const fallbackProduct = FALLBACK_PRODUCTS[slug] || null
  const [product, setProduct] = useState<Product | null>(fallbackProduct)
  const [loading, setLoading] = useState(!fallbackProduct)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem, count } = useCartContext()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  const isZh = language === 'zh'

  // Toast显示函数
  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // 处理加购
  const handleAddToCart = async () => {
    console.log('[Product] handleAddToCart called, isAdding:', isAdding)
    if (isAdding) return
    if (!displayProduct) return
    setIsAdding(true)

    try {
      console.log('[Product] Adding item:', {
        slug: displayProduct.slug,
        name: displayProduct.name,
        price: displayProduct.price,
        quantity: quantity
      })
      await addItem({
        slug: displayProduct.slug,
        name: displayProduct.name,
        price: displayProduct.price,
        quantity: quantity,
        image: Array.isArray(displayProduct.images) ? displayProduct.images[0] : undefined
      })
      showNotification(isZh ? '已成功加入缘起清单' : 'Added to cart successfully', 'success')
    } catch (error) {
      console.error('[Product] Add to cart error:', error)
      showNotification(isZh ? '加入清单失败，请重试' : 'Failed to add to cart', 'error')
    } finally {
      setIsAdding(false)
    }
  }

  // 产品切换时重置数量
  useEffect(() => {
    setQuantity(1)
  }, [slug])

  // 客户端：尝试从Supabase加载，如果失败则保持fallback
  useEffect(() => {
    if (!fallbackProduct) {
      // Fallback没有，尝试Supabase
      getProductBySlug(slug).then(supabaseProduct => {
        if (supabaseProduct) {
          setProduct(supabaseProduct)
        }
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
    }
  }, [slug, fallbackProduct, getProductBySlug])

  const displayProduct = product ? {
    ...product,
    name: isZh ? product.name : (product.name_en || product.name),
    description: isZh ? product.description : (product.description_long_en || product.description)
  } : null

  // 获取产品故事 - 优先使用统一字段fallback到旧数据
  const story = displayProduct?.story ? {
    title: isZh ? '产品故事' : 'Product Story',
    titleEn: isZh ? '产品故事' : 'Product Story',
    content: displayProduct.story || '',
    contentEn: displayProduct.story_en || displayProduct.story || ''
  } : PRODUCT_STORIES[slug]

  // 获取产品规格 - 优先使用统一字段fallback到旧数据
  // 安全解析JSON，防止格式错误导致页面崩溃
  const safeParse = (str: string | null | undefined) => {
    if (!str) return null
    try {
      return JSON.parse(str)
    } catch {
      return null
    }
  }

  const specsData = safeParse(displayProduct?.specs)
  const specs = specsData ? { specs: specsData.reduce((acc: Record<string, string>, item: {label: string, value: string}) => ({...acc, [item.label]: item.value}), {}), specsEn: safeParse(displayProduct?.specs_en)?.reduce((acc: Record<string, string>, item: {label: string, value: string}) => ({...acc, [item.label]: item.value}), {}) || {} } : PRODUCT_SPECS[slug]

  // 保养说明
  const careInstructions = displayProduct?.care_instructions || ''

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center" style={{ color: '#8A8178' }}>加载中...</div>
  }

  if (!displayProduct) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4" style={{ color: '#F8F4EE' }}>商品不存在</h1>
          <Link href="/products" style={{ color: '#B8956E' }}>← 返回商品列表</Link>
        </div>
      </div>
    )
  }

  const productImages = Array.isArray(displayProduct.images) && displayProduct.images.length > 0
    ? displayProduct.images
    : ['https://images.unsplash.com/photo-1590534247854-e97d5e3ed38e?w=800&q=80']

  // Product JSON-LD Schema for SEO
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: displayProduct.name,
    description: displayProduct.description || displayProduct.description_long,
    offers: {
      '@type': 'Offer',
      price: displayProduct.price,
      priceCurrency: 'CNY',
      availability: displayProduct.stock && displayProduct.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    image: productImages[0]
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Product JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <header className="bg-[#12121a] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B8965E" strokeWidth="1.2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
                <line x1="12" y1="2" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="22" />
                <line x1="2" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
                <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
                <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
                <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
              </svg>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/products" style={{ color: '#8A8178' }}>全部商品</Link>
              <Link href="/categories" style={{ color: '#8A8178' }}>分类</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/cart" style={{ color: '#8A8178' }} className="relative">
                🛒
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/products" style={{ color: '#B8956E' }} className="mb-6 inline-block">← 返回列表</Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
          {/* 图片区域 */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-[#1a1a24] relative">
              <img src={productImages[selectedImage]} alt={displayProduct.name} className="w-full h-full object-cover" />
              {/* 商品标签 */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {/* 孤品标签 */}
                {displayProduct.stock === 1 && (
                  <span className="px-3 py-1 text-sm font-medium rounded" style={{ backgroundColor: '#F59E0B', color: '#FFFFFF' }}>
                    {isZh ? '孤品珍藏' : 'Rare Find'}
                  </span>
                )}
                {/* 折扣标签 - 如果有原价 */}
                {displayProduct.original_price && displayProduct.original_price > displayProduct.price && (
                  <span className="px-3 py-1 text-sm font-medium rounded" style={{ backgroundColor: '#EF4444', color: '#FFFFFF' }}>
                    {isZh ? '限时优惠' : 'Sale'}
                  </span>
                )}
                {/* 新品标签 - 基于某些商品ID或名称 */}
                {(displayProduct.id?.startsWith('2') || displayProduct.id === '3c') && (
                  <span className="px-3 py-1 text-sm font-medium rounded" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                    {isZh ? '新品上架' : 'New Arrival'}
                  </span>
                )}
              </div>
              {/* 售罄遮罩 */}
              {displayProduct.stock === 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-2xl font-serif text-white">{isZh ? '已结缘' : 'Sold Out'}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {productImages.map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(idx)} className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${selectedImage === idx ? 'border-amber-500' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* 产品信息 */}
          <div>
            <h1 className="text-3xl font-serif mb-2" style={{ color: '#F8F4EE', fontWeight: 600 }}>{displayProduct.name}</h1>
            <p style={{ color: '#8A8178', marginBottom: '1.5rem' }}>{displayProduct.description}</p>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-serif" style={{ color: '#B8956E' }}>¥{displayProduct.price}</span>
              {displayProduct.original_price && (
                <span className="text-xl" style={{ color: '#5A5550', textDecoration: 'line-through' }}>¥{displayProduct.original_price}</span>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span style={{ color: '#8A8178' }}>{isZh ? '库存' : 'Stock'}: </span>
                <span style={{ color: displayProduct.stock > 10 ? '#6B9E6B' : '#B8956E', fontWeight: 500 }}>
                  {displayProduct.stock > 0 ? displayProduct.stock : (isZh ? '缺货' : 'Out of Stock')}
                </span>
                {/* 库存稀缺提示 */}
                {displayProduct.stock > 0 && displayProduct.stock <= 3 && (
                  <span className="px-2 py-0.5 text-xs rounded" style={{ backgroundColor: '#EF4444', color: '#FFFFFF' }}>
                    {isZh ? `仅剩${displayProduct.stock}件` : `Only ${displayProduct.stock} left`}
                  </span>
                )}
                {/* 孤品提示 */}
                {displayProduct.stock === 1 && (
                  <span className="px-2 py-0.5 text-xs rounded" style={{ backgroundColor: '#F59E0B', color: '#FFFFFF' }}>
                    {isZh ? '孤品' : 'Last One'}
                  </span>
                )}
              </div>
            </div>

            {/* 数量选择器 */}
            <div className="mb-6">
              <span style={{ color: '#8A8178', display: 'block', marginBottom: '0.5rem' }}>{isZh ? '数量' : 'Quantity'}</span>
              <div className="flex items-center gap-0 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-12 h-12 flex items-center justify-center rounded-l-lg transition disabled:opacity-50"
                  style={{ backgroundColor: 'rgba(37, 35, 46, 0.8)', border: '1px solid rgba(212, 165, 116, 0.2)', color: '#F8F4EE' }}
                >
                  −
                </button>
                <div
                  className="w-16 h-12 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(37, 35, 46, 0.8)', borderTop: '1px solid rgba(212, 165, 116, 0.2)', borderBottom: '1px solid rgba(212, 165, 116, 0.2)', color: '#F8F4EE' }}
                >
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(Math.min(displayProduct.stock || 99, quantity + 1))}
                  disabled={quantity >= (displayProduct.stock || 99)}
                  className="w-12 h-12 flex items-center justify-center rounded-r-lg transition disabled:opacity-50"
                  style={{ backgroundColor: 'rgba(37, 35, 46, 0.8)', border: '1px solid rgba(212, 165, 116, 0.2)', color: '#F8F4EE' }}
                >
                  +
                </button>
              </div>
            </div>

            {displayProduct.stock === undefined || displayProduct.stock > 0 ? (
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-4 rounded-lg font-medium transition hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: '#B8956E', color: '#FFFFFF', letterSpacing: '2px' }}
              >
                {isAdding ? (isZh ? '处理中...' : 'Adding...') : (isZh ? '恭请结缘' : 'Add to Cart')}
              </button>
            ) : (
              <button
                disabled
                className="w-full py-4 rounded-lg font-medium cursor-not-allowed opacity-50"
                style={{ backgroundColor: '#4A4540', color: '#8A8178', letterSpacing: '2px' }}
              >
                {isZh ? '已结缘' : 'Sold Out'}
              </button>
            )}
          </div>
        </div>

        {/* 产品故事 */}
        {story && (
          <section className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <span style={{ width: '4px', height: '24px', backgroundColor: '#B8956E', display: 'inline-block' }}></span>
              <h2 className="text-2xl font-serif" style={{ color: '#F8F4EE', fontWeight: 600, letterSpacing: '2px' }}>
                {isZh ? story.title : story.titleEn}
              </h2>
            </div>
            <div
              className="prose-content"
              style={{
                color: '#A8A198',
                lineHeight: '2',
                fontSize: '1rem',
                whiteSpace: 'pre-line'
              }}
            >
              {isZh ? story.content : story.contentEn}
            </div>
          </section>
        )}

        {/* 产品规格 - 始终显示 */}
        <section className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <span style={{ width: '4px', height: '24px', backgroundColor: '#B8956E', display: 'inline-block' }}></span>
            <h2 className="text-2xl font-serif" style={{ color: '#F8F4EE', fontWeight: 600, letterSpacing: '2px' }}>
              {isZh ? '产品规格' : 'Product Specifications'}
            </h2>
          </div>
          {specs && Object.keys(isZh ? specs.specs : specs.specsEn).length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(isZh ? specs.specs : specs.specsEn).map(([key, value]) => (
                <div key={key} className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(37, 35, 46, 0.6)', border: '1px solid rgba(212, 165, 116, 0.15)' }}>
                  <div style={{ color: '#8A8178', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{key}</div>
                  <div style={{ color: '#F8F4EE', fontWeight: 500 }}>{String(value)}</div>
                </div>
              ))}
            </div>
          ) : (
            // 默认显示标准规格
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(37, 35, 46, 0.6)', border: '1px solid rgba(212, 165, 116, 0.15)' }}>
              <div style={{ color: '#8A8178', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{isZh ? '规格' : 'Specification'}</div>
              <div style={{ color: '#F8F4EE', fontWeight: 500 }}>{isZh ? '标准版' : 'Standard'}</div>
            </div>
          )}
        </section>

        {/* 保养说明 */}
        {careInstructions && (
          <section className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <span style={{ width: '4px', height: '24px', backgroundColor: '#B8956E', display: 'inline-block' }}></span>
              <h2 className="text-2xl font-serif" style={{ color: '#F8F4EE', fontWeight: 600, letterSpacing: '2px' }}>
                {isZh ? '保养说明' : 'Care Instructions'}
              </h2>
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(37, 35, 46, 0.6)', border: '1px solid rgba(212, 165, 116, 0.15)' }}>
              <p style={{ color: '#A8A198', lineHeight: 2, whiteSpace: 'pre-line' }}>
                {careInstructions}
              </p>
            </div>
          </section>
        )}

        {/* 结缘评价 */}
        <section className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <span style={{ width: '4px', height: '24px', backgroundColor: '#B8956E', display: 'inline-block' }}></span>
            <h2 className="text-2xl font-serif" style={{ color: '#F8F4EE', fontWeight: 600, letterSpacing: '2px' }}>
              {isZh ? '结缘评价' : 'Reviews'}
            </h2>
            <span style={{ color: '#8A8178' }}>({isZh ? '基于真实结缘记录' : 'Based on verified purchases'})</span>
          </div>

          {/* 评分汇总 */}
          <div className="flex items-center gap-6 mb-8 p-6 rounded-lg" style={{ backgroundColor: 'rgba(37, 35, 46, 0.6)', border: '1px solid rgba(212, 165, 116, 0.15)' }}>
            <div className="text-center">
              <div className="text-4xl font-serif" style={{ color: '#B8956E' }}>4.9</div>
              <div className="flex gap-1 my-2 justify-center">
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ color: '#B8956E' }}>★</span>
                ))}
              </div>
              <div className="text-sm" style={{ color: '#8A8178' }}>{isZh ? '128条评价' : '128 reviews'}</div>
            </div>
            <div className="flex-1">
              {[5,4,3,2,1].map(star => (
                <div key={star} className="flex items-center gap-2 mb-1">
                  <span className="text-sm" style={{ color: '#8A8178', width: '20px' }}>{star}</span>
                  <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'rgba(184, 150, 110, 0.2)' }}>
                    <div className="h-full rounded-full" style={{ backgroundColor: '#B8956E', width: star === 5 ? '90%' : star === 4 ? '8%' : '2%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 评价列表 */}
          <div className="space-y-6">
            <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(37, 35, 46, 0.6)', border: '1px solid rgba(212, 165, 116, 0.15)' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium" style={{ color: '#F8F4EE' }}>张居士</span>
                    <span style={{ color: '#B8956E' }}>★★★★★</span>
                  </div>
                  <div className="text-sm" style={{ color: '#8A8178' }}>2026-01-15</div>
                </div>
              </div>
              <p style={{ color: '#A8A198', lineHeight: 1.8 }}>
                {isZh ? '请回家的紫檀手串油密度非常高，盘了几天就出玻璃底了。包装也很庄严，送礼自用都很合适。感恩如法阁！' : 'The rosewood mala has excellent oil density. After handling, it shows a glass-like patina. The packaging is dignified. Suitable for gifts or personal use. Grateful to Rufage!'}
              </p>
            </div>

            <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(37, 35, 46, 0.6)', border: '1px solid rgba(212, 165, 116, 0.15)' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium" style={{ color: '#F8F4EE' }}>李师兄</span>
                    <span style={{ color: '#B8956E' }}>★★★★★</span>
                  </div>
                  <div className="text-sm" style={{ color: '#8A8178' }}>2026-01-08</div>
                </div>
              </div>
              <p style={{ color: '#A8A198', lineHeight: 1.8 }}>
                {isZh ? '给师父请的佛像，法相庄严，工艺精湛。物流也很仔细，全程保价。非常满意的结缘体验！' : 'The Buddha statue for my teacher has a dignified appearance and exquisite craftsmanship. The logistics were careful with full insurance. A very satisfying experience!'}
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => showNotification(isZh ? '评价功能即将上线' : 'Reviews coming soon', 'success')}
              className="px-8 py-3 rounded-lg font-medium transition hover:bg-amber-600/10"
              style={{ backgroundColor: 'transparent', border: '1px solid #B8956E', color: '#B8956E' }}
            >
              {isZh ? '发表结缘评价' : 'Write a Review'}
            </button>
          </div>
        </section>
      </div>

      {/* Toast 通知 */}
      {showToast && (
        <div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg transition-all"
          style={{
            backgroundColor: toastType === 'success' ? '#10B981' : '#EF4444',
            color: '#FFFFFF'
          }}
        >
          {toastMessage}
        </div>
      )}

      <footer className="bg-[#12121a] border-t border-white/5 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center" style={{ color: '#5A5550' }}>
          <p>© 2026 传承千年智慧</p>
        </div>
      </footer>
    </main>
  )
}
