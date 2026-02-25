// app/events/page.tsx
import { Metadata } from "next"
import Header from "../../components/header"
import Footer from "../../components/footer"
import EventsHero from "../../components/events/events-hero"
import EventsList from "../../components/events/events-list"

export const metadata: Metadata = {
  title: "Events | Maranatha Moment Ministries",
  description:
    "Explore upcoming events, outreach programs, and gatherings from Maranatha Moment Ministries. Join us for worship, learning, and community.",
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <EventsHero />
      <EventsList />
      <Footer />
    </main>
  )
}