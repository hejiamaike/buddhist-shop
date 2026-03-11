'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect, useCallback } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface CartItem {
  id?: string
  slug: string
  name: string
  price: number
  quantity: number
  image?: string
  user_id?: string
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  // 从数据库加载购物车
  const loadCartFromDb = async (uid: string) => {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', uid)

    // 如果数据库有数据，才覆盖本地购物车
    // 否则保持本地购物车不变（避免数据库为空时误清）
    if (!error && data && data.length > 0) {
      setCart(data.map(item => ({
        id: item.id,
        slug: item.product_slug,
        name: item.product_name,
        price: item.price,
        quantity: item.quantity,
        image: item.product_image
      })))
    }
    setLoading(false)
  }

  // 从 localStorage 加载（未登录用户）
  const loadCartFromLocal = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    setLoading(false)
  }

  // 检查用户登录状态 - 先加载本地购物车，再异步检查用户
  useEffect(() => {
    // 先立即加载本地购物车（快速响应）
    loadCartFromLocal()

    // 异步检查用户状态
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserId(user.id)
          // 用户已登录，从数据库加载购物车并合并
          loadCartFromDb(user.id)
        }
      } catch (e) {
        // Supabase 连接失败，保持本地购物车
        setLoading(false)
      }
    }
    checkUser()
  }, [])

  // 保存到 localStorage（未登录用户）
  const saveToLocal = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items))
  }

  // 添加到购物车
  const addItem = useCallback(async (item: Omit<CartItem, 'id' | 'user_id'>) => {
    console.log('=== addItem called ===', JSON.stringify(item), 'userId:', userId, 'current cart:', cart)
    if (userId) {
      // 已登录用户 - 保存到数据库
      const { data: existing } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_slug', item.slug)
        .single()

      if (existing) {
        // 已存在，更新数量
        await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + item.quantity })
          .eq('id', existing.id)
      } else {
        // 新增
        await supabase.from('cart_items').insert([{
          user_id: userId,
          product_slug: item.slug,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_image: item.image
        }])
      }
      loadCartFromDb(userId)
    } else {
      // 未登录用户 - 保存到 localStorage
      const existing = cart.find(i => i.slug === item.slug)
      let newCart: CartItem[]
      if (existing) {
        newCart = cart.map(i =>
          i.slug === item.slug
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      } else {
        newCart = [...cart, item]
      }
      setCart(newCart)
      saveToLocal(newCart)
    }
  }, [cart, userId])

  // 更新数量
  const updateQuantity = useCallback(async (slug: string, delta: number) => {
    if (userId) {
      const { data: item } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_slug', slug)
        .single()

      if (item) {
        const newQty = Math.max(1, item.quantity + delta)
        await supabase
          .from('cart_items')
          .update({ quantity: newQty })
          .eq('id', item.id)
        loadCartFromDb(userId)
      }
    } else {
      const newCart = cart.map(item =>
        item.slug === slug
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
      setCart(newCart)
      saveToLocal(newCart)
    }
  }, [cart, userId])

  // 删除商品
  const removeItem = useCallback(async (slug: string) => {
    if (userId) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_slug', slug)
      loadCartFromDb(userId)
    } else {
      const newCart = cart.filter(item => item.slug !== slug)
      setCart(newCart)
      saveToLocal(newCart)
    }
  }, [cart, userId])

  // 清空购物车
  const clearCart = useCallback(async () => {
    if (userId) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
    }
    setCart([])
    saveToLocal([])
  }, [userId])

  // 同步本地购物车到数据库（登录时）
  const syncToDb = useCallback(async () => {
    if (userId && cart.length > 0) {
      for (const item of cart) {
        await supabase.from('cart_items').insert([{
          user_id: userId,
          product_slug: item.slug,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_image: item.image
        }])
      }
      loadCartFromDb(userId)
    }
  }, [cart, userId])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)

  return {
    cart,
    loading,
    total,
    count,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    syncToDb,
    isLoggedIn: !!userId
  }
}
