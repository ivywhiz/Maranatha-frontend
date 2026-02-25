"use client"

import { useState } from "react"
import { User, MessageSquare, Plus, Minus } from "lucide-react"

export default function EventDonateSidebar() {
  const [amount, setAmount] = useState(3)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
      <h3 className="text-base font-bold text-gray-900">Donate</h3>

      {/* Amount row */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-3 bg-[#F5F5F5] rounded-xl px-4 py-2.5 border border-gray-200">
          <svg className="h-4 w-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span className="text-gray-900 font-semibold text-sm">{amount}</span>
        </div>
        <button
          onClick={() => setAmount((a) => a + 1)}
          className="h-9 w-9 rounded-xl border border-gray-200 bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <Plus className="h-3.5 w-3.5 text-gray-600" />
        </button>
        <button
          onClick={() => setAmount((a) => Math.max(1, a - 1))}
          className="h-9 w-9 rounded-xl border border-gray-200 bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <Minus className="h-3.5 w-3.5 text-gray-600" />
        </button>
      </div>

      {/* Name */}
      <div className="flex items-center gap-3 bg-[#F5F5F5] rounded-xl px-4 py-2.5 border border-gray-200">
        <User className="h-4 w-4 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
        />
      </div>

      {/* Message */}
      <div className="flex items-start gap-3 bg-[#F5F5F5] rounded-xl px-4 py-2.5 border border-gray-200">
        <MessageSquare className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none resize-none"
        />
      </div>

      {/* Button */}
      <button
        className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#41076A" }}
      >
        Donate
      </button>
    </div>
  )
}