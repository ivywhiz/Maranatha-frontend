// app/contact/page.tsx
import { Metadata } from "next"
import Header from "../../components/header"
import Footer from "../../components/footer"
import ContactHero from "../../components/contact/contact-hero"
import ContactForm from "../../components/contact/contact-form"
import ContactInfo from "../../components/contact/contact-info"

export const metadata: Metadata = {
  title: "Contact Us | Maranatha Moment Ministries",
  description:
    "Get in touch with Maranatha Moment Ministries. Send us a message, find our contact details, or connect with us on social media.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ContactHero />

      {/* ── Main content ── */}
      <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-start">

          {/* LEFT — form */}
          <div className="bg-[#FAFAFA] rounded-3xl border border-gray-100 p-8 sm:p-10">
            <ContactForm />
          </div>

          {/* RIGHT — info + socials */}
          <div className="lg:sticky lg:top-8">
            <ContactInfo />
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}