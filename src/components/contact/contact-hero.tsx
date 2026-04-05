"use client"

export default function ContactHero() {
  return (
    <div
      className="w-full text-center py-16 px-6 relative overflow-hidden"
      style={{ backgroundColor: "#F5F0FB" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(128,0,128,0.08) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10">
        {/* Gold eyebrow line */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-[#E99E2E]" />
          <span
            className="text-[#E99E2E] text-xs font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Get In Touch
          </span>
        </div>

        <h1 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Contact Us
        </h1>

        <p 
          className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          We&apos;d love to hear from you. Reach out with questions, prayer requests, or just to connect with our community.
        </p>

        {/* Decorative bars */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-0.5 w-10 rounded-full bg-[#E99E2E]" />
          <div className="h-0.5 w-4 rounded-full bg-[#800080]/30" />
        </div>
      </div>
    </div>
  )
}