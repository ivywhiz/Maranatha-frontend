// app/sermons/page.tsx
import { Metadata } from "next"
import Image from "next/image"
import Header from "../../components/header"
import Footer from "../../components/footer"
import DonateSidebar from "../../components/sermons/donate-sidebar"
import SermonsGrid from "../../components/sermons/sermons-grid"

export const metadata: Metadata = {
  title: "Sermons | Maranatha Moment Ministries",
  description:
    "Watch and listen to spirit-filled sermons, teachings, and daily doses of God's Word from Maranatha Moment Ministries.",
}

export default function SermonsPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <Header />

        {/* ── Main 2-column layout ── */}
        <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">

            {/* LEFT — Hero + Grid */}
            <div className="space-y-8">

              {/* Hero banner image */}
              <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/sermons-hero.png"
                  alt="Spirit filled Missions"
                  fill
                  className="object-cover object-center"
                  priority
                />
                {/* Overlay + title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <h1 className="text-white text-2xl sm:text-3xl font-bold leading-tight">
                    Spirit filled Missions
                  </h1>
                </div>
              </div>

              {/* Sermons search + grid */}
              <SermonsGrid />
            </div>

            {/* RIGHT — Sticky donate sidebar */}
            <div className="lg:sticky lg:top-8">
              <DonateSidebar />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}