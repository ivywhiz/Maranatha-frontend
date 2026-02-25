"use client"

import Image from "next/image"

export default function EventsHero() {
  return (
    <div className="relative w-full h-64 sm:h-80 lg:h-[360px] overflow-hidden">
      <Image
        src="/images/events-hero.jpg"
        alt="What's Happening"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          What&apos;s Happening
        </h1>
        <p className="mt-3 text-white/85 text-sm sm:text-base max-w-2xl leading-relaxed">
          Gather with our community for moments of worship, learning, and connection.
          Explore upcoming gatherings designed to inspire, strengthen faith, and bring people together.
        </p>
      </div>
    </div>
  )
}