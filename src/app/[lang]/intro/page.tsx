'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function IntroPage() {
  const { language, setLanguage } = useLanguage()
  const [show, setShow] = useState(false)

  // 设置语言
  useEffect(() => {
    const path = window.location.pathname
    if (path.startsWith('/en')) {
      setLanguage('en')
    } else {
      setLanguage('zh')
    }
  }, [setLanguage])

  useEffect(() => {
    setShow(true)
  }, [])

  const isZh = language === 'zh'

  const verses = isZh ? [
    '观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。',
    '舍利子，色不异空，空不异色，色即是空，空即是色，受想行识，亦复如是。',
    '舍利子，是诸法空相，不生不灭，不垢不净，不增不减。',
    '是故空中无色，无受想行识，无眼耳鼻舌身意，无色声香味触法，无眼界，乃至无意识界。',
    '无无明，亦无无明尽，乃至无老死，亦无老死尽，无苦集灭道，无智亦无得。',
    '以无所得故，菩提萨埵，依般若波罗蜜多故，心无罣碍，无罣碍故，无有恐怖，远离颠倒梦想，究竟涅槃。',
    '三世诸佛，依般若波罗蜜多故，得阿耨多罗三藐三菩提。',
    '故知般若波罗蜜多，是大神咒，是大明咒，是无上咒，是无等等咒，能除一切苦，真实不虚。',
    '故说般若波罗蜜多咒，即说咒曰：揭谛揭谛，波罗揭谛，波罗僧揭谛，菩提萨婆诃。'
  ] : [
    'Avalokiteshvara, when practicing the deep Prajnaparamita, clearly saw that all five aggregates are empty.',
    'Sariputra, form does not differ from emptiness, emptiness does not differ from form; form is emptiness, emptiness is form.',
    'Sariputra, all dharmas are empty of characteristic; they are not produced, not destroyed, not defiled, not pure.',
    'Therefore, in emptiness there is no form, no feeling, no perception, no mental formations, no consciousness.',
    'No eye, ear, nose, tongue, body, mind; no form, sound, smell, taste, touch, dharmas.',
    'No ignorance, and no end of ignorance; no old age and death, and no end of old age and death.',
    'No suffering, no cause of suffering, no cessation, no path; no wisdom, and no attainment.',
    'Because there is no attainment, Bodhisattvas, relying on Prajnaparamita, have no obstruction in their minds.',
    'Having no obstruction, they have no fear, beyond all inverted dreams, they attain Nirvana.',
    'All Buddhas of the past, present, and future, relying on Prajnaparamita, attain supreme enlightenment.',
    'Know therefore that Prajnaparamita is the great mantra, the supreme mantra, the unequaled mantra.',
    'It removes all suffering, it is truly infallible. Therefore one should recite the Prajnaparamita mantra.'
  ]

  return (
    <main className={`min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1512] flex flex-col items-center justify-center p-8 transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-amber-200 mb-4 tracking-wider">
          {isZh ? '般若波罗蜜多心经' : 'Prajnaparamita Hrdaya'}
        </h1>
        <p className="text-amber-500/60 text-lg mb-12 font-serif">
          {isZh ? 'The Heart Sutra' : '心经'}
        </p>

        <div className="space-y-8 mb-16">
          {verses.map((verse, idx) => (
            <p
              key={idx}
              className="text-amber-100/80 text-lg md:text-xl leading-loose font-serif"
              style={{ fontFamily: '"Noto Serif SC", serif' }}
            >
              {verse}
            </p>
          ))}
        </div>

        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-amber-700/20 border border-amber-600/30 text-amber-300 rounded-full hover:bg-amber-700/30 hover:border-amber-500/50 transition-all duration-300"
        >
          {isZh ? '进入商城 →' : 'Enter Shop →'}
        </Link>
      </div>

      <footer className="absolute bottom-8 text-gray-600 text-sm">
        <p>© 2026 如法阁</p>
      </footer>
    </main>
  )
}
