"use client"

import Image from "next/image"

export default function ScriptureQuoteSection() {
  return (
    <section
      style={{ backgroundColor: "#800080" }}
      className="py-20 relative overflow-hidden"
    >
      {/* ---- OPENING QUOTE (more visible) ---- */}
      <div className="absolute top-6 left-6 w-36 h-36 sm:w-44 sm:h-44 opacity-30">
        <Image
          src="/images/quote-open.png"
          alt="Opening quotation mark"
          width={176}
          height={176}
          className="w-full h-full object-contain drop-shadow-xl"
          priority
        />
      </div>

      {/* ---- CLOSING QUOTE (more visible) ---- */}
      <div className="absolute bottom-6 right-6 w-36 h-36 sm:w-44 sm:h-44 opacity-30">
        <Image
          src="/images/quote-close.png"
          alt="Closing quotation mark"
          width={176}
          height={176}
          className="w-full h-full object-contain drop-shadow-xl"
          priority
        />
      </div>

      {/* ---- MAIN CONTENT ---- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        {/* Dove */}
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <Image
              src="/images/dove.png"
              alt="Dove"
              width={80}
              height={80}
              className="w-full h-full object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>

        <blockquote className="space-y-6">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-relaxed">
            That the Christ would suffer, that He would be the first to rise from the dead, and would proclaim light to
            the Jewish people and to the Gentiles.
          </p>
          <footer className="text-white/90 text-lg">- Acts 26:23</footer>
        </blockquote>
      </div>
    </section>
  )
}