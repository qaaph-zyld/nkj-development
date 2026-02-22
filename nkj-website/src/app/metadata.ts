import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://nkj-development.com'),
  title: {
    default: 'NKJ Development — Manufacturing Analytics & ERP Consulting',
    template: '%s | NKJ Development — Manufacturing Analytics & ERP Consulting',
  },
  description: 'Specialized manufacturing data consultancy building custom ERP extraction pipelines, real-time OEE dashboards, and quality analytics for Tier 1 and Tier 2 automotive suppliers.',
  keywords: ['Manufacturing Analytics', 'ERP Integration', 'QAD', 'OEE Dashboards', 'Automotive Suppliers', 'Data Engineering', 'SQL Server', 'Python', 'Next.js'],
  authors: [{ name: 'NKJ Development' }],
  creator: 'NKJ Development',
  publisher: 'NKJ Development',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'NKJ Development — Manufacturing Analytics & ERP Consulting',
    description: 'Transform your legacy ERP data into real-time production visibility. We build custom extraction pipelines and dashboards for automotive suppliers.',
    url: 'https://nkj-development.com',
    siteName: 'NKJ Development',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NKJ Development — Manufacturing Analytics & ERP Consulting',
    description: 'Transform your legacy ERP data into real-time production visibility.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
