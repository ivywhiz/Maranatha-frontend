/* eslint-disable react/no-unescaped-entities */
"use client"

import { Play } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-purple-100 via-pink-100 to-white" />
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "#800080", opacity: 0.15 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        {/* Split Text: Title Left, Paragraph Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12">
          {/* Left: Welcome Title */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Welcome to Maranatha Moment Ministries
            </h1>
          </div>

          {/* Right: Paragraph */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Maranatha is dedicated to spreading the compassion and love of Jesus Christ as we share the gospel of
              Jesus Christ to a global audience while building a supportive community. By leveraging digital platforms,
              our organization ensures that its message of God's Love, Mercy, Grace and His Gift of Salvation through
              the death and resurrection of our LORD and Savior Jesus Christ is accessible to individuals and groups
              around the world.
            </p>
          </div>
        </div>

        {/* Hero Image with Sermon Card - UNTOUCHED */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl h-96 sm:h-[500px] lg:h-[600px] relative">
            <Image
              src="/images/hero.jpg"
              alt="Person praying in church"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />

            <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent" />

            <div className="absolute bottom-8 right-8 bg-black/70 backdrop-blur-md rounded-2xl p-6 w-80 shadow-lg border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-white/80">23 Nov, 25</span>
                <div className="w-2 h-2 rounded-full bg-red-500" />
              </div>

              <h3 style={{ color: "#800080" }} className="text-2xl font-bold mb-4">
                Where at Thou
              </h3>

              <button className="flex items-center gap-3 text-white hover:opacity-80 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                  <Play size={16} className="fill-white" />
                </div>
                <span className="font-medium">Watch Full Sermon</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}