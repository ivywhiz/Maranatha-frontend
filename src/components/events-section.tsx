"use client"

import { Calendar, Radio } from "lucide-react"
import Image from "next/image"

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
              <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium tracking-wide">
                <Radio className="h-3.5 w-3.5 animate-pulse" />
                Live Streams
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-950 leading-[1.1] tracking-tight">
                Worship In{" "}
                <span className="text-violet-600">Real Time</span>
              </h2>

              <div className="flex items-center gap-3">
                <div className="h-0.5 w-10 rounded-full bg-amber-400" />
                <div className="h-0.5 w-4 rounded-full bg-violet-300" />
              </div>

              <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                Experience live teachings and worship sessions right where you are.
                Be part of a living, breathing fellowship — together, in faith.
              </p>

              <button className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold bg-amber-400 text-gray-900 hover:bg-amber-500 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2">
                View Live Schedule
              </button>
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
                    <h3 className="text-xl font-bold text-gray-900 leading-snug">{events[0].title}</h3>
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
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
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
                      <h3 className="text-xl font-bold text-gray-900 leading-snug">{events[1].title}</h3>
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
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
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