// app/api/bible/[bibleId]/books/[bookId]/chapters/route.ts
// Proxies GET /api/v1/bibles/:bibleId/books/:bookId/chapters → chapter list.

import { NextRequest, NextResponse } from 'next/server'

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'

export async function GET(
  _req: NextRequest,
  { params }: { params: { bibleId: string; bookId: string } }
) {
  const { bibleId, bookId } = params

  if (!bibleId || !bookId) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  try {
    const res = await fetch(
      `${API_BASE}/bibles/${bibleId}/books/${bookId}/chapters`,
      {
        headers: {
          Accept: 'application/json',
        },
        next: { revalidate: 60 * 60 * 24 * 7 }, // 7 days
      }
    )

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: text || 'Failed to fetch chapters' },
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