// app/resources/page.tsx
import Header from "../../components/header"
import Footer from "../../components/footer"
import ResourceCenterHero from "../../components/resources/resource-center-hero"
import ScripturesTab from "../../components/resources/scriptures-tab"

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ResourceCenterHero />

      <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <ScripturesTab />
      </div>

      <Footer />
    </main>
  )
}