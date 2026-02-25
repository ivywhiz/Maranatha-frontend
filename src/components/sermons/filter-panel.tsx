"use client"

import { useState } from "react"
import { Filter, X, ChevronDown } from "lucide-react"

const filterOptions = ["Topic", "Speaker", "Scripture", "Low"]

interface FilterPanelProps {
  open: boolean
  onClose: () => void
}

export default function FilterPanel({ open, onClose }: FilterPanelProps) {
  const [selected, setSelected] = useState<string[]>(["Topic"])
  const [contentOpen, setContentOpen] = useState(true)

  const toggle = (opt: string) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    )
  }

  const reset = () => setSelected([])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="absolute right-0 top-full mt-2 z-50 w-64 bg-white rounded-2xl shadow-2xl ring-1 ring-black/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-700" />
            <span className="font-semibold text-gray-900 text-base">Filter</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content section */}
        <div className="px-5 py-4">
          <button
            className="flex items-center justify-between w-full mb-3"
            onClick={() => setContentOpen((v) => !v)}
          >
            <span className="text-sm font-semibold text-gray-700">Content</span>
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform ${contentOpen ? "rotate-180" : ""}`}
            />
          </button>

          {contentOpen && (
            <div className="space-y-1">
              {filterOptions.map((opt) => {
                const checked = selected.includes(opt)
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                      checked ? "bg-violet-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded flex items-center justify-center border transition-colors ${
                        checked
                          ? "bg-[#800080] border-[#800080]"
                          : "border-gray-300 bg-white"
                      }`}
                      onClick={() => toggle(opt)}
                    >
                      {checked && (
                        <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${checked ? "text-[#800080] font-medium" : "text-gray-700"}`}>
                      {opt}
                    </span>
                  </label>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-100">
          <button
            onClick={reset}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#41076A" }}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  )
}