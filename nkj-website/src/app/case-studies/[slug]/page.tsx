import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/case-studies';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const slugs = getCaseStudySlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params;
  const study = getCaseStudyBySlug(resolvedParams.slug);
  return {
    title: `${study.metadata.title} | Case Study | NKJ Development`,
    description: study.metadata.challenge,
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const study = getCaseStudyBySlug(resolvedParams.slug);

  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <article className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Link href="/case-studies" className="text-sky-400 hover:text-sky-300 transition-colors font-medium mb-8 inline-block">
              ← Back to Case Studies
            </Link>
            
            <div className="flex items-center gap-4 mb-6 mt-4">
              <span className="inline-flex px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border bg-sky-500/10 text-sky-400 border-sky-500/20">
                {study.metadata.industry}
              </span>
              <span className="text-sm font-medium text-slate-400">
                Client: {study.metadata.client}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8 tracking-tight">
              {study.metadata.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 p-8 bg-slate-900 border border-slate-800 rounded-2xl">
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">The Challenge</h3>
                <p className="text-slate-300 leading-relaxed">
                  {study.metadata.challenge}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">The Solution</h3>
                <p className="text-slate-300 leading-relaxed">
                  {study.metadata.solution}
                </p>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-xl font-bold text-slate-50 mb-6 flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Key Results
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {study.metadata.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                    <span className="text-emerald-400 mt-0.5 text-lg">↑</span>
                    <span className="text-slate-200 font-medium">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="prose prose-invert prose-slate prose-lg max-w-none prose-a:text-sky-400 hover:prose-a:text-sky-300 prose-headings:text-slate-50 prose-strong:text-slate-200">
            <MDXRemote source={study.content} />
          </div>

          <div className="mt-20 pt-10 border-t border-slate-800 text-center">
            <h2 className="text-2xl font-bold text-slate-50 mb-4">Ready to see similar results?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Schedule a discovery call to discuss how we can build custom data pipelines and dashboards for your manufacturing operation.
            </p>
            <Link href="/book" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-slate-950 bg-sky-400 hover:bg-sky-300 transition-colors shadow-lg shadow-sky-500/20">
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
