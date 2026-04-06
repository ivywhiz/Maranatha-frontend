// components/donation/PaymentSummary.tsx

interface CreateIntentResponse {
  client_secret: string
  payment_intent_id: string
  amount_cents: number
  fee_amount_cents: number
  total_cents: number
  currency: string
}

interface PaymentSummaryProps {
  intentResponse: CreateIntentResponse
  formatCurrency: (cents: number, currency?: string) => string
}

export function PaymentSummary({ intentResponse, formatCurrency }: PaymentSummaryProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 mb-6">
      {/* Header strip */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ background: "linear-gradient(90deg, rgba(128,0,128,0.3) 0%, rgba(65,7,106,0.3) 100%)" }}
      >
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">
          Donation Summary
        </span>
        <span className="text-xs text-white/30">Maranatha Moments</span>
      </div>

      {/* Line items */}
      <div className="px-5 py-4 space-y-3" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/50">Gift amount</span>
          <span className="text-sm font-medium text-white">
            {formatCurrency(intentResponse.amount_cents, intentResponse.currency)}
          </span>
        </div>

        {intentResponse.fee_amount_cents > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/50">Processing fee (covered by you)</span>
            <span className="text-sm font-medium text-white/70">
              +{formatCurrency(intentResponse.fee_amount_cents, intentResponse.currency)}
            </span>
          </div>
        )}

        <div className="border-t border-white/8 pt-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-white">Total charged</span>
          <span
            className="text-xl font-bold"
            style={{
              background: "linear-gradient(135deg, #E99E2E 0%, #f5c842 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {formatCurrency(intentResponse.total_cents, intentResponse.currency)}
          </span>
        </div>
      </div>
    </div>
  )
}