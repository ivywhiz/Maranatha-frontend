/* eslint-disable react/no-unescaped-entities */
"use client"

import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react"

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "+234 800 000 0000",
    href: "tel:+2348000000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@maranathamm.org",
    href: "mailto:info@maranathamm.org",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Grace Avenue, Lagos, Nigeria",
    href: "https://maps.google.com",
  },
]

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#", color: "#1877F2" },
  { icon: Instagram, label: "Instagram", href: "#", color: "#E1306C" },
  { icon: Youtube, label: "YouTube", href: "#", color: "#FF0000" },
  { icon: Twitter, label: "Twitter / X", href: "#", color: "#1DA1F2" },
]

export default function ContactInfo() {
  return (
    <div className="space-y-6">

      {/* Heading */}
      <div>
        <h2 
          className="text-2xl font-bold text-gray-900"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Reach Us Directly
        </h2>
        <p 
          className="mt-2 text-gray-500 text-sm leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Our team is available to assist you. We typically respond within 24 hours.
        </p>
      </div>

      {/* Contact items */}
      <div className="space-y-4">
        {contactItems.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="flex items-start gap-4 group"
          >
            <div
              className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0 transition-colors"
              style={{ backgroundColor: "#F5F0FB" }}
            >
              <Icon className="h-5 w-5" style={{ color: "#800080" }} />
            </div>
            <div>
              <p 
                className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {label}
              </p>
              <p 
                className="text-sm font-medium text-gray-700 group-hover:text-[#800080] transition-colors mt-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {value}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Social links */}
      <div>
        <p 
          className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Follow Us
        </p>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ icon: Icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="h-10 w-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:scale-110 hover:shadow-md transition-all duration-200"
            >
              <Icon className="h-4 w-4" style={{ color }} />
            </a>
          ))}
        </div>
      </div>

      {/* Note */}
      <p 
        className="text-xs text-gray-400 text-center pt-2"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        We'd love to hear from you. Reach out anytime.
      </p>
    </div>
  )
}