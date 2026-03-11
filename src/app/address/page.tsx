'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@supabase/supabase-js'
import { MapPin, Plus, Edit, Trash2, Check } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Address {
  id: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  is_default: boolean
}

export default function AddressPage() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const { user } = useAuth()

  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)

  // 新增/编辑表单状态
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    is_default: false
  })

  // 加载地址
  useEffect(() => {
    if (user) {
      loadAddresses()
    }
  }, [user])

  const loadAddresses = async () => {
    if (!user) return
    setLoading(true)
    const { data } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false })

    if (data) {
      setAddresses(data)
    }
    setLoading(false)
  }

  // 设置默认地址
  const handleSetDefault = async (id: string) => {
    if (!user) return

    // 先清除所有默认地址
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', user.id)

    // 设置新的默认地址
    await supabase
      .from('addresses')
      .update({ is_default: true })
      .eq('id', id)

    // 重新加载
    await loadAddresses()
  }

  // 删除地址
  const handleDelete = async (id: string) => {
    if (!confirm(isZh ? '确定要删除此地址吗？' : 'Are you sure you want to delete this address?')) {
      return
    }

    await supabase.from('addresses').delete().eq('id', id)
    await loadAddresses()
  }

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const addressData = {
      user_id: user.id,
      name: formData.name,
      phone: formData.phone,
      province: formData.province,
      city: formData.city,
      district: formData.district,
      detail: formData.detail,
      is_default: formData.is_default || addresses.length === 0
    }

    if (editingId) {
      await supabase.from('addresses').update(addressData).eq('id', editingId)
    } else {
      await supabase.from('addresses').insert(addressData)
    }

    // 如果设置为默认地址，需要清除其他默认
    if (formData.is_default && editingId) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id)
        .neq('id', editingId)
    }

    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      is_default: false
    })
    await loadAddresses()
  }

  // 编辑地址
  const handleEdit = (addr: Address) => {
    setEditingId(addr.id)
    setFormData({
      name: addr.name,
      phone: addr.phone,
      province: addr.province,
      city: addr.city,
      district: addr.district,
      detail: addr.detail,
      is_default: addr.is_default
    })
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-[#0d0c0a]">
      <main className="max-w-2xl mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/profile" className="text-amber-400/70 hover:text-amber-400">
            ← {isZh ? '返回' : 'Back'}
          </Link>
          <h1 className="text-xl font-serif text-gray-100">
            {isZh ? '收缘地址' : 'Addresses'}
          </h1>
          <div className="w-16" />
        </div>

        {loading ? (
          <div className="text-gray-500 text-center py-8">{isZh ? '加载中...' : 'Loading...'}</div>
        ) : addresses.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            {isZh ? '暂无收货地址' : 'No addresses yet'}
          </div>
        ) : (
          /* Address List */
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="bg-[#1a1815] rounded-xl p-5 border border-amber-500/10">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {addr.is_default && (
                      <span className="px-2 py-0.5 bg-amber-600/20 text-amber-400 text-xs rounded">
                        {isZh ? '默认' : 'Default'}
                      </span>
                    )}
                    <span className="text-gray-300 text-sm">{addr.name}</span>
                    <span className="text-gray-500 text-sm">{addr.phone}</span>
                  </div>
                  <div className="flex gap-2">
                    {!addr.is_default && (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        className="p-2 text-gray-500 hover:text-amber-400"
                        title={isZh ? '设为默认' : 'Set as default'}
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button onClick={() => handleEdit(addr)} className="p-2 text-gray-500 hover:text-amber-400">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(addr.id)} className="p-2 text-gray-500 hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  {[addr.province, addr.city, addr.district].filter(Boolean).join('')}<br />
                  {addr.detail}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Add New Address Button / Form */}
        {showForm ? (
          <form onSubmit={handleSubmit} className="mt-6 bg-[#1a1815] rounded-xl p-5 border border-amber-500/20 space-y-4">
            <h3 className="text-gray-100 font-medium">{editingId ? (isZh ? '编辑地址' : 'Edit Address') : (isZh ? '新增地址' : 'Add Address')}</h3>

            <div>
              <label className="block text-gray-400 text-sm mb-1">{isZh ? '收货人姓名' : 'Recipient Name'}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-[#2a2520] border border-amber-500/20 rounded-lg text-gray-100"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">{isZh ? '联系电话' : 'Phone'}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-[#2a2520] border border-amber-500/20 rounded-lg text-gray-100"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-gray-400 text-sm mb-1">{isZh ? '省份' : 'Province'}</label>
                <input
                  type="text"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2a2520] border border-amber-500/20 rounded-lg text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">{isZh ? '城市' : 'City'}</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2a2520] border border-amber-500/20 rounded-lg text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">{isZh ? '区县' : 'District'}</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2a2520] border border-amber-500/20 rounded-lg text-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">{isZh ? '详细地址' : 'Detailed Address'}</label>
              <input
                type="text"
                value={formData.detail}
                onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                className="w-full px-3 py-2 bg-[#2a2520] border border-amber-500/20 rounded-lg text-gray-100"
                required
              />
            </div>

            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                checked={formData.is_default}
                onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                className="rounded"
              />
              {isZh ? '设为默认地址' : 'Set as default address'}
            </label>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                {isZh ? '保存' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null) }}
                className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                {isZh ? '取消' : 'Cancel'}
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full mt-6 py-4 border-2 border-dashed border-amber-500/20 rounded-xl text-amber-400/70 hover:border-amber-500/40 hover:text-amber-400 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            {isZh ? '新增地址' : 'Add Address'}
          </button>
        )}
      </main>
    </div>
  )
}
