import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: '请提供邮箱和密码' },
        { status: 400 }
      )
    }

    // 简化验证：任何账户都可以登录后台（测试用）
    // 生产环境应该检查邮箱是否在管理员列表中

    // 生成 session token
    const sessionToken = Buffer.from(`${email}:${Date.now()}:${Math.random()}`).toString('base64')

    const response = NextResponse.json({
      success: true,
      admin: {
        email: email,
        role: 'admin'
      }
    })

    // 设置 cookie
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
