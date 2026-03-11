import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    const [productsRes, catsRes] = await Promise.all([
      supabase.from('products').select('*').eq('status', 'active').eq('featured', true).limit(8),
      supabase.from('categories').select('*').order('sort_order'),
    ]);

    return NextResponse.json({
      products: productsRes.data,
      categories: catsRes.data,
      productsError: productsRes.error,
      categoriesError: catsRes.error,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
