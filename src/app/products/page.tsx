import { getProducts, ServerProduct } from '@/lib/supabase/products'
import ProductsClient from '@/components/products/ProductsClient'
import { Footer } from '@/components/Footer'

// ISR: 每小时重新生成
export const revalidate = 3600

// 生成静态参数（可选，用于预渲染）
export async function generateStaticParams() {
  return []
}

export default async function ProductsPage() {
  // 在服务器端获取产品数据
  const products = await getProducts()

  return (
    <>
      <ProductsClient
        initialProducts={products}
        categories={[]}
      />
      <Footer />
    </>
  )
}
