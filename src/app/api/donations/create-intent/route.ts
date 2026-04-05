// app/api/donations/create-intent/route.ts
// Proxies donation intent creation to the Go backend.
// Keeps the backend URL hidden from the browser.

import { NextRequest, NextResponse } from 'next/server'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const res = await fetch(`${API}/donations/create-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
