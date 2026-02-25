"use client"

import {Play, ExternalLink, User } from "lucide-react"
import Image from "next/image"

export interface Sermon {
  id: number
  title: string
  description: string
  thumbnail: string
  duration: string
  tags: string[]
  timeAgo: string
  prayerPoints: string[]
  comments: { text: string; timeAgo?: string }[]
}

interface SermonModalProps {
  sermon: Sermon | null
  onClose: () => void
}

export default function SermonModal({ sermon, onClose }: SermonModalProps) {
  if (!sermon) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-lg bg-[#F5F5F5] rounded-3xl overflow-hidden shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Video thumbnail */}
          <div className="relative w-full aspect-video bg-black">
            <Image
              src={sermon.thumbnail}
              alt={sermon.title}
              fill
              className="object-cover"
            />
            {/* External link icon top-right */}
            <button className="absolute top-3 right-3 h-9 w-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
              <ExternalLink className="h-4 w-4 text-white" />
            </button>
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="h-16 w-16 rounded-full flex items-center justify-center shadow-xl"
                style={{ backgroundColor: "#800080" }}>
                <Play className="h-7 w-7 text-white fill-white ml-1" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Title & description */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{sermon.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{sermon.description}</p>
            </div>

            {/* Prayer points */}
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <span className="text-sm text-gray-500">Prayerpoint</span>
              </div>
              <ul className="px-5 py-3 space-y-1.5">
                {sermon.prayerPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-500 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Comments */}
            <div className="rounded-xl overflow-hidden">
              <div
                className="px-4 py-3"
                style={{ backgroundColor: "#800080" }}
              >
                <span className="text-white font-semibold text-sm">Comments</span>
              </div>
              <div className="bg-white divide-y divide-gray-50">
                {sermon.comments.map((comment, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-700 flex items-center justify-between gap-4">
                      <span>{comment.text}</span>
                      {comment.timeAgo && (
                        <span className="text-violet-500 text-xs font-medium whitespace-nowrap shrink-0">
                          {comment.timeAgo}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}