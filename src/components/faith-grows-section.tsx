"use client";

import Image from "next/image";

export default function FaithGrowsSection() {
  return (
    <section 
      className="py-20 relative"
      style={{
        background: "linear-gradient(to right, #f5f5f5 0%, #f5f5f5 50%, #e9d5ff 50%, #e9d5ff 100%)"
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ── IMAGE GRID ── */}
          <div className="grid grid-cols-2 gap-4">
            {/* 1. Top‑left – rectangle */}
            <div className="rounded-3xl overflow-hidden">
              <Image
                src="/images/share1.jpg"
                alt="Community praying together"
                width={400}
                height={300}
                className="w-full h-72 object-cover"
                priority
              />
            </div>

            {/* 2. Top‑right – circle */}
            <div className="rounded-full overflow-hidden">
              <Image
                src="/images/share2.jpg"
                alt="Worship department"
                width={300}
                height={300}
                className="w-full h-72 object-cover"
                priority
              />
            </div>

            {/* 3. Bottom‑left – circle */}
            <div className="rounded-full overflow-hidden">
              <Image
                src="/images/share3.jpg"
                alt="Kids praying together"
                width={300}
                height={300}
                className="w-full h-72 object-cover"
                priority
              />
            </div>

            {/* 4. Bottom‑right – rectangle */}
            <div className="rounded-3xl overflow-hidden">
              <Image
                src="/images/share4.jpg"
                alt="Person holding Bible"
                width={400}
                height={300}
                className="w-full h-72 object-cover"
                priority
              />
            </div>
          </div>

          {/* ── TEXT CONTENT ── */}
          <div className="space-y-6 flex flex-col justify-center">
            <div
              className="inline-block px-6 py-2 rounded-full text-sm font-semibold w-fit"
              style={{
                backgroundColor: "#e9d5ff",
                color: "#7c3aed",
              }}
            >
              Share & Connect
            </div>

            <h2
              className="text-5xl font-bold leading-tight"
              style={{ color: "#000000" }}
            >
              Faith Grows When It&apos;s Shared.
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed">
              Join believers across the world in sharing stories, testimonies,
              and prayers. Encourage one another and grow together through
              conversations rooted in grace.
            </p>

            <button
              className="px-8 py-4 rounded-full font-semibold text-white transition-all hover:shadow-lg w-fit"
              style={{ backgroundColor: "#f59e0b" }}
            >
              Join the Conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}