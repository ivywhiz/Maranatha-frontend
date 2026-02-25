"use client"

import Image from "next/image"
import { Leaf } from "lucide-react"

export default function OurTeachingSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-12">

          {/* Left — body text */}
          <div className="space-y-5 text-gray-600 text-base leading-relaxed">
            <p>
              Maranatha provides sound unfermented bible teachings, spiritual support, Christian
              education, discipleship and guidance to millions of true seekers of God around the
              globe. We are committed to teaching bible-based guidelines for meaningful fellowship
              with the LORD Jesus Christ.
            </p>
            <p>
              MMM&apos;s bible teachings inspire hope anchored in the love of Christ, through the message
              of salvation because of the death and resurrection of Jesus Christ, the cross and His resurrection. Our
              teachings ground the globe, strengthen believers and builds faith, trust and reliance on
              God and the LORD Jesus Christ.
            </p>
            <p>
              Maranatha&apos;s bible teachings help prepare and fortify participants and believers for a
              Christ centered living that depends on the Word of God. Our teaching emphasises
              biblical principles of Living Faith. Our goal is to be like the Christ, and ultimately spend
              eternity with the Christ when He comes back again to rapture His people.
            </p>
          </div>

          {/* Right — badge + quote */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 text-violet-600 text-sm font-semibold ring-1 ring-violet-100">
              <Leaf className="h-4 w-4" />
              God&apos;s work
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Our Teaching
              </h2>
              <blockquote className="mt-4 text-gray-600 text-base leading-relaxed italic border-l-4 border-violet-300 pl-4">
                John 8:12 &ldquo;I am the Light of the World. He who follows Me shall not walk in darkness, but
                have the light of Life.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>

        {/* Full-width image */}
        <div className="relative w-full h-72 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/images/about-teaching.png"
            alt="Bible teaching and worship"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  )
}