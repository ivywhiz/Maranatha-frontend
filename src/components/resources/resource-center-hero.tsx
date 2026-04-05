"use client"

export default function ResourceCenterHero() {
  return (
    <div
      className="w-full text-center py-16 px-6"
      style={{ backgroundColor: "#F5F0FB" }}
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-12 bg-[#E99E2E]" />
        <span
          className="text-[#E99E2E] text-xs font-bold uppercase tracking-[0.3em]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Grow in Faith
        </span>
      </div>
      <h1 
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Resource Center
      </h1>
      <p 
        className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Dive into a growing library of practical, easy-to-use content designed for everyday believers.
        Whether you&apos;re preparing for prayer, studying a sermon, or looking for personal inspiration,
        these resources offer clear guidance and spiritually grounded insights that support your journey.
      </p>
    </div>
  )
}