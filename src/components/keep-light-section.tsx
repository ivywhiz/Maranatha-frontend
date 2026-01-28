"use client";

export default function KeepLightSection() {
  return (
    <section style={{ backgroundColor: "#E99E2E" }} className="w-full h-[219px] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">Keep the Light On.</h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Your gift helps fund teachings, live worship, and life-changing
              testimony sharing.
            </p>
          </div>

          <div className="flex items-center justify-center h-full">
            <button
              style={{ backgroundColor: "#800080" }}
              className="text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity inline-block text-lg"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}