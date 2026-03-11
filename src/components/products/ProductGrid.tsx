'use client'

import Link from 'next/link'

interface Product {
  id: string
  name: string
  name_en: string
  slug: string
  price: number
  original_price?: number
  images: string[]
  description: string
}

interface ProductGridProps {
  products: Product[]
  isZh: boolean
}

export function ProductGrid({ products, isZh }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">暂无商品</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="product-card-enhanced group"
        >
          <div className="image-container">
            <img
              src={product.images[0] || 'https://images.unsplash.com/photo-1590534247854-e97d5e3ed38e?w=400'}
              alt={isZh ? product.name : product.name_en}
              className="w-full h-full object-cover"
            />
            {product.original_price && (
              <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                {Math.round((1 - product.price / product.original_price) * 100)}% OFF
              </div>
            )}
          </div>
          <div className="card-content">
            <h3 className="card-title font-serif text-lg">
              {isZh ? product.name : product.name_en}
            </h3>
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl text-amber-400 font-serif">¥{product.price}</span>
              {product.original_price && (
                <span className="text-sm text-gray-500 line-through">¥{product.original_price}</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
