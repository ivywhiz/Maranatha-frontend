"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Search, SlidersHorizontal, X, LayoutGrid, List } from "lucide-react"
import SermonCard from "./sermon-card"
import SermonModal, { Sermon } from "./sermon-modal"
import FilterPanel from "./filter-panel"

export const SERMONS: Sermon[] = [
  {
    id: 1,
    title: "Daily Dose of God's Word — Walking in Favour",
    description:
      "Mercy and grace of the LORD Jesus to humanity, regardless of individual situation or station in life. Our initiatives not only provide spiritual nourishment but also address the practical needs of the community. The unique blend of spiritual guidance and community outreach program.",
    thumbnail: "/images/sermon-thumbnail.jpg",
    videoUrl: "",
    duration: "12:38",
    tags: ["spiritual", "favour", "blessing"],
    timeAgo: "9 hours ago",
    prayerPoints: [
      "Release new doors of favour, increase, and restoration into my life.",
      "Let Your power overturn every limitation spoken over my destiny.",
      "Position me in the place where Your purpose for my life can flourish.",
      "Stir up spiritual boldness to share the gospel without fear or reservation.",
    ],
    comments: [
      { name: "Grace O.", text: "Thank you Lord! This word is exactly what I needed today.", timeAgo: "4 hours ago" },
      { name: "Emmanuel B.", text: "I've been going through a tough week — this brought me peace.", timeAgo: "2 hours ago" },
      { name: "Sister Joy", text: "This message helped me make a decision I've been struggling with." },
    ],
  },
  {
    id: 2,
    title: "The Power of Intercessory Prayer",
    description:
      "Discover how intercession moves the hand of God and changes situations. This powerful teaching will transform how you approach prayer and standing in the gap for others.",
    thumbnail: "/images/sermon-thumbnail.jpg",
    videoUrl: "",
    duration: "28:14",
    tags: ["prayer", "intercession", "faith"],
    timeAgo: "",
    prayerPoints: [
      "Father, make me an instrument of intercession for my generation.",
      "Let Your Spirit teach me how to pray according to Your will.",
      "Remove every hindrance to effective prayer in my life.",
    ],
    comments: [
      { name: "Pastor Daniel", text: "This teaching changed my prayer life completely.", timeAgo: "1 day ago" },
    ],
  },
  {
    id: 3,
    title: "Healing in His Wings — Divine Health",
    description:
      "Explore the covenant of divine health established through the redemption of Jesus Christ. Learn how to appropriate healing promises in your daily walk with God.",
    thumbnail: "/images/sermon-thumbnail.jpg",
    videoUrl: "",
    duration: "35:52",
    tags: ["healing", "faith", "covenant"],
    timeAgo: "",
    prayerPoints: [
      "By His stripes I am healed — I receive my healing now.",
      "Let the resurrection life of Christ flow through every cell of my body.",
      "I stand on the covenant of divine health established by the blood of Jesus.",
    ],
    comments: [],
  },
  {
    id: 4,
    title: "Purpose & Calling — Discovering God's Plan",
    description:
      "You were created for a specific assignment. This teaching helps you uncover, embrace, and walk boldly in your God-given purpose and calling.",
    thumbnail: "/images/sermon-thumbnail.jpg",
    videoUrl: "",
    duration: "22:47",
    tags: ["purpose", "calling", "destiny"],
    timeAgo: "",
    prayerPoints: [
      "Lord, reveal the full dimensions of the calling You have placed on my life.",
      "Position me in the place where Your purpose for my life can flourish.",
    ],
    comments: [],
  },
  {
    id: 5,
    title: "Overcoming Fear with Faith",
    description:
      "Fear is a spirit — and perfect love casts it out. Learn biblical strategies to displace fear with unwavering, Holy-Spirit-empowered faith.",
    thumbnail: "/images/sermon-thumbnail.jpg",
    videoUrl: "",
    duration: "18:05",
    tags: ["faith", "fear", "victory"],
    timeAgo: "",
    prayerPoints: [
      "I receive the spirit of power, love and a sound mind — not fear.",
      "Stir up spiritual boldness to share the gospel without fear.",
    ],
    comments: [],
  },
  {
    id: 6,
    title: "Building on the Rock — Unshakeable Faith",
    description:
      "When storms come — and they will — only those built on the Word will stand. This teaching equips you to build a foundation that no circumstance can shake.",
    thumbnail: "/images/sermon-thumbnail.jpg",
    videoUrl: "",
    duration: "41:20",
    tags: ["foundation", "faith", "word"],
    timeAgo: "",
    prayerPoints: [
      "Root and ground me in Your Word, Father, so I cannot be moved.",
      "Every storm that comes against me becomes a testimony of Your faithfulness.",
    ],
    comments: [],
  },
]

