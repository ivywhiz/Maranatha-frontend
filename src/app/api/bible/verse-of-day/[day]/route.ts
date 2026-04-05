// app/api/bible/verse-of-day/[day]/route.ts
// Proxies GET /api/v1/verse_of_the_days/:day → passage for a specific day (1–366).
// Query params forwarded: bible_id (int), format (text|html).

import { NextRequest, NextResponse } from 'next/server'

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ day: string }> }
) {
  const { day } = await params
  const sp = req.nextUrl.searchParams
  const bibleId = sp.get('bible_id') ?? ''
  const format = sp.get('format') ?? 'text'

  if (!day) {
    return NextResponse.json(
      { error: 'Missing required parameter: day' },
      { status: 400 }
    )
  }

  const qs = new URLSearchParams({ format })
  if (bibleId) qs.set('bible_id', bibleId)

  try {
    const res = await fetch(
      `${API_BASE}/verse_of_the_days/${day}?${qs.toString()}`,
      {
        headers: {
          Accept: 'application/json',
        },
        next: { revalidate: 60 * 60 * 24 },
      }
    )

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: text || 'Failed to fetch verse of the day' },
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