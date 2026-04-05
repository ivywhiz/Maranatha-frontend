// src/app/api/bible/[bibleId]/passages/[passageId]/route.ts
// Proxies GET /api/v1/bibles/:bibleId/passages/:passageId
// Query params forwarded: format (text|html), include_headings, include_notes

import { NextRequest, NextResponse } from 'next/server'

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'

type RouteContext = {
  params: Promise<{
    bibleId: string
    passageId: string
  }>
}

export async function GET(req: NextRequest, context: RouteContext) {
  const { bibleId, passageId } = await context.params
  const sp = req.nextUrl.searchParams

  if (!bibleId || !passageId) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  const qs = new URLSearchParams()
  qs.set('format', sp.get('format') ?? 'text')
  qs.set('include_headings', sp.get('include_headings') ?? 'false')
  qs.set('include_notes', sp.get('include_notes') ?? 'false')

  try {
    const res = await fetch(
      `${API_BASE}/bibles/${encodeURIComponent(bibleId)}/passages/${encodeURIComponent(passageId)}?${qs.toString()}`,
      {
        headers: {
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: text || 'Failed to fetch passage' },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}