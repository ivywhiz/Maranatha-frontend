"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"

const SLIDES = [
  { src: "/images/about-collage-1.png", alt: "Community worship", label: "Worship & Praise" },
  { src: "/images/about-collage-2.png", alt: "Believers gathering", label: "Community Fellowship" },
  { src: "/images/about-collage-3.png", alt: "Faith community",    label: "Faith in Action" },
  { src: "/images/about-collage-1.png", alt: "Outreach ministry",  label: "Global Outreach" },
  { src: "/images/about-collage-2.png", alt: "Prayer gathering",   label: "Prayer & Intercession" },
  { src: "/images/about-collage-3.png", alt: "Bible study",        label: "Word of God" },
]

const PILLARS = [
  { num: "01", label: "Gospel mission" },
  { num: "02", label: "Sound teaching" },
  { num: "03", label: "Spiritual growth" },
]

export default function AboutHeroSection() {
  const [paused, setPaused] = useState(false)

  return (
    <section className="relative overflow-hidden bg-[#0D0617]">

      {/* ── Ambient background glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/3 w-[700px] h-[700px] rounded-full bg-[#800080]/25 blur-[130px]" />
        <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full bg-[#41076A]/35 blur-[110px]" />
        <div className="absolute bottom-20 left-10 w-[350px] h-[350px] rounded-full bg-[#E99E2E]/8 blur-[90px]" />
        {/* Fine dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════
          HERO CONTENT — full width, not split
      ══════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 pt-32 lg:pt-40 pb-20">

        {/* Eyebrow label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-12 bg-[#E99E2E]" />
          <span
            className="text-[#E99E2E] text-xs font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            About Maranatha Moments Ministries
          </span>
        </div>

        {/* Main headline — full width */}
        <div className="max-w-5xl mb-8">
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            A ministry of{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, #E99E2E 0%, #F7D76A 45%, #E99E2E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              truth,
            </span>
            <br />
            <span className="text-white/85">hope and salvation.</span>
          </h1>
        </div>

        {/* Description — full width, generous */}
        <p
          className="text-white/60 text-xl leading-relaxed max-w-3xl mb-12"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          We are committed to proclaiming Jesus Christ, nurturing spiritual growth,
          and reaching people with the transforming truth of the Gospel.
        </p>

        {/* Mission + Focus chips + Pillars — all in one row */}
        <div className="flex flex-wrap items-start gap-8 mb-12">

          {/* Mission chip */}
          <div className="flex flex-col gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-2xl px-6 py-4 backdrop-blur-sm hover:bg-white/[0.09] transition-colors">
            <span
              className="text-[10px] uppercase tracking-[0.28em] text-white/35 font-bold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Mission
            </span>
            <span
              className="text-base text-white font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Christ-centered outreach
            </span>
          </div>

          {/* Focus chip */}
          <div className="flex flex-col gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-2xl px-6 py-4 backdrop-blur-sm hover:bg-white/[0.09] transition-colors">
            <span
              className="text-[10px] uppercase tracking-[0.28em] text-white/35 font-bold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Focus
            </span>
            <span
              className="text-base text-white font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Biblical truth &amp; discipleship
            </span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-14 bg-white/10 self-center" />

          {/* 3 pillars inline */}
          <div className="flex items-center gap-8">
            {PILLARS.map((p, i) => (
              <div key={p.num} className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span
                    className="text-3xl font-bold text-white/20 leading-none"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {p.num}
                  </span>
                  <span
                    className="text-sm text-white/70 font-medium mt-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {p.label}
                  </span>
                </div>
                {i < PILLARS.length - 1 && (
                  <div className="w-px h-10 bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/sermons"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-white font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#800080]/40 group"
            style={{
              background: "linear-gradient(135deg, #800080 0%, #41076A 100%)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <Play className="w-4 h-4 fill-white text-white" />
            Watch Teachings
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about#mission"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm tracking-wide border border-white/15 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Our Mission
          </Link>

          {/* Quick stat - HIDDEN */}
          {/* <div className="ml-auto hidden lg:flex items-center gap-6">
            {[
              { val: "500+", lbl: "Teachings" },
              { val: "50K+", lbl: "Lives Reached" },
              { val: "20+", lbl: "Nations" },
            ].map((s) => (
              <div key={s.lbl} className="text-center">
                <div
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {s.val}
                </div>
                <div
                  className="text-xs text-white/40 font-medium mt-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.lbl}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          UNIFORM IMAGE CARD SLIDER — full width
          Cards slide right to left, pause on hover
      ══════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ paddingBottom: "80px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0D0617 0%, transparent 100%)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0D0617 0%, transparent 100%)" }}
        />

        {/* Scrolling track */}
        <div
          className="flex gap-5"
          style={{
            width: "max-content",
            animation: "slide-rtl 40s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {/* First set + duplicate for seamless loop */}
          {[...SLIDES, ...SLIDES, ...SLIDES].map((slide, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden group"
              aria-hidden={i >= SLIDES.length}
              style={{
                width: "320px",
                height: "220px",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Image */}
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Permanent dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Purple tint on hover */}
              <div className="absolute inset-0 bg-[#800080]/0 group-hover:bg-[#800080]/25 transition-colors duration-400" />

              {/* Gold accent bar at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                style={{ background: "linear-gradient(90deg, #E99E2E, #F7D76A)" }}
              />

              {/* Label */}
              <div className="absolute bottom-4 left-5 right-5">
                <span
                  className="text-white text-sm font-semibold leading-snug drop-shadow-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {slide.label}
                </span>
              </div>

              {/* Top label — ministry tag */}
              <div className="absolute top-4 left-4">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Maranatha MMM
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframe */}
      <style jsx global>{`
        @keyframes slide-rtl {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-320px * ${SLIDES.length} - 20px * ${SLIDES.length})); }
        }
      `}</style>
    </section>
  )
}