// app/api/donations/create-intent/route.ts
// Proxy — keeps the backend URL server-side only.

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL

  if (!backendUrl) {
    console.error('[donations/create-intent] NEXT_PUBLIC_API_URL is not set')
    return NextResponse.json(
      { success: false, error: 'Server misconfiguration' },
      { status: 500 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 },
    )
  }

  let res: Response
  try {
    res = await fetch(`${backendUrl}/donations/create-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch (err) {
    console.error('[donations/create-intent] upstream fetch failed:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to reach payment service' },
      { status: 502 },
    )
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    return NextResponse.json(
      {
        success: false,
        error: data?.message ?? data?.error ?? 'Payment service error',
      },
      { status: res.status },
    )
  }

  // Backend wraps the response in { success, data } — pass it through as-is.
  return NextResponse.json(data, { status: res.status })
}