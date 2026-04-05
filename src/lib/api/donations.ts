// lib/api/donations.ts
// Donations go through a Next.js API route proxy to hide the backend URL.

import type { CreateIntentRequest, CreateIntentResponse } from '../../types/api'

/** Create a Stripe PaymentIntent via our Next.js proxy route */
export async function createDonationIntent(
  data: CreateIntentRequest
): Promise<CreateIntentResponse> {
  const res = await fetch('/api/donations/create-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.error ?? 'Failed to create payment intent')
  }

  const body = await res.json()
  return body.data
}

/** Calculate Stripe fee for display purposes only */
export function calculateStripeFee(amountCents: number): {
  fee: number
  total: number
} {
  const fee = Math.round(amountCents * 0.029) + 30
  return { fee, total: amountCents + fee }
}

/** Format cents to display string e.g. 1000 → "$10.00" */
export function formatCurrency(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}
