import Link from 'next/link';

interface CTABannerProps {
  heading: string;
  subtext: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTABanner({ heading, subtext, buttonText, buttonLink }: CTABannerProps) {
  return (
    <section className="py-20 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-6 tracking-tight">
          {heading}
        </h2>
        <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          {subtext}
        </p>
        <Link 
          href={buttonLink} 
          className="nkj-button-primary px-8 py-4 text-lg inline-flex items-center gap-2 shadow-lg shadow-sky-500/20"
        >
          {buttonText}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
