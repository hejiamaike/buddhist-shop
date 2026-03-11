export default function CultureContent() {
  return (
    <div className="culture-section">
      <h2 className="culture-title text-2xl mb-8">佛学智慧 · 文化传承</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="text-4xl mb-4">📿</div>
          <h3 className="text-lg font-serif text-[var(--amber-gold)] mb-3">如何挑选手串</h3>
          <p className="text-sm text-[var(--stone-gray)] leading-relaxed">
            选择手串需考虑手腕尺寸、材质特性及个人修行需求。
            小叶紫檀沉稳，适合静心修行；沉香香气清幽，有助禅定。
          </p>
        </div>
        
        <div className="card p-6">
          <div className="text-4xl mb-4">🪔</div>
          <h3 className="text-lg font-serif text-[var(--amber-gold)] mb-3">佛像供奉仪轨</h3>
          <p className="text-sm text-[var(--stone-gray)] leading-relaxed">
            佛像应安放于清净高处，每日焚香礼拜，心诚则灵。
            供奉前需净手焚香，恭敬合十，表达虔诚之心。
          </p>
        </div>
        
        <div className="card p-6">
          <div className="text-4xl mb-4">🌸</div>
          <h3 className="text-lg font-serif text-[var(--amber-gold)] mb-3">线香的使用之道</h3>
          <p className="text-sm text-[var(--stone-gray)] leading-relaxed">
            点香时心要平静专注，左手持香，右手护之。
            香燃起时，观想香烟袅袅上升，净化身心与环境。
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button className="btn-secondary">
          了解更多佛学常识 →
        </button>
      </div>
    </div>
  )
}
