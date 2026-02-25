'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const teachings = [
  {
    title: 'Determination',
    description: 'Standing firm through every trial and emerging stronger',
    thumbnail: '/images/teachings/determination.jpg',
  },
  {
    title: 'Giving',
    description: 'The heart of cheerful generosity and open hands',
    thumbnail: '/images/teachings/giving.jpg',
  },
  {
    title: 'Patience',
    description: "Waiting with trust in God's perfect timing",
    thumbnail: '/images/teachings/patience.jpg',
  },
  {
    title: 'Faith',
    description: 'Seeing the unseen and believing the impossible',
    thumbnail: '/images/teachings/faith.jpg',
  },
  {
    title: 'Hope',
    description: 'An anchor for the soul in every season of life',
    thumbnail: '/images/teachings/hope.jpg',
  },
  {
    title: 'Love',
    description: 'The greatest commandment and our highest calling',
    thumbnail: '/images/teachings/love.jpg',
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
      // Clamp within [0, total - VISIBLE_CARDS]
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

  // Auto-slide
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
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Watch &amp; Learn
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Teachings That Speak to the Heart
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore powerful video sermons, live sessions, and heartfelt devotionals
              from trusted voices in faith. Stream directly through Vimeo or YouTube —
              anytime, anywhere you need encouragement.
            </p>

            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-md hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all">
              Start Watching
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div
            className="relative bg-muted/50 rounded-2xl border border-border/40 shadow-sm overflow-hidden flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Navigation arrows — positioned at top right, above cards */}
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
                    {/* Thumbnail */}
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
                      {/* Play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/35 transition-colors duration-300 group">
                        <div className="h-11 w-11 rounded-full bg-primary/90 flex items-center justify-center shadow-lg ring-2 ring-white/20 group-hover:scale-105 transition-transform duration-200">
                          <svg className="ml-0.5 h-5 w-5 text-white fill-current" viewBox="0 0 24 24">
                            <path d="M8 5.14v14.72l11-7.36z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                        {teaching.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
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