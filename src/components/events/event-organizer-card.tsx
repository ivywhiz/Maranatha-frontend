"use client"

import Image from "next/image"
import { MapPin, Calendar } from "lucide-react"
import { EventItem } from "./event-data"

interface EventOrganizerCardProps {
  event: EventItem
}

export default function EventOrganizerCard({ event }: EventOrganizerCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100">
        <span 
          className="text-sm text-gray-500"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Event Organizer
        </span>
      </div>
      <div className="p-5 space-y-4">
        {/* Organizer info */}
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 ring-2 ring-[#800080]/20">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maranatha%20logo-BBUxZMkkSIomnFx78tkAQmGRCpREmR.png"
              alt="Maranatha Moments Ministries"
              fill
              className="object-cover"
            />
          </div>
          <p 
            className="text-sm font-bold text-gray-900 leading-snug"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Maranatha Moments Ministries
          </p>
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-2.5 text-sm">
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-1.5 text-gray-500 min-w-0">
              <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <div>
                <p className="font-semibold text-gray-700 text-xs uppercase tracking-wide">Venue:</p>
                <p className="text-gray-600">{event.venue}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 min-w-0">
              <Calendar className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <div>
                <p className="font-semibold text-gray-700 text-xs uppercase tracking-wide">Date and time:</p>
                <p className="text-gray-600">{event.dateTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}