'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      className="text-sm text-stone-600 hover:text-amber-700 font-medium"
    >
      {language === 'zh' ? 'EN' : '中文'}
    </button>
  )
}
