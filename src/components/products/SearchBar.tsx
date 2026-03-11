'use client'

import Link from 'next/link'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  suggestions: string[]
  onSearch: () => void
}

export function SearchBar({ value, onChange, suggestions, onSearch }: SearchBarProps) {
  return (
    <div className="search-enhanced mb-8">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          placeholder="搜索 Buddhist treasures..."
          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500/50"
        />
        <button
          onClick={onSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white hover:bg-amber-500 transition"
        >
          🔍
        </button>
      </div>

      {suggestions.length > 0 && value && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur rounded-xl border border-white/10 overflow-hidden z-50">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => {
                onChange(suggestion)
                onSearch()
              }}
              className="w-full px-4 py-3 text-left text-gray-300 hover:bg-amber-600/20 transition flex items-center gap-2"
            >
              <span>🔍</span>
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
