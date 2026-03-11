'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@rufage.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || '登录失败')
      }

      router.push('/admin')
    } catch (err: any) {
      setError(err.message || '登录失败')
    }

    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: '#FFFFFF',
    border: '1px solid #EAE5DE',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#2C2A27',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  }

  const focusStyle: React.CSSProperties = {
    border: '1px solid #B8965A',
    boxShadow: '0 0 0 3px rgba(184, 150, 90, 0.15)'
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F2ED' }}>
      <div style={{ width: '100%', maxWidth: '400px', margin: '0 20px' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🪔</div>
            <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#2C2A27', letterSpacing: '2px', marginBottom: '4px' }}>
              如法阁
            </h1>
            <p style={{ fontSize: '13px', color: '#8A8178', letterSpacing: '1px' }}>后台管理系统</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                placeholder="请输入账号"
                required
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, { border: '1px solid #EAE5DE', boxShadow: 'none' })}
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                placeholder="请输入密码"
                required
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, { border: '1px solid #EAE5DE', boxShadow: 'none' })}
              />
            </div>

            {error && (
              <div style={{ color: '#D32F2F', padding: '12px', background: '#FFEBEE', borderRadius: '8px', fontSize: '13px', textAlign: 'center' }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: '#B8965E',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '2px',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.background = '#A6854E')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#B8965E')}
            >
              {loading ? '登录中...' : '安全登录'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
