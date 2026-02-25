"use client"

import { useState } from "react"
import { User, MessageSquare, Plus, Minus } from "lucide-react"

export default function DonateSidebar() {
  const [amount, setAmount] = useState(3)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  return (
    <aside className="bg-[#F5F5F5] rounded-2xl p-6 space-y-5">
      <h3 className="text-xl font-bold text-gray-900">Donate</h3>

      {/* Amount row */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200">
          <span className="text-gray-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </span>
          <span className="text-gray-900 font-semibold text-base">{amount}</span>
        </div>
        <button
          onClick={() => setAmount((a) => a + 1)}
          className="h-11 w-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Plus className="h-4 w-4 text-gray-600" />
        </button>
        <button
          onClick={() => setAmount((a) => Math.max(1, a - 1))}
          className="h-11 w-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Minus className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Name input */}
      <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200">
        <User className="h-4 w-4 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
        />
      </div>

      {/* Message textarea */}
      <div className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200">
        <MessageSquare className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none resize-none"
        />
      </div>

      {/* Donate button */}
      <button
        className="w-full py-3.5 rounded-xl text-white font-semibold text-base transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#41076A" }}
      >
        Donate
      </button>
    </aside>
  )
}