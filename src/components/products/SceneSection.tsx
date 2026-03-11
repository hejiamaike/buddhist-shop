'use client'

interface SceneSectionProps {
  isZh: boolean
}

export function SceneSection({ isZh }: SceneSectionProps) {
  const scenes = isZh ? [
    { title: '禅室', desc: '一炷清香，静心凝神', emoji: '🪔' },
    { title: '书房', desc: '墨香与茶香交织', emoji: '📚' },
    { title: '客厅', desc: '庄严殊胜，福德圆满', emoji: '🏠' }
  ] : [
    { title: 'Meditation Room', desc: 'A stick of incense, stillness of mind', emoji: '🪔' },
    { title: 'Study', desc: 'Where ink meets wisdom', emoji: '📚' },
    { title: 'Living Room', desc: 'Sacred blessings for the home', emoji: '🏠' }
  ]

  return (
    <section className="py-16 mb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-amber-200 mb-4">
            {isZh ? '禅意空间' : 'Zen Spaces'}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {isZh
              ? '每一件佛具都是通往禅境的媒介，在家中营造一方净土'
              : 'Each Buddhist artifact is a gateway to mindfulness, creating a sacred space in your home'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {scenes.map((scene, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-2xl aspect-[4/3]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 to-gray-900/60 group-hover:from-amber-800/40 transition" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <span className="text-5xl mb-4">{scene.emoji}</span>
                <h3 className="text-xl font-serif text-amber-200 mb-2">{scene.title}</h3>
                <p className="text-gray-400 text-sm">{scene.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
