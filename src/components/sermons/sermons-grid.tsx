"use client"

import { useState, useRef } from "react"
import { Search, Filter } from "lucide-react"
import SermonCard from "./sermon-card"
import SermonModal, { Sermon } from "./sermon-modal"
import FilterPanel from "./filter-panel"

const SERMONS: Sermon[] = [
  {
    id: 1,
    title: "Daily Dose of God's Word",
    description:
      "Mercy and grace of the LORD Jesus to humanity, regardless of individual situation or station in life. Our initiatives not only provide spiritual nourishment but also address the practical needs of the community. The unique blend of spiritual guidance and community outreach program.",
    thumbnail: "/images/sermon-thumbnail.jpg",
    duration: "12:38",
    tags: ["spiritual", "upliftment", "religious", "blessing"],
    timeAgo: "9 hours ago",
    prayerPoints: [
      "Release new doors of favor, increase, and restoration.",
      "Let Your power overturn every limitation spoken over my destiny.",
      "Position me in the place where Your purpose for my life can flourish.",
      "Stir up spiritual boldness to share the gospel without fear.",
    ],
    comments: [
      { text: "Thank you Lord!", timeAgo: "4 hours ago" },
      { text: "I've been going through a tough week—this brought me peace." },
      { text: "This message helped me make a decision I've been struggling with." },
    ],
  },
  {
    id: 2,
    title: "Daily Dose of God's Word",
    description:
      "Mercy and grace of the LORD Jesus to humanity, regardless of individual situation or station in life. Our initiatives not only provide spiritual nourishment but also address the practical needs of the community.",
    thumbnail: "/images/sermon-thumbnail.jpg",
    duration: "12:38",
    tags: ["spiritual", "upliftment", "religious", "blessing"],
    timeAgo: "",
    prayerPoints: [
      "Release new doors of favor, increase, and restoration.",
      "Let Your power overturn every limitation spoken over my destiny.",
      "Position me in the place where Your purpose for my life can flourish.",
      "Stir up spiritual boldness to share the gospel without fear.",
    ],
    comments: [
      { text: "Thank you Lord!", timeAgo: "4 hours ago" },
      { text: "I've been going through a tough week—this brought me peace." },
    ],
  },
  {
    id: 3,
    title: "Daily Dose of God's Word",
    description:
      "Mercy and grace of the LORD Jesus to humanity, regardless of individual situation or station in life. Our initiatives not only provide spiritual nourishment but also address the practical needs of the community.",
    thumbnail: "/images/sermon-thumbnail.jpg",
    duration: "12:38",
    tags: ["spiritual", "upliftment", "religious", "blessing"],
    timeAgo: "",
    prayerPoints: [
      "Release new doors of favor, increase, and restoration.",
      "Let Your power overturn every limitation spoken over my destiny.",
    ],
    comments: [
      { text: "This message helped me make a decision I've been struggling with." },
    ],
  },
  {
    id: 4,
    title: "Daily Dose of God's Word",
    description:
      "Mercy and grace of the LORD Jesus to humanity, regardless of individual situation or station in life. Our initiatives not only provide spiritual nourishment but also address the practical needs of the community.",
    thumbnail: "/images/sermon-thumbnail.jpg",
    duration: "12:38",
    tags: ["spiritual", "upliftment", "religious", "blessing"],
    timeAgo: "",
    prayerPoints: [
      "Release new doors of favor, increase, and restoration.",
      "Let Your power overturn every limitation spoken over my destiny.",
    ],
    comments: [],
  },
  {
    id: 5,
    title: "Daily Dose of God's Word",
    description:
      "Mercy and grace of the LORD Jesus to humanity, regardless of individual situation or station in life. Our initiatives not only provide spiritual nourishment but also address the practical needs of the community.",
    thumbnail: "/images/sermon-thumbnail.jpg",
    duration: "12:38",
    tags: ["spiritual", "upliftment", "religious", "blessing"],
    timeAgo: "",
    prayerPoints: [
      "Position me in the place where Your purpose for my life can flourish.",
      "Stir up spiritual boldness to share the gospel without fear.",
    ],
    comments: [],
  },
  {
    id: 6,
    title: "Daily Dose of God's Word",
    description:
      "Mercy and grace of the LORD Jesus to humanity, regardless of individual situation or station in life. Our initiatives not only provide spiritual nourishment but also address the practical needs of the community.",
    thumbnail: "/images/sermon-thumbnail.jpg",
    duration: "12:38",
    tags: ["spiritual", "upliftment", "religious", "blessing"],
    timeAgo: "",
    prayerPoints: [
      "Release new doors of favor, increase, and restoration.",
      "Stir up spiritual boldness to share the gospel without fear.",
    ],
    comments: [],
  },
]

export default function SermonsGrid() {
  const [search, setSearch] = useState("")
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  const filtered = SERMONS.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      {/* Section header + search + filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-base font-bold text-gray-900 whitespace-nowrap">
          Daily Dose of God&apos;s Word
        </h2>

        <div className="flex items-center gap-3 flex-1 sm:max-w-md">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-2.5 border border-gray-200 shadow-sm">
            <Search className="h-4 w-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
            />
          </div>

          {/* Filter button */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className={`h-10 w-10 rounded-full flex items-center justify-center border transition-colors ${
                filterOpen
                  ? "border-violet-500 bg-violet-50 text-violet-600"
                  : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Filter className="h-4 w-4" />
            </button>
            <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((sermon) => (
          <SermonCard
            key={sermon.id}
            sermon={sermon}
            onClick={() => setActiveSermon(sermon)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 py-16 text-center text-gray-400 text-sm">
            No sermons match your search.
          </div>
        )}
      </div>

      {/* Modal */}
      <SermonModal sermon={activeSermon} onClose={() => setActiveSermon(null)} />
    </div>
  )
}