"use client"

import Image from "next/image"
import { Play, Clock, MessageCircle } from "lucide-react"
import { Sermon } from "./sermon-modal"

interface SermonCardProps {
  sermon: Sermon
  onClick: () => void
  featured?: boolean
}

export default function SermonCard({ sermon, onClick, featured = false }: SermonCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group w-full text-left bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800080] ${
        featured ? "shadow-lg" : "shadow-sm border border-gray-100"
      }`}
    >
      {/* Thumbnail */}
      <div className={`relative w-full bg-gray-900 overflow-hidden ${featured ? "aspect-[16/8]" : "aspect-video"}`}>
        <Image
          src={sermon.thumbnail}
          alt={sermon.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Play button — appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-[#800080]/90 backdrop-blur-sm flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {sermon.timeAgo && (
            <span className="bg-[#800080] text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase">
              New
            </span>
          )}
          {featured && (
            <span className="bg-[#E99E2E] text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase">
              Featured
            </span>
          )}
        </div>

        {/* Duration */}
        <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {sermon.duration}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className={`font-bold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#800080] transition-colors ${
          featured ? "text-base" : "text-sm"
        }`}>
          {sermon.title}
        </h3>

        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {sermon.description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {sermon.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium text-[#800080] bg-[#800080]/8 border border-[#800080]/15"
              >
                {tag}
              </span>
            ))}
          </div>

          {sermon.comments.length > 0 && (
            <div className="flex items-center gap-1 text-gray-400">
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="text-[10px]">{sermon.comments.length}</span>
            </div>
          )}
        </div>

        {sermon.timeAgo && (
          <p className="text-[10px] text-[#E99E2E] font-semibold mt-2">{sermon.timeAgo}</p>
        )}
      </div>
    </button>
  )
}
