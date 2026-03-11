'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartContext } from '@/contexts/CartProvider';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { createClient } from '@supabase/supabase-js';
import { MapPin } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface SavedAddress {
  id: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  is_default: boolean
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, loading: cartLoading, clearCart } = useCartContext()
  const { createOrder } = useOrders()
  const { user } = useAuth()
  const { language } = useLanguage()
  const isZh = language === 'zh'

  const [paymentMethod, setPaymentMethod] = useState('alipay');
  const [loading, setLoading] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string>('')
  const userIdRef = useRef<string | null>(null)

  // 同步 user 到 ref
  useEffect(() => {
    userIdRef.current = user?.id || null
  }, [user])

  // 表单数据
  const [shippingName, setShippingName] = useState('')
  const [shippingPhone, setShippingPhone] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')

  // 加载保存的地址
  useEffect(() => {
    if (userIdRef.current) {
      loadAddresses()
    }
  }, [user])

  const loadAddresses = async () => {
    if (!userIdRef.current) return
    const { data } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userIdRef.current)
      .order('is_default', { ascending: false })

    if (data && data.length > 0) {
      setSavedAddresses(data)
      // 自动选择默认地址
      const defaultAddr = data.find((a: SavedAddress) => a.is_default)
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id)
        fillAddress(defaultAddr)
      }
    }
  }

  // 填充地址到表单
  const fillAddress = (addr: SavedAddress) => {
    setShippingName(addr.name)
    setShippingPhone(addr.phone)
    const fullAddress = [addr.province, addr.city, addr.district, addr.detail].filter(Boolean).join('')
    setShippingAddress(fullAddress)
  }

  // 选择地址变化
  const handleAddressChange = (addrId: string) => {
    setSelectedAddressId(addrId)
    const addr = savedAddresses.find(a => a.id === addrId)
    if (addr) {
      fillAddress(addr)
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 20;
  const total = subtotal + shipping;

  const handlePayment = async () => {
    if (!shippingName || !shippingPhone || !shippingAddress) {
      alert(isZh ? '请填写完整的收货信息' : 'Please fill in complete shipping information')
      return
    }

    setLoading(true);

    // 如果选择 Stripe，创建支付会话
    if (paymentMethod === 'stripe') {
      try {
        const items = cart.map(item => ({
          product_slug: item.slug,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_image: item.image
        }))

        const response = await fetch('/api/payment/create-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items,
            amount: subtotal + shipping,
            currency: 'cny'
          })
        })

        const data = await response.json()

        if (data.url) {
          // 清除购物车
          clearCart()
          // 跳转到 Stripe 支付页面
          window.location.href = data.url
          return
        } else {
          console.error('Stripe session error:', data.error)
          alert(isZh ? '支付页面创建失败，请重试' : 'Payment page creation failed, please try again')
        }
      } catch (error) {
        console.error('Payment error:', error)
        alert(isZh ? '支付处理失败，请重试' : 'Payment processing failed, please try again')
      }
      setLoading(false)
      return
    }

    // 其他支付方式（支付宝、微信）- 创建订单
    const orderNumber = await createOrder({
      items: cart.map(item => ({
        product_slug: item.slug,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity,
        product_image: item.image
      })),
      shipping_name: shippingName,
      shipping_phone: shippingPhone,
      shipping_address: shippingAddress,
      payment_method: paymentMethod
    })

    if (orderNumber) {
      // 清除购物车
      clearCart()
      // 跳转到成功页
      router.push(`/order/success?order=${orderNumber}`)
    } else {
      alert(isZh ? '订单创建失败，请重试' : 'Order creation failed, please try again')
    }

    setLoading(false);
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center">
        <span style={{ color: '#8A8178' }}>{isZh ? '加载中...' : 'Loading...'}</span>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4" style={{ color: '#6B635A' }}>{isZh ? '购物车是空的' : 'Your cart is empty'}</p>
          <Link href="/products" className="text-amber-700 hover:underline">
            {isZh ? '去购物' : 'Go Shopping'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4EE]">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1
          className="text-3xl font-serif mb-12"
          style={{
            color: '#2C2A27',
            fontWeight: 600,
            letterSpacing: '4px'
          }}
        >
          {isZh ? '确认结缘' : 'Confirm Order'}
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 收货信息 + 支付方式 */}
          <div className="space-y-8">
            {/* 收货信息 */}
            <div>
              <h2
                className="text-lg font-medium mb-4 flex items-center gap-3"
                style={{ color: '#2C2A27', fontWeight: 600, letterSpacing: '2px' }}
              >
                <span style={{ width: '3px', height: '20px', backgroundColor: '#B8956E', display: 'inline-block' }}></span>
                {isZh ? '收货信息' : 'Shipping Info'}
              </h2>
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                {/* 已保存地址选择 */}
                {savedAddresses.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#4A4540' }}>
                      <MapPin size={14} className="inline mr-1" />
                      {isZh ? '选择已保存的地址' : 'Select Saved Address'}
                    </label>
                    <select
                      value={selectedAddressId}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      style={{ borderColor: '#E5E0D8', color: '#2C2A27' }}
                    >
                      <option value="">{isZh ? '-- 请选择地址 --' : '-- Select Address --'}</option>
                      {savedAddresses.map((addr) => (
                        <option key={addr.id} value={addr.id}>
                          {addr.name} - {[addr.province, addr.city, addr.district].filter(Boolean).join('')} {addr.detail} {addr.is_default ? `(${isZh ? '默认' : 'Default'})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#4A4540' }}>{isZh ? '收货人' : 'Recipient'}</label>
                  <input
                    type="text"
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    style={{ borderColor: '#E5E0D8', color: '#2C2A27' }}
                    placeholder={isZh ? '请输入收货人姓名' : 'Enter recipient name'}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#4A4540' }}>{isZh ? '联系电话' : 'Phone'}</label>
                  <input
                    type="tel"
                    value={shippingPhone}
                    onChange={(e) => setShippingPhone(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    style={{ borderColor: '#E5E0D8', color: '#2C2A27' }}
                    placeholder={isZh ? '请输入联系电话' : 'Enter phone number'}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#4A4540' }}>{isZh ? '收货地址' : 'Address'}</label>
                  <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    style={{ borderColor: '#E5E0D8', color: '#2C2A27' }}
                    placeholder={isZh ? '请输入详细收货地址' : 'Enter detailed address'}
                    required
                  />
                </div>

                {/* 添加新地址链接 */}
                <Link
                  href="/address"
                  className="text-sm text-amber-700 hover:underline"
                >
                  + {isZh ? '管理收货地址' : 'Manage Addresses'}
                </Link>
              </div>
            </div>

            {/* 支付方式 */}
            <div>
              <h2
                className="text-lg font-medium mb-4 flex items-center gap-3"
                style={{ color: '#2C2A27', fontWeight: 600, letterSpacing: '2px' }}
              >
                <span style={{ width: '3px', height: '20px', backgroundColor: '#B8956E', display: 'inline-block' }}></span>
                {isZh ? '支付方式' : 'Payment Method'}
              </h2>
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-3">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-[#F8F4EE] transition-colors" style={{ borderColor: '#E5E0D8' }}>
                  <input
                    type="radio"
                    name="payment"
                    value="alipay"
                    checked={paymentMethod === 'alipay'}
                    onChange={() => setPaymentMethod('alipay')}
                    className="mr-3"
                  />
                  <span className="text-2xl mr-2">💳</span>
                  <span style={{ color: '#2C2A27' }}>{isZh ? '支付宝' : 'Alipay'}</span>
                </label>

                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-[#F8F4EE] transition-colors" style={{ borderColor: '#E5E0D8' }}>
                  <input
                    type="radio"
                    name="payment"
                    value="wechat"
                    checked={paymentMethod === 'wechat'}
                    onChange={() => setPaymentMethod('wechat')}
                    className="mr-3"
                  />
                  <span className="text-2xl mr-2">💬</span>
                  <span style={{ color: '#2C2A27' }}>{isZh ? '微信支付' : 'WeChat Pay'}</span>
                </label>

                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-[#F8F4EE] transition-colors" style={{ borderColor: '#E5E0D8' }}>
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={() => setPaymentMethod('stripe')}
                    className="mr-3"
                  />
                  <span className="text-2xl mr-2">💳</span>
                  <span style={{ color: '#2C2A27' }}>{isZh ? '信用卡 (Stripe)' : 'Credit Card (Stripe)'}</span>
                </label>
              </div>
            </div>
          </div>

          {/* 订单摘要 */}
          <div>
            <h2
              className="text-lg font-medium mb-4 flex items-center gap-3"
              style={{ color: '#2C2A27', fontWeight: 600, letterSpacing: '2px' }}
            >
              <span style={{ width: '3px', height: '20px', backgroundColor: '#B8956E', display: 'inline-block' }}></span>
              {isZh ? '订单摘要' : 'Order Summary'}
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              {cart.map((item) => (
                <div key={item.slug} className="flex gap-4 py-3 border-b" style={{ borderColor: '#E5E0D8' }}>
                  <div className="w-16 h-16 bg-stone-200 rounded flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                    ) : (
                      '🪔'
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium" style={{ color: '#2C2A27' }}>{item.name}</div>
                    <div style={{ color: '#8A8178' }}>x{item.quantity}</div>
                  </div>
                  <div className="font-medium" style={{ color: '#B8956E' }}>¥{item.price * item.quantity}</div>
                </div>
              ))}

              <div className="py-3 border-b space-y-2" style={{ borderColor: '#E5E0D8' }}>
                <div className="flex justify-between" style={{ color: '#6B635A' }}>
                  <span>{isZh ? '小计' : 'Subtotal'}</span>
                  <span>¥{subtotal}</span>
                </div>
                <div className="flex justify-between" style={{ color: '#6B635A' }}>
                  <span>{isZh ? '运费' : 'Shipping'}</span>
                  <span>{shipping === 0 ? (isZh ? '免费' : 'Free') : `¥${shipping}`}</span>
                </div>
              </div>

              <div className="py-3 flex justify-between text-lg font-medium">
                <span style={{ color: '#2C2A27' }}>{isZh ? '总计' : 'Total'}</span>
                <span style={{ color: '#B8956E', fontWeight: 600 }}>¥{total}</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full mt-4 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 disabled:opacity-50 font-medium"
                style={{ letterSpacing: '2px' }}
              >
                {loading ? (isZh ? '处理中...' : 'Processing...') : (isZh ? '确认结缘' : 'Confirm Order')}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
