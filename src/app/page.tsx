// src/app/page.tsx
import Header from "../components/header";
import HeroSection from "../components/hero-section";
import ScriptureQuoteSection from "../components/scripture-quote-section";
import ServicesSection from "../components/services-section";
import TeachingsSection from "../components/teachings-section";
import KeepLightSection from "../components/keep-light-section";
import FaithGrowsSection from "../components/faith-grows-section";
import EventsSection from "../components/events-section";
import CTASection from "../components/cta-section";
import Footer from "../components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maranatha Moment Ministries | Faith, Worship, Community",
  description:
    "Maranatha is a vibrant Christian ministry spreading the love of Jesus through live sermons, prayer, worship, and community support. Join us in faith and fellowship.",
  keywords: [
    "Maranatha",
    "Christian ministry",
    "Jesus Christ",
    "sermons",
    "live worship",
    "prayer wall",
    "donation",
    "faith community",
    "spiritual growth",
  ],
  authors: [{ name: "Maranatha Team" }],
  creator: "Maranatha Moment Ministries",
  publisher: "Maranatha Moment Ministries",
  formatDetection: { email: false, telephone: false },

  // Open Graph
  openGraph: {
    title: "Maranatha Moment Ministries",
    description: "Faith. Worship. Community. Join a growing family of believers.",
    url: "https://maranatha.example.com",
    siteName: "Maranatha Moment Ministries",
    images: [
      {
        url: "https://maranatha.example.com/images/maranatha-logo.png",
        width: 1200,
        height: 630,
        alt: "Maranatha Moment Ministries Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Maranatha Moment Ministries",
    description: "Faith. Worship. Community.",
    images: ["/images/maranatha-logo.png"],
    creator: "@maranatha_min",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: "https://maranatha.example.com",
  },
};

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ScriptureQuoteSection />
      <ServicesSection />
      <TeachingsSection />
      <KeepLightSection />
      <FaithGrowsSection />
      <EventsSection />
      <CTASection />
      <Footer />
    </main>
  );
}