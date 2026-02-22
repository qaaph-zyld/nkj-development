export default function Analytics() {
  const isProduction = process.env.NODE_ENV === 'production';
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;

  // Only load analytics in production and if env variables are configured
  if (!isProduction || !umamiWebsiteId || !umamiUrl) {
    return null;
  }

  return (
    <>
      {/* 
        Umami Analytics Integration
        Umami is an open-source, privacy-respecting Google Analytics alternative.
        It doesn't use cookies and is fully GDPR compliant.
        
        To self-host Umami (e.g. on Railway or Vercel):
        1. Fork the umami-software/umami repo
        2. Deploy it with a PostgreSQL database
        3. Login to your Umami instance and add a website to get the Tracking Code
        4. Set these environment variables in your Next.js project (Netlify/Vercel settings):
           - NEXT_PUBLIC_UMAMI_WEBSITE_ID="your-website-id-here"
           - NEXT_PUBLIC_UMAMI_URL="https://your-umami-instance.com/script.js"
      */}
      <script
        async
        src={umamiUrl}
        data-website-id={umamiWebsiteId}
      />
    </>
  );
}
