export default function TrustSection() {
  const reviews = [
    {
      id: 1,
      author: '王师兄',
      avatar: '王',
      product: '小叶紫檀佛珠',
      content: '珠子圆润光亮，盘玩后包浆温润，非常感恩能结缘到如此殊胜的法器。',
      rating: 5
    },
    {
      id: 2,
      author: '李居士',
      avatar: '李',
      product: '铜鎏金佛像',
      content: '佛像庄严殊胜，工艺精湛，供奉在佛堂后整个法喜充满。',
      rating: 5
    },
    {
      id: 3,
      author: '张同修',
      avatar: '张',
      product: '沉香线香',
      content: '香气醇厚持久，焚香时妄念顿消，助我修行精进。',
      rating: 5
    }
  ]

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-serif text-center text-[var(--amber-gold)] mb-8">
        同修评价 · 结缘反馈
      </h2>
      
      {/* 信任标签 */}
      <div className="flex justify-center gap-4 mb-8">
        <div className="trust-badge">天然材质保证</div>
        <div className="trust-badge">名家手工制作</div>
        <div className="trust-badge">正品鉴定证书</div>
        <div className="trust-badge">7天无理由退换</div>
      </div>
      
      {/* 用户评价 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="author">
              <div className="avatar">{review.avatar}</div>
              <div>
                <p className="font-serif text-[var(--cream)]">{review.author}</p>
                <div className="flex text-[var(--amber-gold)] text-sm">
                  {'★'.repeat(review.rating)}
                </div>
              </div>
            </div>
            <p className="text-sm text-[var(--stone-gray)] mt-3">{review.content}</p>
            <p className="text-xs text-[var(--warm-wood)] mt-2">结缘: {review.product}</p>
          </div>
        ))}
      </div>
      
      {/* 咨询入口 */}
      <div className="mt-8 text-center card p-6">
        <p className="text-[var(--stone-gray)] mb-4">
          不确定如何选择？我们的专业顾问随时为您服务
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn-primary">
            在线咨询
          </button>
          <button className="btn-secondary">
            查看更多评价
          </button>
        </div>
      </div>
    </div>
  )
}
