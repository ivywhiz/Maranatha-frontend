"use client"

import { Calendar, Radio, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const events = [
  {
    id: 1,
    date: "24 November, 2025",
    title: "Power of Quiet Faith",
    image: "/images/event1.jpg",
    live: true,
  },
  {
    id: 2,
    date: "1 December, 2025",
    title: "Walking in the Spirit",
    image: "/images/event2.jpg",
    live: false,
  },
]

// Must match the panel bg exactly so card 2 dissolves into it
const PANEL_BG = "#EFEFEF"

export default function EventsSection() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-[#F7F6F3]">

      {/* ── Right lavender radial glow on the main background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 88% 50%, #ede9fe 0%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* ── Ellipse — pinned to top-left edge of section ── */}
      <div
        className="absolute -top-6 -left-6 w-[300px] h-[300px] pointer-events-none select-none z-0" style={{ transform: "scale(-1, -1)" }}
        aria-hidden
      >
        <Image
          src="/Ellipse 1.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* ══════════════════════════════════════════════
          RAISED GRAY CONTENT PANEL
      ══════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          className="rounded-3xl px-5 py-10 sm:px-10 sm:py-12 md:px-20 md:py-16 shadow-sm"
          style={{ backgroundColor: PANEL_BG }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            {/* ── LEFT: Text content ── */}
            <div className="space-y-7 lg:pt-2 lg:sticky lg:top-24">
              {/* Eyebrow label - updated to match about hero */}
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-[#E99E2E]" />
                <span
                  className="text-[#E99E2E] text-xs font-bold uppercase tracking-[0.3em]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Live Streams
                </span>
              </div>

              {/* Heading - updated typography */}
              <h2
                className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#0D0617" }}
              >
                Worship In{" "}
                <span
                  className="italic"
                  style={{
                    background: "linear-gradient(135deg, #800080 0%, #41076A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Real Time
                </span>
              </h2>

              {/* Decorative bar - updated */}
              <div className="flex gap-1.5">
                <div className="h-1 w-16 rounded-full bg-[#E99E2E]" />
                <div className="h-1 w-6 rounded-full bg-[#800080]/30" />
                <div className="h-1 w-3 rounded-full bg-gray-300" />
              </div>

              {/* Description - updated typography */}
              <p
                className="text-lg leading-relaxed max-w-md"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#4B5563" }}
              >
                Experience live teachings and worship sessions right where you are.
                Be part of a living, breathing fellowship — together, in faith.
              </p>

              {/* CTA - updated to match other sections */}
              <Link
                href="/events"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#E99E2E]/20"
                style={{
                  background: "linear-gradient(135deg, #E99E2E 0%, #F7D76A 100%)",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#0D0617",
                }}
              >
                View Live Schedule
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* ── RIGHT: Stacked event cards ── */}
            <div className="relative flex flex-col">

              {/* Card 1 — fully visible */}
              <div className="relative z-10 rounded-3xl overflow-hidden bg-white shadow-xl ring-1 ring-black/5">
                {/* Mobile: image on top full-width, content below */}
                <div className="sm:hidden">
                  <div className="relative w-full aspect-video">
                    <Image
                      src={events[0].image}
                      alt={events[0].title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Live badge overlaid on image */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                      </span>
                      <span className="text-xs font-semibold text-white uppercase tracking-widest">Live Now</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-amber-50 text-amber-500">
                      <Calendar className="h-4 w-4" />
                      {events[0].date}
                    </div>
                    <h3 
                      className="text-xl font-bold text-gray-900 leading-snug"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {events[0].title}
                    </h3>
                    <button className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors duration-200">
                      <Radio className="h-3.5 w-3.5" />
                      Watch Live
                    </button>
                  </div>
                </div>

                {/* sm+: side-by-side layout */}
                <div className="hidden sm:flex items-center gap-5 p-8">
                  <div className="flex-1 space-y-4 min-w-0">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-amber-50 text-amber-500">
                      <Calendar className="h-4 w-4" />
                      {events[0].date}
                    </div>
                    <h3 
                      className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {events[0].title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                      </span>
                      <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">Live Now</span>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
                      <Radio className="h-3.5 w-3.5" />
                      Watch Live
                    </button>
                  </div>
                  <div className="rounded-2xl overflow-hidden w-52 h-52 flex-shrink-0 shadow-md ring-1 ring-black/5">
                    <Image
                      src={events[0].image}
                      alt={events[0].title}
                      width={240}
                      height={240}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Card 2 — peeking up, blends into the PANEL gray */}
              <div className="relative z-0 -mt-5">
                <div
                  className="rounded-3xl overflow-hidden bg-white ring-1 ring-black/5 shadow-md origin-top"
                  style={{ transform: "scale(0.95)", opacity: 0.6, filter: "blur(0.5px)" }}
                >
                  {/* Mobile: stacked */}
                  <div className="sm:hidden">
                    <div className="relative w-full aspect-video">
                      <Image
                        src={events[1].image}
                        alt={events[1].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-amber-50 text-amber-500">
                        <Calendar className="h-4 w-4" />
                        {events[1].date}
                      </div>
                      <h3 
                        className="text-xl font-bold text-gray-900 leading-snug"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {events[1].title}
                      </h3>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-violet-50 text-violet-500">
                        Coming Soon
                      </div>
                    </div>
                  </div>

                  {/* sm+: side-by-side */}
                  <div className="hidden sm:flex items-center gap-5 p-8">
                    <div className="flex-1 space-y-4 min-w-0">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-amber-50 text-amber-500">
                        <Calendar className="h-4 w-4" />
                        {events[1].date}
                      </div>
                      <h3 
                        className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {events[1].title}
                      </h3>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-violet-50 text-violet-500">
                        Coming Soon
                      </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden w-52 h-52 flex-shrink-0">
                      <Image
                        src={events[1].image}
                        alt={events[1].title}
                        width={240}
                        height={240}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Gradient veil fades card 2 into the PANEL color */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: `linear-gradient(to bottom, transparent 15%, ${PANEL_BG} 78%)`,
                  }}
                  aria-hidden
                />
              </div>

              {/* Up Next pill */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-sm ring-1 ring-black/5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">
                  Up Next
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  )
}