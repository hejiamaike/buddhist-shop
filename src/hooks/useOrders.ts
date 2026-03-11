'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect, useCallback } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface OrderItem {
  product_slug: string
  product_name: string
  price: number
  quantity: number
  product_image?: string
}

export interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  currency: string
  payment_method: string
  shipping_name: string
  shipping_phone: string
  shipping_address: string
  items: OrderItem[]
  created_at: string
}

interface CreateOrderParams {
  items: OrderItem[]
  shipping_name: string
  shipping_phone: string
  shipping_address: string
  payment_method: string
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  // 检查用户并加载订单
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        loadOrdersFromDb(user.id)
      } else {
        // 未登录，从 localStorage 加载
        loadOrdersFromLocal()
      }
    }
    checkUser()
  }, [])

  // 从数据库加载订单
  const loadOrdersFromDb = async (uid: string) => {
    setLoading(true)
    const { data: ordersData, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })

    if (!error && ordersData) {
      // 获取每个订单的商品明细
      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          const { data: items } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id)

          return {
            ...order,
            items: items || []
          }
        })
      )
      setOrders(ordersWithItems)
    }
    setLoading(false)
  }

  // 从 localStorage 加载（未登录用户）
  const loadOrdersFromLocal = () => {
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
    setLoading(false)
  }

  // 创建订单
  const createOrder = useCallback(async (params: CreateOrderParams): Promise<string | null> => {
    const { items, shipping_name, shipping_phone, shipping_address, payment_method } = params

    // 生成订单号
    const orderNumber = 'FYG' + new Date().toISOString().slice(0,10).replace(/-/g, '') +
      Math.random().toString(36).substring(2, 7).toUpperCase()

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if (userId) {
      // 已登录用户 - 保存到数据库
      const { data: order, error } = await supabase
        .from('orders')
        .insert([{
          user_id: userId,
          order_number: orderNumber,
          status: 'pending',
          total_amount: totalAmount,
          currency: 'CNY',
          payment_method,
          shipping_name,
          shipping_phone,
          shipping_address
        }])
        .select()
        .single()

      if (!error && order) {
        // 插入订单明细
        const orderItems = items.map(item => ({
          order_id: order.id,
          product_slug: item.product_slug,
          product_name: item.product_name,
          price: item.price,
          quantity: item.quantity,
          product_image: item.product_image
        }))

        await supabase.from('order_items').insert(orderItems)

        // 清除购物车
        await supabase.from('cart_items').delete().eq('user_id', userId)

        loadOrdersFromDb(userId)
        return orderNumber
      }
      return null
    } else {
      // 未登录用户 - 保存到 localStorage
      const newOrder: Order = {
        id: Date.now().toString(),
        order_number: orderNumber,
        status: 'pending',
        total_amount: totalAmount,
        currency: 'CNY',
        payment_method,
        shipping_name,
        shipping_phone,
        shipping_address,
        items,
        created_at: new Date().toISOString()
      }

      const existingOrders = localStorage.getItem('orders')
      const orders = existingOrders ? JSON.parse(existingOrders) : []
      orders.push(newOrder)
      localStorage.setItem('orders', JSON.stringify(orders))

      // 清除购物车
      localStorage.setItem('cart', '[]')

      setOrders(orders)
      return orderNumber
    }
  }, [userId])

  // 更新订单状态（仅管理员）
  const updateOrderStatus = useCallback(async (orderId: string, status: string) => {
    if (!userId) return false

    // 检查是否为管理员
    const { data: admin } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (!admin) return false

    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)

    if (!error) {
      loadOrdersFromDb(userId)
      return true
    }
    return false
  }, [userId])

  return {
    orders,
    loading,
    createOrder,
    updateOrderStatus
  }
}
