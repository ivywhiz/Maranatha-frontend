"use client"

import { useState } from "react"
import EventListCard from "./event-list-card"
import { EVENTS } from "./event-data"

const TABS = ["All Events", "Nearest Events", "Latest Events"]

export default function EventsList() {
  const [activeTab, setActiveTab] = useState("All Events")

  // For now all tabs show same data — swap in real filtering when API is ready
  const events = EVENTS

  return (
    <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 py-10">
      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
              activeTab === tab
                ? "text-white border-transparent"
                : "text-gray-600 border-gray-200 bg-white hover:border-gray-300"
            }`}
            style={activeTab === tab ? { backgroundColor: "#41076A" } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Event cards */}
      <div className="space-y-5">
        {events.map((event) => (
          <EventListCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}