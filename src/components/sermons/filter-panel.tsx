"use client"

import { useState } from "react"
import { SlidersHorizontal, X, ChevronDown, Check } from "lucide-react"

const FILTER_GROUPS = [
  {
    label: "Topic",
    options: ["Faith & Healing", "Prayer", "Evangelism", "Prophecy", "Worship", "Marriage & Family"],
  },
  {
    label: "Duration",
    options: ["Under 15 min", "15–30 min", "30–60 min", "Over 1 hour"],
  },
  {
    label: "Scripture",
    options: ["Old Testament", "New Testament", "Psalms", "Proverbs", "Gospels", "Epistles"],
  },
]

interface FilterPanelProps {
  open: boolean
  onClose: () => void
  onApply?: (filters: Record<string, string[]>) => void
}

export default function FilterPanel({ open, onClose, onApply }: FilterPanelProps) {
  const [selected, setSelected] = useState<Record<string, string[]>>({})
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ Topic: true })

  const toggle = (group: string, opt: string) => {
    setSelected((prev) => {
      const current = prev[group] ?? []
      return {
        ...prev,
        [group]: current.includes(opt)
          ? current.filter((o) => o !== opt)
          : [...current, opt],
      }
    })
  }

  const toggleGroup = (group: string) =>
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }))

  const reset = () => setSelected({})

  const totalSelected = Object.values(selected).flat().length

  const apply = () => {
    onApply?.(selected)
    onClose()
  }

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden />

      <div className="absolute right-0 top-full mt-3 z-50 w-72 bg-white rounded-2xl shadow-2xl ring-1 ring-black/8 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#800080]" />
            <span className="font-bold text-gray-900">Filters</span>
            {totalSelected > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-[#800080] text-white text-[10px] font-bold flex items-center justify-center">
                {totalSelected}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter groups */}
        <div className="max-h-80 overflow-y-auto">
          {FILTER_GROUPS.map((group) => {
            const groupSelected = selected[group.label] ?? []
            const isOpen = openGroups[group.label] ?? false

            return (
              <div key={group.label} className="border-b border-gray-50 last:border-0">
                <button
                  className="flex items-center justify-between w-full px-5 py-3.5 hover:bg-gray-50 transition-colors"
                  onClick={() => toggleGroup(group.label)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-800">{group.label}</span>
                    {groupSelected.length > 0 && (
                      <span className="text-[10px] font-bold text-[#800080] bg-[#800080]/10 px-1.5 py-0.5 rounded-full">
                        {groupSelected.length}
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-3 space-y-1">
                    {group.options.map((opt) => {
                      const checked = groupSelected.includes(opt)
                      return (
                        <label
                          key={opt}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors select-none ${
                            checked ? "bg-[#800080]/6" : "hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all flex-shrink-0 ${
                              checked
                                ? "bg-[#800080] border-[#800080]"
                                : "border-gray-300"
                            }`}
                            onClick={() => toggle(group.label, opt)}
                          >
                            {checked && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
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
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={reset}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Reset all
          </button>
          <button
            onClick={apply}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #800080, #41076A)" }}
          >
            Apply {totalSelected > 0 ? `(${totalSelected})` : ""}
          </button>
        </div>
      </div>
    </>
  )
}
