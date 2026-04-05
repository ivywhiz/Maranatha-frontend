// app/api/auth/refresh/route.ts
// Reads the HTTP-only refresh token cookie and exchanges it for a new access token.

import { NextRequest, NextResponse } from 'next/server'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refresh_token')?.value

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, error: 'No refresh token' },
      { status: 401 }
    )
  }

  const res = await fetch(`${API}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  const data = await res.json()

  if (!res.ok || !data.success) {
    // Refresh failed — clear cookie
    const response = NextResponse.json(
      { success: false, error: 'Session expired' },
      { status: 401 }
    )
    response.cookies.delete('refresh_token')
    return response
  }

  return NextResponse.json({
    success: true,
    data: { access_token: data.data.access_token },
  })
}
