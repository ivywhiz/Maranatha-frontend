"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
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
                ? "text-gray-900 font-semibold after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-0.5 after:bg-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
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
            className="relative rounded-2xl overflow-hidden h-64 flex flex-col justify-end p-5"
          >
            {/* Background image */}
            <Image
              src={r.thumbnail}
              alt={r.title}
              fill
              className="object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

            {/* Content */}
            <div className="relative z-10 space-y-4">
              <h3 className="text-white text-lg font-bold leading-snug">
                {r.title}
              </h3>
              <Link
                href={`/resources/${r.id}`}
                className="inline-block px-5 py-2 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#E99E2E" }}
              >
                Read now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}