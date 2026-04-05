"use client"

import Image from "next/image"
import { Leaf } from "lucide-react"

export default function WhatWeDoSection() {
  return (
    <section className="bg-[#FAFAF8] py-20 lg:py-32 relative overflow-hidden">
      {/* Large decorative numeral */}
      <div
        aria-hidden
        className="absolute right-0 top-0 text-[clamp(200px,30vw,380px)] font-black leading-none select-none pointer-events-none"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(0,0,0,0.05)",
          lineHeight: 0.8,
          right: "-2rem",
          top: "-1rem",
        }}
      >
        01
      </div>

      <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-amber-500" />
          <span style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs font-medium tracking-[0.2em] uppercase text-amber-700">
            Mission
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-gray-950 leading-[1.0] tracking-tight mb-16"
        >
          What We{" "}
          <em className="not-italic" style={{ WebkitTextStroke: "1.5px #1a1a1a", color: "transparent" }}>
            Do
          </em>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — image column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200 tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Leaf className="h-3.5 w-3.5" />
              God&apos;s work
            </div>

            <div className="relative w-full h-[420px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about-what-we-do.jpg"
                alt="What we do - ministry work"
                fill
                className="object-cover"
              />
              {/* Overlay with texture feel */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/30" />

              {/* Floating quote card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg">
                <p
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-gray-800 text-sm italic leading-relaxed"
                >
                  &ldquo;Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved&rdquo;
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="mt-2 text-xs text-amber-700 font-semibold tracking-wide">Acts 4:12</p>
              </div>
            </div>
          </div>

          {/* Right — text column (7 cols) */}
          <div className="lg:col-span-7">
            {/* Pull quote at top */}
            <blockquote
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-10 pb-10 border-b border-gray-200"
            >
              Maranatha connects seekers of God to the God of the Bible, and to our LORD and Savior Jesus Christ.
            </blockquote>

            <div
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="space-y-5 text-gray-600 text-[15px] leading-[1.85] font-light"
            >
              <p>
                We exercise as we link people to seek Jesus the Christ as their LORD and personal Savior so that they might have abundant life in Christ Jesus through the power of the Holy Spirit.
              </p>
              <p>
                We affirm that Jesus is the Messiah, the Savior of the world. We teach that Jesus is the Way the Truth and the Life, and that humans cannot reach God except through Jesus the Christ. (John Chapter 14, verse 6). We communicate to people that only Jesus can save us from our sins and guarantee us eternal Life in heaven when we die.
              </p>
              <p>
                We teach that humans cannot attain God&apos;s righteous requirements to wash away our sins through good works. God&apos;s righteous requirement to forgive our sins is only possible by accepting the free gift of God&apos;s salvation through Jesus Christ His Son.
              </p>
              <p>
                When we accept God&apos;s free gift of salvation provided through the death and resurrection of Jesus Christ, Jesus&apos; blood washes away our sins. We also teach that humans are destined to die only once, and after death, God&apos;s judgement will follow (Hebrews 9 verse 27).
              </p>
              <p>
                We declare that Jesus died on the cross for our sins and rose again for our justification (Romans Chapter 4 verse 25). Our message of God&apos;s transformative Word lifts people from darkness into the marvelous light of Jesus Christ.
              </p>
              <p>
                The Bible states: &ldquo;But you are a chosen people, a royal priesthood, a holy nation, God&apos;s special possession, that you may declare the praises of Him who called you, out of darkness into His wonderful light.&rdquo; (1 Peter Chapter 2 verse 9).
              </p>
              <p>
                We seriously urge people to believe the gospel because God&apos;s Word informs us that God has appointed a day in which He will judge this present world through Jesus Christ His Son. (Acts Chapter 17 verse 31).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}