"use client";

import { ArrowRight } from "lucide-react";

export default function KeepLightSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#E99E2E" }}
    >
      {/* ── Top accent line ── */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.6), rgba(128,0,128,0.5), rgba(255,255,255,0.6), transparent)",
        }}
      />

      {/* ── Ambient glows ── */}
      <div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #800080 0%, transparent 70%)" }}
        aria-hidden
      />

      {/* ── Dot-grid texture ── */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cta-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left — heading and description */}
          <div className="lg:col-span-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-white/60" />
              <span
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="text-xs font-medium tracking-[0.2em] uppercase text-white/80"
              >
                Support the Mission
              </span>
            </div>

            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-[1.0] tracking-tight"
            >
              Keep the
              <br />
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(90deg, #fff 30%, #f3d99a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Light On.
              </span>
            </h2>

            <p
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="mt-6 text-white/80 text-[15px] leading-relaxed max-w-md"
            >
              Your gift helps fund teachings, live worship, and life-changing
              testimony sharing across the world.
            </p>

            {/* Decorative bar */}
            <div className="mt-12 flex gap-1.5">
              <div className="h-1 w-16 rounded-full bg-white/60" />
              <div className="h-1 w-6 rounded-full bg-white/30" />
              <div className="h-1 w-3 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Right — CTA buttons */}
          <div className="lg:col-span-6 flex justify-start lg:justify-end">
            <div className="flex flex-wrap items-center gap-4">
              <button
                className="group inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-amber-500"
                style={{ 
                  backgroundColor: "#800080",
                  fontFamily: "'DM Sans', sans-serif"
                }}
              >
                Donate Now
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <a
                href="#"
                className="text-sm font-semibold text-white/75 underline underline-offset-4 hover:text-white transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Learn how it helps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom accent line ── */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.5), rgba(128,0,128,0.4), rgba(255,255,255,0.5), transparent)",
        }}
      />
    </section>
  );
}