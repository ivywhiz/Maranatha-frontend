"use client"

export default function SpiritualGrowthSection() {
  return (
    <section className="bg-[#FAFAF8] py-20 lg:py-32 relative overflow-hidden">
      {/* Decorative numeral */}
      <div
        aria-hidden
        className="absolute right-0 top-0 select-none pointer-events-none"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(200px, 28vw, 360px)",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1px rgba(0,0,0,0.045)",
          lineHeight: 0.8,
          right: "-2rem",
          top: "-2rem",
        }}
      >
        03
      </div>

      <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          {/* Left — heading + accent */}
          <div className="lg:col-span-4">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-amber-500" />
              <span
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="text-xs font-medium tracking-[0.2em] uppercase text-amber-700"
              >
                Growth
              </span>
            </div>

            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-gray-950 leading-[1.0] tracking-tight"
            >
              Spiritual
              <br />
              <em style={{ color: "#1a1a1a", fontStyle: "italic" }}>Growth</em>
            </h2>

            {/* Scripture pill */}
            <div className="mt-10 p-6 rounded-2xl bg-amber-50 border border-amber-100">
              <p
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-amber-900 text-sm italic leading-relaxed"
              >
                &ldquo;God is Spirit, and those who worship Him must worship in spirit and in truth.&rdquo;
              </p>
              <p
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="mt-3 text-xs text-amber-700 font-semibold tracking-widest uppercase"
              >
                John 4:24
              </p>
            </div>

            {/* Decorative bar */}
            <div className="mt-10 flex gap-1.5">
              <div className="h-1 w-16 rounded-full bg-gray-900" />
              <div className="h-1 w-6 rounded-full bg-amber-400" />
              <div className="h-1 w-3 rounded-full bg-gray-200" />
            </div>
          </div>

          {/* Right — body text */}
          <div className="lg:col-span-8">
            {/* Large intro paragraph */}
            <p
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl text-gray-900 font-semibold leading-snug mb-10 pb-10 border-b border-gray-200"
            >
              We believe the Lord Jesus Christ when He told the Samaritan woman that &ldquo;God is Spirit, and those who worship Him must worship in spirit and in truth&rdquo; (John 4: 24).
            </p>

            <div
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-600 text-[15px] leading-[1.85] font-light"
            >
              <p>
                Our purpose is to model and teach spiritual development that increases deep understanding of the truth of the Bible that leads to a personal relationship with the LORD Jesus the Christ. The Holy Spirit enables this kind of life.
              </p>
              <p>
                Maranatha Ministries was born to bridge the gap of growing spiritual detachment and spiritual apathy by raising a new generation of spiritual warriors led by the Spirit of God Almighty. Our teachings seek to stir up and nurture spiritually passionate vibrant individuals, groups and community. We also truly need the revival of the body of Christ. Our devotion is to the LORD Jesus the Christ only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}