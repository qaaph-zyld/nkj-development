import Link from 'next/link';
import { CaseStudy } from '@/lib/case-studies';

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const { title, client, industry, challenge, results } = study.metadata;

  return (
    <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-slate-700 transition-colors flex flex-col h-full group">
      <Link href={`/case-studies/${study.slug}`} className="p-8 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
          <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-sky-500/10 text-sky-400 border-sky-500/20">
            {industry}
          </span>
          <span className="text-sm font-medium text-slate-500">
            Client: {client}
          </span>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-50 tracking-tight mb-4 group-hover:text-sky-400 transition-colors">
          {title}
        </h2>
        
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">The Challenge</h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            {challenge}
          </p>
        </div>

        <div className="mb-8 flex-grow">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Results</h3>
          <ul className="space-y-2">
            {results.slice(0, 3).map((result, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span className="text-sm text-slate-300">{result}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center text-sm font-semibold text-sky-400 group-hover:text-sky-300 transition-colors mt-auto pt-6 border-t border-slate-800">
          Read Full Case Study <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
        </div>
      </Link>
    </article>
  );
}
