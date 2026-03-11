'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  avatar_url: string;
  language: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    
    let query = supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (searchEmail) {
      query = query.ilike('email', `%${searchEmail}%`);
    }
    
    const { data } = await query;
    
    if (data) setUsers(data);
    setLoading(false);
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-CN');
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
          <h1 className="text-2xl font-serif">用户管理</h1>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="搜索邮箱..."
              value={searchEmail}
              onChange={e => setSearchEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchUsers()}
              className="px-3 py-2 border rounded-lg"
            />
            <button 
              onClick={fetchUsers}
              className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800"
            >
              搜索
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">加载中...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">用户</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">邮箱</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">电话</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">语言</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">注册时间</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center">
                            {user.full_name?.[0] || user.email[0].toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium">{user.full_name || '-'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.phone || '-'}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm">
                        {user.language === 'zh' ? '中文' : user.language === 'en' ? 'English' : user.language}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-500">
                      {formatDate(user.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {users.length === 0 && (
              <div className="text-center py-8 text-stone-500">
                暂无用户
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
