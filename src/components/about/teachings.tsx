"use client"

import Image from "next/image"
import { Leaf } from "lucide-react"

export default function OurTeachingSection() {
  return (
    <section className="bg-[#800080] py-20 lg:py-32 relative overflow-hidden">

      {/* Purple depth layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#41076A]/60 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#9a009a]/30 blur-[100px]" />
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Large decorative numeral */}
      <div
        aria-hidden
        className="absolute left-0 bottom-0 select-none pointer-events-none leading-none"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(200px, 28vw, 360px)",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.06)",
          bottom: "-2rem",
          left: "-1rem",
        }}
      >
        02
      </div>

      <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* Heading + body text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-16">

          {/* Left — heading */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#E99E2E]" />
              <span
                className="text-xs font-bold tracking-[0.22em] uppercase text-[#E99E2E]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Teaching
              </span>
            </div>

            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#E99E2E] text-xs font-bold border border-[#E99E2E]/30 bg-[#E99E2E]/10 tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Leaf className="h-3.5 w-3.5" />
              God&apos;s word
            </div>

            <h2
              className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-[1.0] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our{" "}
              <em className="not-italic text-[#E99E2E]">Teaching</em>
            </h2>

            {/* Scripture */}
            <div className="border-l-2 border-[#E99E2E] pl-6 mt-6">
              <p
                className="text-white/80 text-base leading-relaxed italic"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                &ldquo;I am the Light of the World. He who follows Me shall not walk in darkness, but have the light of Life.&rdquo;
              </p>
              <p
                className="mt-3 text-xs text-[#E99E2E] font-bold tracking-widest uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                John 8:12
              </p>
            </div>

            {/* Divider bar */}
            <div className="flex gap-2 mt-8">
              <div className="h-1 w-16 rounded-full bg-white/30" />
              <div className="h-1 w-6 rounded-full bg-[#E99E2E]" />
              <div className="h-1 w-3 rounded-full bg-white/15" />
            </div>
          </div>

          {/* Right — body text */}
          <div className="lg:col-span-7">
            <p
              className="text-2xl text-white font-semibold leading-snug mb-8 pb-8 border-b border-white/15"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Sound, unfermented bible teachings — spiritual support, Christian education, discipleship and guidance to millions of true seekers of God around the globe.
            </p>

            <div
              className="space-y-5 text-white/65 text-[15px] leading-[1.85] font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <p>
                Maranatha provides sound unfermented bible teachings, spiritual support, Christian education, discipleship and guidance to millions of true seekers of God around the globe. We are committed to teaching bible-based guidelines for meaningful fellowship with the LORD Jesus Christ.
              </p>
              <p>
                MMM&apos;s bible teachings inspire hope anchored in the love of Christ, through the message of salvation because of the death and resurrection of Jesus Christ, the cross and His resurrection. Our teachings ground the globe, strengthen believers and build faith, trust and reliance on God and the LORD Jesus Christ.
              </p>
              <p>
                Maranatha&apos;s bible teachings help prepare and fortify participants and believers for a Christ-centred living that depends on the Word of God. Our goal is to be like the Christ, and ultimately spend eternity with the Christ when He comes back again to rapture His people.
              </p>
            </div>
          </div>
        </div>

        {/* Full-width image */}
        <div className="relative w-full h-72 sm:h-96 lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <Image
            src="/images/about-teaching.png"
            alt="Bible teaching and worship"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#41076A]/80 via-[#800080]/20 to-transparent" />

          {/* Tags */}
          <div className="absolute bottom-8 left-8 flex flex-wrap gap-3">
            {["Evangelism", "Discipleship", "Soul-Winning", "Biblical Truth"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold border border-white/20 tracking-wide hover:bg-[#E99E2E]/20 hover:border-[#E99E2E]/40 transition-all duration-300 cursor-default"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
