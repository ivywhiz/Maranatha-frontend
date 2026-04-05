"use client"

import { useEffect, useRef, useState } from "react"
import {
  HandHeart, RefreshCw, Users, ShieldAlert,
  Music4, GraduationCap, DoorOpen, HeartPulse,
  Flame, Globe, BookOpen, Heart,
} from "lucide-react"

// ─── Ministry data ────────────────────────────────────────────────────────────
const MINISTRIES = [
  {
    label: "Prayer Ministries",
    icon: HandHeart,
    desc: "Interceding for the nations and lifting every burden before the throne of grace.",
    bg: "bg-[#EDE8FB]",
    iconBg: "bg-[#800080]/15",
    iconColor: "#800080",
    textColor: "text-[#2D1B6B]",
    descColor: "text-[#4A3490]/70",
    accent: "#800080",
    tall: false,
  },
  {
    label: "New Converts Program",
    icon: RefreshCw,
    desc: "Nurturing every new believer into a fully-rooted, fruit-bearing disciple of Christ.",
    bg: "bg-[#0D0617]",
    iconBg: "bg-[#800080]/20",
    iconColor: "#E99E2E",
    textColor: "text-white",
    descColor: "text-white/55",
    accent: "#E99E2E",
    tall: true,
  },
  {
    label: "New Believers Ministries",
    icon: Users,
    desc: "Building a safe, Spirit-filled space for those just beginning their faith journey.",
    bg: "bg-[#800080]",
    iconBg: "bg-white/10",
    iconColor: "rgba(255,255,255,0.9)",
    textColor: "text-white",
    descColor: "text-white/60",
    accent: "#E99E2E",
    tall: false,
  },
  {
    label: "Campus & School Ministries",
    icon: GraduationCap,
    desc: "Raising a generation of young people anchored in the Word of God.",
    bg: "bg-[#F0EBF8]",
    iconBg: "bg-[#800080]/10",
    iconColor: "#800080",
    textColor: "text-[#2D1B6B]",
    descColor: "text-[#4A3490]/65",
    accent: "#800080",
    tall: true,
  },
  {
    label: "Persecuted Believers Ministries",
    icon: ShieldAlert,
    desc: "Standing with our brothers and sisters suffering for the name of Christ worldwide.",
    bg: "bg-[#41076A]",
    iconBg: "bg-white/10",
    iconColor: "rgba(255,255,255,0.85)",
    textColor: "text-white",
    descColor: "text-white/55",
    accent: "#E99E2E",
    tall: false,
  },
  {
    label: "Prison Ministries",
    icon: DoorOpen,
    desc: "Bringing freedom, hope and redemption behind bars through the power of the Gospel.",
    bg: "bg-[#E99E2E]",
    iconBg: "bg-black/10",
    iconColor: "rgba(0,0,0,0.7)",
    textColor: "text-[#1A0A00]",
    descColor: "text-[#3D1A00]/65",
    accent: "#41076A",
    tall: true,
  },
  {
    label: "Prayer Band Ministries",
    icon: Music4,
    desc: "Uniting hearts in worship-driven intercession that moves mountains.",
    bg: "bg-[#1A0A2E]",
    iconBg: "bg-[#E99E2E]/15",
    iconColor: "#E99E2E",
    textColor: "text-white",
    descColor: "text-white/50",
    accent: "#E99E2E",
    tall: false,
  },
  {
    label: "Hospital & Health Ministries",
    icon: HeartPulse,
    desc: "Ministering divine healing and comfort to the sick and suffering.",
    bg: "bg-[#F4F0FB]",
    iconBg: "bg-[#800080]/12",
    iconColor: "#800080",
    textColor: "text-[#2D1B6B]",
    descColor: "text-[#4A3490]/65",
    accent: "#800080",
    tall: true,
  },
]

const STATS = [
  { icon: Globe,    value: 20,   suffix: "+",  label: "Nations Reached" },
  { icon: Heart,    value: 50,   suffix: "K+", label: "Lives Transformed" },
  { icon: BookOpen, value: 500,  suffix: "+",  label: "Teachings Delivered" },
  { icon: Flame,    value: 100,  suffix: "%",  label: "Gospel-Centred" },
]

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const step = 16
          const increment = target / (duration / step)
          let current = 0
          const timer = setInterval(() => {
            current = Math.min(current + increment, target)
            setCount(Math.floor(current))
            if (current >= target) clearInterval(timer)
          }, step)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

