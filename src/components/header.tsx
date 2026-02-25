"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Sermons", href: "sermons" },
    { label: "Events", href: "events" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/maranatha logo.svg"
              alt="Maranatha Moments Ministries Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation - Centered with border */}
          <nav className="hidden md:flex items-center gap-1 px-2 py-2 rounded-full border-2 border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  item.label === "Home"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex gap-3">
            <button className="px-6 py-2 rounded-full bg-secondary text-secondary-foreground font-medium hover:opacity-90 transition-opacity">
              Donate
            </button>
            <button className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
              Join Us
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-4 py-2 rounded text-sm font-medium ${
                  item.label === "Home"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-2">
              <button className="flex-1 px-4 py-2 rounded bg-secondary text-secondary-foreground font-medium text-sm">
                Donate
              </button>
              <button className="flex-1 px-4 py-2 rounded bg-primary text-primary-foreground font-medium text-sm">
                Join Us
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}