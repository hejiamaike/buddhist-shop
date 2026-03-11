'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  currency: string;
  payment_method: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  created_at: string;
}

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: '待付款', color: 'bg-yellow-100 text-yellow-700' },
  paid: { label: '已付款', color: 'bg-blue-100 text-blue-700' },
  processing: { label: '处理中', color: 'bg-purple-100 text-purple-700' },
  shipped: { label: '已发货', color: 'bg-indigo-100 text-indigo-700' },
  delivered: { label: '已送达', color: 'bg-green-100 text-green-700' },
  cancelled: { label: '已取消', color: 'bg-gray-100 text-gray-700' },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setOrders(data);
    setLoading(false);
  }

  async function updateStatus(orderId: string, status: string) {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);
    
    if (!error) {
      fetchOrders();
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
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
        <h1 className="text-2xl font-serif mb-8">订单管理</h1>

        {loading ? (
          <div className="text-center py-8">加载中...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">订单号</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">金额</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">状态</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">收货人</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">日期</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => {
                  const status = statusMap[order.status] || { label: order.status, color: 'bg-gray-100' };
                  return (
                    <tr key={order.id}>
                      <td className="px-4 py-3 font-mono text-sm">{order.order_number}</td>
                      <td className="px-4 py-3">
                        {order.currency === 'CNY' ? '¥' : '$'}{order.total_amount}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-sm ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">{order.shipping_name}</td>
                      <td className="px-4 py-3 text-sm text-stone-500">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-amber-700 hover:underline mr-2"
                        >
                          详情
                        </button>
                        {order.status === 'paid' && (
                          <button
                            onClick={() => updateStatus(order.id, 'processing')}
                            className="text-blue-600 hover:underline mr-2"
                          >
                            发货
                          </button>
                        )}
                        {order.status === 'processing' && (
                          <button
                            onClick={() => updateStatus(order.id, 'shipped')}
                            className="text-indigo-600 hover:underline"
                          >
                            确认
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {orders.length === 0 && (
              <div className="text-center py-8 text-stone-500">
                暂无订单
              </div>
            )}
          </div>
        )}
      </main>

      {/* 订单详情 Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">订单详情</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-stone-500">✕</button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-stone-500">订单号</span>
                <span className="font-mono">{selectedOrder.order_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">金额</span>
                <span className="font-medium">¥{selectedOrder.total_amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">状态</span>
                <span className={`px-2 py-1 rounded text-sm ${statusMap[selectedOrder.status]?.color || 'bg-gray-100'}`}>
                  {statusMap[selectedOrder.status]?.label || selectedOrder.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">支付方式</span>
                <span>{selectedOrder.payment_method || '-'}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between">
                <span className="text-stone-500">收货人</span>
                <span>{selectedOrder.shipping_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">电话</span>
                <span>{selectedOrder.shipping_phone}</span>
              </div>
              <div>
                <span className="text-stone-500">地址</span>
                <p className="text-right">{selectedOrder.shipping_address}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">下单时间</span>
                <span>{formatDate(selectedOrder.created_at)}</span>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              {selectedOrder.status === 'pending' && (
                <button
                  onClick={() => { updateStatus(selectedOrder.id, 'cancelled'); setSelectedOrder(null); }}
                  className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                >
                  取消订单
                </button>
              )}
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
