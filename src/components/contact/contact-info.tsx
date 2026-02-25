"use client"

import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react"

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 000-0000",
    href: "tel:+15550000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@maranathamoment.org",
    href: "mailto:info@maranathamoment.org",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Faith Avenue, New York, NY 10001",
    href: "https://maps.google.com",
  },
]

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/maranathamoment", color: "#1877F2" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/maranathamoment", color: "#E1306C" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@maranathamoment", color: "#FF0000" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/maranathamoment", color: "#1DA1F2" },
]

export default function ContactInfo() {
  return (
    <div className="space-y-8">

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reach Us Directly</h2>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">
          Our team is available Monday – Friday, 9am to 5pm. We typically respond within 24 hours.
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
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
              <p className="text-sm font-medium text-gray-700 group-hover:text-violet-700 transition-colors mt-0.5">
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
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
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
              className="h-10 w-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:scale-110 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
            >
              <Icon className="h-4 w-4" style={{ color }} />
            </a>
          ))}
        </div>
      </div>

      {/* Hours card */}
      <div
        className="rounded-2xl p-5 space-y-3"
        style={{ backgroundColor: "#41076A" }}
      >
        <p className="text-white font-semibold text-sm">Ministry Hours</p>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-white/80">
            <span>Monday – Friday</span>
            <span>9:00 AM – 5:00 PM</span>
          </div>
          <div className="flex justify-between text-white/80">
            <span>Saturday</span>
            <span>10:00 AM – 2:00 PM</span>
          </div>
          <div className="flex justify-between text-white/50">
            <span>Sunday</span>
            <span>Worship Service</span>
          </div>
        </div>
      </div>
    </div>
  )
}