"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Heart,
  ArrowRight,
  CheckCircle,
  Loader2,
  Users,
  Globe,
  BookOpen,
  Music,
  Share2,
} from "lucide-react"

import Header from "../../components/header"
import Footer from "../../components/footer"

const AREAS_OF_INTEREST = [
  { icon: BookOpen, label: "Teaching & Preaching" },
  { icon: Music, label: "Worship & Music" },
  { icon: Users, label: "Community Outreach" },
  { icon: Globe, label: "Media & Communications" },
  { icon: Heart, label: "Prayer Ministry" },
  { icon: Users, label: "Children & Youth" },
  { icon: Globe, label: "Administration" },
  { icon: BookOpen, label: "Counselling & Support" },
]

const AVAILABILITY_OPTIONS = [
  "Online / Remote",
  "Physical / In-person",
]

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  country: string
  availability: string[]
  message: string
}

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  country: "United States",
  availability: [],
  message: "",
}

export default function VolunteerPage() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (key: keyof FormState, value: string) =>
    setForm((p) => ({ ...p, [key]: value }))

  const toggleArray = (key: "availability", val: string) =>
    setForm((p) => ({
      ...p,
      [key]: p[key].includes(val)
        ? p[key].filter((v) => v !== val)
        : [...p[key], val],
    }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setLoading(false)
    setSubmitted(true)
  }

  // 📲 SHARE FUNCTION (WhatsApp + browser share)
  const handleShare = async () => {
    const url = window.location.href
    const message =
      "Join me in volunteering with Maranatha Moment Ministries 🇺🇸: " + url

    const whatsapp = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsapp, "_blank")

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Volunteer - Maranatha Moment Ministries",
          text: message,
          url,
        })
      } catch {}
    }
  }

  const inputCls =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 text-sm outline-none transition-all focus:border-[#800080]/50 focus:ring-2 focus:ring-purple-100"

  const labelCls =
    "block text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500 mb-2"

  return (
    <>
      <Header />

      <main className="relative min-h-screen bg-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-white" />

        <div className="relative z-10 max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-32">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#E99E2E]" />
              <span className="text-[#E99E2E] text-xs font-bold uppercase tracking-[0.3em]">
                Volunteer Opportunity (USA & Online)
              </span>
              <div className="h-px w-10 bg-[#E99E2E]" />
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Serve with{" "}
              <span className="text-[#800080] italic">Maranatha</span>
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us in advancing the Gospel.
            </p>

            {/* SHARE BUTTON */}
            <button
              onClick={handleShare}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-white hover:border-[#800080] text-sm font-semibold text-gray-700"
            >
              <Share2 className="w-4 h-4" />
              Share Volunteer Form
            </button>
          </motion.div>

          {/* FORM */}
          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="max-w-4xl mx-auto space-y-10"
            >

              {/* PERSONAL */}
              <section>
                <h2 className="text-lg font-bold mb-4">Personal Information</h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  <input className={inputCls} placeholder="First Name" />
                  <input className={inputCls} placeholder="Last Name" />
                  <input className={inputCls} placeholder="Email Address" />
                  <input className={inputCls} placeholder="+1  Phone Number" />
                </div>
              </section>

              {/* ADDRESS */}
              <section>
                <h2 className="text-lg font-bold mb-4">Location (United States)</h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  <input className={inputCls} placeholder="Street Address" />
                  <input className={inputCls} placeholder="City (e.g. Houston)" />
                  <input className={inputCls} placeholder="State (e.g. Texas)" />
                  <input className={inputCls} value="United States" readOnly />
                </div>
              </section>

              {/* AREA OF INTEREST */}
              <section>
                <h2 className="text-lg font-bold mb-4">Areas of Interest</h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {AREAS_OF_INTEREST.map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      type="button"
                      className="border rounded-xl p-3 flex flex-col items-center gap-2 hover:border-[#E99E2E]"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs text-center">{label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* AVAILABILITY */}
              <section>
                <h2 className="text-lg font-bold mb-4">Availability</h2>

                <div className="flex gap-3 flex-wrap">
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className="px-5 py-2 rounded-full border text-sm hover:border-[#800080]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </section>

              {/* MESSAGE */}
              <section>
                <h2 className="text-lg font-bold mb-4">Why do you want to serve?</h2>

                <textarea
                  className={inputCls}
                  rows={5}
                  placeholder="Share your heart..."
                />
              </section>

              {/* SUBMIT */}
              <button
                type="submit"
                className="px-8 py-4 rounded-2xl font-bold text-sm text-black"
                style={{
                  background: "linear-gradient(135deg, #E99E2E 0%, #F7D76A 100%)",
                }}
              >
                Submit Application
              </button>
            </motion.form>
          ) : (
            <div className="text-center">
              <CheckCircle className="mx-auto text-green-500 h-12 w-12" />
              <h2 className="text-2xl font-bold mt-4">Application Received</h2>
              <p className="text-gray-600">We will reach out soon.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}