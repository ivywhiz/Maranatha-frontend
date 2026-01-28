/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from "next/image"
import { Heart, Wheat, Gift } from "lucide-react"

export default function ServicesSection() {
  return (
    <section
      style={{ backgroundColor: "#800080" }}
      className="py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Decorative Top Border with Geometric Pattern */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        {/* Dotted Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute -top-12 left-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
        <div className="absolute -top-8 right-20 w-24 h-24 rounded-full bg-purple-300 opacity-20"></div>
        <div className="absolute top-8 left-1/3 w-16 h-16 rounded-full bg-pink-400 opacity-15"></div>
        <div className="absolute -top-4 right-1/3 w-20 h-20 rounded-full bg-yellow-300 opacity-10"></div>
        
        {/* Gradient Overlay Line */}
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.3) 80%, transparent 100%)"
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* About Us Pill */}
        <div className="mb-8">
          <span className="inline-block bg-white/20 text-white px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            About Us
          </span>
        </div>

        {/* Title + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <div className="space-y-6 text-white">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              A Home for Every Believer
            </h2>
            <p className="text-lg text-white/90 leading-relaxed max-w-xl">
              Maranatha is more than an app — it's a community centered on the Word. We bring together teachings,
              sermons, and real-life testimonies that inspire hope and nurture spiritual growth.
            </p>
          </div>

          <div className="flex justify-start lg:justify-end items-center">
            <button
              style={{ backgroundColor: "#E99E2E" }}
              className="text-white px-8 py-3 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Join the Community
            </button>
          </div>
        </div>

        {/* Overlapping Cards - All with Icons & ±25° Rotation */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 items-start justify-center">
            {/* Card 1: Giving */}
            <div className="group z-10">
              <div
                className="w-72 mx-auto bg-white rounded-3xl shadow-2xl p-6 transform transition-all duration-500 ease-out
                rotate-[-3deg] hover:rotate-[-25deg] hover:-translate-y-3 hover:shadow-3xl"
              >
                <div className="h-96 relative rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="/images/hands-giving-helping.jpg"
                    alt="Giving"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Heart size={28} className="text-red-500 fill-red-500" />
                  <p className="text-xl font-bold text-gray-800">Giving</p>
                </div>
              </div>
            </div>

            {/* Card 2: Sharing the Word (OVERLAPS BOTH) */}
            <div className="group z-20 -mt-16 md:-mt-20">
              <div
                className="w-72 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-6 transform transition-all duration-500 ease-out
                rotate-[3deg] hover:rotate-[25deg] hover:-translate-y-4 hover:shadow-3xl scale-105"
              >
                <div className="h-96 relative rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="/images/community-sharing-together.jpg"
                    alt="Sharing the word"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Wheat size={28} className="text-yellow-300" />
                  <p className="text-xl font-bold text-white">Sharing the word</p>
                </div>
              </div>
            </div>

            {/* Card 3: Donation */}
            <div className="group z-10">
              <div
                className="w-72 mx-auto bg-white rounded-3xl shadow-2xl p-6 transform transition-all duration-500 ease-out
                rotate-[-2deg] hover:rotate-[25deg] hover:-translate-y-3 hover:shadow-3xl"
              >
                <div className="h-96 relative rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="/images/hands-giving-donation.jpg"
                    alt="Donation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Gift size={28} className="text-green-600 fill-green-600" />
                  <p className="text-xl font-bold text-gray-800">Donation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}