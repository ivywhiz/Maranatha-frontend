// app/resources/[id]/page.tsx
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "../../../components/header"
import Footer from "../../../components/footer"
import { RESOURCES } from "../../../components/resources/resource-data"

interface Props {
  params: { id: string }
}

export default function ResourceDetailPage({ params }: Props) {
  const resource = RESOURCES.find((r) => r.id === Number(params.id)) ?? RESOURCES[0]

  // Split sections to inject inline image before "Conclusion"
  const conclusionIndex = resource.sections.findIndex(
    (s) => s.heading.toLowerCase() === "conclusion"
  )

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── Top area: lavender bg, go back, title, date ── */}
      <div style={{ backgroundColor: "#F5F0FB" }} className="pb-10 pt-6">
        <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Go back */}
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 bg-white text-gray-600 text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-50 transition-colors shadow-sm border border-gray-100 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Link>

          {/* Title + date — centered */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {resource.title}
            </h1>
            <p className="text-gray-400 text-sm">
              Published {resource.publishedDate}
            </p>
          </div>
        </div>
      </div>

      {/* ── Full-width hero image ── */}
      <div className="relative w-full h-64 sm:h-80 lg:h-[420px] bg-gray-900">
        <Image
          src={resource.thumbnail}
          alt={resource.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ── Article body ── */}
      <div className="max-w-[640px] mx-auto px-6 sm:px-8 py-10">

        {/* Author + read time */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-violet-100 shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maranatha%20logo-BBUxZMkkSIomnFx78tkAQmGRCpREmR.png"
                alt={resource.author}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-semibold text-gray-800">{resource.author}</span>
          </div>
          <span className="text-sm text-gray-400">{resource.readTime}</span>
        </div>

        {/* Sections */}
        <div className="mt-8 space-y-8">
          {resource.sections.map((section, i) => (
            <div key={i}>
              {/* Inject inline image before Conclusion */}
              {i === conclusionIndex && resource.inlineImage && (
                <div className="relative w-full rounded-2xl overflow-hidden aspect-[5/3] mb-8">
                  <Image
                    src={resource.inlineImage}
                    alt="Article illustration"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <h2 className="text-xl font-bold text-gray-900 mb-3">{section.heading}</h2>

              {section.body && (
                <p className="text-gray-600 text-sm leading-relaxed">{section.body}</p>
              )}

              {section.bullets && (
                <ul className="space-y-3 mt-3">
                  {section.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}