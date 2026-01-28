// app/about/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Maranatha Moment Ministries - Evangelizing, Saving Souls, Preaching Jesus Christ",
  description:
    "Maranatha Moment Ministries (MMM) is a nonprofit evangelical ministry focused on preaching the Gospel of Jesus Christ, street evangelism, and spiritual growth through sound biblical teaching. Learn about our mission to reach the lost and prepare believers for Christ's return.",
  keywords:
    "Maranatha Moment Ministries, evangelical ministry, street preaching, Jesus saves, salvation through Christ, end times ministry, Christian outreach, biblical truth",
  openGraph: {
    title: "About Maranatha Moment Ministries",
    description: "Bringing the urgent message of salvation through Jesus Christ to the world.",
    url: "https://www.maranathamoment.org/about",
    type: "website",
    images: ["/og-about.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Maranatha Moment Ministries",
    description: "Street evangelism | Biblical truth | Preparing for Christ's return",
    images: ["/og-about.jpg"],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ReligiousOrganization",
            name: "Maranatha Moment Ministries",
            alternateName: "MMM",
            url: "https://www.maranathamoment.org",
            logo: "https://www.maranathamoment.org/logo.png",
            description:
              "Nonprofit evangelical ministry focused on street preaching, soul-winning, and preparing believers for the return of Jesus Christ.",
            foundingDate: "2020",
            founder: {
              "@type": "Person",
              name: "Dr. Stella Ford",
            },
            contactPoint: {
              "@type": "ContactPoint",
              email: "info@maranathamoment.org",
              contactType: "Customer Service",
            },
            sameAs: [
              "https://facebook.com/maranathamoment",
              "https://instagram.com/maranathamoment",
              "https://youtube.com/@maranathamoment",
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-background">
      </div>
    </>
  );
}