"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar } from "lucide-react"
import { EventItem } from "./event-data"

interface EventListCardProps {
  event: EventItem
}

export default function EventListCard({ event }: EventListCardProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-0 bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">

      {/* Thumbnail */}
      <div className="relative w-full sm:w-52 lg:w-60 shrink-0 h-48 sm:h-auto">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-4">
        <div className="space-y-2.5">
          {/* Category pill */}
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: "#EDE9FE", color: "#7C3AED" }}
          >
            {event.category}
          </span>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
            {event.description}
          </p>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-5 text-sm">
          <div className="flex items-center gap-1.5 text-gray-500">
            <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span className="font-semibold text-gray-700">Venue:</span>
            <Link href="#" className="text-violet-600 hover:underline">
              {event.venue}
            </Link>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Calendar className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span className="font-semibold text-gray-700">Date and time:</span>
            <span>{event.dateTime}</span>
          </div>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 px-5 py-4 sm:px-6 sm:py-6 sm:border-l border-t sm:border-t-0 border-gray-100 shrink-0">
        <Link
          href={`/events/${event.id}`}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#800080" }}
        >
          Schedule
        </Link>
        <Link
          href={`/events/${event.id}`}
          className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
        >
          See details
        </Link>
      </div>
    </div>
  )
}