// app/api/bible/highlights/[passageId]/route.ts
// Proxies DELETE /api/v1/highlights/:passageId?bible_id=xxx → remove a highlight.
// Auth: Bearer token forwarded from client (managed by lib/api/client.ts).

import { NextRequest, NextResponse } from 'next/server'

const BACKEND = process.env.BACKEND_URL ?? 'http://localhost:8080'

function extractToken(req: NextRequest): string {
  const auth = req.headers.get('authorization') ?? ''
  return auth.replace(/^Bearer\s+/i, '')
}

// DELETE /api/bible/highlights/[passageId]?bible_id=xxx
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ passageId: string }> }
) {
  const { passageId } = await params
  const token = extractToken(req)
  if (!token) {
    return NextResponse.json({ error: 'authentication required' }, { status: 401 })
  }

  const bibleId = req.nextUrl.searchParams.get('bible_id')
  if (!bibleId) {
    return NextResponse.json({ error: 'bible_id is required' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `${BACKEND}/api/v1/highlights/${passageId}?bible_id=${bibleId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text }, { status: res.status })
    }

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}