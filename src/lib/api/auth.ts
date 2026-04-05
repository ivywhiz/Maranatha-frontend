// lib/api/auth.ts
// Admin authentication — all calls go through Next.js API routes
// so the refresh token is stored in an HTTP-only cookie.

import { tokenStore } from './client'
import type { LoginRequest, LoginResponse } from '../../types/api'

/** Login — stores refresh token in HTTP-only cookie via Next.js route */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  const body = await res.json()

  if (!res.ok || !body.success) {
    throw new Error(body.error ?? 'Login failed')
  }

  // Store access token in memory
  tokenStore.set(body.data.access_token)

  return body.data as LoginResponse
}

/** Logout — clears the HTTP-only cookie via Next.js route */
export async function logout(): Promise<void> {
  await fetch('/api/auth', {
    method: 'DELETE',
    credentials: 'include',
  }).catch(() => {})

  tokenStore.clear()
}

/** Manually refresh the access token (usually called automatically by axios interceptor) */
export async function refreshAccessToken(): Promise<string> {
  const res = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  })

  const body = await res.json()

  if (!res.ok || !body.success) {
    throw new Error('Session expired. Please log in again.')
  }

  const token = body.data.access_token as string
  tokenStore.set(token)
  return token
}
