"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CTASection() {
  return (
    <section 
      className="py-20 lg:py-28 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('/images/cta rectangle.png')",
        backgroundColor: "#800080" // Fallback color if image fails to load
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* ── Top accent line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-1 z-20"
        style={{
          background:
            "linear-gradient(to right, transparent, #E99E2E, #800080, #E99E2E, transparent)",
        }}
      />

      {/* ── Ambient glows ── */}
      <div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #E99E2E 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #E99E2E 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left - Text content */}
          <div className="space-y-5 flex-1 text-center lg:text-left">
            {/* Eyebrow label */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="h-px w-12 bg-[#E99E2E]" />
              <span
                className="text-[#E99E2E] text-xs font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Join Us Today
              </span>
            </div>

            {/* Heading - updated typography */}
            <h2
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "white" }}
            >
              Faith Begins with{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg, #E99E2E 0%, #F7D76A 45%, #E99E2E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Connection.
              </span>
            </h2>

            {/* Description - updated typography */}
            <p
              className="text-white/80 text-lg leading-relaxed max-w-md mx-auto lg:mx-0"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Join a community built on love, light, and the power of the Word.
            </p>

            {/* Decorative bar */}
            <div className="flex justify-center lg:justify-start gap-1.5 pt-2">
              <div className="h-1 w-16 rounded-full bg-[#E99E2E]" />
              <div className="h-1 w-6 rounded-full bg-white/30" />
              <div className="h-1 w-3 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Right - CTA Button */}
          <div className="flex-shrink-0">
            <Link
              href="/get-started"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#E99E2E]/40"
              style={{
                background: "linear-gradient(135deg, #E99E2E 0%, #F7D76A 100%)",
                fontFamily: "'DM Sans', sans-serif",
                color: "#0D0617",
              }}
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom accent line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, #E99E2E, #800080, #E99E2E, transparent)",
        }}
      />
    </section>
  )
}