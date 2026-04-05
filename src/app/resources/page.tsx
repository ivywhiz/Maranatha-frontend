// app/resources/page.tsx
import { Metadata } from "next"
import Header from "../../components/header"
import Footer from "../../components/footer"
import ResourceCenterHero from "../../components/resources/resource-center-hero"
import ScripturesTab from "../../components/resources/scriptures-tab"

export const metadata: Metadata = {
  title: "Bible Scriptures | Maranatha Moment Ministries",
  description:
    "Read and study the Word of God with our Bible scriptures tool. Explore Old and New Testament verses, chapters, and books in multiple translations.",
}

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ResourceCenterHero />

      <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 py-10">
        {/* Scriptures Tab only - no other tabs */}
        <ScripturesTab />
      </div>

      <Footer />
    </main>
  )
}