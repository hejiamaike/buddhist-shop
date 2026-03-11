import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const adminToken = request.cookies.get('admin_session')?.value

    if (!adminToken) {
      return NextResponse.json({ isAdmin: false }, { status: 401 })
    }

    // 验证 token 格式
    try {
      const decodedToken = Buffer.from(adminToken, 'base64').toString()
      const parts = decodedToken.split(':')
      if (parts.length >= 2) {
        return NextResponse.json({
          isAdmin: true,
          admin: {
            email: parts[0],
            role: 'admin'
          }
        })
      }
    } catch (e) {
      // invalid token
    }

    return NextResponse.json({ isAdmin: false }, { status: 401 })
  } catch (error) {
    console.error('Admin verify error:', error)
    return NextResponse.json({ isAdmin: false }, { status: 500 })
  }
}
