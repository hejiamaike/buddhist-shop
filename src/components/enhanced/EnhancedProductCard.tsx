'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  category: string
  material: string
  meaning?: string
  badge?: string
}

interface EnhancedProductCardProps {
  product: Product
}

export default function EnhancedProductCard({ product }: EnhancedProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="product-showcase card group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 产品图片 */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-t-xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* 徽章标签 */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="trust-badge text-xs">
              {product.badge}
            </span>
          </div>
        )}
        
        {/* 悬浮显示材质和寓意 */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300">
            <p className="text-sm text-[var(--cream)] mb-1">材质: {product.material}</p>
            {product.meaning && (
              <p className="text-xs text-[var(--amber-gold)]">寓意: {product.meaning}</p>
            )}
          </div>
        )}
      </div>
      
      {/* 产品信息 */}
      <div className="p-4">
        <h3 className="text-lg font-serif text-[var(--cream)] mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* 价格 */}
        <div className="price-tag mb-3">
          <span className="current">¥{product.price}</span>
          {product.originalPrice && (
            <span className="original">¥{product.originalPrice}</span>
          )}
          <span className="badge">缘起价</span>
        </div>
        
        {/* 快速操作按钮 */}
        <div className="flex gap-2">
          <button className="btn-primary flex-1 text-sm">
            结缘
          </button>
          <button className="btn-secondary px-4">
            ❤️
          </button>
        </div>
      </div>
    </div>
  )
}
