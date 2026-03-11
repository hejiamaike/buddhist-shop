import { createSupabaseServerClient } from '@/lib/supabase/server'

export const revalidate = 3600 // ISR: 每小时重新生成

export interface ServerProduct {
  id: string
  name: string
  name_en: string
  slug: string
  description: string
  description_long?: string
  description_long_en?: string
  price: number
  original_price?: number
  stock: number
  images: string[]
  category_id?: string
  subcategory?: string
  material?: string
  use_case?: string
  tags?: string[]
  status: string
  featured?: boolean
  is_featured?: boolean
}

export async function getProducts(): Promise<ServerProduct[]> {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('products')
    .select('id, name, name_en, slug, description, description_long, price, original_price, stock, images, category_id, material, use_case, tags, status, featured, is_featured')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

export async function getProductsByCategory(categorySlug: string): Promise<ServerProduct[]> {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('products')
    .select('id, name, name_en, slug, description, description_long, price, original_price, stock, images, category_id, material, use_case, tags, status, featured, is_featured')
    .eq('status', 'active')
    .eq('category_id', categorySlug)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }

  return data || []
}

export async function getFeaturedProducts(): Promise<ServerProduct[]> {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('products')
    .select('id, name, name_en, slug, description, description_long, price, original_price, stock, images, category_id, material, use_case, tags, status, featured, is_featured')
    .eq('status', 'active')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return data || []
}
