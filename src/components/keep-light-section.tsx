"use client";

import { Heart, ArrowRight } from "lucide-react";

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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* Left — text */}
          <div className="space-y-4 text-left max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center justify-start gap-2">
              <Heart className="h-4 w-4 text-white fill-white opacity-80" />
              <span className="text-white/80 text-sm font-semibold uppercase tracking-widest">
                Support the Mission
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.08] tracking-tight">
              Keep the{" "}
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

            <p className="text-white/80 text-lg leading-relaxed">
              Your gift helps fund teachings, live worship, and life-changing
              testimony sharing across the world.
            </p>
          </div>

          {/* Right — CTA */}
          <div className="flex flex-col items-end gap-4 shrink-0 self-center">
            <button
              className="group inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-base font-semibold text-white shadow-xl transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-amber-500"
              style={{ backgroundColor: "#800080" }}
            >
              Donate Now
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <a
              href="#"
              className="text-sm font-semibold text-white/75 underline underline-offset-4 hover:text-white transition-colors duration-200"
            >
              Learn how it helps
            </a>
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