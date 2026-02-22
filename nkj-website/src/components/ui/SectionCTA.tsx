import Link from 'next/link';

interface SectionCTAProps {
  text: string;
  buttonText: string;
  buttonLink: string;
}

export default function SectionCTA({ text, buttonText, buttonLink }: SectionCTAProps) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 bg-slate-900/50 border border-slate-800 rounded-xl p-6 shadow-sm">
      <p className="text-slate-300 font-medium text-center sm:text-left">
        {text}
      </p>
      <Link 
        href={buttonLink}
        className="nkj-button-primary px-5 py-2.5 text-sm flex-shrink-0"
      >
        {buttonText}
      </Link>
    </div>
  );
}
