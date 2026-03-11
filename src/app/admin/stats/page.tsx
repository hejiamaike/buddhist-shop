'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  recentOrders: any[];
  topProducts: any[];
}

export default function AdminStatsPage() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    recentOrders: [],
    topProducts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    
    // 商品数
    const { count: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    // 订单数
    const { count: ordersCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });
    
    // 收入
    const { data: orders } = await supabase
      .from('orders')
      .select('total_amount')
      .eq('status', 'paid');
    
    const totalRevenue = orders?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0;
    
    // 用户数
    const { count: usersCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    
    // 最近订单
    const { data: recentOrders } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    
    // 热销商品（简单统计）
    const { data: orderItems } = await supabase
      .from('order_items')
      .select('product_id, product_name, quantity');
    
    const productSales: Record<string, { name: string; count: number }> = {};
    orderItems?.forEach(item => {
      if (productSales[item.product_id]) {
        productSales[item.product_id].count += item.quantity;
      } else {
        productSales[item.product_id] = { name: item.product_name, count: item.quantity };
      }
    });
    
    const topProducts = Object.entries(productSales)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    setStats({
      totalProducts: productsCount || 0,
      totalOrders: ordersCount || 0,
      totalRevenue,
      totalUsers: usersCount || 0,
      recentOrders: recentOrders || [],
      topProducts,
    });
    
    setLoading(false);
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusMap: Record<string, string> = {
    pending: '待付款',
    paid: '已付款',
    processing: '处理中',
    shipped: '已发货',
    delivered: '已送达',
    cancelled: '已取消',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div>加载中...</div>
      </div>
    );
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
        <h1 className="text-2xl font-serif mb-8">数据统计</h1>

        {/* 核心指标 */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-3xl font-bold">{stats.totalProducts}</div>
            <div className="text-stone-500">商品总数</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-4xl mb-2">📋</div>
            <div className="text-3xl font-bold">{stats.totalOrders}</div>
            <div className="text-stone-500">订单总数</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-4xl mb-2">💰</div>
            <div className="text-3xl font-bold">¥{stats.totalRevenue.toLocaleString()}</div>
            <div className="text-stone-500">总收入</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
            <div className="text-stone-500">用户总数</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 最近订单 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">最近订单</h2>
            {stats.recentOrders.length > 0 ? (
              <div className="space-y-3">
                {stats.recentOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div>
                      <div className="font-mono text-sm">{order.order_number}</div>
                      <div className="text-xs text-stone-500">{formatDate(order.created_at)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">¥{order.total_amount}</div>
                      <div className="text-xs text-stone-500">
                        {statusMap[order.status] || order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-stone-500">暂无订单</div>
            )}
          </div>

          {/* 热销商品 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">热销商品</h2>
            {stats.topProducts.length > 0 ? (
              <div className="space-y-3">
                {stats.topProducts.map((product, idx) => (
                  <div key={product.id} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm">
                        {idx + 1}
                      </span>
                      <span className="truncate max-w-[150px]">{product.name}</span>
                    </div>
                    <div className="text-stone-500">
                      {product.count} 件
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-stone-500">暂无销售数据</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
