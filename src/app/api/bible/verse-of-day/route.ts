// app/api/bible/verse-of-day/route.ts
// Proxies GET /api/v1/verse_of_the_days → full VOTD calendar (day 1-366).
// Cached 24h — the calendar itself rarely changes within a year.

import { NextResponse } from 'next/server'

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/verse_of_the_days`, {
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 60 * 60 * 24 }, // 24h
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: text || 'Failed to fetch verse-of-the-day calendar' },
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