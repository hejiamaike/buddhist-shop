import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  name_en?: string;
  price: number;
  original_price?: number;
  images?: string[];
  slug: string;
}

interface ProductCardProps {
  product: Product;
  lang?: 'zh' | 'en';
}

export function ProductCard({ product, lang = 'zh' }: ProductCardProps) {
  const name = lang === 'en' && product.name_en ? product.name_en : product.name;
  const image = product.images?.[0] || '/placeholder.jpg';

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* 图片 */}
        <div className="relative aspect-square bg-stone-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.original_price && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Sale
            </span>
          )}
        </div>

        {/* 信息 */}
        <div className="p-4">
          <h3 className="font-medium text-stone-800 mb-2 line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-amber-700">
              ¥{product.price}
            </span>
            {product.original_price && (
              <span className="text-sm text-stone-400 line-through">
                ¥{product.original_price}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
