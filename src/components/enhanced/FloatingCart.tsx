'use client'

import { useState } from 'react'

export default function FloatingCart() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <div className="floating-cart" onClick={() => {/* 跳转到购物车 */}}>
      🛒
      {cartCount > 0 && (
        <span className="cart-count">{cartCount}</span>
      )}
    </div>
  )
}
