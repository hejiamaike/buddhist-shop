'use client'

interface CapsuleFiltersProps {
  filters: {
    label: string
    options: { value: string; label: string }[]
  }[]
  values: Record<string, string>
  onChange: (key: string, value: string) => void
}

export function CapsuleFilters({ filters, values, onChange }: CapsuleFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => (
        <div key={filter.label} className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">{filter.label}</span>
          <div className="flex gap-2">
            {filter.options.map((option) => (
              <button
                key={option.value}
                onClick={() => onChange(filter.label, option.value)}
                className={`px-4 py-1.5 rounded-full text-sm transition ${
                  values[filter.label] === option.value
                    ? 'bg-amber-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
