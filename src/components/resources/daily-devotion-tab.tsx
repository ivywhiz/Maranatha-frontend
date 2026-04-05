"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { DEVOTIONS } from "./resource-data"

export default function DailyDevotionTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
      {DEVOTIONS.map((d) => (
        <div
          key={d.id}
          className="relative rounded-2xl overflow-hidden h-64 flex flex-col justify-between p-5 group cursor-pointer"
        >
          {/* Background image */}
          <Image
            src={d.thumbnail}
            alt={d.reference}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Content */}
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-3">
              <span 
                className="text-white text-sm font-semibold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {d.reference}
              </span>
              <span 
                className="text-white/70 text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {d.version}
              </span>
            </div>
            <p 
              className="text-white text-base font-semibold leading-snug line-clamp-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {d.preview}
            </p>
          </div>

          {/* Read button */}
          <div className="relative z-10">
            <Link
              href={`/resources/devotion/${d.id}`}
              className="group/link inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: "#E99E2E", fontFamily: "'DM Sans', sans-serif" }}
            >
              Read
              <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}