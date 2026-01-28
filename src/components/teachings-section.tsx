"use client"

import Image from "next/image"
import { Play } from "lucide-react"

export default function TeachingsSection() {
  const teachings = [
    {
      title: "Determination",
      image: "/images/determination-focused-person.jpg",
    },
    {
      title: "Giving",
      image: "/images/giving-compassion-kindness.jpg",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Text Content */}
          <div className="max-w-xl">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-purple-200 text-purple-800 mb-4">
              Watch & Learn
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Teachings That Speak to the Heart
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Explore video sermons, live sessions, and devotionals from trusted voices in faith. 
              Stream directly through Vimeo or YouTube — wherever you are, whenever you need it.
            </p>

            <button className="px-6 py-3 rounded-full bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors shadow-md">
              Start Watching
            </button>
          </div>

          {/* RIGHT: Full #F7F7F7 Background Panel */}
          <div className="relative bg-[#F7F7F7] rounded-3xl overflow-hidden min-h-[500px] flex flex-col">
            {/* Navigation Arrows - Positioned at Top Left */}
            <div className="absolute top-6 left-6 z-20 flex gap-2 pointer-events-none">
              <button
                aria-label="Previous"
                className="pointer-events-auto w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-all shadow-sm"
              >
                <span className="text-gray-700 text-lg">←</span>
              </button>

              <button
                aria-label="Next"
                className="pointer-events-auto w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-all shadow-sm"
              >
                <span className="text-gray-700 text-lg">→</span>
              </button>
            </div>

            {/* Cards Container - Centered */}
            <div className="flex-1 flex items-center justify-center px-8 pb-8 pt-16">
              <div className="flex gap-8">
                {teachings.map((teaching, idx) => (
                  <div
                    key={idx}
                    className="group relative w-64 h-80 rounded-2xl overflow-hidden shadow-xl flex-shrink-0"
                  >
                    <Image
                      src={teaching.image}
                      alt={teaching.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 320px"
                      priority={idx === 0}
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Play size={28} className="fill-white text-white ml-1" />
                      </button>
                    </div>

                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <h3 className="text-xl font-bold text-white drop-shadow-md">
                        {teaching.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}