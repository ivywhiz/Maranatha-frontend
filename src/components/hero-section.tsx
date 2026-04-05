"use client"

import { Play, ArrowRight, Sparkles, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { useEffect, useMemo, useState } from "react"

type VerseOfDay = {
  id?: string
  content?: string
  reference?: string
}

export default function HeroSection() {
  const [verseOfDay, setVerseOfDay] = useState<VerseOfDay | null>(null)
  const [verseLoading, setVerseLoading] = useState(true)
  const [verseError, setVerseError] = useState<string | null>(null)

  const dayOfYear = useMemo(() => {
    const now = new Date()
    return Math.ceil(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
    )
  }, [])

  useEffect(() => {
    let mounted = true

    async function loadVerseOfDay() {
      try {
        setVerseLoading(true)
        setVerseError(null)

        const res = await fetch(
          `/api/bible/verse-of-day/${dayOfYear}?bible_id=111&format=text`,
          { cache: "no-store" }
        )

        if (!res.ok) {
          throw new Error("Failed to fetch verse of the day")
        }

        const data = await res.json()
        if (!mounted) return

        const verse = data?.data ?? data
        setVerseOfDay({
          id: verse?.id,
          content: verse?.content,
          reference: verse?.reference,
        })
      } catch (error) {
        if (!mounted) return
        setVerseError(error instanceof Error ? error.message : "Unable to load verse")
      } finally {
        if (mounted) setVerseLoading(false)
      }
    }

    loadVerseOfDay()

    return () => {
      mounted = false
    }
  }, [dayOfYear])

  return (
    <section className="relative min-h-[85vh] md:min-h-screen overflow-hidden flex items-center">
      {/* Background: Using your specified video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-fallback-glow.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105 transition-all duration-1000"
        >
          <source src="/videos/67748-523386840_medium.mp4" type="video/mp4" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-fallback-glow.jpg')" }}
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-10">
        <motion.div
          className="absolute -top-32 -left-32 md:-top-52 md:-left-52 w-[600px] md:w-[900px] h-[600px] md:h-[900px] rounded-full bg-purple-500/15 blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 md:bottom-0 md:right-0 w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full bg-pink-500/15 blur-3xl"
          animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        />
      </div>

      <div className="relative z-20 max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Headline + CTAs */}
          <div className="lg:col-span-8 space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-12 bg-[#E99E2E]" />
              <span
                className="text-[#E99E2E] text-xs font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Maranatha Moments Ministries
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Welcome to{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg, #E99E2E 0%, #F7D76A 45%, #E99E2E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Maranatha
              </span>
              <br />
              <span className="text-white/85">Moment Ministries</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-2xl text-white/60 text-xl leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Spreading the compassion and love of Jesus Christ to a global audience —
              one digital moment at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-6"
            >
              <Button
                size="lg"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-white font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#800080]/40"
                style={{
                  background: "linear-gradient(135deg, #800080 0%, #41076A 100%)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onClick={() => document.getElementById("sermons")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play className="w-4 h-4 fill-white text-white" />
                Watch Featured Sermon
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Right: Verse of the day card */}
          <div className="hidden lg:block lg:col-span-4 self-end lg:self-auto lg:mt-32">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.5 }}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.08] p-6 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.28)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E99E2E]/20 via-transparent to-[#800080]/20" />
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-[#E99E2E]/20 blur-2xl" />
              <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-[#800080]/20 blur-2xl" />

              <div className="relative space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E99E2E] to-[#F7D76A] text-[#2b0b35] shadow-lg">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className="text-[10px] uppercase tracking-[0.32em] text-white/45 font-bold"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Verse of the Day
                      </span>
                      <span
                        className="text-white/85 text-sm font-semibold"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Daily Scripture Inspiration
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F7D76A]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Live
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {verseLoading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-4 w-28 rounded bg-white/10" />
                    <div className="h-4 w-full rounded bg-white/10" />
                    <div className="h-4 w-[92%] rounded bg-white/10" />
                    <div className="h-4 w-[80%] rounded bg-white/10" />
                    <div className="h-10 w-40 rounded-2xl bg-white/10 mt-4" />
                  </div>
                ) : verseError ? (
                  <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
                    <p
                      className="text-sm text-white/80 leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Unable to load the verse of the day right now.
                    </p>
                  </div>
                ) : (
                  <>
                    <blockquote
                      className="text-white text-lg leading-relaxed font-medium"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      “{verseOfDay?.content}”
                    </blockquote>

                    <div className="flex items-center gap-2 pt-1">
                      <div className="h-px w-8 bg-[#E99E2E]" />
                      <p
                        className="text-[#F7D76A] text-sm font-bold uppercase tracking-[0.18em]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {verseOfDay?.reference}
                      </p>
                    </div>

                    <div className="pt-2">
                      <div className="inline-flex items-center rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                        <p
                          className="text-white/70 text-xs uppercase tracking-[0.22em] font-semibold"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          God&apos;s Word for Today
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating sermon preview card - updated styling */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-12 md:mt-20 mx-auto max-w-md sm:max-w-lg lg:max-w-xl bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-7 sm:p-9"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#E99E2E]" />
              <span
                className="text-[#E99E2E] text-xs font-bold uppercase tracking-[0.2em]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                NOV 23, 2025
              </span>
            </div>
            <span
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#800080]/40 rounded-full text-white/80 border border-white/10"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              LIVE TEACHING
            </span>
          </div>

          <h3
            className="text-white text-2xl sm:text-3xl font-bold mb-3 tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Where Art Thou?
          </h3>
          <p
            className="text-white/70 text-base sm:text-lg mb-7 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            A powerful encounter with the presence of God
          </p>

          <Button
            className="group w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-white font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #800080 0%, #41076A 100%)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onClick={() => document.getElementById("sermons")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Play className="w-4 h-4 fill-white text-white" />
            Watch Full Sermon
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator - kept as is */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-white/70"
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-white/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}