"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const images = [
  {
    src: "/images/share1.jpg",
    alt: "Community praying together",
    shape: "rounded-3xl",        // top-left — rectangle
  },
  {
    src: "/images/share2.jpg",
    alt: "Worship department",
    shape: "rounded-full",       // top-right — circle
  },
  {
    src: "/images/share3.jpg",
    alt: "Kids praying together",
    shape: "rounded-full",       // bottom-left — circle
  },
  {
    src: "/images/share4.jpg",
    alt: "Person holding Bible",
    shape: "rounded-3xl",        // bottom-right — rectangle
  },
];

export default function FaithGrowsSection() {
  return (
    <section className="relative overflow-hidden">
      {/* ── Split background ── */}
      <div className="absolute inset-0 flex pointer-events-none" aria-hidden>
        {/* Left half – warm off-white */}
        <div className="w-1/2 bg-[#F7F6F3]" />
        {/* Right half – soft lavender */}
        <div className="w-1/2 bg-[#EDE9FE]" />
      </div>

      {/* ── Decorative blob on right ── */}
      <div
        className="absolute right-0 bottom-0 w-[520px] h-[520px] rounded-full opacity-40 pointer-events-none blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, #c4b5fd 0%, #f0abfc 60%, transparent 100%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── IMAGE GRID ── */}
          <div className="grid grid-cols-2 gap-5">
            {images.map(({ src, alt, shape }, i) => (
              <div
                key={i}
                className={`
                  ${shape} overflow-hidden
                  shadow-lg ring-1 ring-black/5
                  transition-transform duration-500 ease-out
                  hover:-translate-y-1.5 hover:shadow-xl
                  group
                `}
                style={{
                  animation: `fadeSlideUp 0.6s ease both`,
                  animationDelay: `${i * 100}ms`,
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={400}
                  height={300}
                  className="w-full h-64 lg:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={i < 2}
                />
              </div>
            ))}
          </div>

          {/* ── TEXT CONTENT ── */}
          <div className="space-y-7 flex flex-col justify-center lg:pl-4">
            {/* Eyebrow label - updated to match about hero */}
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#E99E2E]" />
              <span
                className="text-[#E99E2E] text-xs font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Share &amp; Connect
              </span>
            </div>

            {/* Heading - updated typography with purple gradient */}
            <h2
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#0D0617" }}
            >
              Faith Grows When{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg, #800080 0%, #41076A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                It&apos;s Shared.
              </span>
            </h2>

            {/* Decorative bar - updated */}
            <div className="flex gap-1.5">
              <div className="h-1 w-16 rounded-full bg-[#E99E2E]" />
              <div className="h-1 w-6 rounded-full bg-[#800080]/30" />
              <div className="h-1 w-3 rounded-full bg-gray-300" />
            </div>

            {/* Body - updated typography */}
            <p
              className="text-gray-600 text-lg leading-relaxed max-w-md"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Join believers across the world in sharing stories, testimonies,
              and prayers. Encourage one another and grow together through
              conversations rooted in grace.
            </p>

            {/* CTA - updated to match other sections */}
            <div className="pt-2">
              <Link
                href="/community"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#E99E2E]/20"
                style={{
                  background: "linear-gradient(135deg, #E99E2E 0%, #F7D76A 100%)",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#0D0617",
                }}
              >
                Join the Conversation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe styles ── */}
      <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}