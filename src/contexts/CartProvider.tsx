'use client'

import { createContext, useContext, ReactNode, useState, useEffect, useCallback, useRef } from 'react'
import { CartItem } from '@/hooks/useCart'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface CartContextType {
  cart: CartItem[]
  count: number
  total: number
  loading: boolean
  error: string | null
  addItem: (item: Omit<CartItem, 'id' | 'user_id'>) => Promise<boolean>
  updateQuantity: (slug: string, delta: number) => Promise<void>
  removeItem: (slug: string) => Promise<void>
  clearCart: () => Promise<void>
  clearError: () => void
}

const CartContext = createContext<CartContextType>({
  cart: [],
  count: 0,
  total: 0,
  loading: true,
  error: null,
  addItem: async () => true,
  updateQuantity: async () => {},
  removeItem: async () => {},
  clearCart: async () => {},
  clearError: () => {}
})

export const useCartContext = () => useContext(CartContext)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 使用 ref 存储 userId，避免闭包问题
  const userIdRef = useRef<string | null>(null)
  useEffect(() => {
    userIdRef.current = userId
  }, [userId])

  // 计算总数和总金额
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // 调试日志
  useEffect(() => {
    console.log('[Cart] State updated - cart:', cart, 'count:', count)
  }, [cart, count])

  // 从数据库加载购物车
  const loadCartFromDb = async (uid: string) => {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', uid)

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

  // 从 localStorage 加载
  const loadCartFromLocal = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    setLoading(false)
  }

  // 保存到 localStorage
  const saveToLocal = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items))
  }

  // 初始化
  useEffect(() => {
    loadCartFromLocal()

    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserId(user.id)
          loadCartFromDb(user.id)
        }
      } catch (e) {
        setLoading(false)
      }
    }
    checkUser()
  }, [])

  // 添加到购物车 - 使用函数式更新避免闭包问题
  const addItem = useCallback(async (item: Omit<CartItem, 'id' | 'user_id'>): Promise<boolean> => {
    console.log('[Cart] addItem called:', item, 'userId:', userId)
    let dbSuccess = true

    // 不管是否登录，都先更新本地状态（保证用户体验）
    setCart(prevCart => {
      const existing = prevCart.find(i => i.slug === item.slug)
      let newCart: CartItem[]
      if (existing) {
        newCart = prevCart.map(i =>
          i.slug === item.slug
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      } else {
        newCart = [...prevCart, item]
      }
      console.log('[Cart] New cart state:', newCart)
      saveToLocal(newCart)
      console.log('[Cart] Saved to localStorage, count:', newCart.reduce((sum, i) => sum + i.quantity, 0))
      return newCart
    })

    // 如果已登录，同时尝试保存到数据库（使用 ref 避免闭包问题）
    if (userIdRef.current) {
      try {
        const { data: existing } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', userIdRef.current)
          .eq('product_slug', item.slug)
          .single()

        if (existing) {
          await supabase
            .from('cart_items')
            .update({ quantity: existing.quantity + item.quantity })
            .eq('id', existing.id)
        } else {
          await supabase.from('cart_items').insert([{
            user_id: userIdRef.current,
            product_slug: item.slug,
            product_name: item.name,
            price: item.price,
            quantity: item.quantity,
            product_image: item.image
          }])
        }
      } catch (err) {
        // 数据库错误处理：记录错误但购物车使用本地存储
        dbSuccess = false
        const errorMessage = err instanceof Error ? err.message : 'Unknown database error'
        console.error('[Cart] Database error when adding item:', {
          error: errorMessage,
          product: item.slug,
          userId: userIdRef.current,
          timestamp: new Date().toISOString()
        })
        setError('购物车同步失败，请检查网络连接')
      }
    }
    return dbSuccess
  }, [])

  // 更新数量
  const updateQuantity = useCallback(async (slug: string, delta: number) => {
    // 先更新本地状态
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.slug === slug
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
      saveToLocal(newCart)
      return newCart
    })

    // 如果已登录，同时更新数据库
    if (userId) {
      try {
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
        }
      } catch (err) {
        console.error('[Cart] Update quantity error:', err)
      }
    }
  }, [userId])

  // 删除商品
  const removeItem = useCallback(async (slug: string) => {
    // 先更新本地状态
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.slug !== slug)
      saveToLocal(newCart)
      return newCart
    })

    // 如果已登录，同时更新数据库
    if (userId) {
      try {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', userId)
          .eq('product_slug', slug)
      } catch (err) {
        console.error('[Cart] Remove item error:', err)
      }
    }
  }, [userId])

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

  // 清除错误状态
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return (
    <CartContext.Provider value={{
      cart,
      count,
      total,
      loading,
      error,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      clearError
    }}>
      {children}
    </CartContext.Provider>
  )
}
