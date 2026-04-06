"use client"
// components/donation/CheckoutForm.tsx
// Must be rendered inside <Elements> so useStripe/useElements work.

import { useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Heart, Loader2, AlertCircle, ArrowLeft } from "lucide-react"
import { PaymentSummary } from "./PaymentSummary"
import { SecurityBadges } from "./SecurityBadges"

interface CreateIntentResponse {
  client_secret: string
  payment_intent_id: string
  amount_cents: number
  fee_amount_cents: number
  total_cents: number
  currency: string
}

interface CheckoutFormProps {
  intentResponse: CreateIntentResponse
  donorEmail?: string
  onBack: () => void
  onSuccess: () => void
  formatCurrency: (cents: number, currency?: string) => string
}

export function CheckoutForm({
  intentResponse,
  donorEmail,
  onBack,
  onSuccess,
  formatCurrency,
}: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  async function handleSubmit() {
    if (!stripe || !elements) return
    setLoading(true)
    setError(null)

    // Let Stripe validate the form fields before we attempt confirmation
    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message ?? "Please check your payment details.")
      setLoading(false)
      return
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${window.location.pathname}?status=success`,
        receipt_email: donorEmail || undefined,
        // When we suppress the email field in PaymentElement ("never"),
        // Stripe requires us to pass it manually here.
        ...(donorEmail && {
          payment_method_data: {
            billing_details: { email: donorEmail },
          },
        }),
      },
      redirect: "if_required",
    })

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed. Please try again.")
      setLoading(false)
      return
    }

    // Payment completed in-page — no redirect needed
    onSuccess()
    setLoading(false)
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 text-white/60" />
        </button>
        <div>
          <h2
            className="text-xl font-bold leading-none"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Complete Payment
          </h2>
          <p className="text-xs text-white/40 mt-1">All transactions are encrypted end-to-end</p>
        </div>
      </div>

      {/* Donation summary */}
      <PaymentSummary intentResponse={intentResponse} formatCurrency={formatCurrency} />

      {/* Stripe PaymentElement */}
      <div className="mb-5">
        <div
          className="rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          {/* Loading skeleton while Stripe loads */}
          {!ready && (
            <div className="p-5 space-y-3 animate-pulse">
              <div className="h-3 w-28 bg-white/10 rounded-full" />
              <div className="h-11 bg-white/6 rounded-xl" />
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <div className="h-3 w-16 bg-white/10 rounded-full mb-2" />
                  <div className="h-11 bg-white/6 rounded-xl" />
                </div>
                <div>
                  <div className="h-3 w-12 bg-white/10 rounded-full mb-2" />
                  <div className="h-11 bg-white/6 rounded-xl" />
                </div>
              </div>
            </div>
          )}

          <div className={`p-5 ${!ready ? "hidden" : ""}`}>
            <PaymentElement
              onReady={() => setReady(true)}
              options={{
                layout: {
                  type: "tabs",
                  defaultCollapsed: false,
                },
                paymentMethodOrder: ["apple_pay", "google_pay", "card"],
                fields: {
                  billingDetails: {
                    // Only hide the email field in Stripe if the donor
                    // already gave us their email — we pass it manually
                    // in confirmPayment so Stripe still receives it.
                    email: donorEmail ? "never" : "auto",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-300 leading-snug">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading || !stripe || !elements || !ready}
        className="w-full relative py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-[0.99] disabled:opacity-50 overflow-hidden group"
        style={{ background: "linear-gradient(135deg, #800080 0%, #41076A 100%)" }}
      >
        {/* Shimmer on hover */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
          }}
        />

        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing…</span>
          </>
        ) : (
          <>
            <Heart className="w-4 h-4 fill-white shrink-0" />
            <span>
              Give {formatCurrency(intentResponse.total_cents, intentResponse.currency)}
            </span>
          </>
        )}
      </button>

      <p className="text-center text-xs text-white/20 mt-4 leading-relaxed">
        By completing your gift you agree to our donation terms.
        <br />
        Receipts are issued by Maranatha Moments Ministries.
      </p>

      {/* Security badges + Stripe logo */}
      <SecurityBadges />
    </div>
  )
}