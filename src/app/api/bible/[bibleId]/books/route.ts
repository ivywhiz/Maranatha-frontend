// app/api/bible/[bibleId]/books/route.ts
import { NextRequest, NextResponse } from 'next/server'

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ bibleId: string }> }
) {
  const { bibleId } = await params
  const canon = req.nextUrl.searchParams.get('canon')

  if (!bibleId) {
    return NextResponse.json(
      { error: 'Missing required parameter: bibleId' },
      { status: 400 }
    )
  }

  const qs = new URLSearchParams()
  if (canon) qs.set('canon', canon)

  try {
    const res = await fetch(
      `${API_BASE}/bibles/${bibleId}/books${qs.toString() ? `?${qs.toString()}` : ''}`,
      {
        headers: { Accept: 'application/json' },
        next: { revalidate: 60 * 60 * 24 * 7 },
      }
    )

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: text || 'Failed to fetch books' },
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