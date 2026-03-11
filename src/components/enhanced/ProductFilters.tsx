'use client'

import { useState } from 'react'

interface FilterProps {
  onFilterChange: (filters: string[]) => void
}

export default function ProductFilters({ onFilterChange }: FilterProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const filters = [
    { id: 'material', name: '材质', options: ['小叶紫檀', '黄花梨', '精铜', '沉香木', '玉石'] },
    { id: 'purpose', name: '用途', options: ['礼佛', '佩戴', '居家', '办公', '修行'] },
    { id: 'meaning', name: '寓意', options: ['平安', '招财', '静心', '开智慧', '保平安'] },
    { id: 'price', name: '价格', options: ['1000以下', '1000-3000', '3000-10000', '10000以上'] }
  ]

  const toggleFilter = (category: string, option: string) => {
    const key = `${category}:${option}`
    const newFilters = activeFilters.includes(key)
      ? activeFilters.filter(f => f !== key)
      : [...activeFilters, key]
    
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="space-y-6">
      {filters.map((filter) => (
        <div key={filter.id}>
          <h3 className="text-lg font-serif mb-3 text-[var(--amber-gold)]">{filter.name}</h3>
          <div className="filter-tags">
            {filter.options.map((option) => {
              const key = `${filter.id}:${option}`
              const isActive = activeFilters.includes(key)
              return (
                <button
                  key={key}
                  onClick={() => toggleFilter(filter.id, option)}
                  className={isActive ? 'filter-tag active' : 'filter-tag'}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      ))}
      
      {activeFilters.length > 0 && (
        <button
          onClick={() => {
            setActiveFilters([])
            onFilterChange([])
          }}
          className="text-sm text-[var(--cinnabar-red)] hover:underline"
        >
          清除所有筛选
        </button>
      )}
    </div>
  )
}
