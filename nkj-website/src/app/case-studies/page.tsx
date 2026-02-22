import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CaseStudyCard from '@/components/blog/CaseStudyCard';
import CTABanner from '@/components/ui/CTABanner';
import { getAllCaseStudies } from '@/lib/case-studies';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manufacturing Case Studies | NKJ Development',
  description: 'Real-world examples of how automotive Tier 1 and Tier 2 suppliers use custom data analytics to optimize production and quality.',
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-medium tracking-wide mb-6">
              Proven Results
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 tracking-tight">
              Manufacturing <span className="text-sky-400">Case Studies</span>.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
              Explore how custom data pipelines and tailored dashboards have transformed operations for automotive suppliers. *Note: specific client details have been anonymized for confidentiality.*
            </p>
          </div>

          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map(study => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="text-4xl mb-4 opacity-50 grayscale">🏭</div>
              <h3 className="text-xl font-bold text-slate-50 mb-2">No case studies yet</h3>
              <p className="text-slate-400">Check back soon for detailed client success stories.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner 
        heading="Ready for similar results?" 
        subtext="Every manufacturing plant is unique, but the data bottlenecks are often the same. Let's discuss how we can build a solution tailored to your specific operational challenges." 
        buttonText="Let's Talk About Your Data" 
        buttonLink="/book" 
      />

      <Footer />
    </main>
  );
}
