"use client"

import { useState, useEffect } from "react"
import { Shield, ChevronRight, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { CheckoutForm } from "../../components/donation/CheckoutForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CreateIntentResponse {
  client_secret: string
  payment_intent_id: string
  amount_cents: number
  fee_amount_cents: number
  total_cents: number
  currency: string
}

const PRESET_AMOUNTS = [1000, 2500, 5000, 10000, 25000]
const FEE_RATE = 0.029
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

const stripeAppearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#800080",
    colorBackground: "#ffffff",
    colorText: "#111827",
    colorTextSecondary: "#6b7280",
    colorDanger: "#ef4444",
    borderRadius: "12px",
    fontFamily: "'DM Sans', sans-serif",
    fontSizeBase: "14px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid #d1d5db",
      backgroundColor: "#ffffff",
      color: "#111827",
      padding: "12px 14px",
      boxShadow: "none",
    },
    ".Input:focus": {
      border: "1px solid rgba(128,0,128,0.7)",
      boxShadow: "0 0 0 3px rgba(128,0,128,0.12)",
      backgroundColor: "#ffffff",
    },
    ".Input::placeholder": { color: "#9ca3af" },
    ".Label": {
      color: "#6b7280",
      fontSize: "11px",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: "6px",
    },
    ".Tab": {
      border: "1px solid #e5e7eb",
      backgroundColor: "#ffffff",
      color: "#6b7280",
    },
    ".Tab:hover": {
      border: "1px solid rgba(128,0,128,0.35)",
      backgroundColor: "#faf5ff",
      color: "#111827",
    },
    ".Tab--selected": {
      border: "1px solid rgba(128,0,128,0.7)",
      backgroundColor: "#faf5ff",
      color: "#111827",
    },
    ".TabIcon--selected": { fill: "#800080" },
    ".TabLabel--selected": { color: "#111827" },
    ".Block": {
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    },
    ".CheckboxInput": {
      border: "1px solid #d1d5db",
      backgroundColor: "#ffffff",
    },
    ".CheckboxInput--checked": {
      backgroundColor: "#800080",
      border: "1px solid #800080",
    },
    ".Error": { color: "#ef4444", fontSize: "12px" },
  },
}

