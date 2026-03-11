'use client'

import { createContext, useContext, ReactNode } from 'react'
import { CartItem } from '@/hooks/useCart'

interface CartContextType {
  cart: CartItem[]
  count: number
  total: number
  loading: boolean
}

const CartContext = createContext<CartContextType>({
  cart: [],
  count: 0,
  total: 0,
  loading: true
})

export const useCartContext = () => useContext(CartContext)

export { CartContext }
