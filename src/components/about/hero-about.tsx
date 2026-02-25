"use client"

import Image from "next/image"

const images = [
  { src: "/images/about-collage-1.png", alt: "Community worship" },
  { src: "/images/about-collage-2.png", alt: "Believers gathering" },
  { src: "/images/about-collage-3.png", alt: "Faith community" },
  { src: "/images/about-collage-1.png", alt: "Community worship" },
  { src: "/images/about-collage-2.png", alt: "Believers gathering" },
  { src: "/images/about-collage-3.png", alt: "Faith community" },
]

export default function AboutHeroSection() {
  return (
    <div className="bg-white overflow-hidden">
      {/* ── Hero heading ── */}
      <section className="pt-16 pb-10 text-center">
        <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16">
          <span className="inline-block mb-4 px-5 py-1.5 rounded-full bg-violet-50 text-violet-600 text-sm font-semibold ring-1 ring-violet-100 tracking-wide">
            Our Story
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
            About Us
          </h1>

          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            We are happy to serve, and help you in any way we can.
          </p>

          {/* Accent divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-0.5 w-10 rounded-full bg-amber-400" />
            <div className="h-0.5 w-4 rounded-full bg-violet-300" />
          </div>
        </div>
      </section>

      {/* ── Infinite marquee strip ── */}
      <div className="relative pb-16">
        {/* Left edge fade */}
        <div
          className="absolute left-0 top-0 bottom-4 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white 40%, transparent)" }}
          aria-hidden
        />
        {/* Right edge fade */}
        <div
          className="absolute right-0 top-0 bottom-4 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white 40%, transparent)" }}
          aria-hidden
        />

        {/* Scrolling track — first + duplicate set for seamless loop */}
        <div className="flex gap-4 w-max" style={{ animation: "marquee 30s linear infinite" }}>
          {/* First pass */}
          {images.map((img, i) => (
            <div
              key={`a-${i}`}
              className="relative h-44 sm:h-56 lg:h-64 w-[260px] sm:w-[320px] lg:w-[380px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                priority={i < 3}
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          ))}
          {/* Duplicate pass — seamless wrap */}
          {images.map((img, i) => (
            <div
              key={`b-${i}`}
              className="relative h-44 sm:h-56 lg:h-64 w-[260px] sm:w-[320px] lg:w-[380px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5"
              aria-hidden
            >
              <Image src={img.src} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Keyframe ── */}
      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}