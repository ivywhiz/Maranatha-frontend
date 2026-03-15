// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";
import ScripturePopup from "../components/scripture-popup";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#800080",
};

export const metadata: Metadata = {
  title: {
    default: "Maranatha Moment Ministries | Spreading Faith & Love",
    template: "%s | Maranatha Moment Ministries",
  },
  description:
    "Maranatha is dedicated to spreading the compassion and love of Jesus Christ as we support believers in faith, fellowship, and spiritual growth.",
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

  openGraph: {
    title: "Maranatha Moment Ministries",
    description: "Faith. Worship. Community.",
    url: "https://maranatha.example.com",
    siteName: "Maranatha Moment Ministries",
    images: [
      {
        url: "https://maranatha.example.com/images/maranatha-logo.png",
        width: 1200,
        height: 630,
        alt: "Maranatha Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Maranatha Moment Ministries",
    description: "Faith. Worship. Community.",
    images: ["/images/maranatha-logo.png"],
    creator: "@maranatha_min",
  },

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

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "https://maranatha.example.com",
  },
};

// Structured Data (JSON-LD) for better SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Maranatha Moment Ministries",
  url: "https://maranatha.example.com",
  logo: "https://maranatha.example.com/images/maranatha-logo.png",
  description:
    "A Christian ministry dedicated to spreading the love of Jesus through sermons, live worship, and community support.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@maranatha.example.com",
    contactType: "Customer Service",
  },
  sameAs: [
    "https://facebook.com/maranatha",
    "https://twitter.com/maranatha_min",
    "https://instagram.com/maranatha",
    "https://youtube.com/maranatha",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", inter.variable)}>
      <head>
        {/* Preload important fonts */}
        <link
          rel="preload"
          href="/fonts/CabinetGrotesk-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Favicon & icons */}
        <link rel="icon" href="/images/maranatha-logo.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
      </head>

      <body className="antialiased">
        {/* Main app content */}
        {children}

        {/* Global Scripture Popup – shows random encouraging verses */}
        <ScripturePopup />

        {/* Toast notifications – using shadcn/ui sonner */}
        <Toaster
          richColors
          closeButton
          position="top-center"
          duration={4000}
          theme="light" // matches your light-only design
          className="font-sans"
        />
      </body>
    </html>
  );
}