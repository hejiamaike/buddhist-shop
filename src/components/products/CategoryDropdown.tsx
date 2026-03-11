'use client'

import { useState } from 'react'

interface Category {
  id: string
  name: string
  name_en: string
  slug: string
}

interface CategoryDropdownProps {
  categories: Category[]
  value: string
  onChange: (slug: string) => void
}

export function CategoryDropdown({ categories, value, onChange }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const currentCategory = categories.find(c => c.slug === value)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:border-amber-500/50 transition"
      >
        <span>{currentCategory?.name || '全部馆藏'}</span>
        <span className={`transition ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 min-w-48 bg-gray-900/95 backdrop-blur rounded-xl border border-white/10 overflow-hidden z-50">
          <button
            onClick={() => {
              onChange('')
              setIsOpen(false)
            }}
            className={`w-full px-4 py-3 text-left transition ${!value ? 'bg-amber-600/20 text-amber-400' : 'text-gray-300 hover:bg-white/5'}`}
          >
            全部馆藏
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onChange(cat.slug)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-3 text-left transition ${value === cat.slug ? 'bg-amber-600/20 text-amber-400' : 'text-gray-300 hover:bg-white/5'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
