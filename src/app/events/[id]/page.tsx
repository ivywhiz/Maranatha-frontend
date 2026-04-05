// app/events/[id]/page.tsx
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, CalendarPlus, ArrowRight } from "lucide-react"
import Header from "../../../components/header"
import Footer from "../../../components/footer"
import EventOrganizerCard from "../../../components/events/event-organizer-card"
import EventDonateSidebar from "../../../components/events/event-donate-sidebar"
import { EVENTS } from "../../../components/events/event-data"

interface Props {
  params: { id: string }
}

export default function EventDetailPage({ params }: Props) {
  const event = EVENTS.find((e) => e.id === Number(params.id)) ?? EVENTS[0]

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ══ HERO */}
      <div className="relative w-full h-72 sm:h-96 lg:h-[420px]">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute top-6 left-6 sm:left-10 lg:left-16 z-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-white/85 backdrop-blur-sm text-gray-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-white transition-colors shadow-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Link>
        </div>
      </div>

      {/* ══ PURPLE CARD */}
      <div className="relative z-10 -mt-24 px-6 sm:px-10 lg:px-16 max-w-[96rem] mx-auto">
        <div
          className="rounded-2xl px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-xl"
          style={{ backgroundColor: "#800080" }}
        >
          <div className="flex-1 space-y-4">
            <h1 
              className="text-2xl sm:text-3xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {event.title.replace("Harvesters", "Harvester's")}
            </h1>
            <div className="flex flex-wrap items-start gap-8 text-sm">
              <div className="flex items-start gap-2 text-white/85">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white/60 text-xs uppercase tracking-wide mb-0.5">
                    Venue:
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif" }}>{event.venue}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-white/85">
                <Calendar className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white/60 text-xs uppercase tracking-wide mb-0.5">
                    Date and time:
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif" }}>{event.dateTime}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:block self-stretch w-px border-l-2 border-dashed border-white/30 mx-2" />

          <div className="flex flex-col items-center gap-3 shrink-0 sm:pl-4">
            <p className="text-white/75 text-sm italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>Click to set a reminder</p>
            <button className="group inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors border border-white/20">
              <CalendarPlus className="h-4 w-4" />
              Add to Calendar
            </button>
          </div>
        </div>
      </div>

      {/* ══ BODY CONTENT */}
      <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

          <div className="space-y-8">
            <div className="space-y-4">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", fontFamily: "'DM Sans', sans-serif" }}
              >
                {event.category}
              </span>
              <h2 
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Event Details
              </h2>
              <p 
                className="text-gray-600 text-base leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {event.description}
              </p>
            </div>

            <div className="space-y-4">
              <h2 
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Event Photos
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {event.photos.map((photo, i) => (
                  <div
                    key={i}
                    className="relative rounded-2xl overflow-hidden aspect-[4/3]"
                  >
                    <Image
                      src={photo}
                      alt={`Event photo ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:sticky lg:top-8">
            <EventOrganizerCard event={event} />
            <EventDonateSidebar />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}