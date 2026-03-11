'use client'

import { useState } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="search-enhanced mb-8">
      <input
        type="text"
        placeholder="搜索佛珠、佛像、香具..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-[#25231e] border border-[var(--amber-gold)]/30 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-4">
            <p className="text-sm text-[var(--stone-gray)] mb-3">热门搜索</p>
            <div className="flex flex-wrap gap-2">
              {['小叶紫檀', '铜佛像', '沉香', '念珠'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 bg-[var(--cinnabar-red)] text-[var(--cream)] rounded-full text-sm hover:opacity-90 transition-opacity"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
