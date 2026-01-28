"use client"

import { Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#41076A" }} className="text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-8">
          {/* Brand and Logo */}
          <div className="flex items-center gap-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maranatha%20logo-BBUxZMkkSIomnFx78tkAQmGRCpREmR.png"
              alt="Maranatha Logo"
              className="w-16 h-16"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">Maranatha Moment Ministries</h2>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-6 text-white/80">
            <a href="#" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-white transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sermons
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Events
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Prayer Wall
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Resources
            </a>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <label htmlFor="newsletter" className="text-white font-semibold">
            Newsletter
          </label>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              id="newsletter"
              type="email"
              placeholder="Email"
              className="flex-1 sm:flex-none px-6 py-3 rounded-full text-gray-900 bg-white/90 placeholder-gray-500 border-none focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              style={{ backgroundColor: "#800080" }}
              className="px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-white font-semibold"
            >
              <Mail size={20} />
            </button>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mb-12">
          <a href="#" className="text-white/70 hover:text-white transition-colors">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors">
            <Youtube size={24} />
          </a>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>&copy; 2025. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
