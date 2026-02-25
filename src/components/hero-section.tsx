"use client"

import { Play } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"

export default function HeroSection() {
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

      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Headline + CTAs (only one button now) */}
          <div className="lg:col-span-8 space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-pink-400 animate-pulse" />
              <span className="text-sm font-semibold tracking-widest text-white uppercase drop-shadow-lg">
                Maranatha Moment
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.05] tracking-[-1px] md:tracking-[-3px] text-white drop-shadow-2xl"
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
                Maranatha
              </span>
              <br />
              Moment Ministries
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-2xl text-lg sm:text-xl md:text-2xl text-white/95 leading-relaxed drop-shadow-md"
            >
              Spreading the compassion and love of Jesus Christ to a global audience — 
              one digital moment at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 pt-6"
            >
              <Button
                size="lg"
                className="group h-14 sm:h-16 px-8 sm:px-12 text-base sm:text-lg rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-600/40 hover:shadow-purple-700/50 transition-all duration-500"
                onClick={() => document.getElementById("sermons")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" fill="white" />
                Watch Featured Sermon
              </Button>
              {/* "Join the Family" button has been removed */}
            </motion.div>
          </div>

          {/* Right: Optional ministry description */}
          <div className="hidden lg:block lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.5 }}
              className="space-y-6 text-lg text-white/85 leading-relaxed backdrop-blur-lg bg-black/40 p-8 rounded-3xl border border-white/15 shadow-xl"
            >
              <p>
                Dedicated to sharing the gospel while building a vibrant global community rooted in God&apos;s Love, Mercy, Grace, and Salvation.
              </p>
              <p className="text-sm uppercase tracking-widest text-purple-300/90 font-medium">
                Live Streams • Digital Fellowship • Life-Changing Teaching
              </p>
            </motion.div>
          </div>
        </div>

        {/* Floating sermon preview card */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-12 md:mt-20 mx-auto max-w-md sm:max-w-lg lg:max-w-xl bg-black/65 backdrop-blur-2xl border border-white/20 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-purple-900/40"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3 text-white/85 text-sm font-medium">
              <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
              NOV 23, 2025
            </div>
            <span className="px-4 py-1.5 text-xs font-mono tracking-widest uppercase bg-purple-600/30 rounded-full text-purple-200">
              LIVE TEACHING
            </span>
          </div>

          <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
            Where Art Thou?
          </h3>
          <p className="text-white/85 text-base sm:text-lg mb-7 leading-relaxed">
            A powerful encounter with the presence of God
          </p>

          <Button
            className="w-full h-12 sm:h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-base shadow-inner transition-all duration-400"
            onClick={() => document.getElementById("sermons")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Play className="mr-3 h-5 w-5" fill="white" />
            Watch Full Sermon
          </Button>
        </motion.div>
      </div>

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