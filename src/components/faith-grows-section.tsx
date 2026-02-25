"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const images = [
  {
    src: "/images/share1.jpg",
    alt: "Community praying together",
    shape: "rounded-3xl",        // top-left  — rectangle
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

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
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
                  /* Staggered entrance via CSS animation */
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
            {/* Badge */}
            <div>
              <span className="inline-flex items-center px-5 py-1.5 text-sm font-medium rounded-full bg-white/80 text-violet-700 tracking-wide shadow-sm ring-1 ring-violet-200/60 backdrop-blur-sm">
                Share &amp; Connect
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight text-gray-950">
              Faith Grows When{" "}
              <span className="text-violet-600">It&apos;s Shared.</span>
            </h2>

            {/* Divider accent */}
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-10 rounded-full bg-amber-400" />
              <div className="h-0.5 w-4 rounded-full bg-violet-300" />
            </div>

            {/* Body */}
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Join believers across the world in sharing stories, testimonies,
              and prayers. Encourage one another and grow together through
              conversations rooted in grace.
            </p>

            {/* CTA */}
            <div className="pt-2">
              <button className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold bg-amber-400 text-gray-900 hover:bg-amber-500 shadow-md hover:shadow-lg transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2">
                Join the Conversation
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
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