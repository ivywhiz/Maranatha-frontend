// app/api/bible/highlights/route.ts
// Proxies authenticated highlight requests to the Go backend.
//
// GET  /api/bible/highlights?bible_id=xxx&passage_id=xxx  → list highlights
// POST /api/bible/highlights                               → create highlight
//
// Auth: The Authorization header (Bearer token) from the client is forwarded
// directly to the backend. Token management lives in lib/api/client.ts.

import { NextRequest, NextResponse } from 'next/server'

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'

function extractToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') ?? ''
  const token = auth.replace(/^Bearer\s+/i, '').trim()
  return token || null
}

// GET /api/bible/highlights?bible_id=xxx&passage_id=xxx
export async function GET(req: NextRequest) {
  const token = extractToken(req)

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  const sp = req.nextUrl.searchParams
  const bibleId = sp.get('bible_id')
  const passageId = sp.get('passage_id')

  if (!bibleId || !passageId) {
    return NextResponse.json(
      { error: 'bible_id and passage_id are required' },
      { status: 400 }
    )
  }

  const qs = new URLSearchParams({
    bible_id: bibleId,
    passage_id: passageId,
  })

  try {
    const res = await fetch(`${API_BASE}/highlights?${qs.toString()}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: text || 'Failed to fetch highlights' },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// POST /api/bible/highlights
export async function POST(req: NextRequest) {
  const token = extractToken(req)

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }

  try {
    const res = await fetch(`${API_BASE}/highlights`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: text || 'Failed to create highlight' },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}