const CATEGORIES = ["All", "Faith", "Prayer", "Healing", "Purpose", "Worship", "Prophecy"]

export default function SermonsGrid() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const filterRef = useRef<HTMLDivElement>(null)

  const filtered = SERMONS.filter((s) => {
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    const matchCat =
      activeCategory === "All" ||
      s.tags.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()))
    return matchSearch && matchCat
  })

  const [featured, ...rest] = filtered

  return (
    <div className="space-y-6">

      {/* Section heading - updated typography */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {/* Eyebrow label */}
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-[#E99E2E]" />
            <span
              className="text-[#E99E2E] text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Video Library
            </span>
          </div>
          <h2
            className="text-xl font-bold text-gray-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Daily Dose of God&apos;s Word
          </h2>
        </div>

        {/* Search + controls - updated styling */}
        <div className="flex items-center gap-2 flex-1 sm:max-w-sm">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-gray-200 shadow-sm focus-within:border-[#E99E2E]/50 focus-within:ring-2 focus-within:ring-[#E99E2E]/10 transition-all">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search sermons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none min-w-0"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter - updated colors */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-all ${
                filterOpen
                  ? "border-[#E99E2E] bg-[#E99E2E]/8 text-[#E99E2E]"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} />
          </div>

          {/* View toggle - updated active color */}
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setViewMode("grid")}
              className={`h-10 w-10 flex items-center justify-center transition-colors ${
                viewMode === "grid" ? "bg-[#800080] text-white" : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`h-10 w-10 flex items-center justify-center transition-colors ${
                viewMode === "list" ? "bg-[#800080] text-white" : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category pills - updated active color */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeCategory === cat
                ? "bg-[#800080] text-white shadow-md shadow-[#800080]/20"
                : "bg-white border border-gray-200 text-gray-600 hover:border-[#E99E2E]/30 hover:text-[#E99E2E]"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-2xl mb-2">🔍</p>
          <p className="text-gray-500 text-sm">No sermons match your search.</p>
          <button
            onClick={() => { setSearch(""); setActiveCategory("All") }}
            className="mt-3 text-[#800080] text-sm font-semibold hover:underline"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Clear filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="space-y-6">
          {/* Featured card (first result) */}
          {featured && (
            <SermonCard
              sermon={featured}
              onClick={() => setActiveSermon(featured)}
              featured
            />
          )}

          {/* Rest as grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((sermon) => (
                <SermonCard
                  key={sermon.id}
                  sermon={sermon}
                  onClick={() => setActiveSermon(sermon)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        // List view - updated styling with Next.js Image
        <div className="space-y-3">
          {filtered.map((sermon) => (
            <button
              key={sermon.id}
              onClick={() => setActiveSermon(sermon)}
              className="group w-full flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#E99E2E]/30 hover:shadow-md transition-all text-left"
            >
              <div className="relative w-36 sm:w-48 aspect-video rounded-xl overflow-hidden bg-gray-900 flex-shrink-0">
                <Image
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1.5 right-1.5 bg-black/75 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                  {sermon.duration}
                </div>
              </div>
              <div className="flex-1 min-w-0 py-1">
                <h3
                  className="font-bold text-gray-900 text-sm line-clamp-2 group-hover:text-[#800080] transition-colors mb-1.5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {sermon.title}
                </h3>
                <p
                  className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {sermon.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {sermon.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium text-[#800080] bg-[#800080]/8 border border-[#800080]/15"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {sermon.timeAgo && (
                  <p className="text-[10px] text-[#E99E2E] font-semibold mt-2">{sermon.timeAgo}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      <SermonModal sermon={activeSermon} onClose={() => setActiveSermon(null)} />
    </div>
  )
}