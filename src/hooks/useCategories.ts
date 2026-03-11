'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface Category {
  id: string
  name: string
  name_en: string | null
  slug: string
  description: string | null
  description_en: string | null
  short_desc: string | null
  full_desc: string | null
  image_url: string | null
  parent_id: string | null
  sort_order: number
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error: fetchError } = await supabase
          .from('categories')
          .select('*')
          .order('sort_order')

        if (fetchError) throw fetchError

        setCategories(data || [])
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

export function useCategoriesBySlug(slug: string) {
  const { categories, loading, error } = useCategories()

  const category = categories.find(c => c.slug === slug)
  const subcategories = categories.filter(c => c.parent_id === category?.id)

  return { category, subcategories, loading, error }
}
