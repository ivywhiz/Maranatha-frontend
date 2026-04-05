"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

interface FormState {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const SUBJECTS = [
  "General Enquiry",
  "Prayer Request",
  "Volunteer / Ministry",
  "Donation",
  "Event Information",
  "Other",
]

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((res) => setTimeout(res, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
        <div
          className="h-16 w-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#F5F0FB" }}
        >
          <CheckCircle2 className="h-8 w-8" style={{ color: "#800080" }} />
        </div>
        <h3 
          className="text-xl font-bold text-gray-900"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Message Sent!
        </h3>
        <p 
          className="text-gray-500 text-sm max-w-xs leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setForm({ name: "", email: "", phone: "", subject: "", message: "" })
            setSubmitted(false)
          }}
          className="mt-2 text-sm font-semibold underline underline-offset-4 transition-colors hover:text-[#41076A]"
          style={{ color: "#800080", fontFamily: "'DM Sans', sans-serif" }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 
          className="text-2xl font-bold text-gray-900"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Send Us a Message
        </h2>
        <p 
          className="mt-1.5 text-sm text-gray-500"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Fill in the form below and we&apos;ll be in touch.
        </p>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label 
            htmlFor="name"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Smith"
            value={form.name}
            onChange={handleChange}
            required
            className="focus:ring-[#800080]/30 focus:border-[#800080]/30"
          />
        </div>

        <div className="space-y-2">
          <Label 
            htmlFor="email"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="focus:ring-[#800080]/30 focus:border-[#800080]/30"
          />
        </div>
      </div>

      {/* Phone + Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label 
            htmlFor="phone"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={handleChange}
            className="focus:ring-[#800080]/30 focus:border-[#800080]/30"
          />
        </div>

        <div className="space-y-2">
          <Label 
            htmlFor="subject"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Subject
          </Label>
          <Select
            value={form.subject}
            onValueChange={(v: string) =>
              setForm((prev) => ({ ...prev, subject: v }))
            }
            required
          >
            <SelectTrigger 
              id="subject"
              className="focus:ring-[#800080]/30 focus:border-[#800080]/30"
            >
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label 
          htmlFor="message"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Write your message here..."
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          className="resize-none focus:ring-[#800080]/30 focus:border-[#800080]/30"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="group w-full py-6 text-base font-semibold rounded-2xl gap-2.5 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
        style={{ 
          background: "linear-gradient(135deg, #800080 0%, #41076A 100%)",
          fontFamily: "'DM Sans', sans-serif"
        }}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}