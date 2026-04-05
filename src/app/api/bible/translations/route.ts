import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const params = new URLSearchParams()
  const languageRanges = searchParams.getAll('language_ranges[]')

  if (languageRanges.length === 0) {
    params.append('language_ranges[]', 'en')
  } else {
    languageRanges.forEach((lr) => params.append('language_ranges[]', lr))
  }

  params.set('page_size', searchParams.get('page_size') ?? '100')

  const pageToken = searchParams.get('page_token')
  if (pageToken) params.set('page_token', pageToken)

  try {
    const res = await fetch(`${API_BASE}/bibles?${params.toString()}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: text || 'Failed to fetch Bible translations' },
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