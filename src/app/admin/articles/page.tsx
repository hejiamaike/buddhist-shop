'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Article {
  id: string;
  title: string;
  title_en: string;
  slug: string;
  excerpt: string;
  excerpt_en: string;
  content: string;
  content_en: string;
  category: string;
  image_url: string;
  read_time: string;
  status: string;
  created_at: string;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    setLoading(true);

    const { data } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setArticles(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('确定要删除这篇文章吗？')) return;

    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) {
      alert('删除失败: ' + error.message);
    } else {
      fetchArticles();
    }
  }

  async function handleSave(article: Partial<Article>) {
    if (editingArticle?.id) {
      const { error } = await supabase
        .from('articles')
        .update(article)
        .eq('id', editingArticle.id);

      if (error) {
        alert('更新失败: ' + error.message);
      }
    } else {
      const { error } = await supabase
        .from('articles')
        .insert([article]);

      if (error) {
        alert('创建失败: ' + error.message);
      }
    }

    setShowModal(false);
    setEditingArticle(null);
    fetchArticles();
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
          <h1 className="text-2xl font-serif">文章管理</h1>
          <button
            onClick={() => {
              setEditingArticle(null);
              setShowModal(true);
            }}
            className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800"
          >
            + 新增文章
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">加载中...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">标题</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">分类</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">阅读时间</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">状态</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td className="px-4 py-3">{article.title}</td>
                    <td className="px-4 py-3 text-stone-500">{article.category}</td>
                    <td className="px-4 py-3 text-stone-500">{article.read_time}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {article.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setEditingArticle(article);
                          setShowModal(true);
                        }}
                        className="text-amber-700 hover:underline mr-3"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-red-600 hover:underline"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {articles.length === 0 && (
              <div className="text-center py-8 text-stone-500">
                暂无文章
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <ArticleModal
          article={editingArticle}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingArticle(null);
          }}
        />
      )}
    </div>
  );
}

function ArticleModal({ article, onSave, onClose }: {
  article: Article | null;
  onSave: (article: Partial<Article>) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    title_en: article?.title_en || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    excerpt_en: article?.excerpt_en || '',
    content: article?.content || '',
    content_en: article?.content_en || '',
    category: article?.category || '',
    image_url: article?.image_url || '',
    read_time: article?.read_time || '5 分钟阅读',
    status: article?.status || 'draft'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-')
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">{article ? '编辑文章' : '新增文章'}</h2>
          <button onClick={onClose} className="text-stone-500">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">标题（中文）</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">标题（English）</label>
            <input
              type="text"
              value={formData.title_en}
              onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="自动从标题生成"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">分类</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="如：材质鉴别、禅修指导"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">摘要（中文）</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">摘要（English）</label>
            <textarea
              value={formData.excerpt_en}
              onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">正文（中文）</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">正文（English）</label>
            <textarea
              value={formData.content_en}
              onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">封面图片URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">阅读时间</label>
              <input
                type="text"
                value={formData.read_time}
                onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="如：5 分钟阅读"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">状态</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="draft">草稿</option>
                <option value="published">已发布</option>
              </select>
            </div>
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
