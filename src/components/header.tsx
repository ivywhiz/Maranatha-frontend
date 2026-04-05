"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Heart, ArrowRight } from "lucide-react"

type NavItem = {
  label: string
  href: string
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Sermons", href: "/sermons" },
      { label: "Events", href: "/events" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
    []
  )

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0D0617]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-[96rem] px-6 sm:px-10 lg:px-16">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90"
          >
            <Image
              src="/images/maranatha logo.svg"
              alt="Maranatha Moments Ministries Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
            <div className="hidden sm:block">
              <span 
                className="text-white text-lg font-bold leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Maranatha Moment
              </span>
              <span 
                className="block text-[10px] text-white/40 tracking-widest uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Ministries
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Updated styling */}
          <nav className="hidden md:flex">
            <div className="flex items-center gap-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 p-1.5">
              {navItems.map((item) => {
                const active = isActive(item.href)

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={[
                      "relative rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
                      active
                        ? "bg-gradient-to-r from-[#E99E2E] to-[#F7D76A] text-[#0D0617] shadow-sm"
                        : "text-white/70 hover:text-white hover:bg-white/10",
                    ].join(" ")}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Desktop CTA - Updated styling */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/donate"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Heart className="h-3.5 w-3.5" />
              Donate
            </Link>
            <Link
              href="/join"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md"
              style={{
                background: "linear-gradient(135deg, #E99E2E 0%, #F7D76A 100%)",
                fontFamily: "'DM Sans', sans-serif",
                color: "#0D0617",
              }}
            >
              Join Us
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Toggle - Updated styling */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-white/15 p-2.5 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation - Updated styling */}
        {isOpen && (
          <div className="md:hidden pb-5">
            <nav className="mt-2 rounded-2xl border border-white/10 bg-[#0D0617]/95 backdrop-blur-xl p-3 shadow-xl">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const active = isActive(item.href)

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={[
                        "rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300",
                        active
                          ? "bg-gradient-to-r from-[#E99E2E] to-[#F7D76A] text-[#0D0617]"
                          : "text-white/70 hover:text-white hover:bg-white/10",
                      ].join(" ")}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href="/donate"
                  onClick={() => setIsOpen(false)}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Heart className="h-3.5 w-3.5" />
                  Donate
                </Link>
                <Link
                  href="/join"
                  onClick={() => setIsOpen(false)}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg, #E99E2E 0%, #F7D76A 100%)",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#0D0617",
                  }}
                >
                  Join Us
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}