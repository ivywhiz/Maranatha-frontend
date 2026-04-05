// app/api/auth/route.ts
// Proxy login/refresh requests to Go backend.
// Sets the refresh token in an HTTP-only cookie so JS cannot access it.

import { NextRequest, NextResponse } from 'next/server'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'

// POST /api/auth — login
export async function POST(req: NextRequest) {
  const body = await req.json()

  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok || !data.success) {
    return NextResponse.json(data, { status: res.status })
  }

  const response = NextResponse.json({
    success: true,
    data: {
      access_token: data.data.access_token,
      admin: data.data.admin,
    },
  })

  // Store refresh token in HTTP-only cookie — JS cannot read this
  response.cookies.set('refresh_token', data.data.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return response
}

// DELETE /api/auth — logout
export async function DELETE(req: NextRequest) {
  const refreshToken = req.cookies.get('refresh_token')?.value

  if (refreshToken) {
    // Tell backend to revoke the token
    await fetch(`${API}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    }).catch(() => {})
  }

  const response = NextResponse.json({ success: true, message: 'logged out' })
  response.cookies.delete('refresh_token')
  return response
}
