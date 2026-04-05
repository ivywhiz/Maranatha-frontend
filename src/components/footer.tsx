"use client"

import Image from "next/image"
import { Mail, Facebook, Twitter, Instagram, Youtube, MapPin, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Prayer Wall", href: "/prayer-wall" },
  { label: "Resources", href: "/resources" },
]

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: "#41076A" }}
    >
      {/* ── Decorative radial glows ── */}
      <div
        className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none opacity-25"
        style={{
          background: "radial-gradient(circle, #800080 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #c026d3 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* ── Top accent line ── */}
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(to right, transparent, #E99E2E, #800080, #E99E2E, transparent)",
        }}
      />

      <div className="relative max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-10">

        {/* ══ MAIN GRID ══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maranatha%20logo-BBUxZMkkSIomnFx78tkAQmGRCpREmR.png"
                alt="Maranatha Logo"
                width={56}
                height={56}
                className="object-contain drop-shadow-lg"
              />
              <div>
                <h2 
                  className="text-lg font-bold leading-tight text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Maranatha Moment
                </h2>
                <p 
                  className="text-xs text-white/50 tracking-widest uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Ministries
                </p>
              </div>
            </div>
            <p 
              className="text-sm text-white/60 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Bringing the hope of Christ to every heart — through worship, community, and the living Word.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="space-y-5">
            <h3 
              className="text-sm font-semibold uppercase tracking-widest text-white/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact (Address and Phone hidden) */}
          <div className="space-y-5">
            <h3 
              className="text-sm font-semibold uppercase tracking-widest text-white/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              {/* Address - hidden for now */}
              {/* <li className="flex items-start gap-3 text-sm text-white/65">
                <MapPin className="h-4 w-4 mt-0.5 text-[#E99E2E] shrink-0" />
                <span>123 Grace Avenue, Lagos, Nigeria</span>
              </li> */}
              {/* Phone - hidden for now */}
              {/* <li className="flex items-center gap-3 text-sm text-white/65">
                <Phone className="h-4 w-4 text-[#E99E2E] shrink-0" />
                <span>+234 800 000 0000</span>
              </li> */}
              <li className="flex items-center gap-3 text-sm text-white/65">
                <Mail className="h-4 w-4 text-[#E99E2E] shrink-0" />
                <span 
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  info@maranathamm.org
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div className="space-y-5">
            <h3 
              className="text-sm font-semibold uppercase tracking-widest text-white/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Newsletter
            </h3>
            <p 
              className="text-sm text-white/60 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Get weekly devotionals, event updates, and encouragement delivered to your inbox.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-5 py-3 rounded-full text-sm text-gray-900 bg-white/90 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E99E2E]/60"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              <button
                className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #E99E2E 0%, #F7D76A 100%)",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#0D0617",
                }}
              >
                <Mail className="h-4 w-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/10" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-white/40">
          <p style={{ fontFamily: "'DM Sans', sans-serif" }}>
            &copy; {new Date().getFullYear()} Maranatha Moment Ministries. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms of Use</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}