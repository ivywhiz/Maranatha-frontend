"use client"

import { useState, useEffect } from "react"
import { Heart, Shield, ChevronRight, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react"
import Header from "../../components/header"
import Footer from "../../components/footer"

// ── Types ────────────────────────────────────────────────────────────────────

interface CreateIntentResponse {
  client_secret: string
  payment_intent_id: string
  amount_cents: number
  fee_amount_cents: number
  total_cents: number
  currency: string
}

// ── Constants ────────────────────────────────────────────────────────────────

const PRESET_AMOUNTS = [1000, 2500, 5000, 10000, 25000] // in cents
const FEE_RATE = 0.029 // 2.9% + 30¢ Stripe fee estimate
const FEE_FIXED = 30

function formatCurrency(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100)
}

function calcFee(cents: number): number {
  return Math.round(cents * FEE_RATE + FEE_FIXED)
}

// ── Step components ───────────────────────────────────────────────────────────

type Step = "amount" | "details" | "payment" | "success"

interface FormState {
  amountCents: number
  customAmount: string
  currency: string
  donorName: string
  donorEmail: string
  message: string
  coverFees: boolean
  isAnonymous: boolean
}

const defaultForm: FormState = {
  amountCents: 5000,
  customAmount: "",
  currency: "usd",
  donorName: "",
  donorEmail: "",
  message: "",
  coverFees: false,
  isAnonymous: false,
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function DonationPage() {
  const [step, setStep] = useState<Step>("amount")
  const [form, setForm] = useState<FormState>(defaultForm)
  const [intentResponse, setIntentResponse] = useState<CreateIntentResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showMessage, setShowMessage] = useState(false)

  // Derived
  const fee = calcFee(form.amountCents)
  const total = form.coverFees ? form.amountCents + fee : form.amountCents

  const patch = (partial: Partial<FormState>) => setForm((f) => ({ ...f, ...partial }))

  // ── API call ────────────────────────────────────────────────────────────────
  async function createIntent() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/v1/donations/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_cents: form.amountCents,
          currency: form.currency,
          donor_name: form.isAnonymous ? "" : form.donorName,
          donor_email: form.donorEmail,
          message: form.message,
          cover_fees: form.coverFees,
          is_anonymous: form.isAnonymous,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message ?? "Something went wrong. Please try again.")
      }
      const data: CreateIntentResponse = await res.json()
      setIntentResponse(data)
      setStep("payment")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  // ── Step guards ─────────────────────────────────────────────────────────────
  function goToDetails() {
    if (form.amountCents < 100) {
      setError("Minimum donation is $1.00")
      return
    }
    setError(null)
    setStep("details")
  }

  function goToPayment() {
    if (form.donorEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.donorEmail)) {
      setError("Please enter a valid email address")
      return
    }
    setError(null)
    createIntent()
  }

  // Simulate payment success (replace with Stripe Elements confirmation)
  function simulatePayment() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep("success")
    }, 1800)
  }

  // ── Progress indicator ──────────────────────────────────────────────────────
  const steps: { key: Step; label: string }[] = [
    { key: "amount", label: "Amount" },
    { key: "details", label: "Details" },
    { key: "payment", label: "Payment" },
  ]
  const stepIndex = steps.findIndex((s) => s.key === step)

  return (
    <div className="min-h-screen bg-[#0B0614] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      {/* ── Background texture ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(128,0,128,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 80% 80%, rgba(233,158,46,0.08) 0%, transparent 60%)`,
        }}
      />

      <main className="relative z-10 flex flex-col items-center px-4 py-12 sm:py-20">

        {/* ── Hero ── */}
        {step !== "success" && (
          <div className="text-center mb-12 max-w-xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#E99E2E]" />
              <span className="text-[#E99E2E] text-xs font-bold uppercase tracking-[0.3em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Support the Ministry
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Give with a{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #800080 0%, #E99E2E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Grateful Heart
              </span>
            </h1>
            <p className="text-white/50 text-base leading-relaxed">
              Every gift — large or small — advances the Gospel and blesses the community.
              Your generosity makes an eternal difference.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-0.5 w-10 rounded-full bg-[#E99E2E]" />
              <div className="h-0.5 w-4 rounded-full bg-white/30" />
            </div>
          </div>
        )}

        {/* ── Success Hero ── */}
        {step === "success" && (
          <div className="text-center mb-12 max-w-xl">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#800080] to-[#E99E2E] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-900/50">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              God bless you!
            </h1>
            <p className="text-white/50 text-base leading-relaxed">
              Your gift has been received. Thank you for sowing into this ministry.
            </p>
          </div>
        )}

        {/* ── Progress bar ── */}
        {step !== "success" && (
          <div className="flex items-center gap-3 mb-10">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      i < stepIndex
                        ? "bg-[#E99E2E] text-black"
                        : i === stepIndex
                        ? "bg-[#800080] text-white ring-4 ring-[#800080]/30"
                        : "bg-white/10 text-white/30"
                    }`}
                  >
                    {i < stepIndex ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block ${
                      i === stepIndex ? "text-white" : "text-white/30"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px ${i < stepIndex ? "bg-[#E99E2E]" : "bg-white/15"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Card ── */}
        <div className="w-full max-w-lg">
          <div
            className="rounded-2xl border border-white/10 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)" }}
          >

            {/* ══ STEP: AMOUNT ══ */}
            {step === "amount" && (
              <div className="p-8">
                <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Choose an Amount
                </h2>
                <p className="text-white/40 text-sm mb-8">Select a preset or enter a custom amount</p>

                {/* Preset amounts */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {PRESET_AMOUNTS.map((cents) => (
                    <button
                      key={cents}
                      onClick={() => patch({ amountCents: cents, customAmount: "" })}
                      className={`py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                        form.amountCents === cents && !form.customAmount
                          ? "bg-[#800080] border-[#800080] text-white shadow-lg shadow-purple-900/40"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {formatCurrency(cents)}
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className="relative mb-6">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-semibold">$</span>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    min={1}
                    value={form.customAmount}
                    onChange={(e) => {
                      const val = e.target.value
                      const cents = Math.round(parseFloat(val) * 100) || 0
                      patch({ customAmount: val, amountCents: cents })
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#800080]/60 focus:bg-white/8 transition-all text-sm"
                  />
                </div>

                {/* Cover fees toggle */}
                <label className="flex items-start gap-3 p-4 rounded-xl bg-white/4 border border-white/8 cursor-pointer hover:bg-white/7 transition-colors mb-6 group">
                  <div
                    onClick={() => patch({ coverFees: !form.coverFees })}
                    className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                      form.coverFees ? "bg-[#E99E2E] border-[#E99E2E]" : "border-white/20 group-hover:border-white/40"
                    }`}
                  >
                    {form.coverFees && <span className="text-black text-xs font-bold">✓</span>}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/90">Cover transaction fees</p>
                    <p className="text-xs text-white/40 mt-0.5">
                      Add {formatCurrency(fee)} so 100% of {formatCurrency(form.amountCents)} goes to the ministry
                    </p>
                  </div>
                </label>

                {/* Summary */}
                <div className="flex items-center justify-between text-sm mb-8 px-1">
                  <span className="text-white/50">Your total today</span>
                  <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {formatCurrency(total, form.currency)}
                  </span>
                </div>

                {error && <ErrorBanner message={error} />}

                <ContinueButton onClick={goToDetails} />
              </div>
            )}

            {/* ══ STEP: DETAILS ══ */}
            {step === "details" && (
              <div className="p-8">
                <button onClick={() => setStep("amount")} className="text-xs text-white/40 hover:text-white/70 mb-6 flex items-center gap-1 transition-colors">
                  ← Back
                </button>
                <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Your Details
                </h2>
                <p className="text-white/40 text-sm mb-8">Optional — leave blank to give anonymously</p>

                {/* Anonymous toggle */}
                <label className="flex items-center gap-3 mb-6 cursor-pointer group">
                  <div
                    onClick={() => patch({ isAnonymous: !form.isAnonymous })}
                    className={`w-10 h-5 rounded-full transition-all relative ${
                      form.isAnonymous ? "bg-[#800080]" : "bg-white/15"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        form.isAnonymous ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {form.isAnonymous ? <EyeOff className="w-4 h-4 text-[#800080]" /> : <Eye className="w-4 h-4 text-white/40" />}
                    <span className="text-sm text-white/70">Give anonymously</span>
                  </div>
                </label>

                <div className={`space-y-4 transition-opacity ${form.isAnonymous ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
                  <Field
                    label="Full name"
                    type="text"
                    placeholder="John Doe"
                    value={form.donorName}
                    onChange={(v) => patch({ donorName: v })}
                  />
                  <Field
                    label="Email address"
                    type="email"
                    placeholder="john@example.com"
                    value={form.donorEmail}
                    onChange={(v) => patch({ donorEmail: v })}
                    hint="We'll send your donation receipt here"
                  />
                </div>

                {/* Message */}
                <div className="mt-4">
                  <button
                    onClick={() => setShowMessage((v) => !v)}
                    className="text-xs text-[#E99E2E] hover:text-[#f5b84a] transition-colors mb-3 flex items-center gap-1"
                  >
                    {showMessage ? "− Hide" : "+ Add"} a message or prayer request
                  </button>
                  {showMessage && (
                    <textarea
                      placeholder="Share a note or prayer request with the ministry…"
                      value={form.message}
                      maxLength={500}
                      onChange={(e) => patch({ message: e.target.value })}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 placeholder-white/25 focus:outline-none focus:border-[#800080]/60 resize-none text-sm transition-all"
                    />
                  )}
                </div>

                {error && <ErrorBanner message={error} className="mt-4" />}

                <div className="mt-8">
                  <ContinueButton onClick={goToPayment} loading={loading} label="Continue to Payment" />
                </div>
              </div>
            )}

            {/* ══ STEP: PAYMENT ══ */}
            {step === "payment" && intentResponse && (
              <div className="p-8">
                <button onClick={() => setStep("details")} className="text-xs text-white/40 hover:text-white/70 mb-6 flex items-center gap-1 transition-colors">
                  ← Back
                </button>
                <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Payment
                </h2>
                <p className="text-white/40 text-sm mb-8">Secured and encrypted by Stripe</p>

                {/* Summary card */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Donation</span>
                    <span>{formatCurrency(intentResponse.amount_cents, intentResponse.currency)}</span>
                  </div>
                  {intentResponse.fee_amount_cents > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Transaction fee (covered by you)</span>
                      <span>{formatCurrency(intentResponse.fee_amount_cents, intentResponse.currency)}</span>
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-[#E99E2E]">
                      {formatCurrency(intentResponse.total_cents, intentResponse.currency)}
                    </span>
                  </div>
                </div>

                {/* Stripe Elements placeholder */}
                <div className="bg-white/4 border border-dashed border-white/15 rounded-xl p-6 mb-6 text-center">
                  <Shield className="w-6 h-6 text-white/20 mx-auto mb-2" />
                  <p className="text-white/30 text-sm">
                    Mount{" "}
                    <code className="text-[#E99E2E]/70 text-xs bg-[#E99E2E]/10 px-1.5 py-0.5 rounded">
                      &lt;PaymentElement /&gt;
                    </code>{" "}
                    here with{" "}
                    <code className="text-[#E99E2E]/70 text-xs bg-[#E99E2E]/10 px-1.5 py-0.5 rounded">
                      clientSecret
                    </code>
                  </p>
                  <p className="text-white/20 text-xs mt-1">
                    Payment Intent ID: {intentResponse.payment_intent_id}
                  </p>
                </div>

                <button
                  onClick={simulatePayment}
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #800080 0%, #41076A 100%)" }}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Heart className="w-4 h-4 fill-white" />
                      Give {formatCurrency(intentResponse.total_cents, intentResponse.currency)}
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-white/25 mt-4">
                  By donating, you agree to our terms. No refunds except in exceptional circumstances.
                </p>
              </div>
            )}

            {/* ══ STEP: SUCCESS ══ */}
            {step === "success" && (
              <div className="p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#800080] to-[#E99E2E] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-900/50">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <p className="text-white/50 leading-relaxed mb-8 max-w-sm mx-auto">
                  Your gift of{" "}
                  <span className="text-[#E99E2E] font-semibold">
                    {intentResponse ? formatCurrency(intentResponse.total_cents, intentResponse.currency) : ""}
                  </span>{" "}
                  has been received. Thank you for sowing into this ministry.
                </p>
                {form.donorEmail && !form.isAnonymous && (
                  <p className="text-white/30 text-sm mb-8">
                    A receipt will be sent to <span className="text-white/60">{form.donorEmail}</span>
                  </p>
                )}

                <div className="bg-white/4 border border-white/8 rounded-xl p-5 mb-8 text-left space-y-1.5">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-3">What happens next</p>
                  {[
                    "Your payment is being processed by Stripe",
                    "You'll receive a donation receipt via email",
                    "Your gift goes directly to ministry work",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-[#E99E2E] mt-0.5">✦</span>
                      {item}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setForm(defaultForm); setStep("amount"); setIntentResponse(null); setShowMessage(false) }}
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  Make another donation →
                </button>
              </div>
            )}
          </div>

          {/* Trust badges */}
          {step !== "success" && (
            <div className="flex items-center justify-center gap-6 mt-6">
              {["256-bit encryption", "Stripe secured", "No data stored"].map((label) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-white/25">
                  <Shield className="w-3 h-3" />
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
  hint,
}: {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  hint?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 placeholder-white/20 focus:outline-none focus:border-[#800080]/60 focus:bg-white/8 transition-all text-sm"
      />
      {hint && <p className="text-xs text-white/30 mt-1.5">{hint}</p>}
    </div>
  )
}

function ContinueButton({
  onClick,
  loading = false,
  label = "Continue",
}: {
  onClick: () => void
  loading?: boolean
  label?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
      style={{ background: "linear-gradient(135deg, #800080 0%, #41076A 100%)" }}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {label}
          <ChevronRight className="w-4 h-4" />
        </>
      )}
    </button>
  )
}

function ErrorBanner({ message, className = "" }: { message: string; className?: string }) {
  return (
    <div className={`flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 ${className}`}>
      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
      <p className="text-sm text-red-300">{message}</p>
    </div>
  )
}