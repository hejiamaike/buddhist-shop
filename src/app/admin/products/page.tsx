'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Product {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  description: string;
  price: number;
  original_price: number;
  stock: number;
  images: string[];
  category_id: string;
  status: string;
  featured: boolean;
  // 统一模板字段
  material?: string;        // 材质
  origin?: string;          // 产地
  specs?: string;           // 规格 (JSON字符串: [{"label":"材质","value":"..."}])
  specs_en?: string;        // 英文规格
  story?: string;           // 产品故事
  story_en?: string;        // 英文故事
  care_instructions?: string; // 保养说明
  care_instructions_en?: string; // 英文保养说明
}

interface Category {
  id: string;
  name: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    
    // 获取商品
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    // 获取分类
    const { data: categoriesData } = await supabase
      .from('categories')
      .select('id, name')
      .order('sort_order');
    
    if (productsData) setProducts(productsData);
    if (categoriesData) setCategories(categoriesData);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('确定要删除这个商品吗？')) return;
    
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      alert('删除失败: ' + error.message);
    } else {
      fetchData();
    }
  }

  async function handleSave(product: Partial<Product>) {
    if (editingProduct?.id) {
      // 更新
      const { error } = await supabase
        .from('products')
        .update(product)
        .eq('id', editingProduct.id);
      
      if (error) {
        alert('更新失败: ' + error.message);
      }
    } else {
      // 新增
      const { error } = await supabase
        .from('products')
        .insert([product]);
      
      if (error) {
        alert('创建失败: ' + error.message);
      }
    }
    
    setShowModal(false);
    setEditingProduct(null);
    fetchData();
  }

  const getCategoryName = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat?.name || '-';
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/admin" className="text-stone-600 hover:text-amber-700">
            ← 返回管理后台
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-serif">商品管理</h1>
          <button 
            onClick={() => { setEditingProduct({} as Product); setShowModal(true); }}
            className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800"
          >
            + 添加商品
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">加载中...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">商品</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">分类</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">价格</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">库存</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">状态</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] && (
                          <img src={product.images[0]} alt="" className="w-12 h-12 object-cover rounded" />
                        )}
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-stone-500">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{getCategoryName(product.category_id)}</td>
                    <td className="px-4 py-3">¥{product.price}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-sm ${
                        product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {product.status === 'active' ? '在售' : '下架'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => { setEditingProduct(product); setShowModal(true); }}
                        className="text-amber-700 hover:underline mr-2"
                      >
                        编辑
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:underline"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {products.length === 0 && (
              <div className="text-center py-8 text-stone-500">
                暂无商品，请添加
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <ProductModal 
          product={editingProduct} 
          categories={categories}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}

function ProductModal({ product, categories, onSave, onClose }: {
  product: Product | null;
  categories: Category[];
  onSave: (p: Partial<Product>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: product?.name || '',
    name_en: product?.name_en || '',
    slug: product?.slug || '',
    description: product?.description || '',
    price: product?.price || 0,
    original_price: product?.original_price || 0,
    stock: product?.stock || 0,
    category_id: product?.category_id || '',
    status: product?.status || 'active',
    // 统一模板字段
    material: product?.material || '',
    origin: product?.origin || '',
    specs: product?.specs || '',
    specs_en: product?.specs_en || '',
    story: product?.story || '',
    story_en: product?.story_en || '',
    care_instructions: product?.care_instructions || '',
    care_instructions_en: product?.care_instructions_en || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      images: product?.images || [],
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-medium mb-4">{product?.id ? '编辑商品' : '添加商品'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">商品名称</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">英文名称</label>
            <input
              type="text"
              value={form.name_en}
              onChange={e => setForm({ ...form, name_en: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={e => setForm({ ...form, slug: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">描述</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">价格</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">原价</label>
              <input
                type="number"
                step="0.01"
                value={form.original_price}
                onChange={e => setForm({ ...form, original_price: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">库存</label>
              <input
                type="number"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">分类</label>
              <select
                value={form.category_id}
                onChange={e => setForm({ ...form, category_id: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">选择分类</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">状态</label>
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="active">在售</option>
              <option value="inactive">下架</option>
              <option value="draft">草稿</option>
            </select>
          </div>
          
          {/* 统一模板字段 */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-3 text-amber-700">产品详情（统一模板）</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">材质</label>
              <input
                type="text"
                value={form.material}
                onChange={e => setForm({ ...form, material: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="如：印度小叶紫檀"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">产地</label>
              <input
                type="text"
                value={form.origin}
                onChange={e => setForm({ ...form, origin: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="如：印度迈索尔"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">产品规格（JSON格式）</label>
            <textarea
              value={form.specs}
              onChange={e => setForm({ ...form, specs: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
              rows={3}
              placeholder='[{"label":"材质","value":"..."},{"label":"规格","value":"..."}]'
            />
            <p className="text-xs text-gray-500 mt-1">格式：JSON数组，每项包含label和value</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">产品规格（英文）</label>
            <textarea
              value={form.specs_en}
              onChange={e => setForm({ ...form, specs_en: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
              rows={3}
              placeholder='[{"label":"Material","value":"..."},{"label":"Size","value":"..."}]'
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">产品故事</label>
            <textarea
              value={form.story}
              onChange={e => setForm({ ...form, story: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
              placeholder="介绍产品的文化背景、材质故事等..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">产品故事（英文）</label>
            <textarea
              value={form.story_en}
              onChange={e => setForm({ ...form, story_en: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
              placeholder="Product story in English..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">保养说明</label>
            <textarea
              value={form.care_instructions}
              onChange={e => setForm({ ...form, care_instructions: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
              placeholder="如：避免暴晒、定期擦拭等..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">保养说明（英文）</label>
            <textarea
              value={form.care_instructions_en}
              onChange={e => setForm({ ...form, care_instructions_en: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
              placeholder="Care instructions in English..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800"
            >
              保存
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
