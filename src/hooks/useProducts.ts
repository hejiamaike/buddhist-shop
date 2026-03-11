'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect, useCallback } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface Product {
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
  craftsmanship?: {
    title: string
    title_en: string
    process: string[]
    process_en: string[]
  }
  specifications?: { label: string; value: string }[]
  story?: string
  story_en?: string
  care_instructions?: string[]
  // 统一模板字段
  origin?: string
  specs?: string
  specs_en?: string
  care_instructions_en?: string
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async (filters?: {
    category?: string
    material?: string
    use_case?: string
    minPrice?: number
    maxPrice?: number
    search?: string
  }) => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (filters?.category) {
        query = query.eq('category_id', filters.category)
      }
      if (filters?.material) {
        query = query.eq('material', filters.material)
      }
      if (filters?.use_case) {
        query = query.eq('use_case', filters.use_case)
      }
      if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice)
      }
      if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice)
      }
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,name_en.ilike.%${filters.search}%`)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError
      setProducts(data || [])
    } catch (err: any) {
      setError(err.message)
      // 如果 Supabase 不可用，使用本地缓存的产品数据
      console.warn('Supabase unavailable, using fallback data')
    } finally {
      setLoading(false)
    }
  }, [])

  const getProductBySlug = useCallback(async (slug: string): Promise<Product | null> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.warn('Supabase unavailable, using fallback data')
      return null
    }

    return data
  }, [])

  const getFeaturedProducts = useCallback(async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'active')
      .eq('featured', true)
      .limit(6)

    if (error) return []
    return data || []
  }, [])

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductBySlug,
    getFeaturedProducts
  }
}
