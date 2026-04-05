'use client'

import { ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const teachings = [
  {
    title: 'Determination',
    description: 'Standing firm through every trial and emerging stronger',
    thumbnail: '/images/determination.jpg',
  },
  {
    title: 'Giving',
    description: 'The heart of cheerful generosity and open hands',
    thumbnail: '/images/giving.jpg',
  },
  {
    title: 'Patience',
    description: "Waiting with trust in God's perfect timing",
    thumbnail: '/images/patience.jpg',
  },
  {
    title: 'Faith',
    description: 'Seeing the unseen and believing the impossible',
    thumbnail: '/images/faith.jpg',
  },
  {
    title: 'Hope',
    description: 'An anchor for the soul in every season of life',
    thumbnail: '/images/hope.jpg',
  },
  {
    title: 'Love',
    description: 'The greatest commandment and our highest calling',
    thumbnail: '/images/love.jpg',
  },
]

const VISIBLE_CARDS = 2
const AUTO_SLIDE_INTERVAL = 3500

export default function TeachingsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = teachings.length

  const goTo = useCallback(
    (index: number) => {
      const maxIndex = total - VISIBLE_CARDS
      setActiveIndex(Math.max(0, Math.min(index, maxIndex)))
    },
    [total]
  )

  const prev = useCallback(() => {
    setActiveIndex((i) => {
      const maxIndex = total - VISIBLE_CARDS
      return i === 0 ? maxIndex : i - 1
    })
  }, [total])

  const next = useCallback(() => {
    setActiveIndex((i) => {
      const maxIndex = total - VISIBLE_CARDS
      return i === maxIndex ? 0 : i + 1
    })
  }, [total])

  useEffect(() => {
    if (isHovered) return
    timerRef.current = setInterval(next, AUTO_SLIDE_INTERVAL)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [next, isHovered])

  const maxIndex = total - VISIBLE_CARDS

  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-background overflow-hidden">
      {/* Decorative glow — bottom-left */}
      <div className="pointer-events-none absolute -bottom-16 -left-16 w-[420px] h-[420px] select-none" aria-hidden="true">
        <Image
          src="/Ellipse 1.png"
          alt=""
          fill
          className="object-contain opacity-70 scale-x-[-1]"
          priority={false}
          quality={90}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-6 md:space-y-8 lg:pt-4">
            {/* Eyebrow label */}
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#E99E2E]" />
              <span
                className="text-[#E99E2E] text-xs font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Watch &amp; Learn
              </span>
            </div>

            {/* Heading - yellow gradient on "Speak" REMOVED */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              style={{ 
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "var(--foreground)"
              }}
            >
              Teachings That{" "}
              <span className="italic">
                Speak
              </span>
              <br />
              to the Heart
            </h2>

            {/* Description */}
            <p
              className="text-lg leading-relaxed"
              style={{ 
                fontFamily: "'DM Sans', sans-serif",
                color: "var(--muted-foreground)"
              }}
            >
              Explore powerful video sermons, live sessions, and heartfelt devotionals
              from trusted voices in faith. Stream directly through Vimeo or YouTube —
              anytime, anywhere you need encouragement.
            </p>

            {/* Decorative bar */}
            <div className="flex gap-1.5 pt-2">
              <div className="h-1 w-16 rounded-full bg-[#E99E2E]" />
              <div className="h-1 w-6 rounded-full bg-gray-300" />
              <div className="h-1 w-3 rounded-full bg-gray-200" />
            </div>

            {/* Button */}
            <Link
              href="/teachings"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              style={{
                background: "linear-gradient(135deg, #E99E2E 0%, #F7D76A 100%)",
                fontFamily: "'DM Sans', sans-serif",
                color: "#0D0617",
              }}
            >
              Start Watching
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* RIGHT COLUMN (unchanged) */}
          <div
            className="relative bg-muted/50 rounded-2xl border border-border/40 shadow-sm overflow-hidden flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Navigation arrows */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
              <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                {activeIndex + 1}–{Math.min(activeIndex + VISIBLE_CARDS, total)} of {total}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous teaching"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm hover:bg-muted hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next teaching"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm hover:bg-muted hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Cards viewport */}
            <div className="overflow-hidden px-5 pb-5">
              <div
                className="flex gap-4 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(calc(-${activeIndex} * (50% + 0.5rem)))`,
                }}
              >
                {teachings.map((teaching, index) => (
                  <div
                    key={index}
                    className="w-[calc(50%-0.5rem)] flex-none rounded-xl overflow-hidden bg-card border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-video w-full bg-muted">
                      <Image
                        src={teaching.thumbnail ?? ''}
                        alt={`Thumbnail for ${teaching.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 90vw, 300px"
                        priority={index < 2}
                        quality={78}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/35 transition-colors duration-300 group">
                        <div 
                          className="h-11 w-11 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20 group-hover:scale-105 transition-transform duration-200"
                          style={{
                            background: "linear-gradient(135deg, #800080 0%, #41076A 100%)",
                          }}
                        >
                          <Play className="ml-0.5 h-5 w-5 text-white fill-white" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3
                        className="text-sm font-semibold line-clamp-1"
                        style={{ 
                          fontFamily: "'Playfair Display', Georgia, serif",
                          color: "var(--foreground)"
                        }}
                      >
                        {teaching.title}
                      </h3>
                      <p
                        className="mt-1 text-xs line-clamp-2 leading-relaxed"
                        style={{ 
                          fontFamily: "'DM Sans', sans-serif",
                          color: "var(--muted-foreground)"
                        }}
                      >
                        {teaching.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-1.5 pb-5">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                    i === activeIndex
                      ? 'w-6 bg-primary'
                      : 'w-1.5 bg-border hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}