export default function DonationPage() {
  const [step, setStep] = useState<Step>("amount")
  const [form, setForm] = useState<FormState>(defaultForm)
  const [intentResponse, setIntentResponse] = useState<CreateIntentResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("status") === "success") {
      setStep("success")
      window.history.replaceState({}, "", window.location.pathname)
    }
  }, [])

  const fee = calcFee(form.amountCents)
  const total = form.coverFees ? form.amountCents + fee : form.amountCents
  const patch = (partial: Partial<FormState>) => setForm((f) => ({ ...f, ...partial }))

  async function createIntent() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/donations/create-intent", {
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
        throw new Error(body?.error ?? body?.message ?? "Something went wrong. Please try again.")
      }

      const json = await res.json()
      const data: CreateIntentResponse = json?.data ?? json
      setIntentResponse(data)
      setStep("payment")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error")
    } finally {
      setLoading(false)
    }
  }

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

  const steps: { key: Step; label: string }[] = [
    { key: "amount", label: "Amount" },
    { key: "details", label: "Details" },
    { key: "payment", label: "Payment" },
  ]

  const stepIndex = steps.findIndex((s) => s.key === step)

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-purple-50 via-amber-50/40 to-transparent" />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-purple-100/60 blur-3xl" />
        <div className="absolute top-48 left-0 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl" />
      </div>

      <main className="relative z-10 flex flex-col items-center px-4 py-12 sm:py-20">
        {step !== "success" && (
          <div className="text-center mb-12 max-w-xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#E99E2E]" />
              <span className="text-[#E99E2E] text-xs font-bold uppercase tracking-[0.3em]">Support the Ministry</span>
              <div className="h-px w-12 bg-[#E99E2E]" />
            </div>

            <h1
              className="text-4xl sm:text-5xl font-bold leading-tight mb-4 text-gray-900"
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

            <p className="text-gray-600 text-base leading-relaxed">
              Every gift — large or small — advances the Gospel and blesses the community. Your generosity makes an eternal difference.
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="text-center mb-12 max-w-xl">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#800080] to-[#E99E2E] flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold leading-tight mb-4 text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              God bless you!
            </h1>
            <p className="text-gray-600 text-base leading-relaxed">
              Your gift has been received. Thank you for sowing into this ministry.
            </p>
          </div>
        )}

        {step !== "success" && (
          <div className="flex items-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      i < stepIndex
                        ? "bg-[#E99E2E] text-black"
                        : i === stepIndex
                          ? "bg-[#800080] text-white ring-4 ring-purple-200"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i < stepIndex ? "✓" : i + 1}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${i === stepIndex ? "text-gray-900" : "text-gray-400"}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && <div className={`w-8 h-px ml-1 ${i < stepIndex ? "bg-[#E99E2E]" : "bg-gray-300"}`} />}
              </div>
            ))}
          </div>
        )}

        <div className="w-full max-w-lg">
          <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
            {step === "amount" && (
              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-1 text-gray-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Choose an Amount
                </h2>
                <p className="text-gray-500 text-sm mb-8">Select a preset or enter a custom amount</p>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {PRESET_AMOUNTS.map((cents) => (
                    <button
                      key={cents}
                      onClick={() => patch({ amountCents: cents, customAmount: "" })}
                      className={`py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                        form.amountCents === cents && !form.customAmount
                          ? "bg-[#800080] border-[#800080] text-white shadow-md"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {formatCurrency(cents)}
                    </button>
                  ))}
                </div>

                <div className="relative mb-6">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">$</span>
                  <input
                    type="number"
                    placeholder="Other amount"
                    min={1}
                    value={form.customAmount}
                    onChange={(e) => {
                      const val = e.target.value
                      patch({ customAmount: val, amountCents: Math.round(parseFloat(val) * 100) || 0 })
                    }}
                    className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#800080]/60 focus:ring-2 focus:ring-purple-100 transition-all text-sm"
                  />
                </div>

                <label className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors mb-6 group">
                  <div
                    onClick={() => patch({ coverFees: !form.coverFees })}
                    className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                      form.coverFees ? "bg-[#E99E2E] border-[#E99E2E]" : "border-gray-300 group-hover:border-gray-400"
                    }`}
                  >
                    {form.coverFees && <span className="text-black text-xs font-bold">✓</span>}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">Cover transaction fees</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Add {formatCurrency(fee)} so 100% of {formatCurrency(form.amountCents)} goes to the ministry
                    </p>
                  </div>
                </label>

                <div className="flex items-center justify-between text-sm mb-8 px-1">
                  <span className="text-gray-500">Your total today</span>
                  <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {formatCurrency(total, form.currency)}
                  </span>
                </div>

                {error && <ErrorBanner message={error} />}

                <ContinueButton onClick={goToDetails} />
              </div>
            )}

            {step === "details" && (
              <div className="p-6 sm:p-8">
                <button
                  onClick={() => setStep("amount")}
                  className="text-xs text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-1.5 transition-colors"
                >
                  ← Back
                </button>

                <h2 className="text-xl font-bold mb-1 text-gray-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Your Details
                </h2>
                <p className="text-gray-500 text-sm mb-8">Optional — leave blank to give anonymously</p>

                <label className="flex items-center gap-3 mb-6 cursor-pointer">
                  <div
                    onClick={() => patch({ isAnonymous: !form.isAnonymous })}
                    className={`w-10 h-5 rounded-full transition-all relative shrink-0 ${form.isAnonymous ? "bg-[#800080]" : "bg-gray-300"}`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        form.isAnonymous ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    {form.isAnonymous ? <EyeOff className="w-4 h-4 text-[#800080]" /> : <Eye className="w-4 h-4 text-gray-400" />}
                    <span className="text-sm text-gray-700">Give anonymously</span>
                  </div>
                </label>

                <div className={`space-y-4 transition-opacity ${form.isAnonymous ? "opacity-40 pointer-events-none" : ""}`}>
                  <Field label="Full name" type="text" placeholder="John Doe" value={form.donorName} onChange={(v) => patch({ donorName: v })} />
                  <Field
                    label="Email address"
                    type="email"
                    placeholder="john@example.com"
                    value={form.donorEmail}
                    onChange={(v) => patch({ donorEmail: v })}
                    hint="We'll send your donation receipt here"
                  />
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => setShowMessage((v) => !v)}
                    className="text-xs text-[#E99E2E] hover:text-[#c9821e] transition-colors mb-3 flex items-center gap-1"
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
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#800080]/60 focus:ring-2 focus:ring-purple-100 resize-none text-sm transition-all"
                    />
                  )}
                </div>

                {error && <ErrorBanner message={error} className="mt-4" />}

                <div className="mt-8">
                  <ContinueButton onClick={goToPayment} loading={loading} label="Continue to Payment" />
                </div>
              </div>
            )}

            {step === "payment" && intentResponse && (
              <div className="p-6 sm:p-8 bg-white">
                <Elements stripe={stripePromise} options={{ clientSecret: intentResponse.client_secret, appearance: stripeAppearance }}>
                  <CheckoutForm
                    intentResponse={intentResponse}
                    donorEmail={!form.isAnonymous ? form.donorEmail : undefined}
                    onBack={() => setStep("details")}
                    onSuccess={() => setStep("success")}
                    formatCurrency={formatCurrency}
                  />
                </Elements>
              </div>
            )}

            {step === "success" && (
              <div className="p-8 sm:p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#800080] to-[#E99E2E] flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>

                <p className="text-gray-600 leading-relaxed mb-8 max-w-sm mx-auto">
                  Your gift of{" "}
                  <span className="text-[#E99E2E] font-semibold">
                    {intentResponse ? formatCurrency(intentResponse.total_cents, intentResponse.currency) : ""}
                  </span>{" "}
                  has been received. Thank you for sowing into this ministry.
                </p>

                {form.donorEmail && !form.isAnonymous && (
                  <p className="text-gray-500 text-sm mb-8">
                    A receipt will be sent to <span className="text-gray-800">{form.donorEmail}</span>
                  </p>
                )}

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 text-left space-y-2">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">What happens next</p>
                  {[
                    "Your payment is being processed by Stripe",
                    "You'll receive a donation receipt via email",
                    "Your gift goes directly to ministry work",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-[#E99E2E] mt-0.5">✦</span>
                      {item}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setForm(defaultForm)
                    setStep("amount")
                    setIntentResponse(null)
                    setShowMessage(false)
                    setError(null)
                  }}
                  className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Make another donation →
                </button>
              </div>
            )}
          </div>

          {step !== "success" && step !== "payment" && (
            <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
              {["256-bit encryption", "Stripe secured", "No data stored"].map((label) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
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
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#800080]/60 focus:ring-2 focus:ring-purple-100 transition-all text-sm"
      />
      {hint && <p className="text-xs text-gray-500 mt-1.5">{hint}</p>}
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
      className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-95 active:scale-[0.99] disabled:opacity-60 text-white"
      style={{ background: "linear-gradient(135deg, #800080 0%, #41076A 100%)" }}
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{label}<ChevronRight className="w-4 h-4" /></>}
    </button>
  )
}

function ErrorBanner({ message, className = "" }: { message: string; className?: string }) {
  return (
    <div className={`flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 ${className}`}>
      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
      <p className="text-sm text-red-700">{message}</p>
    </div>
  )
}