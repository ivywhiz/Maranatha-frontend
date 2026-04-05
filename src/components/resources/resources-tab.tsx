"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { RESOURCES } from "./resource-data"

const SORT_OPTIONS = ["Most Recent", "Most Popular"]

export default function ResourcesTab() {
  const [sort, setSort] = useState("Most Popular")

  return (
    <div>
      {/* Sort toggle — right aligned */}
      <div className="flex items-center justify-end gap-1 border-b border-gray-200 pb-1 mb-8">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => setSort(opt)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              sort === opt
                ? "text-gray-900 font-semibold after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-0.5 after:bg-[#800080]"
                : "text-gray-400 hover:text-gray-600"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {RESOURCES.map((r) => (
          <div
            key={r.id}
            className="relative rounded-2xl overflow-hidden h-64 flex flex-col justify-end p-5 group cursor-pointer"
          >
            {/* Background image */}
            <Image
              src={r.thumbnail}
              alt={r.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

            {/* Content */}
            <div className="relative z-10 space-y-4">
              <h3 
                className="text-white text-lg font-bold leading-snug"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {r.title}
              </h3>
              <Link
                href={`/resources/${r.id}`}
                className="group/link inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ backgroundColor: "#E99E2E", fontFamily: "'DM Sans', sans-serif" }}
              >
                Read now
                <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}