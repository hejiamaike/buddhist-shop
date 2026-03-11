import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-stone-100 to-stone-200 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="text-6xl mb-6">🪔</div>
        <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4">
          精选佛教文化珍品
        </h1>
        <p className="text-xl text-stone-600 mb-8">
          传承千年文化，启迪心灵智慧
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/products"
            className="px-8 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
          >
            探索商品
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 border-2 border-stone-300 text-stone-700 rounded-lg hover:border-amber-700 hover:text-amber-700 transition-colors"
          >
            了解更多
          </Link>
        </div>
      </div>
    </section>
  );
}