// ─── Ministry Card with entrance animation ────────────────────────────────────
function MinistryCard({ item, index }: { item: typeof MINISTRIES[0]; index: number }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const Icon = item.icon

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={`${item.bg} rounded-3xl p-6 flex flex-col gap-4 cursor-pointer relative overflow-hidden ${
        item.tall ? "min-h-[260px]" : "min-h-[200px]"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated accent blob on hover */}
      <div
        className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full transition-all duration-500 pointer-events-none"
        style={{
          backgroundColor: item.accent,
          opacity: hovered ? 0.18 : 0,
          transform: hovered ? "scale(1.4)" : "scale(0.8)",
        }}
      />

      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.iconBg} transition-transform duration-300`}
        style={{ transform: hovered ? "scale(1.1) rotate(-4deg)" : "scale(1) rotate(0deg)" }}
      >
        <Icon
          size={22}
          color={item.iconColor}
          strokeWidth={1.7}
          style={{ transition: "color 0.3s" }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1 justify-end relative z-10">
        <p
          className={`text-[15px] font-bold leading-snug ${item.textColor}`}
          style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}
        >
          {item.label}
        </p>
        <p
          className={`text-xs leading-relaxed ${item.descColor}`}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            maxHeight: hovered ? "80px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.4s ease, opacity 0.4s ease",
            opacity: hovered ? 1 : 0,
          }}
        >
          {item.desc}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[3px] rounded-full transition-all duration-500"
        style={{
          backgroundColor: item.accent,
          width: hovered ? "100%" : "30%",
          opacity: hovered ? 1 : 0.5,
        }}
      />
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function OutreachMinistriesSection() {
  const [headingVisible, setHeadingVisible] = useState(false)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Split ministries into 4 columns, varying heights
  const col1 = [MINISTRIES[0], MINISTRIES[1]]
  const col2 = [MINISTRIES[2], MINISTRIES[3]]
  const col3 = [MINISTRIES[4], MINISTRIES[5]]
  const col4 = [MINISTRIES[6], MINISTRIES[7]]

  return (
    <section className="bg-[#F4F0FB] py-20 lg:py-32 relative overflow-hidden">

      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#800080]/6 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#41076A]/8 blur-[100px]" />
      </div>

      {/* Decorative numeral */}
      <div
        aria-hidden
        className="absolute left-0 bottom-0 select-none pointer-events-none leading-none"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(180px, 26vw, 340px)",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1px rgba(128,0,128,0.07)",
          bottom: "-1.5rem",
          left: "-1rem",
        }}
      >
        04
      </div>

      <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* ── Heading block ── */}
        <div
          ref={headingRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#E99E2E]" />
              <span
                className="text-xs font-bold tracking-[0.22em] uppercase text-[#E99E2E]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Outreach
              </span>
            </div>

            <h2
              className="text-[clamp(2.8rem,5.5vw,4.5rem)] font-bold text-gray-950 leading-[1.0] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our Outreach
              <br />
              <span style={{ WebkitTextStroke: "2px #800080", color: "transparent" }}>
                Ministries
              </span>
            </h2>
          </div>

          <div className="max-w-sm">
            <p
              className="text-gray-500 text-base leading-relaxed font-light mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Reaching the lost, the hurting, and the seeking — across every corner of society, in the name of Jesus.
            </p>
            <div className="h-px bg-gradient-to-r from-[#800080]/40 via-[#E99E2E]/40 to-transparent" />
          </div>
        </div>

        {/* ── Stats row ── */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          {STATS.map(({ icon: Icon, value, suffix, label }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-5 border border-[#800080]/10 hover:border-[#800080]/30 hover:shadow-lg hover:shadow-[#800080]/5 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#800080]/8 flex items-center justify-center group-hover:bg-[#800080]/15 transition-colors">
                  <Icon className="w-4 h-4 text-[#800080]" />
                </div>
              </div>
              <div
                className="text-3xl font-bold text-gray-900 mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                <Counter target={value} suffix={suffix} />
              </div>
              <div
                className="text-xs text-gray-500 font-medium uppercase tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Masonry card grid — 4 columns ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-start">
          <div className="flex flex-col gap-4">
            {col1.map((item, i) => (
              <MinistryCard key={item.label} item={item} index={i} />
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:mt-8">
            {col2.map((item, i) => (
              <MinistryCard key={item.label} item={item} index={i + 2} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {col3.map((item, i) => (
              <MinistryCard key={item.label} item={item} index={i + 4} />
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:mt-8">
            {col4.map((item, i) => (
              <MinistryCard key={item.label} item={item} index={i + 6} />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="mt-16 text-center"
          style={{
            opacity: headingVisible ? 1 : 0,
            transition: "opacity 1s ease 0.6s",
          }}
        >
          <p
            className="text-gray-500 text-sm mb-5 italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            &ldquo;Go into all the world and preach the gospel to every creature.&rdquo; — Mark 16:15
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#800080]/30"
            style={{
              background: "linear-gradient(135deg, #800080 0%, #41076A 100%)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Join a Ministry
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
