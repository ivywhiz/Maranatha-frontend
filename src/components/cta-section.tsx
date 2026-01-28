"use client"

export default function CTASection() {
  return (
    <section 
      className="py-20 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('/images/cta rectangle.png')",
        backgroundColor: "#800080" // Fallback color if image fails to load
      }}
    >
      {/* Optional: Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 flex-1">
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Faith Begins with Connection.
            </h2>
            <p className="text-white/90 text-lg">
              Join a community built on love, light, and the power of the Word.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              style={{ backgroundColor: "#E99E2E" }}
              className="text-white px-10 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}