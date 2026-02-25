"use client"

import Image from "next/image"
import { Sermon } from "./sermon-modal"

interface SermonCardProps {
  sermon: Sermon
  onClick: () => void
}

export default function SermonCard({ sermon, onClick }: SermonCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full bg-gray-900">
        <Image
          src={sermon.thumbnail}
          alt={sermon.title}
          fill
          className="object-cover"
        />
        {/* NEW badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-white text-xs font-bold tracking-wide"
          style={{ backgroundColor: "#800080" }}
        >
          NEW
        </div>
        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-0.5 rounded">
          {sermon.duration}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 space-y-2.5">
        <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-1">
          {sermon.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          {sermon.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {sermon.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs text-gray-600 bg-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Time */}
        {sermon.timeAgo && (
          <p className="text-xs text-violet-600 font-medium">{sermon.timeAgo}</p>
        )}
      </div>
    </button>
  )
}