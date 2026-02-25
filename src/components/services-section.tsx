/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from "next/image"
import { Heart, Wheat, Gift } from "lucide-react"

const cards = [
  {
    image: "/images/hands-giving-helping.jpg",
    alt: "Giving",
    label: "Giving",
    icon: Heart,
    iconClass: "text-rose-500 fill-rose-500",
    rotate: "-rotate-[4deg]",
    hoverRotate: "hover:-rotate-[20deg]",
    bg: "bg-white",
    labelClass: "text-gray-800",
    z: "z-10",
    mt: "",
  },
  {
    image: "/images/community-sharing-together.jpg",
    alt: "Sharing the Word",
    label: "Sharing the Word",
    icon: Wheat,
    iconClass: "text-yellow-300",
    rotate: "rotate-[4deg]",
    hoverRotate: "hover:rotate-[20deg]",
    bg: "bg-gradient-to-br from-purple-600 to-fuchsia-500",
    labelClass: "text-white",
    z: "z-20",
    mt: "-mt-10 md:-mt-16 scale-[1.06]",
  },
  {
    image: "/images/hands-giving-donation.jpg",
    alt: "Donation",
    label: "Donation",
    icon: Gift,
    iconClass: "text-emerald-500 fill-emerald-500",
    rotate: "rotate-[3deg]",
    hoverRotate: "hover:rotate-[20deg]",
    bg: "bg-white",
    labelClass: "text-gray-800",
    z: "z-10",
    mt: "",
  },
]

export default function ServicesSection() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: "#800080" }}
    >
      {/* ── Top accent gradient line (matches footer) ── */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, #c084fc, #f59e0b, #c084fc, transparent)",
        }}
      />

      {/* ── Ambient background glows ── */}
      <div
        className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #41076A 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none opacity-25"
        style={{ background: "radial-gradient(circle, #c026d3 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 65%)" }}
        aria-hidden
      />

      {/* ── Dot-grid texture ── */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dot-grid" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      </div>

      {/* ══ CONTENT ══ */}
      <div className="relative z-10 max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">

        {/* ── Header row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-20 lg:mb-28">

          {/* Left — label + heading */}
          <div className="space-y-6">
            <span className="inline-flex items-center px-5 py-1.5 rounded-full text-sm font-medium bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/20">
              About Us
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight">
              A Home for Every <br className="hidden sm:block" />
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(90deg, #fde68a, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Believer
              </span>
            </h2>

            {/* Accent divider */}
            <div className="flex items-center gap-3 pt-1">
              <div className="h-0.5 w-10 rounded-full bg-amber-400" />
              <div className="h-0.5 w-4 rounded-full bg-white/30" />
            </div>
          </div>

          {/* Right — body + CTA */}
          <div className="space-y-8">
            <p className="text-lg text-white/75 leading-relaxed">
              Maranatha is more than an app — it's a community centered on the Word.
              We bring together teachings, sermons, and real-life testimonies that
              inspire hope and nurture spiritual growth.
            </p>

            <button
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-800"
              style={{ backgroundColor: "#E99E2E" }}
            >
              Join the Community
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-10">
          {cards.map(({ image, alt, label, icon: Icon, iconClass, rotate, hoverRotate, bg, labelClass, z, mt }) => (
            <div
              key={label}
              className={`group ${z} ${mt} w-72 flex-shrink-0 cursor-pointer`}
            >
              <div
                className={`
                  ${bg} ${rotate} ${hoverRotate}
                  rounded-3xl shadow-2xl p-5
                  transform transition-all duration-500 ease-out
                  hover:-translate-y-4
                  ring-1 ring-white/10
                `}
              >
                {/* Image */}
                <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-5 shadow-inner">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="288px"
                  />
                  {/* Subtle image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Label */}
                <div className="flex items-center justify-center gap-2.5 py-1">
                  <Icon size={22} className={iconClass} />
                  <p className={`text-lg font-bold ${labelClass}`}>{label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Bottom accent gradient line ── */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, #c084fc, #f59e0b, #c084fc, transparent)",
        }}
      />
    </section>
  )
}