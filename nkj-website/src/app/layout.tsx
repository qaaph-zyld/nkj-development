import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { metadata as siteMetadata } from "./metadata";
import Analytics from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = siteMetadata;

export const viewport: Viewport = {
  themeColor: '#10b981', // Emerald 500
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NKJ Development",
    url: "https://nkj-development.com",
    description: "Specialized manufacturing data consultancy building custom ERP extraction pipelines and real-time dashboards.",
    industry: "Manufacturing Analytics & IT Consulting",
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50 selection:bg-emerald-500/30 selection:text-emerald-200`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
