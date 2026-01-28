"use client"

import { Calendar } from "lucide-react"
import Image from "next/image"

export default function EventsSection() {
  return (
    <section 
      className="py-20"
      style={{
        background: "linear-gradient(135deg, #e9d5ff 0%, #f5f5f5 50%, #e9d5ff 100%)"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Info */}
          <div className="space-y-6">
            <div 
              className="inline-block px-6 py-2 rounded-full w-fit"
              style={{
                backgroundColor: "#e9d5ff"
              }}
            >
              <span style={{ color: "#7c3aed" }} className="font-semibold text-sm">
                Live Streams
              </span>
            </div>

            <h2 className="text-5xl font-bold text-black leading-tight">
              Worship In Real Time
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              Experience live teachings and worship sessions right where you are. Be part of a living, breathing
              fellowship – together, in faith.
            </p>

            <button
              style={{ backgroundColor: "#f59e0b" }}
              className="text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all w-fit"
            >
              View Live Schedule
            </button>
          </div>

          {/* Right Side: Event Cards */}
          <div className="space-y-6">
            {/* Event Card 1 */}
            <div 
              className="rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm"
              style={{
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
              }}
            >
              <div className="p-8 flex items-center gap-6">
                <div className="flex-1 space-y-4">
                  <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                    style={{ 
                      backgroundColor: "#fff7ed",
                      color: "#f59e0b"
                    }}
                  >
                    <Calendar size={16} />
                    <span>24 November, 2025</span>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900">
                    Power of Quiet Faith
                  </h3>

                  <button
                    style={{ backgroundColor: "#7c3aed" }}
                    className="text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity w-fit"
                  >
                    Watch Live
                  </button>
                </div>

                <div className="rounded-2xl overflow-hidden w-60 h-60 flex-shrink-0">
                  <Image
                    src="/images/event1.jpg"
                    alt="Power of Quiet Faith"
                    width={240}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Event Card 2 */}
            <div 
              className="rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm"
              style={{
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
              }}
            >
              <div className="p-8 flex items-center gap-6">
                <div className="flex-1 space-y-4">
                  <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                    style={{ 
                      backgroundColor: "#fff7ed",
                      color: "#f59e0b"
                    }}
                  >
                    <Calendar size={16} />
                    <span>24 November, 2025</span>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900">
                    Power of Quiet Faith
                  </h3>
                </div>

                <div className="rounded-2xl overflow-hidden w-60 h-60 flex-shrink-0">
                  <Image
                    src="/images/event2.jpg"
                    alt="Power of Quiet Faith"
                    width={240}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}