'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Category {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  description: string;
  image_url: string;
  sort_order: number;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (data) setCategories(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('确定要删除这个分类吗？')) return;
    
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      alert('删除失败: ' + error.message);
    } else {
      fetchCategories();
    }
  }

  async function handleSave(category: Partial<Category>) {
    if (editingCategory?.id) {
      const { error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', editingCategory.id);
      
      if (error) alert('更新失败: ' + error.message);
    } else {
      const { error } = await supabase.from('categories').insert([category]);
      if (error) alert('创建失败: ' + error.message);
    }
    
    setShowModal(false);
    setEditingCategory(null);
    fetchCategories();
  }

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
          <h1 className="text-2xl font-serif">分类管理</h1>
          <button 
            onClick={() => { setEditingCategory({} as Category); setShowModal(true); }}
            className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800"
          >
            + 添加分类
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">加载中...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {cat.image_url && (
                  <img src={cat.image_url} alt={cat.name} className="w-full h-32 object-cover" />
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{cat.name}</h3>
                      <p className="text-sm text-stone-500">{cat.name_en}</p>
                    </div>
                    <span className="text-xs text-stone-400">#{cat.sort_order}</span>
                  </div>
                  <p className="text-sm text-stone-500 mb-3 line-clamp-2">{cat.description}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingCategory(cat); setShowModal(true); }}
                      className="text-amber-700 hover:underline text-sm"
                    >
                      编辑
                    </button>
                    <button 
                      onClick={() => handleDelete(cat.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {categories.length === 0 && !loading && (
          <div className="text-center py-8 text-stone-500">
            暂无分类，请添加
          </div>
        )}
      </main>

      {showModal && (
        <CategoryModal 
          category={editingCategory}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingCategory(null); }}
        />
      )}
    </div>
  );
}

function CategoryModal({ category, onSave, onClose }: {
  category: Category | null;
  onSave: (c: Partial<Category>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: category?.name || '',
    name_en: category?.name_en || '',
    slug: category?.slug || '',
    description: category?.description || '',
    image_url: category?.image_url || '',
    sort_order: category?.sort_order || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-medium mb-4">{category?.id ? '编辑分类' : '添加分类'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">分类名称</label>
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
              rows={2}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">图片URL</label>
            <input
              type="url"
              value={form.image_url}
              onChange={e => setForm({ ...form, image_url: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">排序</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800">
              保存
            </button>
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
