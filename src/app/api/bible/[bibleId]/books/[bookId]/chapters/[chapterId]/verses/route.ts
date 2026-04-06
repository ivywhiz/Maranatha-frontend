// app/api/bible/[bibleId]/books/[bookId]/chapters/[chapterId]/verses/route.ts

import { NextRequest, NextResponse } from 'next/server'

// Use your existing env (includes /api/v1 already)
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'

export async function GET(
  _req: NextRequest,
  props: { params: Promise<{ bibleId: string; bookId: string; chapterId: string }> }
) {
  const params = await props.params;
  const { bibleId, bookId, chapterId } = params

  try {
    const res = await fetch(
      `${API_BASE}/bibles/${bibleId}/books/${bookId}/chapters/${chapterId}/verses`,
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
        { error: text || 'Failed to fetch verses' },
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